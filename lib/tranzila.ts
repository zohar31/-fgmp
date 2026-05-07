// Tranzila integration — dual-terminal architecture (per Tranzila support, 2026-05-07):
//
// - IFRAME (initial customer payment) → MAIN terminal `fgmpvip`
//   Customer enters card on Tranzila's hosted iframe. With TranzilaTK=1 in
//   the request, Tranzila generates a token and stores it in the token
//   service tied to the secondary terminal (fgmpviptok).
//
// - RECURRING CHARGES (monthly) → TOKEN terminal `fgmpviptok` via API
//   The recurring billing module is configured on fgmpviptok, NOT on fgmpvip.
//   The token from the iframe transaction is valid for charges on this terminal.
//
// - REFUNDS / VOIDS → MAIN terminal `fgmpvip` (where the original charge lives)
//
// Env vars (set on Vercel):
//   TRANZILA_TERMINAL         — main terminal name ("fgmpvip"). Iframe + refunds.
//   TRANZILA_API_PW           — TranzilaPW for the main terminal (legacy, kept for compat).
//   TRANZILA_REFUND_PW        — refund/void password for the main terminal.
//   TRANZILA_TOKEN_TERMINAL   — token terminal name ("fgmpviptok"). Recurring API.
//   TRANZILA_TOKEN_API_PW     — TranzilaPW for the token terminal.

export const TRANZILA_TERMINAL = process.env.TRANZILA_TERMINAL || "fgmpvip";
const TRANZILA_API_PW = process.env.TRANZILA_API_PW || "";

// Token terminal — separate supplier for recurring charges via saved token
const TRANZILA_TOKEN_TERMINAL =
  process.env.TRANZILA_TOKEN_TERMINAL || TRANZILA_TERMINAL;
const TRANZILA_TOKEN_API_PW =
  process.env.TRANZILA_TOKEN_API_PW || TRANZILA_API_PW;

// Hosted iframe base URL — always on the MAIN terminal
export const TRANZILA_IFRAME_URL = `https://direct.tranzila.com/${TRANZILA_TERMINAL}/iframenew.php`;

// Server-to-server endpoint (used for both terminals — supplier param differs)
const TRANZILA_CHARGE_URL = "https://secure5.tranzila.com/cgi-bin/tranzila71u.cgi";

// ──────────────────────────────────────────────────────────
// Build params for Hosted iframe (first payment)
// ──────────────────────────────────────────────────────────
//
// User redirects via POST/GET to TRANZILA_IFRAME_URL with these params.
// After payment, Tranzila:
//   1. POSTs result to notify_url_address (server-to-server, authoritative)
//   2. Redirects customer to success_url_address or fail_url_address

export function buildIframeParams(opts: {
  amount: number; // ILS
  contact?: string;
  email?: string;
  phone?: string;
  myid?: string; // tax id (ת.ז. / ע.מ.)
  notifyUrl: string; // our /api/billing/notify
  successUrl: string;
  failUrl: string;
  externalRef: string; // our subscription/user identifier
  enableTokenization?: boolean; // store card for recurring (default true)
  enableBit?: boolean; // show Bit option
}): Record<string, string> {
  // tranmode values (per Tranzila official docs):
  //   A  = Authorize / charge only (no token)
  //   K  = Keep only (save token, no charge)
  //   VK = Verify + Keep (5₪ verification charge + token)
  //   AK = Authorize + Keep (real charge + token, one transaction) ← we use
  //
  // We use AK so the customer pays once and the token is saved in the same
  // transaction. Token is then valid for recurring charges via API on the
  // fgmpviptok terminal (per Tranzila support clarification 2026-05-07).
  //
  // CRITICAL: do NOT send `TranzilaTK=1` in the request. That was a bug —
  // sending "1" makes Tranzila echo it back as "1" instead of a real token.
  // The actual tokenization flag is `tranmode=AK` itself.
  const tranmode = opts.enableTokenization === false ? "A" : "AK";

  const params: Record<string, string> = {
    sum: String(opts.amount),
    currency: "1", // 1 = ILS
    cred_type: "1", // 1 = regular credit
    tranmode,
    notify_url_address: opts.notifyUrl,
    success_url_address: opts.successUrl,
    fail_url_address: opts.failUrl,
    // Custom field — Tranzila echoes this back in the response
    pdesc: opts.externalRef.slice(0, 100),
    // Customer info (pre-filled on hosted page)
    contact: opts.contact || "",
    email: opts.email || "",
    phone: opts.phone || "",
  };

  if (opts.myid) params.myid = opts.myid;

  // Bit support — adds a Bit button on the hosted page (terminal must support it)
  if (opts.enableBit) {
    params.bit_pay = "1";
  }

  return params;
}

// Build a redirect URL with all params for the iframe
export function buildIframeRedirectUrl(opts: Parameters<typeof buildIframeParams>[0]): string {
  const params = buildIframeParams(opts);
  const qs = new URLSearchParams(params).toString();
  return `${TRANZILA_IFRAME_URL}?${qs}`;
}

// ──────────────────────────────────────────────────────────
// Server-to-server token charge (recurring billing)
// ──────────────────────────────────────────────────────────

export type TranzilaChargeResult = {
  ok: boolean;
  responseCode: string;
  responseMessage?: string;
  index?: string;
  confirmationCode?: string;
  raw: string;
};

export async function chargeWithToken(opts: {
  token: string;
  expiry: string; // YYMM
  amount: number;
  myid?: string;
}): Promise<TranzilaChargeResult> {
  // Recurring charges go through the TOKEN terminal (fgmpviptok), per Tranzila
  // support (2026-05-07): "the recurring billing module is configured on the
  // tokens terminal — fgmpviptok".
  if (!TRANZILA_TOKEN_API_PW) {
    return {
      ok: false,
      responseCode: "no_api_pw",
      responseMessage: "TRANZILA_TOKEN_API_PW not configured",
      raw: "",
    };
  }

  const body = new URLSearchParams({
    supplier: TRANZILA_TOKEN_TERMINAL,
    TranzilaPW: TRANZILA_TOKEN_API_PW,
    TranzilaTK: opts.token,
    sum: String(opts.amount),
    currency: "1",
    cred_type: "1",
    tranmode: "A",
    expdate: opts.expiry,
    ...(opts.myid ? { myid: opts.myid } : {}),
  });

  try {
    const res = await fetch(TRANZILA_CHARGE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });
    const text = await res.text();

    // DEBUG: log the full Tranzila charge response so we can see what they returned
    console.log("[tranzila/chargeWithToken] DEBUG response:", {
      terminal: TRANZILA_TOKEN_TERMINAL,
      amount: opts.amount,
      tokenPrefix: opts.token.slice(0, 6) + "...",
      expdate: opts.expiry,
      httpStatus: res.status,
      contentType: res.headers.get("content-type"),
      rawLength: text.length,
      rawSnippet: text.slice(0, 800),
    });

    // Tranzila returns URL-encoded form (key=val&key=val)
    const parsed = new URLSearchParams(text);
    const responseCode = parsed.get("Response") || "unknown";
    const ok = responseCode === "000";

    return {
      ok,
      responseCode,
      responseMessage: tranzilaResponseMessage(responseCode),
      index: parsed.get("index") || undefined,
      confirmationCode: parsed.get("ConfirmationCode") || undefined,
      raw: text,
    };
  } catch (err) {
    return {
      ok: false,
      responseCode: "network_error",
      responseMessage: err instanceof Error ? err.message : String(err),
      raw: "",
    };
  }
}

// ──────────────────────────────────────────────────────────
// Refund / void a previously charged transaction
// ──────────────────────────────────────────────────────────
//
// Tranzila distinguishes:
//   - VOID (cred_type=2): same-day cancellation before settlement → no fee
//   - REFUND (cred_type=3): post-settlement reversal → may incur a small fee
// We try void first; if Tranzila rejects (already settled), the caller can
// retry with refund=true.
//
// Auth uses the dedicated refund password (TRANZILA_REFUND_PW), separate
// from the standard charge password — Tranzila enforces this at the gateway.

const TRANZILA_REFUND_PW = process.env.TRANZILA_REFUND_PW || "";

export type TranzilaRefundResult = {
  ok: boolean;
  responseCode: string;
  responseMessage?: string;
  index?: string;
  raw: string;
  mode: "void" | "refund";
};

export async function refundOrVoidTranzila(opts: {
  originalIndex: string; // Tranzila transaction index (the `index` field from charge response)
  authNr: string; // Tranzila confirmation/authorization number (the `ConfirmationCode` field)
  amount: number;
  forceRefund?: boolean; // skip void attempt, go straight to refund
}): Promise<TranzilaRefundResult> {
  if (!TRANZILA_REFUND_PW) {
    return {
      ok: false,
      responseCode: "no_refund_pw",
      responseMessage: "TRANZILA_REFUND_PW not configured",
      raw: "",
      mode: "void",
    };
  }

  // First attempt: void (cred_type=2) unless caller asked for refund directly
  if (!opts.forceRefund) {
    const voidResult = await callReverse({
      originalIndex: opts.originalIndex,
      authNr: opts.authNr,
      amount: opts.amount,
      credType: "2",
    });
    if (voidResult.ok) return { ...voidResult, mode: "void" };
    // Specific failure codes that indicate "already settled, try refund"
    // 414, 459 = transaction already settled / not voidable
    const settled = ["414", "459"].includes(voidResult.responseCode);
    if (!settled) return { ...voidResult, mode: "void" };
  }

  const refundResult = await callReverse({
    originalIndex: opts.originalIndex,
    authNr: opts.authNr,
    amount: opts.amount,
    credType: "3",
  });
  return { ...refundResult, mode: "refund" };
}

async function callReverse(opts: {
  originalIndex: string;
  authNr: string;
  amount: number;
  credType: "2" | "3";
}): Promise<Omit<TranzilaRefundResult, "mode">> {
  // Tranzila refund auth uses TWO different passwords:
  //   - TranzilaPW  → general API password (TRANZILA_API_PW = srK*)
  //   - CreditPass  → refund-specific extra password (TRANZILA_REFUND_PW = tnq*)
  // Sending the refund password as TranzilaPW returns "Not Authorized".
  const body = new URLSearchParams({
    supplier: TRANZILA_TERMINAL,
    TranzilaPW: TRANZILA_API_PW,
    sum: String(opts.amount),
    currency: "1",
    cred_type: opts.credType,
    tranmode: "C", // C = credit/refund
    CreditPass: TRANZILA_REFUND_PW,
    AuthNr: opts.authNr, // ← the confirmation code, NOT the index
    index: opts.originalIndex,
  });

  try {
    const res = await fetch(TRANZILA_CHARGE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });
    const text = await res.text();

    // DEBUG: log the full Tranzila refund response so we can see what they returned
    console.log("[tranzila/refund] DEBUG response:", {
      credType: opts.credType,
      originalIndex: opts.originalIndex,
      authNr: opts.authNr,
      amount: opts.amount,
      httpStatus: res.status,
      contentType: res.headers.get("content-type"),
      rawLength: text.length,
      rawSnippet: text.slice(0, 800),
    });

    const parsed = new URLSearchParams(text);
    const responseCode = parsed.get("Response") || "unknown";
    return {
      ok: responseCode === "000",
      responseCode,
      responseMessage: tranzilaResponseMessage(responseCode),
      index: parsed.get("index") || undefined,
      raw: text,
    };
  } catch (err) {
    return {
      ok: false,
      responseCode: "network_error",
      responseMessage: err instanceof Error ? err.message : String(err),
      raw: "",
    };
  }
}

// ──────────────────────────────────────────────────────────
// Parse webhook (notify) payload from Tranzila
// ──────────────────────────────────────────────────────────

export type TranzilaNotifyPayload = {
  Response: string;
  index: string;
  ConfirmationCode: string;
  TranzilaTK?: string; // token if requested
  expdate?: string;
  ccno?: string; // last 4 digits
  cardtype?: string; // card brand code
  sum: string;
  pdesc?: string; // our external reference
  email?: string;
  phone?: string;
  contact?: string;
  myid?: string;
  paymentMethod?: string;
  raw: Record<string, string>;
};

export function parseTranzilaNotify(formData: FormData | URLSearchParams): TranzilaNotifyPayload {
  const raw: Record<string, string> = {};
  formData.forEach((v, k) => {
    raw[k] = String(v);
  });

  // Tranzila returns expiry either as combined `expdate=YYMM` (server-to-server
  // API) or split into `expyear`+`expmonth` (iframe). chargeWithToken needs the
  // combined YYMM, so combine the split form when expdate isn't directly there.
  let expdate = raw.expdate || undefined;
  if (!expdate && raw.expyear && raw.expmonth) {
    const yy = raw.expyear.padStart(2, "0").slice(-2);
    const mm = raw.expmonth.padStart(2, "0");
    expdate = yy + mm;
  }

  return {
    Response: raw.Response || "",
    index: raw.index || "",
    ConfirmationCode: raw.ConfirmationCode || "",
    TranzilaTK: raw.TranzilaTK || undefined,
    expdate,
    ccno: raw.ccno || undefined,
    cardtype: raw.cardtype || undefined,
    sum: raw.sum || "",
    pdesc: raw.pdesc || undefined,
    email: raw.email || undefined,
    phone: raw.phone || undefined,
    contact: raw.contact || undefined,
    myid: raw.myid || undefined,
    paymentMethod: raw.bit_pay === "1" ? "bit" : "credit_card",
    raw,
  };
}

// ──────────────────────────────────────────────────────────
// Tranzila response codes — partial map of common ones
// ──────────────────────────────────────────────────────────

const RESPONSE_MESSAGES: Record<string, string> = {
  "000": "תשלום אושר",
  "001": "כרטיס חסום",
  "002": "כרטיס לא קיים",
  "003": "הקלדה שגויה",
  "004": "סירוב",
  "005": "כרטיס מזויף",
  "006": "ת.ז שגויה",
  "007": "סירוב CVV",
  "008": "פג תוקף",
  "009": "אין תקשורת",
  "010": "כרטיס אינו תקף",
  "033": "כרטיס לא תקין",
  "036": "פג תוקף הכרטיס",
  "039": "כרטיס לא תקין",
  "057": "סוג עסקה לא חוקי",
  "059": "ערך עסקה גבוה מדי",
  "065": "מספר תשלומים לא חוקי",
  "200": "אין הרשאה לסוג עסקה זו",
  no_api_pw: "API לא הוגדר",
  network_error: "שגיאת רשת",
};

export function tranzilaResponseMessage(code: string): string {
  return RESPONSE_MESSAGES[code] || `Tranzila response ${code}`;
}

// Check if currently in test mode (per env)
export function isTestMode(): boolean {
  return process.env.TRANZILA_TEST_MODE === "1";
}

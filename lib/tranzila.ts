// Tranzila integration — Hosted iframe + token-based recurring billing
//
// Architecture:
// - First payment: customer redirected to Tranzila Hosted Page (iframe).
//   Customer enters card details (or chooses Bit) on Tranzila's PCI-compliant
//   page. Tranzila stores the card and returns a token via webhook.
// - Recurring (monthly): server-to-server POST with the saved token.
//
// Credentials live in env vars (set on Vercel):
//   TRANZILA_TERMINAL — supplier name (e.g., "fgmpvip")
//   TRANZILA_API_PW   — TranzilaPW for the terminal (used for token charges)
//   TRANZILA_TEST_MODE — '1' for test mode (disabled in prod once verified)

export const TRANZILA_TERMINAL = process.env.TRANZILA_TERMINAL || "fgmpvip";
const TRANZILA_API_PW = process.env.TRANZILA_API_PW || "";

// Hosted iframe base URL (same for test and live — terminal mode determines behavior)
export const TRANZILA_IFRAME_URL = `https://direct.tranzila.com/${TRANZILA_TERMINAL}/iframenew.php`;

// Server-to-server token charge endpoint
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
  const params: Record<string, string> = {
    sum: String(opts.amount),
    currency: "1", // 1 = ILS
    cred_type: "1", // 1 = normal credit
    tranmode: "A", // A = charge
    // ── send notify URL with multiple parameter names — different Tranzila
    // setups expect different names. Sending all variants is safe.
    notify_url_address: opts.notifyUrl,
    success_url_address: opts.successUrl,
    fail_url_address: opts.failUrl,
    notify_url: opts.notifyUrl,
    success_url: opts.successUrl,
    fail_url: opts.failUrl,
    NotifyURL: opts.notifyUrl,
    SuccessURL: opts.successUrl,
    FailURL: opts.failUrl,
    u71: "1", // explicit notify enabled (some integrations need this)
    json: "1", // request JSON callback
    // Custom field for tracking — Tranzila echoes this back in notify
    pdesc: opts.externalRef.slice(0, 100),
    // Customer info (pre-filled on hosted page)
    contact: opts.contact || "",
    email: opts.email || "",
    phone: opts.phone || "",
  };

  if (opts.myid) params.myid = opts.myid;

  // Tokenization — request a token for future recurring charges
  if (opts.enableTokenization !== false) {
    params.TranzilaTK = "1";
  }

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
  if (!TRANZILA_API_PW) {
    return {
      ok: false,
      responseCode: "no_api_pw",
      responseMessage: "TRANZILA_API_PW not configured",
      raw: "",
    };
  }

  const body = new URLSearchParams({
    supplier: TRANZILA_TERMINAL,
    TranzilaPW: TRANZILA_API_PW,
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
  originalIndex: string; // Tranzila index of the charge to reverse
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
    amount: opts.amount,
    credType: "3",
  });
  return { ...refundResult, mode: "refund" };
}

async function callReverse(opts: {
  originalIndex: string;
  amount: number;
  credType: "2" | "3";
}): Promise<Omit<TranzilaRefundResult, "mode">> {
  const body = new URLSearchParams({
    supplier: TRANZILA_TERMINAL,
    TranzilaPW: TRANZILA_REFUND_PW,
    sum: String(opts.amount),
    currency: "1",
    cred_type: opts.credType,
    tranmode: "C", // C = credit/refund
    CreditPass: TRANZILA_REFUND_PW,
    AuthNr: opts.originalIndex,
    index: opts.originalIndex,
  });

  try {
    const res = await fetch(TRANZILA_CHARGE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });
    const text = await res.text();
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
  return {
    Response: raw.Response || "",
    index: raw.index || "",
    ConfirmationCode: raw.ConfirmationCode || "",
    TranzilaTK: raw.TranzilaTK || undefined,
    expdate: raw.expdate || undefined,
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

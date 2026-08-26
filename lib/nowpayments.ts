import crypto from "crypto";

// NOWPayments — non-custodial crypto checkout. Funds settle directly to the
// merchant's own wallet (USDT/USDC). Credentials come from env only:
//   NOWPAYMENTS_API_KEY     — API key (Store Settings → API keys)
//   NOWPAYMENTS_IPN_SECRET  — IPN secret (Store Settings → IPN) for webhook auth
const API = "https://api.nowpayments.io/v1";
const API_KEY = process.env.NOWPAYMENTS_API_KEY;
const IPN_SECRET = process.env.NOWPAYMENTS_IPN_SECRET;

export function isNowPaymentsConfigured(): boolean {
  return !!API_KEY;
}

export type CreateInvoiceResult =
  | { ok: true; invoiceUrl: string; invoiceId: string; raw: unknown }
  | { ok: false; error: string; raw: unknown };

// Creates a hosted invoice. The customer picks the coin/network (USDT TRC-20,
// Polygon, etc.) on NOWPayments' page — enable the ones you want in the
// dashboard. Returns invoice_url to redirect the customer to.
export async function createInvoice(opts: {
  priceUsd: number;
  orderId: string;
  orderDescription: string;
  ipnCallbackUrl: string;
  successUrl: string;
  cancelUrl: string;
  payCurrency?: string; // optional: force a coin, e.g. "usdttrc20"
}): Promise<CreateInvoiceResult> {
  if (!API_KEY) return { ok: false, error: "NOWPAYMENTS_API_KEY not configured", raw: null };
  try {
    const res = await fetch(`${API}/invoice`, {
      method: "POST",
      headers: { "x-api-key": API_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({
        price_amount: opts.priceUsd,
        price_currency: "usd",
        order_id: opts.orderId,
        order_description: opts.orderDescription,
        ipn_callback_url: opts.ipnCallbackUrl,
        success_url: opts.successUrl,
        cancel_url: opts.cancelUrl,
        is_fixed_rate: true,
        ...(opts.payCurrency ? { pay_currency: opts.payCurrency } : {}),
      }),
    });
    const data = (await res.json()) as { id?: string | number; invoice_url?: string; message?: string };
    if (!res.ok || !data.invoice_url) {
      return { ok: false, error: data.message || `NOWPayments HTTP ${res.status}`, raw: data };
    }
    return { ok: true, invoiceUrl: data.invoice_url, invoiceId: String(data.id), raw: data };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err), raw: null };
  }
}

// Verifies an IPN callback: NOWPayments signs the JSON body (keys sorted
// alphabetically, recursively) with HMAC-SHA512 using the IPN secret, and sends
// it in the `x-nowpayments-sig` header.
export function verifyIpnSignature(
  rawBody: string,
  signature: string | null | undefined
): { valid: boolean; body: NowPaymentsIpn | null } {
  if (!IPN_SECRET || !signature) return { valid: false, body: null };
  let parsed: unknown;
  try {
    parsed = JSON.parse(rawBody);
  } catch {
    return { valid: false, body: null };
  }
  const sortedJson = JSON.stringify(sortDeep(parsed));
  const expected = crypto.createHmac("sha512", IPN_SECRET).update(sortedJson).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  const valid = a.length === b.length && crypto.timingSafeEqual(a, b);
  return { valid, body: valid ? (parsed as NowPaymentsIpn) : null };
}

export type NowPaymentsIpn = {
  payment_id: number | string;
  payment_status: string; // waiting|confirming|confirmed|sending|partially_paid|finished|failed|refunded|expired
  order_id?: string;
  order_description?: string;
  price_amount?: number;
  price_currency?: string;
  pay_currency?: string;
  actually_paid?: number;
  invoice_id?: number | string;
};

function sortDeep(obj: unknown): unknown {
  if (Array.isArray(obj)) return obj.map(sortDeep);
  if (obj && typeof obj === "object") {
    const o = obj as Record<string, unknown>;
    return Object.keys(o)
      .sort()
      .reduce((acc, k) => {
        acc[k] = sortDeep(o[k]);
        return acc;
      }, {} as Record<string, unknown>);
  }
  return obj;
}

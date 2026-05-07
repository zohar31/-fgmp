import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/admin";
import { createHmac, randomBytes } from "node:crypto";

export const runtime = "nodejs";

// Diagnose Tranzila API v2 auth: try both orderings of (app_key, secret)
// and report which (if any) is accepted by api.tranzila.com.

const TRANZILA_API_BASE = "https://api.tranzila.com/v1";

async function tryAuth(appKey: string, secret: string) {
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const nonce = randomBytes(32).toString("hex");
  const accessToken = createHmac("sha256", secret + timestamp + nonce)
    .update(appKey)
    .digest("hex");

  // Tiny request that should at least pass auth before failing on body
  const body = {
    terminal_name: process.env.TRANZILA_TERMINAL || "fgmpvip",
    txn_type: "debit",
    card_number: "4580000000000000",
    expire_month: 12,
    expire_year: 2030,
    cvv: "123",
    response_language: "english",
    items: [
      {
        name: "diagnose",
        type: "I",
        unit_price: 1,
        currency_code: "ILS",
        units_number: 1,
      },
    ],
  };

  const res = await fetch(`${TRANZILA_API_BASE}/transaction/credit_card/create`, {
    method: "POST",
    headers: {
      "X-tranzila-api-app-key": appKey,
      "X-tranzila-api-request-time": timestamp,
      "X-tranzila-api-nonce": nonce,
      "X-tranzila-api-access-token": accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  return {
    httpStatus: res.status,
    bodyLength: text.length,
    bodySnippet: text.slice(0, 400),
    appKeyLen: appKey.length,
    secretLen: secret.length,
    appKeyHead: appKey.slice(0, 4),
    secretHead: secret.slice(0, 4),
    timestamp,
    nonceHead: nonce.slice(0, 8),
    accessTokenHead: accessToken.slice(0, 16),
  };
}

export async function POST() {
  const session = await auth();
  if (!isAdmin(session)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const long = process.env.TRANZILA_API_APP_KEY || "";
  const short = process.env.TRANZILA_API_SECRET || "";

  if (!long || !short) {
    return NextResponse.json({
      error: "missing env vars",
      hasAppKey: !!long,
      hasSecret: !!short,
    });
  }

  // Try both orderings
  const orderA = await tryAuth(long, short); // current: long=appKey, short=secret
  const orderB = await tryAuth(short, long); // swapped: short=appKey, long=secret

  return NextResponse.json({
    rawLengths: {
      TRANZILA_API_APP_KEY: long.length,
      TRANZILA_API_SECRET: short.length,
    },
    orderA_long_as_appKey: orderA,
    orderB_short_as_appKey: orderB,
  });
}

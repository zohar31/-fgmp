"use client";

import { useState } from "react";
import { Loader2, RotateCw, Undo2, Wrench, CalendarClock } from "lucide-react";

type ApiResult = {
  ok?: boolean;
  code?: string;
  message?: string;
  mode?: string;
  index?: string;
  confirmationCode?: string;
  invoiceIndex?: string;
  invoiceConf?: string;
  rawSnippet?: string;
  rawLength?: number;
  error?: string;
};

export function TestApiButtons() {
  const [recurringLoading, setRecurringLoading] = useState(false);
  const [recurringResult, setRecurringResult] = useState<ApiResult | null>(null);
  const [refundLoading, setRefundLoading] = useState(false);
  const [refundResult, setRefundResult] = useState<ApiResult | null>(null);
  const [diagLoading, setDiagLoading] = useState(false);
  const [diagResult, setDiagResult] = useState<unknown>(null);
  const [stoLoading, setStoLoading] = useState(false);
  const [stoResult, setStoResult] = useState<unknown>(null);

  async function testRecurring() {
    setRecurringLoading(true);
    setRecurringResult(null);
    try {
      const res = await fetch("/api/admin/billing-test/charge-recurring", {
        method: "POST",
      });
      const json = (await res.json()) as ApiResult;
      setRecurringResult(json);
    } catch {
      setRecurringResult({ error: "שגיאת רשת" });
    }
    setRecurringLoading(false);
  }

  async function testRefund() {
    setRefundLoading(true);
    setRefundResult(null);
    try {
      const res = await fetch("/api/admin/billing-test/refund-last", {
        method: "POST",
      });
      const json = (await res.json()) as ApiResult;
      setRefundResult(json);
    } catch {
      setRefundResult({ error: "שגיאת רשת" });
    }
    setRefundLoading(false);
  }

  async function createSto() {
    setStoLoading(true);
    setStoResult(null);
    try {
      const res = await fetch("/api/admin/billing-test/create-sto", {
        method: "POST",
      });
      const json = await res.json();
      setStoResult(json);
    } catch {
      setStoResult({ error: "שגיאת רשת" });
    }
    setStoLoading(false);
  }

  async function runDiagnose() {
    setDiagLoading(true);
    setDiagResult(null);
    try {
      const res = await fetch("/api/admin/billing-test/diagnose-v2", {
        method: "POST",
      });
      const json = await res.json();
      setDiagResult(json);
    } catch {
      setDiagResult({ error: "שגיאת רשת" });
    }
    setDiagLoading(false);
  }

  return (
    <div className="space-y-4">
      <div className="card border-l-4 border-sky-500 p-6">
        <h2 className="mb-2 font-display font-bold text-white">
          אבחון API v2 — בדיקת זוג מפתחות
        </h2>
        <p className="mb-5 text-sm leading-7 text-ink-200">
          מנסה את שתי האוריינטציות (long=appKey, short=secret <em>וגם</em>
          short=appKey, long=secret) ומחזיר את התשובה של Tranzila לכל אחד.
          אם אחד מהם <em>לא</em> 401 — מצאנו את ההרכב הנכון.
        </p>
        <button
          onClick={runDiagnose}
          disabled={diagLoading}
          className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-6 py-3 font-bold text-white transition hover:bg-sky-600 disabled:opacity-50"
        >
          {diagLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              מאבחן...
            </>
          ) : (
            <>
              <Wrench className="h-5 w-5" />
              אבחן מפתחות API v2
            </>
          )}
        </button>
        {diagResult !== null && (
          <pre className="mt-4 max-h-96 overflow-auto whitespace-pre-wrap break-all rounded bg-black/40 p-3 text-xs text-ink-200">
            {JSON.stringify(diagResult, null, 2)}
          </pre>
        )}
      </div>

      <div className="card border-l-4 border-fuchsia-500 p-6">
        <h2 className="mb-2 font-display font-bold text-white">
          יצירת Standing Order (My-Billing) — 5₪/חודש
        </h2>
        <p className="mb-5 text-sm leading-7 text-ink-200">
          זו <strong>הדרך הנכונה</strong> לחיובים חוזרים. רושם הוראת חיוב חודשית של 5₪
          ב-Tranzila עם הטוקן השמור — אם זה עובר, Tranzila יחייבו כל חודש לבד בלי
          שנצטרך cron. אחרי הצלחה — צריך לבטל ב-My-Billing (זה רישום אמיתי!).
        </p>
        <button
          onClick={createSto}
          disabled={stoLoading}
          className="inline-flex items-center gap-2 rounded-xl bg-fuchsia-500 px-6 py-3 font-bold text-white transition hover:bg-fuchsia-600 disabled:opacity-50"
        >
          {stoLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              יוצר STO...
            </>
          ) : (
            <>
              <CalendarClock className="h-5 w-5" />
              צור STO 5₪/חודש
            </>
          )}
        </button>
        {stoResult !== null && (
          <pre className="mt-4 max-h-96 overflow-auto whitespace-pre-wrap break-all rounded bg-black/40 p-3 text-xs text-ink-200">
            {JSON.stringify(stoResult, null, 2)}
          </pre>
        )}
      </div>

      <div className="card border-l-4 border-amber-500 p-6">
        <h2 className="mb-2 font-display font-bold text-white">
          בדיקת חיוב חוזר (API → fgmpviptok)
        </h2>
        <p className="mb-5 text-sm leading-7 text-ink-200">
          קורא ל-Tranzila API עם הטוקן השמור ומחייב 5₪. זה אותו מסלול שה-cron החודשי
          ירוץ דרכו. אם זה עובר → החיוב החודשי בעוד 30 יום מובטח.
        </p>
        <button
          onClick={testRecurring}
          disabled={recurringLoading}
          className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 font-bold text-white transition hover:bg-amber-600 disabled:opacity-50"
        >
          {recurringLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              מחייב...
            </>
          ) : (
            <>
              <RotateCw className="h-5 w-5" />
              חיוב חוזר 5₪ דרך API
            </>
          )}
        </button>
        {recurringResult && (
          <ResultBox label="חיוב" result={recurringResult} />
        )}
      </div>

      <div className="card border-l-4 border-emerald-500 p-6">
        <h2 className="mb-2 font-display font-bold text-white">
          בדיקת זיכוי דרך API (fgmpvip + REFUND_PW)
        </h2>
        <p className="mb-5 text-sm leading-7 text-ink-200">
          מזכה את חשבונית הבדיקה (5₪) האחרונה דרך ה-API. אם זה עובר → ה-IP של Vercel
          ב-whitelist של Tranzila והפלואו "ביטול + החזר אוטומטי" עובד.
        </p>
        <button
          onClick={testRefund}
          disabled={refundLoading}
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 font-bold text-white transition hover:bg-emerald-600 disabled:opacity-50"
        >
          {refundLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              מזכה...
            </>
          ) : (
            <>
              <Undo2 className="h-5 w-5" />
              זכה את 5₪ האחרונים
            </>
          )}
        </button>
        {refundResult && <ResultBox label="זיכוי" result={refundResult} />}
      </div>
    </div>
  );
}

function ResultBox({ label, result }: { label: string; result: ApiResult }) {
  const ok = result.ok === true;
  return (
    <div
      className={`mt-4 rounded-lg p-3 text-sm ${
        ok ? "bg-emerald-500/10 text-emerald-200" : "bg-rose-500/10 text-rose-200"
      }`}
    >
      <div className="font-bold">
        {label}: {ok ? "✓ הצליח" : "✗ נכשל"}
      </div>
      {result.error && <div className="mt-1">שגיאה: {result.error}</div>}
      {result.code && (
        <div className="mt-1" dir="ltr">
          Response: {result.code} {result.message ? `— ${result.message}` : ""}
        </div>
      )}
      {result.mode && (
        <div className="mt-1" dir="ltr">
          Mode: {result.mode}
        </div>
      )}
      {(result.index || result.invoiceIndex) && (
        <div className="mt-1" dir="ltr">
          Index: {result.index || result.invoiceIndex}
        </div>
      )}
      {(result.confirmationCode || result.invoiceConf) && (
        <div className="mt-1" dir="ltr">
          Conf: {result.confirmationCode || result.invoiceConf}
        </div>
      )}
      {typeof result.rawLength === "number" && (
        <div className="mt-1 opacity-70" dir="ltr">
          rawLength: {result.rawLength}
        </div>
      )}
      {result.rawSnippet ? (
        <details className="mt-2">
          <summary className="cursor-pointer text-xs opacity-70">
            Raw response
          </summary>
          <pre className="mt-1 overflow-x-auto whitespace-pre-wrap break-all rounded bg-black/30 p-2 text-xs">
            {result.rawSnippet}
          </pre>
        </details>
      ) : (
        result.rawLength === 0 && (
          <div className="mt-1 text-xs opacity-70">
            (Tranzila returned empty body — typical IP whitelist block)
          </div>
        )
      )}
    </div>
  );
}

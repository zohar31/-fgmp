import { Resend } from "resend";
import { SITE } from "./config";

const apiKey = process.env.RESEND_API_KEY;
const from = process.env.NOTIFICATIONS_FROM_EMAIL || `noreply@${SITE.domain}`;
const to = process.env.NOTIFICATIONS_TO_EMAIL || SITE.notificationEmail;

const resend = apiKey ? new Resend(apiKey) : null;

export async function sendAdminNotification(args: {
  subject: string;
  html: string;
  replyTo?: string;
}) {
  if (!resend) {
    console.warn("[email] RESEND_API_KEY missing — skipping email send");
    console.info("[email] would send:", args.subject);
    return { sent: false, reason: "no_api_key" as const };
  }

  const { error } = await resend.emails.send({
    from: `${SITE.brand} <${from}>`,
    to: [to],
    subject: args.subject,
    html: args.html,
    replyTo: args.replyTo,
  });

  if (error) {
    console.error("[email] send failed:", error);
    return { sent: false, reason: "send_failed" as const, error };
  }

  return { sent: true };
}

export function newSignupEmailHtml(args: {
  business: string;
  service: string;
  whatsapp: string;
  email: string;
  ip?: string;
  userAgent?: string;
}) {
  const escape = (s: string) =>
    s.replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!)
    );
  return `<!DOCTYPE html>
<html lang="he" dir="rtl">
<body style="font-family: -apple-system, system-ui, sans-serif; background:#f5f5f7; padding:24px;">
  <div style="max-width:560px; margin:0 auto; background:white; border-radius:16px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,0.06);">
    <div style="background:linear-gradient(135deg,#8b5cf6,#25D366); padding:24px; color:white;">
      <div style="font-size:13px; opacity:0.9;">${SITE.brand}</div>
      <div style="font-size:22px; font-weight:800; margin-top:4px;">🎉 מנוי חדש נרשם!</div>
    </div>
    <div style="padding:24px;">
      <table style="width:100%; border-collapse:collapse; font-size:15px; color:#111;">
        <tr><td style="padding:8px 0; color:#666; width:140px;">שם העסק:</td><td style="padding:8px 0; font-weight:700;">${escape(args.business)}</td></tr>
        <tr><td style="padding:8px 0; color:#666;">תיאור השירות:</td><td style="padding:8px 0;">${escape(args.service)}</td></tr>
        <tr><td style="padding:8px 0; color:#666;">וואטסאפ:</td><td style="padding:8px 0; font-weight:700;" dir="ltr">${escape(args.whatsapp)}</td></tr>
        <tr><td style="padding:8px 0; color:#666;">אימייל:</td><td style="padding:8px 0;" dir="ltr">${escape(args.email)}</td></tr>
      </table>
      <div style="margin-top:24px; padding-top:16px; border-top:1px solid #eee; font-size:12px; color:#999;">
        <div>IP: ${escape(args.ip || "-")}</div>
        <div style="word-break:break-all;">User Agent: ${escape(args.userAgent || "-")}</div>
        <div>תאריך: ${new Date().toLocaleString("he-IL", { timeZone: "Asia/Jerusalem" })}</div>
      </div>
    </div>
  </div>
</body>
</html>`;
}

import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth, signIn } from "@/lib/auth";
import { isAdmin } from "@/lib/admin";
import { Logo } from "@/components/Logo";
import { ShieldCheck } from "lucide-react";
import { isInAppWebView, isAndroid, isIOS } from "@/lib/webview";
import { SITE } from "@/lib/config";
import { WebViewWarning } from "./WebViewWarning";

export const metadata: Metadata = {
  title: "התחברות",
  description: "התחבר/י עם חשבון Google כדי להיכנס לאזור האישי",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const session = await auth();
  const params = await searchParams;
  const callbackUrl = params.callbackUrl || "/account";

  if (session?.user) redirect(isAdmin(session) ? "/admin" : callbackUrl);

  const ua = (await headers()).get("user-agent");
  if (isInAppWebView(ua)) {
    const platform = isAndroid(ua) ? "android" : isIOS(ua) ? "ios" : "other";
    return <WebViewWarning url={`${SITE.url}/login`} platform={platform} />;
  }

  return (
    <main className="flex min-h-[80vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>

        <div className="card p-8">
          <h1 className="text-center font-display text-2xl font-extrabold text-white">
            התחברות לאזור האישי
          </h1>
          <p className="mt-2 text-center text-sm text-ink-300">
            התחבר/י באמצעות חשבון Google כדי לנהל את המנוי שלך
          </p>

          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: callbackUrl });
            }}
            className="mt-8"
          >
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-white px-6 py-3.5 font-semibold text-gray-900 transition hover:bg-gray-100"
            >
              <GoogleIcon />
              <span>המשך עם Google</span>
            </button>
          </form>

          <div className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-ink-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-wa" />
              ללא סיסמה
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-wa" />
              חיבור מאובטח
            </span>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-ink-400">
          הכניסה היא גם ההרשמה — לחיצה אחת על Google ומקבלים 7 ימי ניסיון חינם
        </p>
      </div>
    </main>
  );
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

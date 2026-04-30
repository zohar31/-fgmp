import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, signOut } from "@/lib/auth";
import { Logo } from "@/components/Logo";
import {
  LayoutDashboard,
  Settings,
  MessageCircle,
  Receipt,
  Bell,
  LogOut,
  XCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: { template: "%s · אזור אישי FGMP", default: "אזור אישי FGMP" },
};

const navItems = [
  { href: "/account", label: "סטטוס", icon: LayoutDashboard },
  { href: "/account/setup", label: "הגדרות עסק", icon: Settings },
  { href: "/account/whatsapp", label: "הפעלת WhatsApp", icon: MessageCircle },
  { href: "/account/invoices", label: "חשבוניות", icon: Receipt },
  { href: "/account/notifications", label: "הודעות", icon: Bell },
  { href: "/account/cancel", label: "ביטול מנוי", icon: XCircle },
];

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/account");

  return (
    <div className="min-h-screen overflow-x-hidden bg-bg">
      <div className="container-x py-8">
        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="card h-fit p-5 lg:sticky lg:top-6">
            <div className="mb-6 flex items-center justify-between">
              <Logo />
            </div>

            <div className="mb-5 rounded-2xl bg-white/[0.04] p-3 ring-1 ring-white/5">
              <div className="flex items-center gap-3">
                {session.user.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={session.user.image}
                    alt={session.user.name || ""}
                    className="h-10 w-10 rounded-full"
                  />
                ) : (
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-brand-500 text-sm font-bold text-white">
                    {(session.user.name || session.user.email || "?")[0].toUpperCase()}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold text-white">
                    {session.user.name || "משתמש"}
                  </div>
                  <div className="truncate text-xs text-ink-400">{session.user.email}</div>
                </div>
              </div>
            </div>

            <nav className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink-200 transition hover:bg-white/5 hover:text-white"
                >
                  <item.icon className="h-4 w-4 text-brand-300" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
              className="mt-5 border-t border-white/5 pt-4"
            >
              <button
                type="submit"
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink-300 transition hover:bg-white/5 hover:text-white"
              >
                <LogOut className="h-4 w-4" />
                <span>יציאה</span>
              </button>
            </form>
          </aside>

          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}

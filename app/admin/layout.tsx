import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, signOut } from "@/lib/auth";
import { isAdmin } from "@/lib/admin";
import { Logo } from "@/components/Logo";
import { Users, FileText, LogOut, Home, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: { template: "%s · Admin", default: "Admin · FGMP" },
  robots: { index: false, follow: false },
};

const navItems = [
  { href: "/admin", label: "מנויים", icon: Users },
  { href: "/admin/reminders", label: "תזכורות", icon: Mail },
  { href: "/admin/intents", label: "Signup Intents", icon: FileText },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/admin");
  if (!isAdmin(session)) redirect("/account");

  return (
    <div className="min-h-screen bg-bg">
      <div className="container-x py-8">
        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="card h-fit p-5 lg:sticky lg:top-6">
            <div className="mb-5 flex items-center justify-between">
              <Logo />
              <span className="rounded-full bg-rose-500/15 px-2 py-0.5 text-[10px] font-bold text-rose-300 ring-1 ring-rose-500/30">
                ADMIN
              </span>
            </div>

            <div className="mb-5 rounded-2xl bg-white/[0.04] p-3 ring-1 ring-white/5">
              <div className="text-xs text-ink-400">מחובר כ:</div>
              <div className="truncate text-sm font-semibold text-white">
                {session.user.email}
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

            <div className="mt-5 space-y-1 border-t border-white/5 pt-4">
              <Link
                href="/account/setup"
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink-200 transition hover:bg-white/5 hover:text-white"
              >
                <Home className="h-4 w-4" />
                <span>צפייה כלקוח</span>
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button
                  type="submit"
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink-300 transition hover:bg-white/5 hover:text-white"
                >
                  <LogOut className="h-4 w-4" />
                  <span>יציאה</span>
                </button>
              </form>
            </div>
          </aside>

          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}

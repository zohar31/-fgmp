import type { Session } from "next-auth";

const adminEmails = (process.env.ADMIN_EMAILS || "a0545911111@gmail.com")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

export function isAdmin(session: Session | null): boolean {
  if (!session?.user?.email) return false;
  return adminEmails.includes(session.user.email.toLowerCase());
}

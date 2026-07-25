import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/admin";
import { runPageChecks } from "@/lib/seo-checks";
import { SITE } from "@/lib/config";

export const runtime = "nodejs";

// בודק URL בודד — מריץ את בדיקות ה-on-page על כל נתיב באתר.
export async function GET(req: Request) {
  const session = await auth();
  if (!isAdmin(session)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  let path = (searchParams.get("path") || "/").trim();
  if (!path.startsWith("/")) path = `/${path}`;

  // מונע יציאה מהדומיין — בודקים רק נתיבים פנימיים.
  const url = `${SITE.url}${path === "/" ? "" : path}`;

  const checks = await runPageChecks(url);
  return NextResponse.json({ url, checks });
}

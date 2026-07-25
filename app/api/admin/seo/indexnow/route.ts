import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/admin";
import { SITE } from "@/lib/config";
import { allSiteUrls } from "@/lib/site-urls";
import { INDEXNOW_KEY } from "@/lib/indexnow";

export const runtime = "nodejs";

// מגיש את כל ה-URLs של האתר ל-IndexNow (Bing/Yandex ושותפים) בבת אחת.
// מגבלת התקן: עד 10,000 URLs לבקשה — יש לנו הרבה פחות.
export async function POST() {
  const session = await auth();
  if (!isAdmin(session)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const urlList = allSiteUrls();
  const host = new URL(SITE.url).host;

  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host,
        key: INDEXNOW_KEY,
        keyLocation: `${SITE.url}/${INDEXNOW_KEY}.txt`,
        urlList,
      }),
    });

    const body = (await res.text()).slice(0, 500);
    // IndexNow מחזיר 200 או 202 בהצלחה; 403 = מפתח לא אומת; 422 = URLs לא תואמים host.
    return NextResponse.json({
      ok: res.ok,
      status: res.status,
      submitted: urlList.length,
      body,
    });
  } catch (err) {
    console.error("[indexnow] submit failed:", err);
    return NextResponse.json(
      { ok: false, error: "IndexNow submit failed", submitted: urlList.length },
      { status: 502 }
    );
  }
}

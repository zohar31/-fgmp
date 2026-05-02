import { NextResponse } from "next/server";
import { db, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const runtime = "nodejs";

const AckBody = z.object({
  status: z.enum(["delivered", "failed"]),
  error: z.string().max(500).optional(),
});

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

// POST /api/extension/pushes/[id]/ack
// התוסף מאשר חזרה שקלט push (delivered) או נכשל (failed)
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const expected = process.env.EXTENSION_API_TOKEN;
  if (!expected) {
    return NextResponse.json({ ok: false, error: "API not configured" }, { status: 503 });
  }
  const auth = req.headers.get("authorization") || "";
  const m = auth.match(/^Bearer\s+(.+)$/);
  if (!m || !constantTimeEqual(m[1], expected)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  if (!id) {
    return NextResponse.json({ ok: false, error: "Missing id" }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = AckBody.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Invalid body", details: parsed.error.issues },
      { status: 400 }
    );
  }

  const existing = await db.query.extensionPushes.findFirst({
    where: eq(schema.extensionPushes.id, id),
  });
  if (!existing) {
    return NextResponse.json({ ok: false, error: "Push not found" }, { status: 404 });
  }
  if (existing.status !== "pending") {
    // ack חוזר על אותו push — לא טעות, פשוט no-op
    return NextResponse.json({ ok: true, alreadyAcked: true, status: existing.status });
  }

  await db
    .update(schema.extensionPushes)
    .set({
      status: parsed.data.status,
      ackAt: new Date(),
      errorMessage: parsed.data.error || null,
    })
    .where(eq(schema.extensionPushes.id, id));

  return NextResponse.json({ ok: true });
}

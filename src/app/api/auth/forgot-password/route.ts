/** POST /api/auth/forgot-password: send password recovery instructions */

import { NextResponse } from "next/server";
import { validateForgot } from "@/lib/auth-validation";
import { requestPasswordReset } from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });

  const identifier = String(body.identifier ?? "").trim();
  const errors = validateForgot({ identifier });
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, errors }, { status: 422 });

  try {
    const result = await requestPasswordReset(identifier);
    if (!result.ok) return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Password reset failed:", err);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}

/** POST /api/auth/login: log in */

import { NextResponse } from "next/server";
import { validateLogin } from "@/lib/auth-validation";
import { signIn } from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });

  const data = { identifier: String(body.identifier ?? "").trim(), password: String(body.password ?? "") };

  const errors = validateLogin(data);
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, errors }, { status: 422 });

  try {
    const result = await signIn(data);
    // Same message whether the account doesn't exist or the password is wrong, so we don't reveal which accounts are registered
    if (!result.ok) return NextResponse.json({ ok: false, error: "invalid_credentials" }, { status: 401 });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Login failed:", err);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}

/** POST /api/auth/register: create a new account (beneficiary or service provider) */

import { NextResponse } from "next/server";
import { validateRegister, type RegisterData } from "@/lib/auth-validation";
import { registerUser } from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });

  // Take only the fields we expect, and make sure the values are within what's allowed
  const accountType = body.accountType === "provider" ? "provider" : "client";
  const data: RegisterData = {
    accountType,
    providerKind: accountType === "provider" ? (body.providerKind === "agency" ? "agency" : "freelancer") : undefined,
    fullName: String(body.fullName ?? "").trim(),
    email: String(body.email ?? "").trim(),
    phone: String(body.phone ?? "").trim(),
    password: String(body.password ?? ""),
    acceptTerms: body.acceptTerms === true,
  };

  const errors = validateRegister(data);
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, errors }, { status: 422 });

  try {
    const result = await registerUser(data);
    if (!result.ok) {
      return NextResponse.json(
        { ok: false, errors: { email: "يوجد حساب مسجّل بهذا البريد الإلكتروني." } },
        { status: 409 }
      );
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Register failed:", err);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}

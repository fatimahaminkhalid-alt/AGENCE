/**
 * ⚠️ Demo mode: there's no database yet.
 *
 * This file is the single place where the pages talk to "the account system".
 * The pages and API routes call these three functions only. When you connect a real database
 * (Supabase, Auth.js, Firebase...) you change the inside of these functions without touching the pages.
 *
 * Demo account for trying out login:
 *   email:    demo@agence.sa   (or phone: 0500000000)
 *   password: Agence123
 */

import type { LoginData, RegisterData } from "./auth-validation";

const DEMO_USER = {
  email: "demo@agence.sa",
  phone: "0500000000",
  password: "Agence123",
  fullName: "حساب تجريبي",
};

/** Normalize a phone number to one format so different spellings compare equal */
function normalize(identifier: string) {
  const v = identifier.trim().toLowerCase().replace(/[\s-]/g, "");
  return v.replace(/^(\+966|00966)/, "0");
}

function matchesDemo(identifier: string) {
  const v = normalize(identifier);
  return v === DEMO_USER.email || v === DEMO_USER.phone;
}

export type AuthResult = { ok: true } | { ok: false; reason: "invalid_credentials" | "not_found" | "exists" };

export async function signIn(data: LoginData): Promise<AuthResult> {
  // Later: look up the user in the database and compare the hashed password (bcrypt/argon2), then create a session
  if (matchesDemo(data.identifier) && data.password === DEMO_USER.password) return { ok: true };
  return { ok: false, reason: "invalid_credentials" };
}

export async function registerUser(data: RegisterData): Promise<AuthResult> {
  // Later: check the email isn't taken, hash the password, and save the account in the database
  if (matchesDemo(data.email)) return { ok: false, reason: "exists" };
  console.log("👤 New account (demo mode):", {
    accountType: data.accountType,
    providerKind: data.providerKind,
    fullName: data.fullName,
    email: data.email,
    phone: data.phone,
  });
  return { ok: true };
}

export async function requestPasswordReset(identifier: string): Promise<AuthResult> {
  // Later: create a one-time reset link and send it by email or SMS
  if (!matchesDemo(identifier)) return { ok: false, reason: "not_found" };
  console.log("🔑 Password reset instructions sent (demo mode) to:", identifier);
  return { ok: true };
}

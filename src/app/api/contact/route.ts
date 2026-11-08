/**
 * API route: receives contact-form messages on the server.
 * Address: POST /api/contact
 *
 * Why validate again here even though we validate in the browser?
 * Because anyone can send a request directly without going through the form, so the server is the real protection.
 */

import { NextResponse } from "next/server";
import { emptyContact, inquiryTypes, validateContact, type ContactData } from "@/lib/contact";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Spam trap: if the hidden field is filled, it's a bot. We return "success" without sending anything.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  // Take only the fields we expect, and ignore anything else
  const data = Object.fromEntries(
    (Object.keys(emptyContact) as (keyof ContactData)[]).map((k) => [k, String(body[k] ?? "").trim()])
  ) as ContactData;

  const errors = validateContact(data);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const typeLabel = inquiryTypes.find((t) => t.value === data.inquiryType)?.label ?? data.inquiryType;

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  // Development mode: no email settings, so we print the message in the terminal only
  if (!apiKey || !to || !from) {
    console.log("📩 New contact message (email not configured):", { ...data, inquiryType: typeLabel });
    return NextResponse.json({ ok: true, mode: "log" });
  }

  // Send by email through Resend (it needs no extra package; it's a direct HTTP request)
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to,
        reply_to: data.email,
        subject: `[AGENCE] ${typeLabel}: ${data.subject || "رسالة جديدة"}`,
        text: [
          `الاسم: ${data.fullName}`,
          `البريد: ${data.email}`,
          `الجوال: ${data.phone}`,
          `نوع الاستفسار: ${typeLabel}`,
          `العنوان: ${data.subject || "-"}`,
          "",
          data.message,
        ].join("\n"),
      }),
    });

    if (!res.ok) {
      console.error("Resend error:", res.status, await res.text());
      return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact send failed:", err);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
}

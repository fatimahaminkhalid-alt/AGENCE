/**
 * A small helper for sending data from forms to the API routes.
 * It returns the response status and its data, and never throws: an internet outage comes back as status 0.
 */
export async function postJson<T = Record<string, unknown>>(url: string, body: unknown) {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = (await res.json().catch(() => ({}))) as T;
    return { status: res.status, ok: res.ok, data };
  } catch {
    return { status: 0, ok: false, data: {} as T };
  }
}

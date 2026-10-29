import { NextResponse } from "next/server";
// Validates the inquiry and forwards it to INQUIRY_WEBHOOK_URL (e.g. a form service). Without it, nothing is sent and we say so.
export async function POST(req: Request) {
  let b: Record<string, string>;
  try { b = await req.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  if (!b.name?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email ?? "") || (b.message ?? "").trim().length < 10) return NextResponse.json({ error: "Please complete the required fields." }, { status: 400 });
  const url = process.env.INQUIRY_WEBHOOK_URL;
  if (!url) return NextResponse.json({ error: "Online sending isn't set up yet. Please email us directly using the address shown here." }, { status: 503 });
  try { const r = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(b) }); if (!r.ok) throw new Error(); }
  catch { return NextResponse.json({ error: "We couldn't deliver your inquiry. Please try again." }, { status: 502 }); }
  return NextResponse.json({ message: "Thanks! Your project inquiry has been received." });
}

import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";
import { SERVICES } from "@/lib/constants";

export const runtime = "nodejs";

const MAX_FIELD_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 5000;

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Please submit a valid inquiry." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Please submit a valid inquiry." }, { status: 400 });
  }

  const data = body as Record<string, unknown>;
  const name = typeof data.name === "string" ? data.name.trim() : "";
  const businessName = typeof data.businessName === "string" ? data.businessName.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim() : "";
  const service = typeof data.service === "string" ? data.service.trim() : "";
  const message = typeof data.message === "string" ? data.message.trim() : "";

  if (!name || name.length > MAX_FIELD_LENGTH) {
    return NextResponse.json({ error: "Name is required and must be 200 characters or fewer." }, { status: 400 });
  }
  if (email.length > MAX_FIELD_LENGTH || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (businessName.length > MAX_FIELD_LENGTH) {
    return NextResponse.json({ error: "Business name must be 200 characters or fewer." }, { status: 400 });
  }
  if (!SERVICES.some((item) => item.name === service)) {
    return NextResponse.json({ error: "Please choose one of the listed services." }, { status: 400 });
  }
  if (message.length < 10 || message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json({ error: "Project details must be between 10 and 5,000 characters." }, { status: 400 });
  }

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    return NextResponse.json({ error: "Inquiry storage is not configured yet. Please try again later." }, { status: 503 });
  }

  try {
    const sql = neon(databaseUrl);
    await sql`
      CREATE TABLE IF NOT EXISTS project_inquiries (
        id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        name VARCHAR(200) NOT NULL,
        business_name VARCHAR(200),
        email VARCHAR(200) NOT NULL,
        service VARCHAR(200) NOT NULL,
        message TEXT NOT NULL,
        status VARCHAR(30) NOT NULL DEFAULT 'new',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;

    await sql`
      INSERT INTO project_inquiries (name, business_name, email, service, message)
      VALUES (${name}, ${businessName || null}, ${email}, ${service}, ${message})
    `;

    return NextResponse.json({ message: "Thanks! Your project inquiry has been received." }, { status: 201 });
  } catch (error) {
    console.error("Unable to save project inquiry:", error);
    return NextResponse.json({ error: "We couldn't save your inquiry just now. Please try again shortly." }, { status: 500 });
  }
}

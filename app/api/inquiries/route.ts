import { NextResponse } from "next/server";
import { addInquiry } from "@/lib/inquiries";

export async function POST(req: Request) {
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
  }

  const name = body.name?.trim() || "";
  const email = body.email?.trim() || "";
  const businessName = body.businessName?.trim() || "";
  const service = body.service || "Business Websites";
  const message = body.message?.trim() || "";

  if (!name) {
    return NextResponse.json({ error: "Please provide your name." }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  if (message.length < 10) {
    return NextResponse.json(
      { error: "Please enter at least 10 characters describing your project." },
      { status: 400 }
    );
  }

  try {
    // 1. Store the submission into our table with timestamp
    const saved = await addInquiry({
      name,
      businessName,
      email,
      service,
      message,
    });

    // 2. Optionally forward to external webhook if configured
    const webhookUrl = process.env.INQUIRY_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(saved),
        });
      } catch (err) {
        console.warn("External webhook delivery notice:", err);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Thanks! Your project inquiry has been received.",
      inquiry: saved,
    });
  } catch (error) {
    console.error("Failed to store inquiry:", error);
    return NextResponse.json(
      { error: "Could not save your inquiry. Please try again." },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { getInquiries, updateInquiryStatus, deleteInquiry } from "@/lib/inquiries";

export async function GET() {
  try {
    const messages = await getInquiries();
    return NextResponse.json({ messages });
  } catch {
    return NextResponse.json({ error: "Failed to fetch messages." }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, status } = await req.json();
    if (!id || !["received", "contacted"].includes(status)) {
      return NextResponse.json({ error: "Invalid ID or status." }, { status: 400 });
    }

    const updated = await updateInquiryStatus(id, status);
    if (!updated) {
      return NextResponse.json({ error: "Inquiry not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, inquiry: updated });
  } catch {
    return NextResponse.json({ error: "Failed to update inquiry." }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Inquiry ID is required." }, { status: 400 });
    }

    const deleted = await deleteInquiry(id);
    if (!deleted) {
      return NextResponse.json({ error: "Inquiry not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete inquiry." }, { status: 500 });
  }
}

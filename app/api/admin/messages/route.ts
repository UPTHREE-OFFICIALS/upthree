import { NextResponse } from "next/server";

// Simulated contact-support messages. In a real app this would be a database/persistence layer.
const MESSAGES = [
  {
    id: "msg_001",
    name: "Alex Morgan",
    businessName: "Northstar Studio",
    email: "alex@example.com",
    service: "Business Websites",
    message: "I need a modern website to introduce my business, showcase my services, and make it easy for new customers to get in touch.",
    status: "received" as const,
    createdAt: "2026-10-29T09:14:00Z",
  },
  {
    id: "msg_002",
    name: "Jordan Lee",
    businessName: "Lumina Cafe",
    email: "jordan@lumina.cafe",
    service: "Business Websites",
    message: "Our current site is outdated and slow. We'd like a fresh brand-focused redesign with an online menu.",
    status: "contacted" as const,
    createdAt: "2026-10-29T08:05:00Z",
  },
  {
    id: "msg_003",
    name: "Samira Patel",
    businessName: "Patel Wellness",
    email: "hello@patelwellness.in",
    service: "Online Booking & Appointments",
    message: "We need a simple online booking widget for our therapy sessions. Minimum 2 staff members to manage bookings.",
    status: "contacted" as const,
    createdAt: "2026-10-28T16:42:00Z",
  },
  {
    id: "msg_004",
    name: "Marcus Chen",
    businessName: "Oak & Co.",
    email: "marcus@oakco.design",
    service: "Business Tools & Dashboards",
    message: "Looking for a B2B dashboard with role-based access and weekly reporting. Please send a full quote.",
    status: "contacted" as const,
    createdAt: "2026-10-28T11:20:00Z",
  },
] as const;

export async function GET() {
  return NextResponse.json({ messages: MESSAGES });
}

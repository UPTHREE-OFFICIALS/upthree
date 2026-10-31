import fs from "fs/promises";
import path from "path";

export type Inquiry = {
  id: string;
  name: string;
  businessName: string;
  email: string;
  service: string;
  message: string;
  status: "received" | "contacted";
  createdAt: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "inquiries.json");

const SEED_INQUIRIES: Inquiry[] = [
  {
    id: "inq_001",
    name: "Alex Morgan",
    businessName: "Northstar Studio",
    email: "alex@example.com",
    service: "Business Websites",
    message: "I need a modern website to introduce my business, showcase our architecture portfolio, and make it easy for clients to request quotes.",
    status: "received",
    createdAt: "2026-10-31T14:15:00.000Z",
  },
  {
    id: "inq_002",
    name: "Jordan Lee",
    businessName: "Lumina Cafe",
    email: "jordan@lumina.cafe",
    service: "Online Booking & Appointments",
    message: "We need an integrated table and tasting event reservation widget with automated email reminders for guests.",
    status: "contacted",
    createdAt: "2026-10-30T10:45:00.000Z",
  },
  {
    id: "inq_003",
    name: "Samira Patel",
    businessName: "Patel Wellness",
    email: "hello@patelwellness.in",
    service: "Online Stores",
    message: "Looking to sell herbal wellness blends online with Stripe & UPI payments. Need product catalog and shipping calculations.",
    status: "contacted",
    createdAt: "2026-10-29T18:20:00.000Z",
  },
  {
    id: "inq_004",
    name: "Marcus Chen",
    businessName: "Oak & Co.",
    email: "marcus@oakco.design",
    service: "Business Tools & Dashboards",
    message: "Looking for an internal B2B order and client tracker with role-based access for our 4-person design team.",
    status: "received",
    createdAt: "2026-10-28T09:30:00.000Z",
  },
];

async function ensureFile(): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      await fs.access(DATA_FILE);
    } catch {
      await fs.writeFile(DATA_FILE, JSON.stringify(SEED_INQUIRIES, null, 2), "utf8");
    }
  } catch (error) {
    console.error("Error ensuring inquiries file:", error);
  }
}

export async function getInquiries(): Promise<Inquiry[]> {
  await ensureFile();
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    const data = JSON.parse(raw) as Inquiry[];
    return Array.isArray(data)
      ? data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      : [];
  } catch (error) {
    console.error("Error reading inquiries:", error);
    return SEED_INQUIRIES;
  }
}

export async function addInquiry(data: {
  name: string;
  businessName?: string;
  email: string;
  service: string;
  message: string;
}): Promise<Inquiry> {
  await ensureFile();
  const inquiries = await getInquiries();
  const newInquiry: Inquiry = {
    id: `inq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: data.name.trim(),
    businessName: (data.businessName || "").trim(),
    email: data.email.trim().toLowerCase(),
    service: data.service || "Business Websites",
    message: data.message.trim(),
    status: "received",
    createdAt: new Date().toISOString(),
  };

  const updated = [newInquiry, ...inquiries];
  await fs.writeFile(DATA_FILE, JSON.stringify(updated, null, 2), "utf8");
  return newInquiry;
}

export async function updateInquiryStatus(id: string, status: "received" | "contacted"): Promise<Inquiry | null> {
  await ensureFile();
  const inquiries = await getInquiries();
  const index = inquiries.findIndex((item) => item.id === id);
  if (index === -1) return null;

  inquiries[index].status = status;
  await fs.writeFile(DATA_FILE, JSON.stringify(inquiries, null, 2), "utf8");
  return inquiries[index];
}

export async function deleteInquiry(id: string): Promise<boolean> {
  await ensureFile();
  const inquiries = await getInquiries();
  const filtered = inquiries.filter((item) => item.id !== id);
  if (filtered.length === inquiries.length) return false;

  await fs.writeFile(DATA_FILE, JSON.stringify(filtered, null, 2), "utf8");
  return true;
}

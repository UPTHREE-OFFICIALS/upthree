"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, MessageCircle, Users, FileText, Calendar, ChevronRight, LayoutDashboard } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Modal from "@/components/ui/Modal";

type Message = {
  id: string;
  name: string;
  businessName: string;
  email: string;
  subject: string;
  message: string;
  status: "received" | "contacted";
  createdAt: string;
};

const STATIC_DATA = {
  activeProjects: [
    { name: "Lumina Cafe — Booking widget", tag: "Booking", days: 4 },
    { name: "Oak & Co — SaaS dashboard", tag: "Dashboard", days: 7 },
    { name: "Northstar Studio — Website redesign", tag: "Website", days: 12 },
  ],
  team: [
    { name: "Chief Creative", role: "Brand & strategy", initials: "DC" },
    { name: "Lead Developer", role: "Engineering", initials: "RJ" },
    { name: "Design Lead", role: "UI/UX", initials: "AP" },
    { name: "Support Coordinator", role: "Client success", initials: "SL" },
  ],
};

const STATUS_LABEL: Record<string, string> = {
  received: "Received",
  contacted: "Contacted",
};

const STATUS_BADGE: Record<string, string> = {
  received: "bg-soft text-brand",
  contacted: "bg-brand/10 text-brand",
};

export default function AdminDashboardPage() {
  const reduce = !!useReducedMotion();
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<Message | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.localStorage !== "undefined") {
      const loggedIn = window.localStorage.getItem("upthree_admin_logged_in");
      if (loggedIn !== "1") router.push("/admin/login");
    }
  }, [router]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/admin/messages");
        if (res.ok) {
          const data = await res.json();
          setMessages(data.messages ?? []);
        }
      } catch {
        setMessages([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const contacted = messages.filter((m) => m.status === "contacted");

  return (
    <div className="min-h-screen bg-smoke text-ink">
      <aside className="fixed inset-0 z-20 bg-[#090a0c]" />
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-line bg-smoke/90 px-4 backdrop-blur lg:px-6">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 text-ink/70 transition hover:text-ink">
            <ArrowLeft size={16} />
            <span className="text-sm font-medium">Back to site</span>
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <Link href="/" className="rounded-full border border-line px-4 py-1.5 text-sm text-mute hover:text-ink transition">
              Site
            </Link>
            <Link href="/admin/login" className="rounded-full border border-line px-4 py-1.5 text-sm text-mute hover:text-ink transition">
              Log out
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-20 pb-16 pl-20 lg:pl-28">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-6xl mx-auto space-y-8"
        >
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-brand">Admin panel</p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">Dashboard</h1>
              <p className="mt-2 max-w-xl text-sm text-mute">Overview of active projects, the team, and recent contact-support messages.</p>
            </div>
            <div className="flex gap-2">
              <Link href="/admin/login" className="rounded-full border border-line px-4 py-2 text-sm font-medium text-mute hover:text-ink transition">
                <span className="flex items-center gap-1.5"><LayoutDashboard size={15} /> Admin login</span>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Total messages", value: messages.length, tone: "brand" },
              { label: "Contacted", value: contacted.length, tone: "success" },
              { label: "Active projects", value: STATIC_DATA.activeProjects.length, tone: "accent" },
              { label: "Team members", value: STATIC_DATA.team.length, tone: "muted" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-line bg-surface p-5">
                <div className={`mb-2 flex h-9 w-9 items-center justify-center rounded-full ${s.tone === "brand" ? "bg-brand/10 text-brand" : s.tone === "success" ? "bg-green-500/10 text-green-600" : s.tone === "accent" ? "bg-amber-500/10 text-amber-600" : "bg-mute/10 text-mute"}`}>
                  {s.tone === "brand" && <MessageCircle size={16} />}
                  {s.tone === "success" && <FileText size={16} />}
                  {s.tone === "accent" && <Users size={16} />}
                  {s.tone === "muted" && <Calendar size={16} />}
                </div>
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-xs text-mute">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Active projects + Team side by side */}
          <div className="grid gap-6 lg:grid-cols-2">
            <SectionCard
              title="Active projects"
              headerAction={<Link href="/projects" className="inline-flex items-center gap-1 font-medium text-brand">View all <ChevronRight size={14} /></Link>}
            >
              <ul className="space-y-3">
                {STATIC_DATA.activeProjects.map((p) => (
                  <li key={p.name} className="flex items-center justify-between gap-3 border-b border-line pb-3 last:border-0 last:pb-0">
                    <div>
                      <p className="font-medium text-ink">{p.name}</p>
                      <p className="text-xs text-mute">{p.tag} · {p.days} days</p>
                    </div>
                    <ArrowRight size={16}className="text-mute" />
                  </li>
                ))}
              </ul>
            </SectionCard>

            <SectionCard
              title="Design & build team"
              headerAction={<Link href="/admin/team" className="inline-flex items-center gap-1 font-medium text-brand">Team roster <ChevronRight size={14} /></Link>}
            >
              <ul className="space-y-3">
                {STATIC_DATA.team.map((t) => (
                  <li key={t.role} className="flex items-center gap-3">
                    <div className="grid h-9 w-9 place-items-center rounded-full bg-brand/10 text-xs font-bold text-brand">{t.initials}</div>
                    <div>
                      <p className="font-medium text-ink">{t.name}</p>
                      <p className="text-xs text-mute">{t.role}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </SectionCard>
          </div>

          {/* Contact-Support tab */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Contact-Support tab */}
            <div className="rounded-2xl border border-line bg-surface overflow-hidden">
              <div className="flex items-center justify-between border-b border-line px-5 py-4">
                <div className="flex items-center gap-2">
                  <MessageCircle size={16} className="text-brand" />
                  <div>
                    <h2 className="font-semibold">Contact-Support</h2>
                    <p className="text-xs text-mute">Contacted messages</p>
                  </div>
                </div>
                <span className="rounded-full bg-brand/10 px-2.5 py-0.5 text-[10px] font-semibold text-brand">
                  {contacted.length} new
                </span>
              </div>

              {loading ? (
                <div className="flex items-center gap-2 rounded-b-2xl border border-line bg-surface p-8 text-sm text-mute">
                  <span className="h-3 w-3 animate-pulse rounded-full bg-mute" /> Loading messages...
                </div>
              ) : contacted.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <MessageCircle size={28} className="text-mute" />
                  <p className="mt-3 font-medium text-ink">No contacted messages yet</p>
                  <p className="text-sm text-mute">Messages from visitors will appear here.</p>
                </div>
              ) : (
                <ul className="max-h-[520px] overflow-y-autodivide-y border-border divide-solid">
                  {contacted.map((m) => (
                    <li key={m.id}>
                      <button
                        onClick={() => { setSelected(m); setModalOpen(true); }}
                        className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-smoke"
                      >
                        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand/10 text-xs font-bold text-brand">{m.name.charAt(0)}</div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-ink truncate">{m.name}</p>
                          <p className="text-xs text-mute truncate">{m.businessName} · {m.email}</p>
                        </div>
                        <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${STATUS_BADGE[m.status]}`}>
                          {STATUS_LABEL[m.status]}
                        </span>
                        <ChevronRight size={14} className="text-mute" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Recent messages / other stats */}
            <div className="space-y-6">
              <SectionCard
                title="Recent messages"
                headerAction={<Link href="#contact" className="inline-flex items-center gap-1 font-medium text-brand">All messages <ChevronRight size={14} /></Link>}
              >
                <ul className="space-y-2">
                  {contacted.slice(0, 3).map((m) => (
                    <li key={m.id} className="flex items-start gap-2 rounded-lg border border-line p-2">
                      <MessageCircle size={13} className="mt-0.5 text-brand" />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-ink">{m.subject}</p>
                        <p className="text-xs text-mute truncate">{m.name} · {m.email}</p>
                      </div>
                    </li>
                  ))}
                  {contacted.length === 0 && <li className="text-sm text-mute">No messages yet.</li>}
                </ul>
              </SectionCard>                <SectionCard
                title="Support summary"
                headerAction={<LayoutDashboard size={15} className="text-brand" />}
              >
                <ul className="space-y-2 text-sm text-mute">
                  <li className="flex justify-between"><span>Messages received</span><span className="font-medium text-ink">{messages.length}</span></li>
                  <li className="flex justify-between"><span>Contacted for follow-up</span><span className="font-medium text-brand">{contacted.length}</span></li>
                  <li className="flex justify-between"><span>Pending reply</span><span className="font-medium text-mute">{messages.filter((m) => m.status === "received").length}</span></li>
                </ul>
              </SectionCard>
            </div>
          </div>
        </motion.div>

        <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Message details">
          {selected && (
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-brand/10 text-sm font-bold text-brand">{selected.name.charAt(0)}</div>
                <div>
                  <p className="font-semibold">{selected.name}</p>
                  <p className="text-sm text-mute">{selected.businessName}</p>
                  <p className="text-sm text-mute">{selected.email}</p>
                  <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${STATUS_BADGE[selected.status]}`}>{STATUS_LABEL[selected.status]}</span>
                </div>
              </div>
              <div className="rounded-lg bg-smoke/70 p-3">
                <p className="text-xs font-semibold text-ink/70">Subject</p>
                <p className="font-medium text-ink">{selected.subject}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-ink/70">Message</p>
                <p className="text-sm leading-6 text-mute">{selected.message}</p>
              </div>
              <div className="flex justify-end gap-2 border-t border-line pt-3">
                <button onClick={() => setModalOpen(false)} className="rounded-full px-4 py-2 text-sm font-medium text-mute hover:text-ink transition">Close</button>
                <button className="rounded-full bg-brand px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition">Reply</button>
              </div>
            </div>
          )}
        </Modal>
      </main>
    </div>
  );
}

function SectionCard({ title, headerAction, children }: { title: string; headerAction?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-ink">{title}</h3>
        {headerAction}
      </div>
      <div className="mt-3 border-t border-line pt-3">{children}</div>
    </div>
  );
}

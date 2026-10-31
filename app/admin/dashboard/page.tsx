"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  Eye,
  FileText,
  Filter,
  Inbox,
  LayoutDashboard,
  LogOut,
  Mail,
  MessageCircle,
  RefreshCw,
  Search,
  Sparkles,
  Trash2,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Modal from "@/components/ui/Modal";

type Message = {
  id: string;
  name: string;
  businessName: string;
  email: string;
  service: string;
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

function formatTimestamp(isoString: string): { formatted: string; relative: string } {
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return { formatted: "Unknown", relative: "" };

    const formatted = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const diffMs = Date.now() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    let relative = "just now";
    if (diffDays > 0) relative = `${diffDays}d ago`;
    else if (diffHours > 0) relative = `${diffHours}h ago`;
    else if (diffMins > 0) relative = `${diffMins}m ago`;

    return { formatted, relative };
  } catch {
    return { formatted: isoString, relative: "" };
  }
}

export default function AdminDashboardPage() {
  const reduce = !!useReducedMotion();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"overview" | "submissions">("overview");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<Message | null>(null);

  // Filters for submissions table
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "received" | "contacted">("all");

  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.localStorage !== "undefined") {
      const loggedIn = window.localStorage.getItem("upthree_admin_logged_in");
      if (loggedIn !== "1") {
        router.push("/admin/login");
      }
    }
  }, [router]);

  async function loadMessages() {
    try {
      setRefreshing(true);
      const res = await fetch("/api/admin/messages");
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages ?? []);
      }
    } catch {
      setMessages([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadMessages();
  }, []);

  function handleLogout() {
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.removeItem("upthree_admin_logged_in");
    }
    router.push("/admin/login");
  }

  async function toggleStatus(inquiry: Message) {
    const nextStatus = inquiry.status === "received" ? "contacted" : "received";
    try {
      const res = await fetch("/api/admin/messages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: inquiry.id, status: nextStatus }),
      });
      if (res.ok) {
        setMessages((prev) =>
          prev.map((m) => (m.id === inquiry.id ? { ...m, status: nextStatus } : m))
        );
        if (selected?.id === inquiry.id) {
          setSelected((prev) => (prev ? { ...prev, status: nextStatus } : null));
        }
      }
    } catch (err) {
      console.error("Failed to toggle status:", err);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this submission?")) return;
    try {
      const res = await fetch("/api/admin/messages", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
        if (selected?.id === id) {
          setModalOpen(false);
          setSelected(null);
        }
      }
    } catch (err) {
      console.error("Failed to delete inquiry:", err);
    }
  }

  const filteredMessages = useMemo(() => {
    return messages.filter((m) => {
      const matchesStatus = statusFilter === "all" || m.status === statusFilter;
      const query = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !query ||
        m.name.toLowerCase().includes(query) ||
        m.email.toLowerCase().includes(query) ||
        m.businessName.toLowerCase().includes(query) ||
        m.service.toLowerCase().includes(query) ||
        m.message.toLowerCase().includes(query);

      return matchesStatus && matchesQuery;
    });
  }, [messages, statusFilter, searchQuery]);

  const receivedCount = messages.filter((m) => m.status === "received").length;
  const contactedCount = messages.filter((m) => m.status === "contacted").length;

  return (
    <div className="min-h-screen bg-smoke text-ink flex flex-col">
      {/* Dedicated Admin Header (Zero Marketing Header) */}
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-line bg-surface/90 px-4 backdrop-blur lg:px-8">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-mute transition hover:text-brand"
          >
            <ArrowLeft size={15} />
            <span>View Website</span>
          </Link>
          <span className="hidden h-4 w-px bg-line sm:block" />
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold tracking-wider text-ink">UPTHREE</span>
            <span className="rounded-full bg-brand/10 px-2 py-0.5 text-[10px] font-semibold text-brand">
              Admin Portal
            </span>
          </div>
        </div>

        {/* Tab Navigation Controls */}
        <div className="flex items-center gap-1 rounded-full border border-line bg-smoke p-1">
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition ${
              activeTab === "overview"
                ? "bg-brand text-white shadow-sm"
                : "text-mute hover:text-ink"
            }`}
          >
            <LayoutDashboard size={14} />
            <span>Overview</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("submissions")}
            className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition ${
              activeTab === "submissions"
                ? "bg-brand text-white shadow-sm"
                : "text-mute hover:text-ink"
            }`}
          >
            <Inbox size={14} />
            <span>Submissions</span>
            {receivedCount > 0 && (
              <span
                className={`ml-1 grid h-4 min-w-4 place-items-center rounded-full px-1 text-[9px] font-bold ${
                  activeTab === "submissions" ? "bg-white text-brand" : "bg-brand text-white"
                }`}
              >
                {receivedCount}
              </span>
            )}
          </button>
        </div>

        {/* Right Tools */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={loadMessages}
            disabled={refreshing}
            title="Refresh submissions"
            className="grid h-9 w-9 place-items-center rounded-full border border-line bg-surface text-mute transition hover:border-brand hover:text-ink disabled:opacity-50"
          >
            <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-1.5 rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-medium text-mute transition hover:border-red-500/40 hover:text-red-500"
          >
            <LogOut size={13} />
            <span>Log out</span>
          </button>
        </div>
      </header>

      {/* Main Admin Content */}
      <main className="flex-1 px-4 py-8 lg:px-8">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mx-auto max-w-6xl space-y-6"
        >
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Header Title */}
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand">Dashboard</p>
                  <h1 className="mt-1 text-2xl font-bold tracking-tight text-ink sm:text-3xl">Operations & Inquiries</h1>
                  <p className="mt-1 text-xs text-mute sm:text-sm">
                    Live overview of active project statuses, team members, and incoming leads.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab("submissions")}
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-xs font-medium text-white shadow-card transition hover:opacity-90"
                >
                  <Inbox size={14} />
                  <span>View All Inquiries ({messages.length})</span>
                </button>
              </div>

              {/* KPI Stat Cards */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-2xl border border-line bg-surface p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-mute">Total Submissions</span>
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand/10 text-brand">
                      <Inbox size={16} />
                    </span>
                  </div>
                  <p className="mt-3 text-3xl font-bold text-ink">{messages.length}</p>
                  <p className="mt-1 text-[11px] text-mute">Stored in database</p>
                </div>

                <div className="rounded-2xl border border-line bg-surface p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-mute">Pending Reply</span>
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-amber-500/10 text-amber-500">
                      <Clock size={16} />
                    </span>
                  </div>
                  <p className="mt-3 text-3xl font-bold text-ink">{receivedCount}</p>
                  <p className="mt-1 text-[11px] text-amber-500 font-medium">Needs follow-up</p>
                </div>

                <div className="rounded-2xl border border-line bg-surface p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-mute">Contacted</span>
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-500/10 text-emerald-600">
                      <CheckCircle2 size={16} />
                    </span>
                  </div>
                  <p className="mt-3 text-3xl font-bold text-ink">{contactedCount}</p>
                  <p className="mt-1 text-[11px] text-emerald-600 font-medium">In conversation</p>
                </div>

                <div className="rounded-2xl border border-line bg-surface p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-mute">Active Projects</span>
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-blue-500/10 text-blue-500">
                      <FileText size={16} />
                    </span>
                  </div>
                  <p className="mt-3 text-3xl font-bold text-ink">{STATIC_DATA.activeProjects.length}</p>
                  <p className="mt-1 text-[11px] text-mute">In build phase</p>
                </div>
              </div>

              {/* Active Projects & Team */}
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Active Projects */}
                <div className="rounded-2xl border border-line bg-surface p-5 shadow-sm">
                  <div className="flex items-center justify-between border-b border-line pb-3">
                    <h3 className="font-semibold text-ink">Active Client Projects</h3>
                    <span className="text-xs font-medium text-brand">3 in progress</span>
                  </div>
                  <ul className="mt-4 space-y-3">
                    {STATIC_DATA.activeProjects.map((p) => (
                      <li
                        key={p.name}
                        className="flex items-center justify-between gap-3 rounded-xl border border-line/70 bg-smoke/40 p-3"
                      >
                        <div>
                          <p className="text-sm font-semibold text-ink">{p.name}</p>
                          <p className="mt-0.5 text-xs text-mute">
                            Category: {p.tag} · Sprint Day {p.days}
                          </p>
                        </div>
                        <span className="rounded-full bg-soft px-2.5 py-1 text-[10px] font-semibold text-brand">
                          Active
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Team Roster */}
                <div className="rounded-2xl border border-line bg-surface p-5 shadow-sm">
                  <div className="flex items-center justify-between border-b border-line pb-3">
                    <h3 className="font-semibold text-ink">Studio Team</h3>
                    <span className="text-xs text-mute">4 Members</span>
                  </div>
                  <ul className="mt-4 space-y-3">
                    {STATIC_DATA.team.map((t) => (
                      <li key={t.name} className="flex items-center gap-3">
                        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand/10 text-xs font-bold text-brand">
                          {t.initials}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-ink">{t.name}</p>
                          <p className="text-xs text-mute">{t.role}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Recent Inquiries Preview */}
              <div className="rounded-2xl border border-line bg-surface p-5 shadow-sm">
                <div className="flex items-center justify-between border-b border-line pb-3">
                  <div>
                    <h3 className="font-semibold text-ink">Recent Inquiries</h3>
                    <p className="text-xs text-mute">Latest submissions from the website contact form</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab("submissions")}
                    className="text-xs font-medium text-brand hover:underline"
                  >
                    View All in Table →
                  </button>
                </div>

                {loading ? (
                  <div className="py-8 text-center text-xs text-mute">Loading submissions...</div>
                ) : messages.length === 0 ? (
                  <div className="py-8 text-center text-xs text-mute">No contact inquiries yet.</div>
                ) : (
                  <div className="mt-4 divide-y divide-line">
                    {messages.slice(0, 4).map((m) => {
                      const { formatted, relative } = formatTimestamp(m.createdAt);
                      return (
                        <div
                          key={m.id}
                          className="flex flex-col justify-between gap-3 py-3 sm:flex-row sm:items-center"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-ink">{m.name}</span>
                              {m.businessName && (
                                <span className="text-xs text-mute">({m.businessName})</span>
                              )}
                              <span
                                className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${
                                  m.status === "received"
                                    ? "bg-amber-500/15 text-amber-600"
                                    : "bg-emerald-500/15 text-emerald-600"
                                }`}
                              >
                                {m.status === "received" ? "New" : "Contacted"}
                              </span>
                            </div>
                            <p className="mt-1 text-xs text-mute line-clamp-1">{m.message}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-[11px] text-mute whitespace-nowrap">
                              {relative || formatted}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                setSelected(m);
                                setModalOpen(true);
                              }}
                              className="rounded-full border border-line bg-smoke px-3 py-1 text-xs font-medium text-ink transition hover:border-brand"
                            >
                              Inspect
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: CONTACT FORM SUBMISSIONS TABLE */}
          {activeTab === "submissions" && (
            <div className="space-y-6">
              {/* Header Title & Controls */}
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand">Contact Form</p>
                  <h1 className="mt-1 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                    Client Inquiries & Submissions
                  </h1>
                  <p className="mt-1 text-xs text-mute sm:text-sm">
                    All inquiries submitted through the website, stored chronologically with full timestamps.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={loadMessages}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3.5 py-2 text-xs font-medium text-ink transition hover:border-brand"
                  >
                    <RefreshCw size={13} className={refreshing ? "animate-spin" : ""} />
                    <span>Sync</span>
                  </button>
                </div>
              </div>

              {/* Filter & Search Bar */}
              <div className="flex flex-col gap-3 rounded-2xl border border-line bg-surface p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                {/* Status Chips */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setStatusFilter("all")}
                    className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                      statusFilter === "all"
                        ? "bg-brand text-white"
                        : "border border-line bg-smoke text-mute hover:text-ink"
                    }`}
                  >
                    All ({messages.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatusFilter("received")}
                    className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                      statusFilter === "received"
                        ? "bg-amber-500 text-white"
                        : "border border-line bg-smoke text-mute hover:text-ink"
                    }`}
                  >
                    Received / New ({receivedCount})
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatusFilter("contacted")}
                    className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                      statusFilter === "contacted"
                        ? "bg-emerald-600 text-white"
                        : "border border-line bg-smoke text-mute hover:text-ink"
                    }`}
                  >
                    Contacted ({contactedCount})
                  </button>
                </div>

                {/* Search Field */}
                <div className="relative w-full sm:w-72">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-mute" />
                  <input
                    type="text"
                    placeholder="Search name, email, service..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-xl border border-line bg-smoke/80 py-2 pl-9 pr-3 text-xs text-ink outline-none transition placeholder:text-mute focus:border-brand focus:bg-surface"
                  />
                </div>
              </div>

              {/* Data Table */}
              <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="border-b border-line bg-smoke/70 text-[11px] font-semibold uppercase tracking-wider text-mute">
                      <tr>
                        <th className="px-4 py-3.5">Timestamp</th>
                        <th className="px-4 py-3.5">Client & Business</th>
                        <th className="px-4 py-3.5">Email</th>
                        <th className="px-4 py-3.5">Service Requested</th>
                        <th className="px-4 py-3.5">Message Excerpt</th>
                        <th className="px-4 py-3.5">Status</th>
                        <th className="px-4 py-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line">
                      {loading ? (
                        <tr>
                          <td colSpan={7} className="px-4 py-12 text-center text-mute">
                            <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-brand border-t-transparent" />
                            <span className="ml-2">Loading table records...</span>
                          </td>
                        </tr>
                      ) : filteredMessages.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="px-4 py-12 text-center text-mute">
                            <Inbox size={28} className="mx-auto mb-2 opacity-40" />
                            <p className="font-medium text-ink">No submissions found</p>
                            <p className="text-[11px]">
                              {searchQuery
                                ? "Try adjusting your search query."
                                : "When a client submits the contact form, it appears here immediately."}
                            </p>
                          </td>
                        </tr>
                      ) : (
                        filteredMessages.map((m) => {
                          const { formatted, relative } = formatTimestamp(m.createdAt);
                          const isNew = m.status === "received";

                          return (
                            <tr
                              key={m.id}
                              className={`transition hover:bg-smoke/60 ${
                                isNew ? "bg-brand/[0.02]" : ""
                              }`}
                            >
                              {/* 1. Timestamp */}
                              <td className="px-4 py-3.5 whitespace-nowrap">
                                <div className="flex items-center gap-1.5 font-medium text-ink">
                                  <Clock size={12} className="text-mute" />
                                  <span>{formatted}</span>
                                </div>
                                <span className="text-[10px] text-mute">{relative}</span>
                              </td>

                              {/* 2. Client & Business */}
                              <td className="px-4 py-3.5">
                                <p className="font-semibold text-ink">{m.name}</p>
                                <p className="text-[11px] text-mute">
                                  {m.businessName || "Individual / Private"}
                                </p>
                              </td>

                              {/* 3. Email */}
                              <td className="px-4 py-3.5 whitespace-nowrap">
                                <a
                                  href={`mailto:${m.email}?subject=UPTHREE%20Project%20Inquiry%20Response`}
                                  className="inline-flex items-center gap-1 font-medium text-brand hover:underline"
                                >
                                  <Mail size={12} />
                                  <span>{m.email}</span>
                                </a>
                              </td>

                              {/* 4. Service Requested */}
                              <td className="px-4 py-3.5 whitespace-nowrap">
                                <span className="inline-block rounded-md bg-smoke border border-line px-2 py-1 text-[11px] font-medium text-ink">
                                  {m.service}
                                </span>
                              </td>

                              {/* 5. Message Excerpt */}
                              <td className="max-w-xs px-4 py-3.5">
                                <p className="truncate text-mute" title={m.message}>
                                  {m.message}
                                </p>
                              </td>

                              {/* 6. Status Toggle */}
                              <td className="px-4 py-3.5 whitespace-nowrap">
                                <button
                                  type="button"
                                  onClick={() => toggleStatus(m)}
                                  title="Click to toggle status"
                                  className={`rounded-full px-2.5 py-1 text-[10px] font-semibold transition ${
                                    isNew
                                      ? "bg-amber-500/15 text-amber-600 hover:bg-amber-500/25"
                                      : "bg-emerald-500/15 text-emerald-600 hover:bg-emerald-500/25"
                                  }`}
                                >
                                  {isNew ? "● Received" : "✓ Contacted"}
                                </button>
                              </td>

                              {/* 7. Actions */}
                              <td className="px-4 py-3.5 text-right whitespace-nowrap">
                                <div className="flex items-center justify-end gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setSelected(m);
                                      setModalOpen(true);
                                    }}
                                    title="View full submission"
                                    className="rounded-lg p-1.5 text-mute transition hover:bg-smoke hover:text-brand"
                                  >
                                    <Eye size={15} />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDelete(m.id)}
                                    title="Delete record"
                                    className="rounded-lg p-1.5 text-mute transition hover:bg-smoke hover:text-red-500"
                                  >
                                    <Trash2 size={15} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Table Footer */}
                <div className="flex items-center justify-between border-t border-line bg-smoke/40 px-4 py-3 text-xs text-mute">
                  <span>
                    Showing {filteredMessages.length} of {messages.length} submissions
                  </span>
                  <span>Data stored in table with ISO timestamps</span>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Modal: Full Submission Details */}
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Inquiry Submission Details"
        >
          {selected && (
            <div className="space-y-5">
              {/* Header Info */}
              <div className="flex items-start justify-between border-b border-line pb-4">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-brand/10 text-base font-bold text-brand">
                    {selected.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-ink">{selected.name}</h4>
                    <p className="text-xs text-mute">
                      {selected.businessName || "Private Client"}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleStatus(selected)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    selected.status === "received"
                      ? "bg-amber-500/15 text-amber-600"
                      : "bg-emerald-500/15 text-emerald-600"
                  }`}
                >
                  {selected.status === "received" ? "● Received (Mark Contacted)" : "✓ Contacted"}
                </button>
              </div>

              {/* Metadata Grid */}
              <div className="grid grid-cols-2 gap-3 rounded-xl bg-smoke/70 p-3.5 text-xs">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-mute">
                    Submitted At
                  </span>
                  <p className="mt-0.5 font-medium text-ink">
                    {formatTimestamp(selected.createdAt).formatted}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-mute">
                    Service
                  </span>
                  <p className="mt-0.5 font-medium text-brand">{selected.service}</p>
                </div>
                <div className="col-span-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-mute">
                    Email Address
                  </span>
                  <p className="mt-0.5 font-medium text-ink">{selected.email}</p>
                </div>
              </div>

              {/* Full Message Body */}
              <div>
                <span className="text-xs font-semibold text-ink">Project Requirements / Message:</span>
                <div className="mt-2 max-h-56 overflow-y-auto rounded-xl border border-line bg-smoke/40 p-3.5 text-xs leading-relaxed text-ink/80 whitespace-pre-wrap">
                  {selected.message}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex items-center justify-between border-t border-line pt-4">
                <button
                  type="button"
                  onClick={() => handleDelete(selected.id)}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-red-500 hover:underline"
                >
                  <Trash2 size={13} />
                  <span>Delete record</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="rounded-full border border-line px-4 py-2 text-xs font-medium text-mute hover:text-ink"
                  >
                    Close
                  </button>
                  <a
                    href={`mailto:${selected.email}?subject=UPTHREE%20Project%20Inquiry%20Response&body=Hi%20${encodeURIComponent(
                      selected.name
                    )},%0A%0AThank%20you%20for%20reaching%20out%20to%20UPTHREE%20regarding%20${encodeURIComponent(
                      selected.service
                    )}.`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-xs font-medium text-white shadow-card transition hover:opacity-90"
                  >
                    <Mail size={13} />
                    <span>Reply via Email</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </main>
    </div>
  );
}

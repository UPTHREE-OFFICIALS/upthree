"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Gauge,
  LayoutDashboard,
  Lock,
  MessageSquare,
  Monitor,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Star,
  TrendingUp,
  Workflow,
  Zap,
} from "lucide-react";

type ServiceItem = {
  id: string;
  name: string;
  tagline: string;
  badge: string;
  summary: string;
  deliverables: string[];
  visualType: "website" | "booking" | "store" | "dashboard" | "automation" | "maintenance";
};

const SERVICES: ServiceItem[] = [
  {
    id: "websites",
    name: "Business Websites",
    tagline: "Brand-focused, high-converting digital presence",
    badge: "Core Deliverable",
    summary:
      "Modern, ultra-fast websites designed around your specific target audience. Built from scratch with clean architecture, mobile-first responsiveness, and SEO best practices.",
    deliverables: [
      "Custom responsive design (Mobile, Tablet, Desktop)",
      "High-speed performance (98+ Google Lighthouse score)",
      "Clear call-to-actions & contact inquiry integrations",
      "Search Engine Optimization (SEO) & Web Analytics",
      "Content Management & easy copy updates",
    ],
    visualType: "website",
  },
  {
    id: "booking",
    name: "Online Booking & Appointments",
    tagline: "Frictionless 24/7 client scheduling without the back-and-forth",
    badge: "Operations",
    summary:
      "Allow clients to view available times, book consultations or sessions, and receive automatic confirmation invites without phone call or email ping-pong.",
    deliverables: [
      "Interactive calendar with real-time slot availability",
      "Automatic Google Calendar & Outlook synchronization",
      "Automated email & SMS appointment reminders",
      "Custom questions and intake forms prior to booking",
      "Buffer time & cancellation policy enforcement",
    ],
    visualType: "booking",
  },
  {
    id: "stores",
    name: "Online Stores & E-Commerce",
    tagline: "Clean, frictionless shopping experiences that sell",
    badge: "Commerce",
    summary:
      "Present physical or digital products with intuitive browsing, instant checkout, and reliable payment processing with zero friction.",
    deliverables: [
      "Curated product catalogs with instant search & filter",
      "Secure payment processing (Stripe, Apple Pay, Google Pay)",
      "Instant order confirmations & automated receipt emails",
      "Inventory alerts & order management overview",
      "Shipping rules and localized currency support",
    ],
    visualType: "store",
  },
  {
    id: "dashboards",
    name: "Business Tools & Dashboards",
    tagline: "Bring vital operations and metrics into one clear view",
    badge: "Software",
    summary:
      "Bespoke internal dashboards that replace messy spreadsheets, centralize customer inquiries, and display live business metrics in one place.",
    deliverables: [
      "Role-based staff & manager dashboards",
      "Live analytics, KPI metrics & visual trends",
      "Inquiry and customer tracking pipeline",
      "One-click data exports & weekly summaries",
      "Seamless database and third-party API connectivity",
    ],
    visualType: "dashboard",
  },
  {
    id: "automation",
    name: "Workflow Automation",
    tagline: "Connect routine steps and eliminate repetitive busywork",
    badge: "Productivity",
    summary:
      "Connect your website directly to your email, CRM, spreadsheets, and messaging apps to execute handoffs automatically in milliseconds.",
    deliverables: [
      "Automatic lead routing to CRM & Google Sheets",
      "Instant WhatsApp / SMS & email notifications",
      "Multi-step invoice and intake generation",
      "Zero human error on repetitive operational tasks",
      "Custom webhook connectors for your existing tools",
    ],
    visualType: "automation",
  },
  {
    id: "maintenance",
    name: "Maintenance & Ongoing Support",
    tagline: "Proactive speed, uptime, and continuous evolution",
    badge: "Reliability",
    summary:
      "Continuous peace of mind. We keep your systems secure, dependencies updated, backups scheduled, and content updated as your business grows.",
    deliverables: [
      "99.9% uptime monitoring & instant downtime alerts",
      "Regular security patches & vulnerability scans",
      "Scheduled cloud backups & recovery safeguards",
      "Priority turnaround for content and design updates",
      "Continuous speed and Core Web Vitals maintenance",
    ],
    visualType: "maintenance",
  },
];

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState(0);
  const reduce = useReducedMotion();
  const current = SERVICES[activeTab];

  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
      {/* Top Navigation */}
      <div>
        <Link
          href="/#services"
          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand hover:underline"
        >
          <ArrowLeft size={14} /> Back to Home
        </Link>
        <div className="mt-4 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand">Services & Deliverables</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-5xl">
            What we build and deliver to our clients.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-mute sm:text-base">
            Every business requires different digital capabilities. Here is a clear, visible look at the exact
            interfaces, systems, and tools we design, engineer, and support.
          </p>
        </div>
      </div>

      {/* Interactive Tabs */}
      <div className="mt-10 flex flex-wrap gap-2 border-b border-line pb-4 sm:gap-2.5">
        {SERVICES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setActiveTab(i)}
            className={`rounded-full px-4 py-2 text-xs font-medium transition sm:text-sm ${
              activeTab === i
                ? "bg-brand text-white shadow-card"
                : "border border-line bg-smoke/80 text-mute hover:border-brand/40 hover:text-ink"
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>

      {/* Featured Deliverable Visual Showcase */}
      <div className="mt-8 grid items-center gap-8 rounded-3xl border border-line bg-smoke/60 p-5 sm:p-8 lg:grid-cols-[1fr_1.15fr] lg:gap-12">
        {/* Left: Deliverable Details */}
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-soft px-3 py-1 text-[11px] font-semibold text-brand">
              {current.badge}
            </span>
            <span className="text-xs text-mute">Deliverable 0{activeTab + 1} of 06</span>
          </div>

          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            {current.name}
          </h2>
          <p className="mt-1 text-sm font-medium text-brand">{current.tagline}</p>

          <p className="mt-4 text-sm leading-relaxed text-mute sm:text-base">
            {current.summary}
          </p>

          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink/70">
              Deliverables included:
            </p>
            <ul className="mt-3 space-y-2.5 text-xs text-ink/80 sm:text-sm">
              {current.deliverables.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-emerald-500/15 text-emerald-600">
                    <Check size={11} strokeWidth={3} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-xs font-medium text-white shadow-card transition hover:opacity-90 sm:text-sm"
            >
              Start this project <ArrowRight size={15} />
            </Link>
          </div>
        </div>

        {/* Right: Tangible Visual Picture */}
        <div className="relative min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={reduce ? false : { opacity: 0, scale: 0.98, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.98, y: -10 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="relative overflow-hidden rounded-2xl border border-line bg-surface p-4 shadow-xl sm:p-5"
            >
              {/* 1. Website Visual Picture */}
              {current.visualType === "website" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-line pb-3">
                    <div className="flex gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    </div>
                    <div className="flex items-center gap-1.5 rounded-full bg-smoke px-3 py-1 text-[11px] text-mute">
                      <Lock size={10} className="text-emerald-500" />
                      <span>https://yourbusiness.com</span>
                    </div>
                    <div className="flex gap-1 text-[10px] text-mute">
                      <Monitor size={14} />
                    </div>
                  </div>

                  <div className="rounded-xl border border-line bg-gradient-to-b from-smoke to-surface p-4 sm:p-6">
                    <div className="flex items-center justify-between border-b border-line/60 pb-3">
                      <span className="text-xs font-bold tracking-wider text-brand">UPTHREE STUDIO</span>
                      <div className="hidden gap-3 text-[11px] text-mute sm:flex">
                        <span>About</span>
                        <span>Services</span>
                        <span>Work</span>
                        <span className="font-medium text-brand">Contact</span>
                      </div>
                    </div>

                    <div className="mt-4 sm:mt-6">
                      <span className="inline-flex items-center gap-1 rounded-full bg-soft px-2.5 py-0.5 text-[10px] font-semibold text-brand">
                        <Sparkles size={11} /> Bespoke Experience
                      </span>
                      <h4 className="mt-2 text-lg font-bold leading-tight sm:text-2xl">
                        Designed with clarity. Engineered for growth.
                      </h4>
                      <p className="mt-1.5 max-w-sm text-xs text-mute">
                        A fast, responsive web presence that turns visitors into confident clients.
                      </p>

                      <div className="mt-4 flex items-center gap-2.5">
                        <span className="rounded-full bg-brand px-3.5 py-1.5 text-[11px] font-medium text-white shadow-sm">
                          Get in Touch
                        </span>
                        <span className="rounded-full border border-line bg-surface px-3 py-1.5 text-[11px] text-mute">
                          Explore Work
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 pt-1">
                    <div className="flex items-center gap-2.5 rounded-xl border border-line bg-smoke/80 p-2.5">
                      <div className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-500/15 text-emerald-600">
                        <Gauge size={16} />
                      </div>
                      <div>
                        <p className="text-[10px] font-medium text-mute">Lighthouse Speed</p>
                        <p className="text-xs font-bold text-ink">99 / 100 Performance</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 rounded-xl border border-line bg-smoke/80 p-2.5">
                      <div className="grid h-8 w-8 place-items-center rounded-lg bg-brand/15 text-brand">
                        <Smartphone size={16} />
                      </div>
                      <div>
                        <p className="text-[10px] font-medium text-mute">Responsiveness</p>
                        <p className="text-xs font-bold text-ink">Mobile & Desktop Ready</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. Booking Visual Picture */}
              {current.visualType === "booking" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-line pb-3">
                    <div className="flex items-center gap-2">
                      <div className="grid h-7 w-7 place-items-center rounded-lg bg-brand/15 text-brand">
                        <Calendar size={15} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-ink">Consultation Booking</p>
                        <p className="text-[10px] text-mute">60-minute Strategy Session</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-600">
                      Live Availability
                    </span>
                  </div>

                  <div>
                    <p className="text-[11px] font-medium text-mute">1. Select Date</p>
                    <div className="mt-2 grid grid-cols-4 gap-2 text-center text-xs">
                      {["Wed 28", "Thu 29", "Fri 30", "Sat 31"].map((d, i) => (
                        <div
                          key={d}
                          className={`rounded-lg border p-2 ${
                            i === 2
                              ? "border-brand bg-brand text-white shadow-sm"
                              : "border-line bg-smoke text-ink"
                          }`}
                        >
                          <span className="block text-[10px] opacity-75">OCT</span>
                          <span className="block font-bold">{d}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-[11px] font-medium text-mute">2. Available Time Slot</p>
                    <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
                      <div className="rounded-lg border border-line bg-smoke p-2 text-center text-mute">
                        09:30 AM
                      </div>
                      <div className="rounded-lg border border-brand bg-soft p-2 text-center font-bold text-brand ring-1 ring-brand">
                        11:00 AM ✓
                      </div>
                      <div className="rounded-lg border border-line bg-smoke p-2 text-center text-mute">
                        02:30 PM
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs">
                    <div className="flex items-center gap-2 text-emerald-600 font-semibold">
                      <CheckCircle2 size={15} />
                      <span>Instant Google & Outlook Calendar Sync</span>
                    </div>
                    <p className="mt-1 text-[11px] text-mute">
                      Automated video conference link & reminders dispatched immediately.
                    </p>
                  </div>
                </div>
              )}

              {/* 3. Store Visual Picture */}
              {current.visualType === "store" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-line pb-3">
                    <div className="flex items-center gap-2">
                      <ShoppingBag size={16} className="text-brand" />
                      <span className="text-xs font-semibold">Curated Storefront</span>
                    </div>
                    <span className="rounded-full bg-soft px-2.5 py-0.5 text-[10px] font-semibold text-brand">
                      Cart (1)
                    </span>
                  </div>

                  <div className="grid grid-cols-[1fr_1.3fr] gap-3 rounded-xl border border-line bg-smoke/60 p-3">
                    <div className="relative aspect-square rounded-lg bg-gradient-to-br from-orange-200 to-amber-300 p-3">
                      <div className="h-full w-full rounded-md bg-white/70 shadow-sm flex items-center justify-center">
                        <ShoppingBag size={24} className="text-brand/80" />
                      </div>
                      <span className="absolute bottom-2 left-2 rounded bg-black/60 px-1.5 py-0.5 text-[9px] font-medium text-white">
                        $58.00
                      </span>
                    </div>

                    <div className="flex flex-col justify-between py-1">
                      <div>
                        <div className="flex items-center gap-1 text-amber-500 text-[11px]">
                          <Star size={11} fill="currentColor" />
                          <span className="font-bold text-ink">4.9</span>
                          <span className="text-mute">(142)</span>
                        </div>
                        <h5 className="mt-1 text-sm font-bold text-ink">Nordic Ceramic Set</h5>
                        <p className="text-[11px] text-mute">Ships in 24 hours · Gift boxed</p>
                      </div>

                      <div className="mt-2 flex items-center gap-2">
                        <span className="rounded-full bg-brand px-3 py-1.5 text-[10px] font-medium text-white shadow-sm">
                          Add to Cart
                        </span>
                        <span className="text-[10px] text-emerald-600 font-medium">In Stock</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-line bg-smoke/80 px-3.5 py-2.5 text-xs">
                    <div className="flex items-center gap-2">
                      <Lock size={13} className="text-emerald-500" />
                      <span className="text-[11px] font-medium text-mute">1-Click Checkout:</span>
                    </div>
                    <div className="flex gap-2 font-semibold text-[10px] text-ink">
                      <span className="rounded bg-surface px-2 py-0.5 border border-line">Stripe</span>
                      <span className="rounded bg-surface px-2 py-0.5 border border-line">Apple Pay</span>
                      <span className="rounded bg-surface px-2 py-0.5 border border-line">GPay</span>
                    </div>
                  </div>
                </div>
              )}

              {/* 4. Dashboard Visual Picture */}
              {current.visualType === "dashboard" && (
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between border-b border-line pb-2.5">
                    <div className="flex items-center gap-2">
                      <LayoutDashboard size={15} className="text-brand" />
                      <span className="text-xs font-semibold text-ink">Executive Overview</span>
                    </div>
                    <span className="flex items-center gap-1 text-[10px] text-emerald-600 font-semibold">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live Feed
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-xl border border-line bg-smoke/80 p-2.5">
                      <p className="text-[10px] text-mute">Monthly Inquiries</p>
                      <p className="mt-1 text-base font-bold text-ink sm:text-lg">148 leads</p>
                      <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-emerald-600">
                        <TrendingUp size={11} /> +32.4% vs last mo
                      </span>
                    </div>

                    <div className="rounded-xl border border-line bg-smoke/80 p-2.5">
                      <p className="text-[10px] text-mute">Conversion Rate</p>
                      <p className="mt-1 text-base font-bold text-ink sm:text-lg">8.6%</p>
                      <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-emerald-600">
                        <TrendingUp size={11} /> +2.1% optimized
                      </span>
                    </div>
                  </div>

                  <div className="rounded-xl border border-line bg-smoke/50 p-2.5">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-mute">
                      Recent Activity Stream
                    </p>
                    <div className="mt-2 space-y-1.5 text-xs">
                      <div className="flex items-center justify-between rounded bg-surface p-1.5 border border-line/60">
                        <span className="font-medium text-[11px]">Lumina Cafe — Booking requested</span>
                        <span className="text-[10px] text-brand font-semibold">Just now</span>
                      </div>
                      <div className="flex items-center justify-between rounded bg-surface p-1.5 border border-line/60">
                        <span className="font-medium text-[11px]">Oak & Co — Invoice #1024 paid</span>
                        <span className="text-[10px] text-emerald-600 font-semibold">$3,400</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 5. Automation Visual Picture */}
              {current.visualType === "automation" && (
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between border-b border-line pb-2.5">
                    <div className="flex items-center gap-2">
                      <Workflow size={15} className="text-brand" />
                      <span className="text-xs font-semibold">Active Automation Pipeline</span>
                    </div>
                    <span className="rounded-full bg-soft px-2 py-0.5 text-[10px] font-semibold text-brand">
                      0.4s Execution
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-3 rounded-xl border border-line bg-smoke/80 p-2.5">
                      <div className="grid h-7 w-7 place-items-center rounded-lg bg-blue-500/15 text-blue-600 shrink-0">
                        <MessageSquare size={14} />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-ink text-[11px]">1. Visitor submits contact form</p>
                        <p className="text-[10px] text-mute">Name, budget, and project details captured</p>
                      </div>
                    </div>

                    <div className="ml-6 h-3 w-0.5 bg-brand" />

                    <div className="flex items-center gap-3 rounded-xl border border-line bg-smoke/80 p-2.5">
                      <div className="grid h-7 w-7 place-items-center rounded-lg bg-brand/15 text-brand shrink-0">
                        <Zap size={14} />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-ink text-[11px]">2. Instant sync to CRM & team alerts</p>
                        <p className="text-[10px] text-mute">Logged in Notion/Sheets & Slack alert sent</p>
                      </div>
                    </div>

                    <div className="ml-6 h-3 w-0.5 bg-brand" />

                    <div className="flex items-center gap-3 rounded-xl border border-line bg-smoke/80 p-2.5">
                      <div className="grid h-7 w-7 place-items-center rounded-lg bg-emerald-500/15 text-emerald-600 shrink-0">
                        <CheckCircle2 size={14} />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-ink text-[11px]">3. Tailored email & brochure dispatched</p>
                        <p className="text-[10px] text-mute">Sent to client in &lt; 1 second automatically</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 6. Maintenance Visual Picture */}
              {current.visualType === "maintenance" && (
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between border-b border-line pb-2.5">
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={16} className="text-emerald-500" />
                      <span className="text-xs font-semibold">Managed Uptime & Security Console</span>
                    </div>
                    <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> 100% Secure
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="rounded-xl border border-line bg-smoke/80 p-2.5">
                      <div className="flex items-center gap-1.5 text-emerald-600">
                        <CheckCircle2 size={14} />
                        <span className="text-[11px] font-semibold">99.98% Uptime</span>
                      </div>
                      <p className="mt-1 text-[10px] text-mute">Monitored 24/7 across 12 global regions</p>
                    </div>

                    <div className="rounded-xl border border-line bg-smoke/80 p-2.5">
                      <div className="flex items-center gap-1.5 text-brand">
                        <Gauge size={14} />
                        <span className="text-[11px] font-semibold">0.5s Page Load</span>
                      </div>
                      <p className="mt-1 text-[10px] text-mute">Edge caching & optimized image delivery</p>
                    </div>
                  </div>

                  <div className="rounded-xl border border-line bg-smoke/50 p-2.5">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-mute">
                      Active Continuous Safeguards
                    </p>
                    <div className="mt-2 space-y-1.5 text-[11px]">
                      <div className="flex items-center justify-between text-ink">
                        <span>Nightly cloud snapshot backups</span>
                        <span className="font-semibold text-emerald-600">Encrypted</span>
                      </div>
                      <div className="flex items-center justify-between text-ink">
                        <span>SSL certificate & DDoS firewall</span>
                        <span className="font-semibold text-emerald-600">Active</span>
                      </div>
                      <div className="flex items-center justify-between text-ink">
                        <span>Dependencies & security patches</span>
                        <span className="font-semibold text-brand">Auto-Managed</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Grid of All 6 Deliverables */}
      <div className="mt-20">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand">Overview</p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          Complete Deliverables Spectrum
        </h2>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, index) => (
            <div
              key={s.id}
              onClick={() => setActiveTab(index)}
              className={`group cursor-pointer rounded-2xl border p-5 transition hover:-translate-y-1 hover:shadow-card ${
                activeTab === index
                  ? "border-brand bg-soft/40 ring-1 ring-brand/30"
                  : "border-line bg-surface hover:border-brand/40"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-soft px-2.5 py-0.5 text-[10px] font-semibold text-brand">
                  {s.badge}
                </span>
                <span className="text-xs text-mute group-hover:text-brand transition">Inspect →</span>
              </div>

              <h3 className="mt-3 text-lg font-semibold text-ink group-hover:text-brand transition">
                {s.name}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-mute">{s.tagline}</p>

              <div className="mt-4 border-t border-line/60 pt-3 text-[11px] text-ink/75">
                <span className="font-medium text-brand">Includes: </span>
                {s.deliverables[0]}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Banner */}
      <div className="mt-16 flex flex-col items-start justify-between gap-5 rounded-2xl border border-line bg-surface p-6 sm:flex-row sm:items-center sm:p-8">
        <div>
          <h3 className="text-xl font-bold text-ink">Ready to talk about your project?</h3>
          <p className="mt-1 max-w-xl text-xs text-mute sm:text-sm">
            Whether you need a full business website, a booking system, or custom workflow tools, we can scope it
            together.
          </p>
        </div>
        <Link
          href="/#contact"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand px-6 py-3 text-xs font-medium text-white shadow-card transition hover:opacity-90 sm:text-sm"
        >
          Start a Conversation <ArrowRight size={15} />
        </Link>
      </div>
    </main>
  );
}

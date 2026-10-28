"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import { FAQ } from "@/lib/constants";
export default function FAQSection() {
  const [o, setO] = useState<number | null>(0);
  return <section id="faq" className="bg-surface py-20 sm:py-24"><div className="mx-auto max-w-6xl px-4"><SectionHeading kicker="FAQ" title="Frequently Asked Questions" sub="Everything you might want to know before we start a conversation." />
    <div className="grid gap-x-14 lg:grid-cols-2">{FAQ.map(([q, a], i) => <div key={q} className="border-b border-line"><h3><button id={`q${i}`} aria-expanded={o === i} aria-controls={`a${i}`} onClick={() => setO(o === i ? null : i)} className="flex w-full items-center justify-between gap-4 py-5 text-left font-medium">{q}<ChevronDown size={18} className={`shrink-0 transition ${o === i ? "rotate-180" : ""}`} /></button></h3>
      <AnimatePresence initial={false}>{o === i && <motion.div id={`a${i}`} role="region" aria-labelledby={`q${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden"><p className="pb-5 text-sm leading-6 text-mute">{a}</p></motion.div>}</AnimatePresence></div>)}</div></div></section>;
}

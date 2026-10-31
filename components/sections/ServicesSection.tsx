"use client";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CloudCog, Gauge, Monitor, ShieldCheck, Smartphone, Tablet } from "lucide-react";
import Link from "next/link";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";

const capabilities = [
  { icon: Monitor, label: "Desktop & laptop" },
  { icon: Tablet, label: "Tablet layouts" },
  { icon: Smartphone, label: "Mobile-first" },
  { icon: ShieldCheck, label: "Security-aware build" },
  { icon: Gauge, label: "Fast experiences" },
  { icon: CloudCog, label: "Connected tools" },
];

export default function ServicesSection() {
  const reducedMotion = useReducedMotion();
  return (
    <section id="services" className="bg-surface py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          kicker="What we build"
          title="One thoughtful experience, on every screen."
          sub="From responsive websites to useful digital tools, we design and build around your business—with security-minded foundations and room to grow."
        />

        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <Reveal>
            <div className="relative mx-auto flex min-h-[330px] w-full max-w-[620px] items-center justify-center overflow-hidden rounded-[2rem] border border-line bg-smoke p-6 sm:min-h-[410px] sm:p-10">
              <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-soft/80 blur-3xl sm:h-80 sm:w-80" />
              <svg aria-hidden="true" className="absolute inset-0 h-full w-full" viewBox="0 0 620 410" fill="none" preserveAspectRatio="xMidYMid meet">
                <path d="M178 192 302 116 407 196 340 281 178 192Z" stroke="currentColor" strokeOpacity=".18" strokeDasharray="5 7" />
                <circle cx="178" cy="192" r="4" fill="#FF7012" /><circle cx="302" cy="116" r="4" fill="#FF7012" /><circle cx="407" cy="196" r="4" fill="#FF7012" /><circle cx="340" cy="281" r="4" fill="#FF7012" />
              </svg>

              <motion.div aria-hidden="true" animate={reducedMotion ? undefined : { y: [0, -5, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="relative z-10 w-[68%] max-w-[390px]">
                <div className="overflow-hidden rounded-t-xl border-[5px] border-b-0 border-[#34383e] bg-[#34383e] p-1 shadow-2xl sm:rounded-t-2xl sm:border-[7px] sm:p-1.5">
                  <div className="overflow-hidden rounded-md bg-white">
                    <div className="flex h-5 items-center justify-between border-b border-gray-100 px-2 sm:h-7 sm:px-3"><span className="h-1.5 w-10 rounded-full bg-gray-200 sm:w-14" /><span className="flex gap-1"><i className="h-1 w-1 rounded-full bg-gray-300" /><i className="h-1 w-1 rounded-full bg-gray-300" /><i className="h-1 w-1 rounded-full bg-gray-300" /></span></div>
                    <div className="grid grid-cols-[1.15fr_.85fr] gap-2 p-2 sm:gap-3 sm:p-4"><div><span className="block h-1.5 w-10 rounded bg-brand/70 sm:h-2 sm:w-16" /><span className="mt-2 block h-2 w-full rounded bg-gray-200 sm:mt-3 sm:h-3" /><span className="mt-1 block h-2 w-4/5 rounded bg-gray-100 sm:h-3" /><span className="mt-2 block h-3 w-10 rounded-full bg-brand sm:mt-4 sm:h-5 sm:w-16" /></div><div className="rounded-md bg-gradient-to-br from-orange-100 to-orange-300 p-1.5 sm:rounded-lg sm:p-2"><span className="block h-full min-h-8 rounded bg-white/50 sm:min-h-14" /></div></div>
                    <div className="grid grid-cols-3 gap-1.5 px-2 pb-2 sm:gap-2 sm:px-4 sm:pb-4"><span className="h-4 rounded bg-gray-100 sm:h-7" /><span className="h-4 rounded bg-gray-100 sm:h-7" /><span className="h-4 rounded bg-gray-100 sm:h-7" /></div>
                  </div>
                </div>
                <div className="mx-[-5%] h-2 rounded-b-lg bg-gradient-to-b from-[#aeb3bb] to-[#737983] shadow-md sm:h-3" />
                <div className="mx-auto h-1 w-[24%] rounded-b-md bg-[#777d85]" />
              </motion.div>

              <motion.div aria-hidden="true" animate={reducedMotion ? undefined : { y: [0, 6, 0] }} transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-[14%] left-[10%] z-20 w-[19%] min-w-[58px] max-w-[92px] rounded-[1.1rem] border-[3px] border-[#34383e] bg-[#34383e] p-1 shadow-xl sm:bottom-[13%] sm:left-[11%] sm:rounded-[1.4rem] sm:border-4 sm:p-1.5">
                <div className="overflow-hidden rounded-[.75rem] bg-white"><div className="h-2 bg-gray-50 sm:h-3" /><div className="space-y-1.5 p-1.5 sm:space-y-2 sm:p-2"><span className="block h-2 rounded bg-orange-100 sm:h-3" /><span className="block h-1 w-4/5 rounded bg-gray-200" /><span className="block h-1 w-full rounded bg-gray-100" /><span className="block h-5 rounded bg-brand/80 sm:h-7" /><span className="block h-1 w-3/4 rounded bg-gray-200" /></div></div>
              </motion.div>

              <motion.div aria-hidden="true" animate={reducedMotion ? undefined : { y: [0, -6, 0] }} transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-[15%] right-[9%] z-20 w-[24%] min-w-[74px] max-w-[120px] rounded-[.85rem] border-[3px] border-[#34383e] bg-[#34383e] p-1 shadow-xl sm:bottom-[14%] sm:right-[9%] sm:rounded-xl sm:border-4 sm:p-1.5">
                <div className="overflow-hidden rounded bg-white"><div className="h-2 border-b border-gray-100 bg-gray-50 sm:h-3" /><div className="grid grid-cols-[.8fr_1.2fr] gap-1 p-1.5 sm:gap-2 sm:p-2"><span className="h-8 rounded bg-orange-100 sm:h-12" /><div className="space-y-1"><span className="block h-1 rounded bg-gray-200" /><span className="block h-1 w-3/4 rounded bg-gray-100" /><span className="block h-3 rounded bg-brand/80 sm:h-5" /></div></div></div>
              </motion.div>

              <motion.div animate={reducedMotion ? undefined : { scale: [1, 1.04, 1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute right-[7%] top-[9%] z-20 flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-2 text-[10px] font-medium shadow-card sm:right-[9%] sm:top-[10%] sm:gap-2.5 sm:px-4 sm:py-2.5 sm:text-xs"><span className="grid h-7 w-7 place-items-center rounded-full bg-green-500/10 text-green-600 sm:h-8 sm:w-8"><ShieldCheck size={17} /></span><span><span className="block">Security-minded</span><span className="block text-[9px] font-normal text-mute sm:text-[10px]">Safer foundations</span></span></motion.div>

              <span className="absolute left-[8%] top-[12%] rounded-full border border-line bg-surface/90 px-2.5 py-1.5 text-[10px] font-medium text-mute shadow-card sm:left-[10%] sm:top-[11%] sm:px-3 sm:py-2 sm:text-xs">One site, every screen</span>
            </div>
          </Reveal>

          <div>
            <p className="mb-5 text-sm font-medium text-mute">Connected capabilities</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-5">
              {capabilities.map(({ icon: Icon, label }, index) => (
                <Reveal key={label} delay={index * 0.06}>
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-soft text-brand">
                      <Icon size={19} />
                    </span>
                    <span className="text-sm font-medium sm:text-base">{label}</span>
                  </div>
                </Reveal>
              ))}
            </div>
            <p className="mt-6 text-sm leading-6 text-mute">
              Thoughtful responsive layouts for phones, tablets and computers, supported by performance and security best practices—not one-size-fits-all templates.
            </p>
          </div>
        </div>

        <Reveal className="mt-12 flex flex-col items-start justify-between gap-5 border-t border-line pt-8 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-mute">Explore our services</p>
            <p className="mt-2 max-w-xl text-lg font-medium">See every service laid out one by one on the full services page—from conversation to launch.</p>
          </div>
          <Link href="/services" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-medium text-white shadow-card hover:opacity-90">
            Explore all services <ArrowRight size={16} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

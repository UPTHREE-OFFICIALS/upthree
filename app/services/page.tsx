"use client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/ui/Reveal";
import { ArrowLeft, ArrowRight, Check, MessageSquare, type LucideIcon } from "lucide-react";
import { SERVICES, SITE } from "@/lib/constants";

const stages: { icon: LucideIcon; label: string; detail: string }[] = [
  { icon: MessageSquare, label: "Talk", detail: "We listen to what the business needs." },
  { icon: ArrowRight, label: "Shape", detail: "We map the right screens and features." },
  { icon: Check, label: "Build", detail: "We design, develop and launch it." },
];

function FlowLine({ index }: { index: number }) {
  return (
    <div className="flex items-center justify-start gap-3 sm:block">
      <span className="relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full border-4 border-surface bg-brand text-sm font-semibold text-white shadow-card sm:h-14 sm:w-14 sm:text-lg">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="text-xs font-medium text-mute sm:hidden">Step {String(index + 1).padStart(2, "0")}</span>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="bg-surface">
        <section className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
          <Reveal>
            <a href="/" className="inline-flex items-center gap-2 text-sm font-medium text-brand hover:underline"><ArrowLeft size={15} /> Back to home</a>
            <p className="mb-3 mt-6 text-sm font-semibold uppercase tracking-widest text-brand">Our services, one by one</p>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">Every service, laid out as a path from conversation to launch.</h1>
            <p className="mt-5 max-w-2xl text-lg text-mute">Follow the flow below. Each node explains what we build, who it serves, and a practical example of how it works.</p>
          </Reveal>

          {/* Process ribbon explaining the shape of every engagement */}
          <Reveal delay={0.1} className="mt-10">
            <div className="flex flex-col items-stretch gap-3 rounded-2xl border border-line bg-smoke p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-7">
              {stages.map(({ icon: Icon, label, detail }, i) => (
                <div key={label} className="flex flex-1 items-start gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-surface text-brand"><Icon size={18} /></span>
                  <span><span className="block text-sm font-semibold">{label}</span><span className="mt-0.5 block text-xs text-mute">{detail}</span></span>
                  {i < stages.length - 1 && <span className="ml-auto hidden self-center text-brand sm:block">→</span>}
                </div>
              ))}
            </div>
          </Reveal>

          {/* Diagrammatic service path: alternating nodes connected by a vertical spine */}
          <div className="relative mt-14">
            <span aria-hidden className="absolute left-[27px] top-6 bottom-6 hidden w-0.5 rounded bg-gradient-to-b from-brand/50 via-line to-line sm:block" />
            {SERVICES.map((service, index) => {
              const flip = index % 2 === 1;
              const last = index === SERVICES.length - 1;
              return (
                <Reveal key={service.name} delay={(index % 3) * 0.06}>
                  <div className="relative mb-8 grid items-start gap-4 sm:mb-12 sm:grid-cols-[56px_1fr] sm:gap-8">
                    <FlowLine index={index} />
                    {last && <span aria-hidden className="absolute -bottom-5 left-[21px] hidden h-3 w-3 rounded-full border-2 border-line bg-surface sm:block" />}
                    <div className={`group rounded-2xl border border-line bg-surface p-5 shadow-card transition hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg sm:p-7 ${flip ? "lg:ml-auto lg:w-[92%]" : "lg:w-[92%]"}`}>
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <span className="grid h-11 w-11 place-items-center rounded-xl bg-soft text-brand transition-transform duration-300 group-hover:-translate-y-0.5"><service.icon size={21} /></span>
                        <span className="rounded-full border border-line bg-smoke px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-mute">Service {String(index + 1).padStart(2, "0")}</span>
                      </div>
                      <h2 className="mt-4 text-xl font-semibold sm:text-2xl">{service.name}</h2>
                      <p className="mt-2 text-sm leading-6 text-mute">{service.blurb}</p>

                      <div className="mt-5 grid gap-5 sm:grid-cols-2">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-ink/70">What&apos;s included</p>
                          <ul className="mt-2 space-y-1.5">
                            {service.includes.map((item) => (
                              <li key={item} className="flex items-start gap-2 text-sm text-mute"><Check size={15} className="mt-0.5 shrink-0 text-brand" />{item}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-ink/70">Who it&apos;s for</p>
                          <p className="mt-2 text-sm text-mute">{service.for}</p>
                          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-ink/70">Example</p>
                          <p className="mt-2 text-sm text-mute">{service.example}</p>
                        </div>
                      </div>

                      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
                        <span className="text-xs text-mute">Step {String(index + 1).padStart(2, "0")} of {String(SERVICES.length).padStart(2, "0")} · Design · Build · Manage</span>
                        <a href={`mailto:${SITE.email}?subject=${encodeURIComponent(service.name)}`} className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">Discuss this service <ArrowRight size={15} /></a>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="mt-4 rounded-2xl bg-brand p-6 text-white sm:p-9">
            <h2 className="text-2xl font-semibold sm:text-3xl">Not sure which path fits?</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/80">Tell us what you are working toward and we will point you to the right starting node.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href="/#contact" className="rounded-full bg-white px-6 py-3 text-sm font-medium text-ink hover:opacity-90">Start a conversation</a>
              <a href="/#home" className="rounded-full border border-white/50 px-6 py-3 text-sm font-medium text-white hover:bg-white/10">Back to home</a>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
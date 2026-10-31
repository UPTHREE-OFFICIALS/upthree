"use client";
import { useScrollSteps } from "@/lib/useScrollSteps";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu } from "lucide-react";

const concepts = [
  {
    id: "cafe",
    name: "Morrow Coffee",
    type: "Hospitality website",
    eyebrow: "GOOD COFFEE. GOOD COMPANY.",
    headline: "A little more slow in your day.",
    description: "A neighborhood coffee house for carefully made cups and unhurried mornings.",
    action: "Find your table",
    accent: "bg-[#bd6548]",
    accentText: "text-[#bd6548]",
    surface: "bg-[#f1e8dd]",
    visual: "bg-[linear-gradient(135deg,#c8a88e,#f1d8b7_55%,#9e6b50)]",
    mark: "m.",
    nav: ["Our story", "The menu", "Visit"],
    feature: "FRESH DAILY · LOCALLY LOVED",
  },
  {
    id: "atelier",
    name: "Forma Studio",
    type: "Creative portfolio",
    eyebrow: "INDEPENDENT DESIGN STUDIO",
    headline: "Space to think differently.",
    description: "A quiet, editorial home for a studio making thoughtful spaces and objects.",
    action: "Explore the work",
    accent: "bg-[#435849]",
    accentText: "text-[#435849]",
    surface: "bg-[#e9e9e1]",
    visual: "bg-[linear-gradient(135deg,#b5b7a5,#e3ddc9_48%,#858b76)]",
    mark: "FORMA",
    nav: ["Studio", "Projects", "Contact"],
    feature: "SPACES WITH A SENSE OF PURPOSE",
  },
  {
    id: "goods",
    name: "Northline Goods",
    type: "Small online store",
    eyebrow: "MADE FOR THE EVERYDAY",
    headline: "Keep good things close.",
    description: "A product-led storefront for useful objects, made to be kept and used.",
    action: "Shop the collection",
    accent: "bg-[#365d79]",
    accentText: "text-[#365d79]",
    surface: "bg-[#e9eff0]",
    visual: "bg-[linear-gradient(135deg,#a7c0c2,#e4d8bf_52%,#738f91)]",
    mark: "NORTHLINE",
    nav: ["Shop", "Our story", "Help"],
    feature: "THOUGHTFUL OBJECTS, LESS NOISE",
  },
];

export default function WorkSection() {
  const { ref, active: activeIndex, goTo } = useScrollSteps(concepts.length);
  const activeId = concepts[activeIndex].id;
  const setActiveId = (id: string) => goTo(concepts.findIndex((c) => c.id === id));
  const reducedMotion = useReducedMotion();
  const active = concepts.find((concept) => concept.id === activeId) ?? concepts[0];

  return (
    <section id="work" ref={ref} className="scroll-mt-16 bg-deep text-white lg:h-[240vh]">
      <div className="py-16 sm:py-20 lg:sticky lg:top-16 lg:flex lg:h-[calc(100svh-4rem)] lg:flex-col lg:justify-center lg:py-4">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto w-full max-w-6xl px-4"
        >
          <div className="mb-4 max-w-2xl lg:mb-3">
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-brand">Our approach</p>
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">A brand is more than a logo. It&apos;s every step forward.</h2>
            <p className="mt-1.5 max-w-xl text-xs text-white/65 sm:text-sm">From the first idea to the finished experience, we bring design, build and ongoing care together to make your business memorable.</p>
            <div className="mt-2.5 flex flex-wrap gap-3 text-xs font-semibold tracking-[0.16em] text-white/75 lg:mt-2">
              <span>DESIGN</span><span className="text-brand">→</span><span>BUILD</span><span className="text-brand">→</span><span>MANAGE</span>
            </div>
          </div>
          <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-6">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/50">Choose a concept</p>
              <div role="tablist" aria-label="Website concept demos" className="space-y-2">
                {concepts.map((concept) => {
                  const selected = concept.id === activeId;
                  return (
                    <button
                      key={concept.id}
                      id={`concept-tab-${concept.id}`}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      aria-controls="concept-preview"
                      tabIndex={selected ? 0 : -1}
                      onClick={() => setActiveId(concept.id)}
                      onKeyDown={(event) => {
                        const currentIndex = concepts.findIndex((item) => item.id === activeId);
                        const nextIndex = event.key === "ArrowRight" ? (currentIndex + 1) % concepts.length : event.key === "ArrowLeft" ? (currentIndex - 1 + concepts.length) % concepts.length : -1;
                        if (nextIndex >= 0) {
                          event.preventDefault();
                          setActiveId(concepts[nextIndex].id);
                          document.getElementById(`concept-tab-${concepts[nextIndex].id}`)?.focus();
                        }
                      }}
                      className={`flex w-full items-center justify-between rounded-xl border p-3 sm:p-3.5 text-left transition ${selected ? "border-white/30 bg-white/10" : "border-white/10 hover:border-white/25 hover:bg-white/5"}`}
                    >
                      <span>
                        <span className="block text-sm font-medium">{concept.name}</span>
                        <span className="mt-0.5 block text-xs text-white/55">{concept.type}</span>
                      </span>
                      <ArrowUpRight size={16} className={selected ? "text-brand" : "text-white/40"} />
                    </button>
                  );
                })}
              </div>
              <p className="mt-3 text-xs leading-relaxed text-white/55 sm:text-sm">Every project starts with your audience, your goals and a conversation about what will work best.</p>
              <a href="#contact" className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-medium text-white transition hover:text-brand sm:text-sm">
                Have a project in mind? Let&apos;s talk <ArrowUpRight size={15} />
              </a>
            </div>

            <div id="concept-preview" role="tabpanel" aria-labelledby={`concept-tab-${active.id}`} aria-label={`${active.name} concept preview`} className="min-w-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.22 }}
                  className="overflow-hidden rounded-2xl border border-white/15 light-scope bg-white p-2 text-ink shadow-2xl sm:p-2.5"
                >
                  <div className="flex items-center justify-between border-b border-line px-2 pb-2 pt-1 sm:px-3">
                    <div className="flex gap-1.5" aria-hidden="true">
                      <span className="h-2 w-2 rounded-full bg-[#f3b5a5]" />
                      <span className="h-2 w-2 rounded-full bg-[#f4d58b]" />
                      <span className="h-2 w-2 rounded-full bg-[#a5c9ad]" />
                    </div>
                    <span className="rounded-full bg-smoke px-3 py-0.5 text-[10px] text-mute">{active.name.toLowerCase().replaceAll(" ", "")}.demo</span>
                    <Menu size={14} className="text-mute" aria-hidden="true" />
                  </div>
                  <div className={`${active.surface} p-3.5 sm:p-5 lg:p-4 xl:p-5 rounded-b-xl`}>
                    <div className="flex items-center justify-between gap-3">
                      <span className={`text-xs font-bold tracking-[0.16em] ${active.accentText}`}>{active.mark}</span>
                      <div className="hidden gap-4 text-[10px] text-ink/65 sm:flex">{active.nav.map((item) => <span key={item}>{item}</span>)}</div>
                      <span className="text-[10px] text-ink/50 sm:hidden">MENU</span>
                    </div>
                    <div className="mt-3.5 grid items-center gap-4 sm:mt-5 sm:grid-cols-[1.1fr_0.9fr] lg:mt-3">
                      <div>
                        <p className={`text-[9px] font-semibold tracking-[0.15em] ${active.accentText}`}>{active.eyebrow}</p>
                        <h3 className="mt-1.5 max-w-xs text-xl font-semibold leading-tight tracking-tight sm:text-2xl">{active.headline}</h3>
                        <p className="mt-1.5 max-w-xs text-xs leading-relaxed text-ink/60">{active.description}</p>
                        <span className={`mt-3 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[10px] font-medium text-white ${active.accent}`}>
                          {active.action}<ArrowUpRight size={12} />
                        </span>
                      </div>
                      <div className={`relative aspect-[16/10] sm:aspect-[4/3] max-h-44 sm:max-h-52 overflow-hidden rounded-lg ${active.visual}`} aria-hidden="true">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                        <span className="absolute bottom-2.5 left-2.5 rounded-full bg-white/85 px-2.5 py-1 text-[8px] font-semibold tracking-[0.12em] text-ink">{active.feature}</span>
                        <span className="absolute right-2.5 top-2.5 h-8 w-8 rounded-full border border-white/60 bg-white/20 backdrop-blur-sm" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              <p className="mt-1.5 text-center text-[11px] text-white/40">Concept demonstration · No real business or client work represented</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

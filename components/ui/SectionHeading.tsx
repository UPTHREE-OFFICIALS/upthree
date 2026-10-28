import Reveal from "./Reveal";
export default function SectionHeading({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) {
  return <Reveal className="mb-12 max-w-2xl"><p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand">{kicker}</p><h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>{sub && <p className="mt-4 text-mute">{sub}</p>}</Reveal>;
}

import { SERVICES } from "@/lib/constants";
export const metadata = { title: "Services — UPTHREE" };
export default function ServicesPage() {
  return <main className="mx-auto max-w-4xl px-4 py-20"><a href="/#services" className="text-sm text-brand">← Back</a>
    <h1 className="mt-4 text-4xl font-semibold tracking-tight">Services</h1><p className="mt-3 text-mute">Capabilities we can discuss and scope with you.</p>
    <ul className="mt-10 divide-y divide-line">{SERVICES.map((s) => <li key={s.name} className="py-5"><h2 className="font-semibold">{s.name}</h2><p className="mt-1 text-sm text-mute">{s.blurb}</p></li>)}</ul>
    <a href="/#contact" className="mt-10 inline-block rounded-full bg-brand px-6 py-3 font-medium text-white">Start a Project</a></main>;
}

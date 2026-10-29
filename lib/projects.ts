// Illustrative concept projects (not real client work). Replace with real projects when available.
const CATS = [
 { cat: "Website", g: "from-orange-200 to-orange-400", sectors: ["Cafe", "Clinic", "Studio"] },
 { cat: "Booking", g: "from-sky to-azure/60", sectors: ["Salon", "Gym", "Consultancy"] },
 { cat: "Online Store", g: "from-amber-100 to-orange-300", sectors: ["Homeware", "Apparel", "Stationery"] },
 { cat: "Dashboard", g: "from-slate-200 to-sky", sectors: ["Operations", "Sales", "Support"] },
 { cat: "Automation", g: "from-orange-100 to-brand/70", sectors: ["Inquiry", "Onboarding", "Invoicing"] },
 { cat: "AI Assistant", g: "from-indigo-100 to-azure/50", sectors: ["Customer", "Staff", "FAQ"] },
];
export type Project = { id: number; name: string; cat: string; g: string };
export const PROJECTS: Project[] = CATS.flatMap((c, i) => c.sectors.map((s, j) => ({ id: i * 3 + j, name: `${s} ${c.cat}`, cat: c.cat, g: c.g })))
  .sort((a, b) => (a.id % 3) - (b.id % 3) || a.id - b.id);

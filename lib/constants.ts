import { CalendarCheck, Globe, Workflow, ShoppingBag, LayoutDashboard, LifeBuoy, type LucideIcon } from "lucide-react";
export const SITE = { email: "hello@your-domain.example", phone: "+00 000 000 0000", social: [{ label: "LinkedIn", href: "#" }, { label: "Instagram", href: "#" }] };
export const NAV = [["home","Home"],["work","Concepts"],["services","Services"],["how","Process"],["faq","FAQ"],["contact","Contact"]] as const;
export type Service = { icon: LucideIcon; name: string; blurb: string; includes: string[]; for: string; example: string };
export const SERVICES: Service[] = [
 { icon: Globe, name: "Website Design & Development", blurb: "A thoughtful, responsive website built around your business.", includes: ["Custom page design","Responsive development","Contact setup"], for: "Businesses ready to build or refresh their online presence", example: "A clear, mobile-friendly website that helps customers find key information." },
 { icon: ShoppingBag, name: "E-commerce Websites", blurb: "A considered storefront for showcasing and selling products.", includes: ["Product catalogue","Storefront design","Checkout setup"], for: "Retailers and makers selling online", example: "A product catalogue organized to make browsing feel simple." },
 { icon: CalendarCheck, name: "Booking Websites", blurb: "Make it easier for customers to request a time or appointment.", includes: ["Service and availability pages","Booking request flow","Confirmation setup"], for: "Salons, gyms, consultants and appointment-based businesses", example: "A straightforward session request flow for a fitness studio." },
 { icon: LayoutDashboard, name: "Web Apps & Dashboards", blurb: "Useful web tools that bring important tasks and information together.", includes: ["Requirements and interface design","Web application development","Role-based views"], for: "Teams that need a tool shaped around their workflow", example: "A simple dashboard to review incoming requests and tasks." },
 { icon: Workflow, name: "Integrations & Automation", blurb: "Connect your website to the tools and workflows you already use.", includes: ["Workflow review","Service integrations","Automated hand-offs"], for: "Businesses looking to reduce repetitive manual steps", example: "A website inquiry routed into the right team workflow." },
 { icon: LifeBuoy, name: "Website Care & Improvements", blurb: "Keep a website current and improve it as your needs change.", includes: ["Maintenance updates","Issue fixes","Agreed improvements"], for: "Businesses with an existing website", example: "A planned update to keep service details and pages current." },
];
export const PROCESS = [["Discover","Understand your goals, audience and requirements."],["Plan","Agree on the scope, structure and direction before development begins."],["Build","Design, develop and refine the solution together."],["Support","Launch, hand over and discuss any ongoing improvements."]];
export const FAQ = [
 ["What does UPTHREE build?","We design and develop business websites, online stores, booking experiences, web applications and useful integrations."],
 ["Can you work with a small business?","Yes. We shape the work around your goals and the needs of your business."],
 ["Do I need to know exactly what I want?","No. Tell us what you are trying to achieve and we can work through the right direction together."],
 ["Are the concept examples real client projects?","No. They are illustrative concepts to show the kinds of website experiences we can build."],
 ["How does a project start?","Send us a short note about your idea. We will talk through your needs and agree on a suitable scope before work begins."],
 ["Can you improve an existing website?","Yes. We can discuss updates, improvements or a rebuild based on what your current site needs."],
];

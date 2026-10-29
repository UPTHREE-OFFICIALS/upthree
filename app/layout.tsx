import type { Metadata } from "next";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";
export const metadata: Metadata = {
  title: "UPTHREE — Design. Build. Manage.",
  description: "UPTHREE shapes distinctive identities and builds thoughtful digital experiences that help businesses move forward.",
  openGraph: { title: "UPTHREE — Design. Build. Manage.", description: "Let's build something that works.", type: "website" },
  icons: { icon: "/logo.png" },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: "try{if(localStorage.getItem('theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}" }} /></head>
    <body><ScrollProgress /><Navbar />{children}<Footer /></body></html>;
}

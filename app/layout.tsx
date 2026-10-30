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
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            // Dark is the default; a stored 'light' choice is honoured instead of being overwritten.
            __html: "try{document.documentElement.classList.toggle('dark',localStorage.getItem('theme')!=='light')}catch(e){document.documentElement.classList.add('dark')}",
          }}
        />
      </head>
      <body><ScrollProgress /><Navbar />{children}<Footer /></body>
    </html>
  );
}
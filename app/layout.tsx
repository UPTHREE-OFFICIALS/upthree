import type { Metadata } from "next";
import AppShell from "@/components/layout/AppShell";
import "./globals.css";

export const metadata: Metadata = {
  title: "UPTHREE — Design. Build. Manage.",
  description: "UPTHREE shapes distinctive identities and builds thoughtful digital experiences that help businesses move forward.",
  openGraph: { title: "UPTHREE — Design. Build. Manage.", description: "Let's build something that works.", type: "website" },
  icons: { icon: "/logo.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            // Dark is the default; only an explicit stored 'light' choice removes it.
            __html: "try{if(localStorage.getItem('theme')==='light'){document.documentElement.classList.remove('dark')}else{document.documentElement.classList.add('dark')}}catch(e){}",
          }}
        />
      </head>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
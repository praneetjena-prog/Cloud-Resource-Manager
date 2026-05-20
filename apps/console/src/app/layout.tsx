import type { Metadata } from "next";
import "./globals.css";
import { ConsoleSidebar } from "@/components/console-sidebar";
import { ConsoleHeader } from "@/components/console-header";
import { AiAgent } from "@/components/ai-agent";

export const metadata: Metadata = {
  title: "SuperCloud Console — Resource Manager",
  description: "Manage your cloud resources, track credits, and optimize infrastructure with AI.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <div className="flex min-h-screen">
          <ConsoleSidebar />
          <div className="flex-1 flex flex-col ml-64">
            <ConsoleHeader />
            <main className="flex-1 p-8 space-y-8 overflow-y-auto">
              {children}
            </main>
          </div>
          <AiAgent />
        </div>
      </body>
    </html>
  );
}

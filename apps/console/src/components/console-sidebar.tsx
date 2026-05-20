"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Cloud, LayoutDashboard, CreditCard, Server, HelpCircle, Settings, BarChart3, Database, HardDrive, Network } from "lucide-react";

const mainNav = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: CreditCard, label: "Credits", href: "/credits" },
  { icon: Server, label: "Compute", href: "/compute" },
  { icon: Database, label: "Databases", href: "/databases" },
  { icon: HardDrive, label: "Storage", href: "/storage" },
  { icon: Network, label: "Networking", href: "/networking" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
];

const bottomNav = [
  { icon: HelpCircle, label: "Support", href: "/support" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function ConsoleSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[#050510]/90 backdrop-blur-2xl border-r border-white/[0.06] flex flex-col z-40">
      <div className="p-6 border-b border-white/[0.06]">
        <Link href="https://supercloud.dev.in" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/25">
            <Cloud className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="text-base font-bold text-white">SuperCloud</span>
            <span className="block text-xs text-white/30 -mt-0.5">Console</span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {mainNav.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                active
                  ? "bg-violet-600/15 text-violet-300 border border-violet-500/10"
                  : "text-white/40 hover:text-white/70 hover:bg-white/[0.03]"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/[0.06] space-y-1">
        {bottomNav.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                active
                  ? "bg-violet-600/15 text-violet-300 border border-violet-500/10"
                  : "text-white/40 hover:text-white/70 hover:bg-white/[0.03]"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-white/[0.06]">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-xs font-bold text-white">
            PJ
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-white truncate">Praneet Jena</div>
            <div className="text-xs text-white/30 truncate">praneet@supercloud.dev</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

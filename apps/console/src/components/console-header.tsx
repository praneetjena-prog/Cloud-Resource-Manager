"use client";

import { Bell, Search } from "lucide-react";
import { Input } from "@supercloud/shared-ui";

export function ConsoleHeader() {
  return (
    <header className="sticky top-0 z-30 h-16 bg-[#050510]/80 backdrop-blur-2xl border-b border-white/[0.06] flex items-center justify-between px-8">
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <Input
            placeholder="Search resources, credits, logs..."
            className="pl-10 h-9 text-sm bg-white/[0.03] border-white/[0.06]"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold">
          Pro Plan
        </div>
        <button className="relative p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/[0.05] transition-all">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>
      </div>
    </header>
  );
}

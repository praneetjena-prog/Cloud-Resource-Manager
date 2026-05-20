"use client";

import { useEffect, useState } from "react";
import { Button } from "@supercloud/shared-ui";
import { ArrowRight, Sparkles, Shield, Gauge } from "lucide-react";
import Link from "next/link";

const stats = [
  { label: "Uptime SLA", value: "99.99%" },
  { label: "Global Regions", value: "32" },
  { label: "Active Instances", value: "2.4M+" },
  { label: "Credits Served", value: "$840M" },
];

export function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-violet-400/40 rounded-full animate-float" />
        <div className="absolute top-40 right-20 w-1.5 h-1.5 bg-cyan-400/40 rounded-full animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-40 left-1/4 w-1 h-1 bg-indigo-400/50 rounded-full animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/3 right-1/3 w-2.5 h-2.5 bg-violet-300/20 rounded-full animate-float" style={{ animationDelay: "3s" }} />
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div
          className={`transition-all duration-1000 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/20 bg-violet-500/5 text-violet-300 text-sm font-medium mb-8 backdrop-blur-sm">
            <Sparkles className="w-4 h-4" />
            <span>Now with AI-Powered Resource Optimization</span>
          </div>
        </div>

        <h1
          className={`text-5xl sm:text-6xl lg:text-8xl font-black tracking-tight leading-[0.95] mb-8 transition-all duration-1000 delay-200 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-white">Cloud that</span>
          <br />
          <span className="gradient-text">speaks truth.</span>
        </h1>

        <p
          className={`text-lg sm:text-xl text-white/50 max-w-2xl mx-auto mb-12 leading-relaxed transition-all duration-1000 delay-400 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Transparent credit-based pricing. Zero hidden fees. Complete visibility
          into every compute cycle, storage byte, and database query — backed by
          a tamper-proof ledger.
        </p>

        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 transition-all duration-1000 delay-[600ms] ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Button size="xl" className="w-full sm:w-auto group" asChild>
            <Link href="http://localhost:3001">
              Start Building Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button variant="outline" size="xl" className="w-full sm:w-auto" asChild>
            <Link href="#features">Explore Features</Link>
          </Button>
        </div>

        <div
          className={`grid grid-cols-2 sm:grid-cols-4 gap-6 transition-all duration-1000 delay-[800ms] ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center group">
              <div className="text-3xl sm:text-4xl font-black text-white group-hover:gradient-text transition-all duration-300">
                {stat.value}
              </div>
              <div className="text-sm text-white/40 mt-1 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050510] to-transparent pointer-events-none" />
    </section>
  );
}

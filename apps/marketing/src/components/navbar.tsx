"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@supercloud/shared-ui";
import { Menu, X, Cloud, Zap } from "lucide-react";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#050510]/80 backdrop-blur-2xl border-b border-white/[0.06] shadow-2xl shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/25 group-hover:shadow-violet-500/40 transition-shadow duration-300">
            <Cloud className="w-5 h-5 text-white" />
            <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-cyan-400 rounded-full animate-pulse-slow" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            <span className="text-white">Super</span>
            <span className="gradient-text">Cloud</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-white/60 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link href="http://localhost:3001">Sign In</Link>
          </Button>
          <Button size="sm" className="gap-2" asChild>
            <Link href="http://localhost:3001">
              <Zap className="w-4 h-4" />
              Launch Console
            </Link>
          </Button>
        </div>

        <button
          className="md:hidden text-white/70 hover:text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden bg-[#050510]/95 backdrop-blur-2xl border-b border-white/[0.06] px-6 pb-6">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-4 py-3 text-sm font-medium text-white/60 hover:text-white rounded-lg hover:bg-white/5 transition-all"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="http://localhost:3001">Sign In</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="http://localhost:3001">Launch Console</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

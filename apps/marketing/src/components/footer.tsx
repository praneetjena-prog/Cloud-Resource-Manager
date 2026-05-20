import Link from "next/link";
import { Cloud } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center">
                <Cloud className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">SuperCloud</span>
            </Link>
            <p className="text-sm text-white/30 leading-relaxed">
              Next-generation cloud infrastructure with transparent pricing.
            </p>
          </div>
          {[
            { title: "Product", links: ["Features", "Pricing", "Console", "API Docs"] },
            { title: "Company", links: ["About", "Careers", "Blog", "Press"] },
            { title: "Legal", links: ["Privacy", "Terms", "SLA", "GDPR"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-white mb-4">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-sm text-white/30 hover:text-white/60 transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/[0.06] pt-8 text-center">
          <p className="text-sm text-white/20">&copy; 2026 SuperCloud Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { Card, CardContent } from "@supercloud/shared-ui";
import { Target, Eye, Lightbulb, Users } from "lucide-react";

const values = [
  {
    icon: Eye,
    title: "Radical Transparency",
    description: "We believe cloud pricing should be crystal clear. Our chain-hashed credit ledger ensures every transaction is verifiable.",
  },
  {
    icon: Target,
    title: "Developer-First",
    description: "Built by engineers tired of opaque billing. Every API and tool is designed with developer ergonomics in mind.",
  },
  {
    icon: Lightbulb,
    title: "AI-Native Intelligence",
    description: "Our AI agent proactively optimizes — from cost savings to architecture suggestions, intelligence is built in.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Open governance, public roadmaps, and community-voted features. SuperCloud is shaped by its engineers.",
  },
];

const milestones = [
  { year: "2021", event: "Founded in San Francisco" },
  { year: "2022", event: "Launched first 8 global regions" },
  { year: "2023", event: "Introduced AI Agent & Credit Ledger" },
  { year: "2024", event: "Reached 1M+ active instances" },
  { year: "2025", event: "Expanded to 32 regions, SOC 2 certified" },
  { year: "2026", event: "Serving $840M in credits globally" },
];

export function AboutSection() {
  return (
    <section id="about" className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-24">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/20 bg-violet-500/5 text-violet-300 text-sm font-medium mb-6">
              <Target className="w-4 h-4" />
              About SuperCloud
            </div>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-8">
              We&apos;re building the cloud
              <br />
              <span className="gradient-text">you deserve.</span>
            </h2>
            <div className="space-y-6">
              <p className="text-lg text-white/50 leading-relaxed">
                SuperCloud was born from a simple frustration: why is cloud billing so confusing? We set out to build infrastructure that treats transparency as a first-class feature.
              </p>
              <p className="text-lg text-white/50 leading-relaxed">
                Our founding team — engineers from Google Cloud, AWS, and Cloudflare — envisioned a platform where every credit deduction is explainable, every resource is optimizable, and every developer has an AI copilot.
              </p>
              <p className="text-lg text-white/50 leading-relaxed">
                Today, SuperCloud powers over 2.4 million active instances across 32 global regions, serving startups to Fortune 500 enterprises.
              </p>
            </div>
          </div>
          <div className="space-y-4">
            {values.map((value) => (
              <Card key={value.title} className="group hover:border-white/[0.15] hover:bg-white/[0.05]">
                <CardContent className="p-6 flex gap-5">
                  <div className="w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br from-violet-600/20 to-cyan-600/20 flex items-center justify-center border border-white/[0.06]">
                    <value.icon className="w-5 h-5 text-violet-300" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white mb-1">{value.title}</h3>
                    <p className="text-sm text-white/40 leading-relaxed">{value.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-white mb-2">Our Journey</h3>
            <p className="text-white/40">From a garage in SF to a global cloud platform</p>
          </div>
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-violet-600/50 via-cyan-600/50 to-transparent" />
            <div className="space-y-12">
              {milestones.map((milestone, i) => (
                <div key={milestone.year} className={`flex items-center gap-8 ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                  <div className={`flex-1 ${i % 2 === 0 ? "text-right" : "text-left"}`}>
                    <div className="text-sm font-bold text-violet-400 mb-1">{milestone.year}</div>
                    <div className="text-white/60 text-sm">{milestone.event}</div>
                  </div>
                  <div className="relative z-10 w-4 h-4 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 shadow-lg shadow-violet-500/30 ring-4 ring-[#050510]" />
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

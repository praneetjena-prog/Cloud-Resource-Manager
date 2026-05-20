"use client";

import { Card, CardContent } from "@supercloud/shared-ui";
import {
  Shield,
  Gauge,
  Database,
  Bot,
  CreditCard,
  Globe,
  Lock,
  BarChart3,
  Cpu,
} from "lucide-react";

const features = [
  {
    icon: CreditCard,
    title: "Transparent Credit Ledger",
    description:
      "Every credit transaction is chain-hashed for tamper-proof transparency. See exactly where every cent goes.",
    gradient: "from-violet-600 to-purple-600",
    glow: "shadow-violet-500/20",
  },
  {
    icon: BarChart3,
    title: "Real-Time Usage Analytics",
    description:
      "Visualize credit burn rates, resource consumption, and cost projections with interactive dashboards.",
    gradient: "from-cyan-600 to-blue-600",
    glow: "shadow-cyan-500/20",
  },
  {
    icon: Bot,
    title: "AI Agent Assistant",
    description:
      "Our intelligent agent analyzes your usage patterns, suggests optimizations, and handles support tickets automatically.",
    gradient: "from-emerald-600 to-teal-600",
    glow: "shadow-emerald-500/20",
  },
  {
    icon: Cpu,
    title: "Elastic Compute",
    description:
      "Provision, start, and stop instances on-demand. Scale from zero to thousands of cores in seconds.",
    gradient: "from-orange-600 to-amber-600",
    glow: "shadow-orange-500/20",
  },
  {
    icon: Database,
    title: "Managed Databases",
    description:
      "PostgreSQL, Redis, and more — fully managed with automatic backups, scaling, and point-in-time recovery.",
    gradient: "from-rose-600 to-pink-600",
    glow: "shadow-rose-500/20",
  },
  {
    icon: Globe,
    title: "32 Global Regions",
    description:
      "Deploy workloads closest to your users with edge-optimized routing across 32 data center regions.",
    gradient: "from-indigo-600 to-violet-600",
    glow: "shadow-indigo-500/20",
  },
  {
    icon: Shield,
    title: "Zero Trust Security",
    description:
      "End-to-end encryption, mutual TLS, and SOC 2 Type II compliance. Your data is fortress-protected.",
    gradient: "from-sky-600 to-cyan-600",
    glow: "shadow-sky-500/20",
  },
  {
    icon: Gauge,
    title: "99.99% SLA Guarantee",
    description:
      "Industry-leading availability backed by financial SLAs. Downtime costs us, not you.",
    gradient: "from-fuchsia-600 to-purple-600",
    glow: "shadow-fuchsia-500/20",
  },
  {
    icon: Lock,
    title: "Compliance Built-In",
    description:
      "GDPR, HIPAA, and PCI DSS compliant infrastructure. Audit trails included at no extra cost.",
    gradient: "from-lime-600 to-green-600",
    glow: "shadow-lime-500/20",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-300 text-sm font-medium mb-6">
            <Gauge className="w-4 h-4" />
            Platform Capabilities
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6">
            Everything you need.
            <br />
            <span className="gradient-text">Nothing you don&apos;t.</span>
          </h2>
          <p className="text-lg text-white/40 max-w-2xl mx-auto">
            A complete cloud platform designed from the ground up for
            transparency, performance, and developer happiness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <Card
              key={feature.title}
              className="group hover:border-white/[0.15] hover:bg-white/[0.05] cursor-pointer"
            >
              <CardContent className="p-8">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg ${feature.glow} mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3 group-hover:gradient-text transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-sm text-white/40 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

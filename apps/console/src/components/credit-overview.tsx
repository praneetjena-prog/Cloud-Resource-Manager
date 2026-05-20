"use client";

import { Card, CardContent } from "@supercloud/shared-ui";
import { CreditCard, TrendingDown, TrendingUp, Wallet } from "lucide-react";

const cards = [
  {
    label: "Credit Balance",
    value: "$2,847.50",
    change: "+$500.00 added",
    trend: "up" as const,
    icon: Wallet,
    gradient: "from-violet-600 to-indigo-600",
    glow: "shadow-violet-500/20",
  },
  {
    label: "This Month Spend",
    value: "$1,234.82",
    change: "-12% vs last month",
    trend: "down" as const,
    icon: CreditCard,
    gradient: "from-cyan-600 to-blue-600",
    glow: "shadow-cyan-500/20",
  },
  {
    label: "Burn Rate",
    value: "$41.16/day",
    change: "Est. 69 days remaining",
    trend: "down" as const,
    icon: TrendingDown,
    gradient: "from-amber-600 to-orange-600",
    glow: "shadow-amber-500/20",
  },
  {
    label: "Cost Savings (AI)",
    value: "$312.40",
    change: "+28% optimization",
    trend: "up" as const,
    icon: TrendingUp,
    gradient: "from-emerald-600 to-teal-600",
    glow: "shadow-emerald-500/20",
  },
];

export function CreditOverview() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Card key={card.label} className="hover:border-white/[0.12] group">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center shadow-lg ${card.glow} group-hover:scale-110 transition-transform duration-300`}>
                  <card.icon className="w-5 h-5 text-white" />
                </div>
                <div className={`text-xs font-semibold px-2 py-1 rounded-md ${card.trend === "up" ? "text-emerald-300 bg-emerald-500/10" : "text-amber-300 bg-amber-500/10"}`}>
                  {card.change}
                </div>
              </div>
              <div className="text-2xl font-black text-white mb-1">{card.value}</div>
              <div className="text-xs text-white/40 font-medium">{card.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

import { UsageCharts } from "@/components/usage-charts";
import { Card, CardContent } from "@supercloud/shared-ui";
import { BarChart3, TrendingUp, TrendingDown, Activity } from "lucide-react";

export const metadata = { title: "Analytics — SuperCloud Console" };

const stats = [
  { label: "Avg Daily Requests", value: "4.2M", change: "+18%", up: true, icon: Activity, color: "from-violet-600 to-indigo-600" },
  { label: "P99 Latency", value: "142ms", change: "-8ms", up: false, icon: TrendingDown, color: "from-emerald-600 to-teal-600" },
  { label: "Error Rate", value: "0.04%", change: "-0.01%", up: false, icon: TrendingUp, color: "from-cyan-600 to-blue-600" },
  { label: "Uptime (30d)", value: "99.97%", change: "SLA met", up: true, icon: BarChart3, color: "from-amber-600 to-orange-600" },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-white">Analytics</h1>
        <p className="text-white/40 mt-1">Infrastructure metrics, cost trends, and performance insights.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(({ label, value, change, up, icon: Icon, color }) => (
          <Card key={label}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-md ${up ? "text-emerald-300 bg-emerald-500/10" : "text-cyan-300 bg-cyan-500/10"}`}>
                  {change}
                </span>
              </div>
              <div className="text-2xl font-black text-white">{value}</div>
              <div className="text-xs text-white/40 mt-1">{label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <UsageCharts />
    </div>
  );
}

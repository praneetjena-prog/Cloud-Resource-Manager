"use client";

import { Card, CardContent, CardHeader, CardTitle, Tabs, TabsList, TabsTrigger, TabsContent } from "@supercloud/shared-ui";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

const dailyUsage = [
  { date: "May 1", compute: 28, database: 15, storage: 8 },
  { date: "May 2", compute: 32, database: 18, storage: 9 },
  { date: "May 3", compute: 25, database: 14, storage: 7 },
  { date: "May 4", compute: 38, database: 22, storage: 11 },
  { date: "May 5", compute: 42, database: 19, storage: 10 },
  { date: "May 6", compute: 35, database: 16, storage: 8 },
  { date: "May 7", compute: 40, database: 21, storage: 12 },
  { date: "May 8", compute: 45, database: 24, storage: 13 },
  { date: "May 9", compute: 38, database: 20, storage: 11 },
  { date: "May 10", compute: 50, database: 26, storage: 14 },
  { date: "May 11", compute: 44, database: 23, storage: 12 },
  { date: "May 12", compute: 48, database: 25, storage: 13 },
];

const burnRate = [
  { hour: "00:00", rate: 1.2 },
  { hour: "04:00", rate: 0.8 },
  { hour: "08:00", rate: 2.5 },
  { hour: "12:00", rate: 3.1 },
  { hour: "16:00", rate: 2.8 },
  { hour: "20:00", rate: 1.5 },
];

const breakdown = [
  { name: "Compute", value: 58, color: "#7c3aed" },
  { name: "Database", value: 28, color: "#06b6d4" },
  { name: "Storage", value: 14, color: "#10b981" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;
  return (
    <div className="bg-[#0a0a1a] border border-white/10 rounded-xl p-3 shadow-2xl">
      <p className="text-xs font-medium text-white/50 mb-2">{label}</p>
      {payload.map((entry: any) => (
        <div key={entry.name} className="flex items-center gap-2 text-xs">
          <div className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
          <span className="text-white/60">{entry.name}:</span>
          <span className="text-white font-semibold">${entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export function UsageCharts() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Usage Analytics</h2>
      <Tabs defaultValue="consumption">
        <TabsList>
          <TabsTrigger value="consumption">Consumption</TabsTrigger>
          <TabsTrigger value="burnrate">Burn Rate</TabsTrigger>
          <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
        </TabsList>

        <TabsContent value="consumption">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Daily Credit Consumption</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={dailyUsage}>
                    <defs>
                      <linearGradient id="gCompute" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="gDatabase" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="gStorage" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                    <XAxis dataKey="date" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="compute" stroke="#7c3aed" fill="url(#gCompute)" strokeWidth={2} name="Compute" />
                    <Area type="monotone" dataKey="database" stroke="#06b6d4" fill="url(#gDatabase)" strokeWidth={2} name="Database" />
                    <Area type="monotone" dataKey="storage" stroke="#10b981" fill="url(#gStorage)" strokeWidth={2} name="Storage" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="burnrate">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Hourly Burn Rate (Today)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={burnRate}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                    <XAxis dataKey="hour" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}/hr`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="rate" fill="#7c3aed" radius={[6, 6, 0, 0]} name="Burn Rate" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="breakdown">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Cost Breakdown by Resource</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-12">
                <div className="h-[280px] w-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={breakdown} cx="50%" cy="50%" innerRadius={70} outerRadius={110} paddingAngle={4} dataKey="value" strokeWidth={0}>
                        {breakdown.map((entry) => (
                          <Cell key={entry.name} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-4">
                  {breakdown.map((item) => (
                    <div key={item.name} className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ background: item.color }} />
                      <span className="text-sm text-white/60">{item.name}</span>
                      <span className="text-sm font-bold text-white">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

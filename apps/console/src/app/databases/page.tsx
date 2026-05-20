"use client";

import { useState } from "react";
import { Card, CardContent, Badge, Button } from "@supercloud/shared-ui";
import { Database, Play, Square, Plus, Globe, Layers } from "lucide-react";

type DB = {
  id: string;
  name: string;
  engine: "PostgreSQL" | "MySQL" | "Redis" | "MongoDB";
  version: string;
  tier: string;
  region: string;
  storage: string;
  status: "RUNNING" | "STOPPED" | "PROVISIONING";
  costPerHour: number;
};

const engineColors: Record<string, string> = {
  PostgreSQL: "from-blue-600 to-indigo-600",
  MySQL: "from-orange-600 to-amber-600",
  Redis: "from-red-600 to-rose-600",
  MongoDB: "from-emerald-600 to-teal-600",
};

const initialDBs: DB[] = [
  { id: "d1", name: "postgres-main", engine: "PostgreSQL", version: "15.4", tier: "db.r6g.large", region: "us-east-1", storage: "500 GB", status: "RUNNING", costPerHour: 0.26 },
  { id: "d2", name: "redis-cache", engine: "Redis", version: "7.2", tier: "cache.r6g.large", region: "us-east-1", storage: "12 GB RAM", status: "RUNNING", costPerHour: 0.18 },
  { id: "d3", name: "analytics-mysql", engine: "MySQL", version: "8.0", tier: "db.t3.medium", region: "eu-west-1", storage: "200 GB", status: "STOPPED", costPerHour: 0.12 },
];

const statusMap: Record<string, { variant: "success" | "warning" | "outline"; label: string }> = {
  RUNNING: { variant: "success", label: "Running" },
  STOPPED: { variant: "outline", label: "Stopped" },
  PROVISIONING: { variant: "warning", label: "Provisioning" },
};

export default function DatabasesPage() {
  const [dbs, setDbs] = useState(initialDBs);

  const toggle = (id: string) => {
    setDbs((prev) =>
      prev.map((d) => d.id === id ? { ...d, status: d.status === "RUNNING" ? "STOPPED" : "PROVISIONING" } : d)
    );
    setTimeout(() => {
      setDbs((prev) =>
        prev.map((d) => d.id === id && d.status === "PROVISIONING" ? { ...d, status: "RUNNING" } : d)
      );
    }, 2000);
  };

  const provision = () => {
    const newDb: DB = {
      id: `d${Date.now()}`,
      name: `db-${Math.random().toString(36).slice(2, 6)}`,
      engine: "PostgreSQL",
      version: "15.4",
      tier: "db.t3.micro",
      region: "us-west-2",
      storage: "20 GB",
      status: "PROVISIONING",
      costPerHour: 0.03,
    };
    setDbs((prev) => [...prev, newDb]);
    setTimeout(() => {
      setDbs((prev) => prev.map((d) => d.id === newDb.id ? { ...d, status: "RUNNING" } : d));
    }, 3000);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white">Databases</h1>
          <p className="text-white/40 mt-1">Managed database instances — PostgreSQL, MySQL, Redis and more.</p>
        </div>
        <Button onClick={provision} className="gap-2">
          <Plus className="w-4 h-4" /> New Database
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {dbs.map((db) => {
          const status = statusMap[db.status];
          return (
            <Card key={db.id} className="hover:border-white/[0.12] group">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${engineColors[db.engine]} flex items-center justify-center shadow-lg`}>
                      <Database className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{db.name}</div>
                      <div className="text-xs text-white/30">{db.engine} v{db.version}</div>
                    </div>
                  </div>
                  <Badge variant={status.variant}>{status.label}</Badge>
                </div>
                <div className="space-y-2 mb-4 text-xs">
                  <div className="flex justify-between"><span className="text-white/30">Region</span><span className="text-white/60 flex items-center gap-1"><Globe className="w-3 h-3" />{db.region}</span></div>
                  <div className="flex justify-between"><span className="text-white/30">Tier</span><span className="text-white/60 flex items-center gap-1"><Layers className="w-3 h-3" />{db.tier}</span></div>
                  <div className="flex justify-between"><span className="text-white/30">Storage</span><span className="text-white/60">{db.storage}</span></div>
                  <div className="flex justify-between"><span className="text-white/30">Cost</span><span className="text-violet-300 font-semibold">${db.costPerHour}/hr</span></div>
                </div>
                <Button
                  variant={db.status === "RUNNING" ? "destructive" : "success"}
                  size="sm"
                  className="w-full"
                  onClick={() => toggle(db.id)}
                  disabled={db.status === "PROVISIONING"}
                >
                  {db.status === "RUNNING" ? <><Square className="w-3.5 h-3.5" /> Stop</> : db.status === "PROVISIONING" ? "Provisioning..." : <><Play className="w-3.5 h-3.5" /> Start</>}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

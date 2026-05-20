"use client";

import { useState } from "react";
import { Card, CardContent, Badge, Button } from "@supercloud/shared-ui";
import { Play, Square, Plus, Server, Database, HardDrive, Cpu, Globe } from "lucide-react";

type Resource = {
  id: string;
  name: string;
  type: "COMPUTE" | "DATABASE" | "STORAGE";
  status: "RUNNING" | "STOPPED" | "PROVISIONING";
  region: string;
  spec: string;
  costPerHour: number;
};

const initialResources: Resource[] = [
  { id: "r1", name: "api-prod-01", type: "COMPUTE", status: "RUNNING", region: "us-east-1", spec: "4 vCPU / 16GB", costPerHour: 0.48 },
  { id: "r2", name: "api-prod-02", type: "COMPUTE", status: "RUNNING", region: "us-east-1", spec: "4 vCPU / 16GB", costPerHour: 0.48 },
  { id: "r3", name: "worker-batch", type: "COMPUTE", status: "STOPPED", region: "eu-west-1", spec: "8 vCPU / 32GB", costPerHour: 0.96 },
  { id: "r4", name: "postgres-main", type: "DATABASE", status: "RUNNING", region: "us-east-1", spec: "db.r6g.large", costPerHour: 0.26 },
  { id: "r5", name: "redis-cache", type: "DATABASE", status: "RUNNING", region: "us-east-1", spec: "cache.r6g.large", costPerHour: 0.18 },
  { id: "r6", name: "media-bucket", type: "STORAGE", status: "RUNNING", region: "global", spec: "2.4 TB used", costPerHour: 0.02 },
];

const typeIcons: Record<string, typeof Server> = {
  COMPUTE: Cpu,
  DATABASE: Database,
  STORAGE: HardDrive,
};

const statusMap: Record<string, { variant: "success" | "warning" | "danger" | "outline"; label: string }> = {
  RUNNING: { variant: "success", label: "Running" },
  STOPPED: { variant: "outline", label: "Stopped" },
  PROVISIONING: { variant: "warning", label: "Provisioning" },
};

export function ResourceGrid() {
  const [resources, setResources] = useState(initialResources);

  const toggleResource = (id: string) => {
    setResources((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        if (r.status === "RUNNING") return { ...r, status: "STOPPED" };
        if (r.status === "STOPPED") return { ...r, status: "PROVISIONING" };
        return r;
      })
    );

    setTimeout(() => {
      setResources((prev) =>
        prev.map((r) => {
          if (r.id !== id) return r;
          if (r.status === "PROVISIONING") return { ...r, status: "RUNNING" };
          return r;
        })
      );
    }, 2000);
  };

  const provision = () => {
    const newRes: Resource = {
      id: `r${Date.now()}`,
      name: `instance-${Math.random().toString(36).slice(2, 6)}`,
      type: "COMPUTE",
      status: "PROVISIONING",
      region: "us-west-2",
      spec: "2 vCPU / 8GB",
      costPerHour: 0.24,
    };
    setResources((prev) => [...prev, newRes]);

    setTimeout(() => {
      setResources((prev) =>
        prev.map((r) => (r.id === newRes.id ? { ...r, status: "RUNNING" } : r))
      );
    }, 3000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Resources</h2>
        <Button size="sm" onClick={provision} className="gap-2">
          <Plus className="w-4 h-4" />
          Provision Instance
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {resources.map((resource) => {
          const Icon = typeIcons[resource.type] || Server;
          const status = statusMap[resource.status];
          return (
            <Card key={resource.id} className="hover:border-white/[0.12] group">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.06] flex items-center justify-center">
                      <Icon className="w-5 h-5 text-violet-300" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{resource.name}</div>
                      <div className="text-xs text-white/30">{resource.type}</div>
                    </div>
                  </div>
                  <Badge variant={status.variant}>{status.label}</Badge>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-white/30">Region</span>
                    <span className="text-white/60 flex items-center gap-1">
                      <Globe className="w-3 h-3" />
                      {resource.region}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-white/30">Spec</span>
                    <span className="text-white/60">{resource.spec}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-white/30">Cost</span>
                    <span className="text-white/60 font-semibold">${resource.costPerHour}/hr</span>
                  </div>
                </div>
                <Button
                  variant={resource.status === "RUNNING" ? "destructive" : "success"}
                  size="sm"
                  className="w-full"
                  onClick={() => toggleResource(resource.id)}
                  disabled={resource.status === "PROVISIONING"}
                >
                  {resource.status === "RUNNING" ? (
                    <><Square className="w-3.5 h-3.5" /> Stop</>
                  ) : resource.status === "PROVISIONING" ? (
                    "Provisioning..."
                  ) : (
                    <><Play className="w-3.5 h-3.5" /> Start</>
                  )}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

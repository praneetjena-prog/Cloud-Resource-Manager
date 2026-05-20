"use client";

import { useState } from "react";
import { Card, CardContent, Badge, Button } from "@supercloud/shared-ui";
import { Play, Square, Plus, Cpu, Globe, Zap, Monitor } from "lucide-react";

type Instance = {
  id: string;
  name: string;
  region: string;
  spec: string;
  vcpu: number;
  ram: number;
  status: "RUNNING" | "STOPPED" | "PROVISIONING";
  costPerHour: number;
  uptime: string;
};

const initialInstances: Instance[] = [
  { id: "c1", name: "api-prod-01", region: "us-east-1", spec: "c6i.xlarge", vcpu: 4, ram: 16, status: "RUNNING", costPerHour: 0.48, uptime: "14d 6h" },
  { id: "c2", name: "api-prod-02", region: "us-east-1", spec: "c6i.xlarge", vcpu: 4, ram: 16, status: "RUNNING", costPerHour: 0.48, uptime: "14d 6h" },
  { id: "c3", name: "worker-batch", region: "eu-west-1", spec: "c6i.2xlarge", vcpu: 8, ram: 32, status: "STOPPED", costPerHour: 0.96, uptime: "—" },
  { id: "c4", name: "ml-inference", region: "us-west-2", spec: "g4dn.xlarge", vcpu: 4, ram: 16, status: "STOPPED", costPerHour: 1.24, uptime: "—" },
];

const statusMap: Record<string, { variant: "success" | "warning" | "outline"; label: string }> = {
  RUNNING: { variant: "success", label: "Running" },
  STOPPED: { variant: "outline", label: "Stopped" },
  PROVISIONING: { variant: "warning", label: "Provisioning" },
};

export default function ComputePage() {
  const [instances, setInstances] = useState(initialInstances);

  const toggle = (id: string) => {
    setInstances((prev) =>
      prev.map((i) => {
        if (i.id !== id) return i;
        return { ...i, status: i.status === "RUNNING" ? "STOPPED" : "PROVISIONING" };
      })
    );
    setTimeout(() => {
      setInstances((prev) =>
        prev.map((i) => (i.id === id && i.status === "PROVISIONING" ? { ...i, status: "RUNNING" } : i))
      );
    }, 2000);
  };

  const provision = () => {
    const newInst: Instance = {
      id: `c${Date.now()}`,
      name: `instance-${Math.random().toString(36).slice(2, 6)}`,
      region: "us-west-2",
      spec: "c6i.large",
      vcpu: 2,
      ram: 8,
      status: "PROVISIONING",
      costPerHour: 0.24,
      uptime: "—",
    };
    setInstances((prev) => [...prev, newInst]);
    setTimeout(() => {
      setInstances((prev) =>
        prev.map((i) => (i.id === newInst.id ? { ...i, status: "RUNNING", uptime: "0h 0m" } : i))
      );
    }, 3000);
  };

  const running = instances.filter((i) => i.status === "RUNNING").length;
  const totalCost = instances.filter((i) => i.status === "RUNNING").reduce((s, i) => s + i.costPerHour, 0);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white">Compute</h1>
          <p className="text-white/40 mt-1">Manage virtual machine instances across all regions.</p>
        </div>
        <Button onClick={provision} className="gap-2">
          <Plus className="w-4 h-4" /> Provision Instance
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Running Instances", value: running, icon: Monitor, color: "from-emerald-600 to-teal-600" },
          { label: "Total vCPUs Active", value: instances.filter(i => i.status === "RUNNING").reduce((s, i) => s + i.vcpu, 0), icon: Cpu, color: "from-violet-600 to-indigo-600" },
          { label: "Hourly Cost", value: `$${totalCost.toFixed(2)}/hr`, icon: Zap, color: "from-amber-600 to-orange-600" },
        ].map(({ label, value, icon: Icon, color }) => (
          <Card key={label}>
            <CardContent className="p-5 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-black text-white">{value}</div>
                <div className="text-xs text-white/40">{label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {instances.map((inst) => {
          const status = statusMap[inst.status];
          return (
            <Card key={inst.id} className="hover:border-white/[0.12] group">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                      <Cpu className="w-5 h-5 text-violet-300" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{inst.name}</div>
                      <div className="text-xs text-white/30">{inst.spec}</div>
                    </div>
                  </div>
                  <Badge variant={status.variant}>{status.label}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                  <div className="flex justify-between"><span className="text-white/30">Region</span><span className="text-white/60 flex items-center gap-1"><Globe className="w-3 h-3" />{inst.region}</span></div>
                  <div className="flex justify-between"><span className="text-white/30">vCPU</span><span className="text-white/60">{inst.vcpu} cores</span></div>
                  <div className="flex justify-between"><span className="text-white/30">RAM</span><span className="text-white/60">{inst.ram} GB</span></div>
                  <div className="flex justify-between"><span className="text-white/30">Uptime</span><span className="text-white/60">{inst.uptime}</span></div>
                  <div className="flex justify-between col-span-2"><span className="text-white/30">Cost</span><span className="text-violet-300 font-semibold">${inst.costPerHour}/hr</span></div>
                </div>
                <Button
                  variant={inst.status === "RUNNING" ? "destructive" : "success"}
                  size="sm"
                  className="w-full"
                  onClick={() => toggle(inst.id)}
                  disabled={inst.status === "PROVISIONING"}
                >
                  {inst.status === "RUNNING" ? <><Square className="w-3.5 h-3.5" /> Stop</> : inst.status === "PROVISIONING" ? "Provisioning..." : <><Play className="w-3.5 h-3.5" /> Start</>}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

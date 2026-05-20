"use client";

import { Card, CardContent, Badge } from "@supercloud/shared-ui";
import { Network, Globe, Shield, Zap, GitBranch, Lock } from "lucide-react";

const vpcs = [
  { id: "n1", name: "vpc-prod", cidr: "10.0.0.0/16", subnets: 4, region: "us-east-1", status: "Active" },
  { id: "n2", name: "vpc-staging", cidr: "10.1.0.0/16", subnets: 2, region: "eu-west-1", status: "Active" },
  { id: "n3", name: "vpc-dev", cidr: "10.2.0.0/16", subnets: 2, region: "us-west-2", status: "Active" },
];

const loadBalancers = [
  { id: "lb1", name: "alb-prod", type: "Application", targets: 4, requests: "2.4M/hr", status: "Healthy" },
  { id: "lb2", name: "nlb-internal", type: "Network", targets: 2, requests: "840K/hr", status: "Healthy" },
];

const firewalls = [
  { id: "fw1", name: "sg-prod-web", rules: 8, inbound: "80,443", outbound: "All", status: "Active" },
  { id: "fw2", name: "sg-prod-db", rules: 3, inbound: "5432", outbound: "None", status: "Active" },
];

export default function NetworkingPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-white">Networking</h1>
        <p className="text-white/40 mt-1">VPCs, load balancers, and security group management.</p>
      </div>

      <div>
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Network className="w-5 h-5 text-violet-400" /> Virtual Private Clouds</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {vpcs.map((vpc) => (
            <Card key={vpc.id} className="hover:border-white/[0.12]">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                      <Network className="w-5 h-5 text-violet-300" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{vpc.name}</div>
                      <div className="text-xs text-white/30 font-mono">{vpc.cidr}</div>
                    </div>
                  </div>
                  <Badge variant="success">{vpc.status}</Badge>
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between"><span className="text-white/30">Region</span><span className="text-white/60 flex items-center gap-1"><Globe className="w-3 h-3" />{vpc.region}</span></div>
                  <div className="flex justify-between"><span className="text-white/30">Subnets</span><span className="text-white/60">{vpc.subnets} subnets</span></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Zap className="w-5 h-5 text-cyan-400" /> Load Balancers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {loadBalancers.map((lb) => (
            <Card key={lb.id} className="hover:border-white/[0.12]">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                      <GitBranch className="w-5 h-5 text-cyan-300" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{lb.name}</div>
                      <div className="text-xs text-white/30">{lb.type} LB</div>
                    </div>
                  </div>
                  <Badge variant="success">{lb.status}</Badge>
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between"><span className="text-white/30">Targets</span><span className="text-white/60">{lb.targets} instances</span></div>
                  <div className="flex justify-between"><span className="text-white/30">Requests</span><span className="text-emerald-400 font-semibold">{lb.requests}</span></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Shield className="w-5 h-5 text-amber-400" /> Security Groups</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {firewalls.map((fw) => (
            <Card key={fw.id} className="hover:border-white/[0.12]">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                      <Lock className="w-5 h-5 text-amber-300" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{fw.name}</div>
                      <div className="text-xs text-white/30">{fw.rules} rules</div>
                    </div>
                  </div>
                  <Badge variant="success">{fw.status}</Badge>
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between"><span className="text-white/30">Inbound</span><span className="text-white/60 font-mono">:{fw.inbound}</span></div>
                  <div className="flex justify-between"><span className="text-white/30">Outbound</span><span className="text-white/60">{fw.outbound}</span></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

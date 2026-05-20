"use client";

import { useState } from "react";
import { Card, CardContent, Badge, Button } from "@supercloud/shared-ui";
import { HardDrive, Plus, FolderOpen, Globe, Trash2, Upload } from "lucide-react";

type Bucket = {
  id: string;
  name: string;
  region: string;
  used: string;
  files: number;
  access: "Public" | "Private";
  costPerMonth: number;
};

const initialBuckets: Bucket[] = [
  { id: "s1", name: "media-assets", region: "global", used: "2.4 TB", files: 184320, access: "Public", costPerMonth: 52.80 },
  { id: "s2", name: "user-uploads", region: "us-east-1", used: "890 GB", files: 67400, access: "Private", costPerMonth: 19.58 },
  { id: "s3", name: "backups-prod", region: "eu-west-1", used: "5.1 TB", files: 2840, access: "Private", costPerMonth: 112.20 },
  { id: "s4", name: "ml-datasets", region: "us-west-2", used: "1.2 TB", files: 430, access: "Private", costPerMonth: 26.40 },
];

export default function StoragePage() {
  const [buckets, setBuckets] = useState(initialBuckets);

  const addBucket = () => {
    setBuckets((prev) => [...prev, {
      id: `s${Date.now()}`, name: `bucket-${Math.random().toString(36).slice(2, 6)}`,
      region: "us-east-1", used: "0 GB", files: 0, access: "Private", costPerMonth: 0,
    }]);
  };

  const deleteBucket = (id: string) => setBuckets((prev) => prev.filter((b) => b.id !== id));
  const total = buckets.reduce((s, b) => s + b.costPerMonth, 0);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white">Storage</h1>
          <p className="text-white/40 mt-1">Object storage buckets and file management.</p>
        </div>
        <Button onClick={addBucket} className="gap-2"><Plus className="w-4 h-4" /> New Bucket</Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Buckets", value: buckets.length, icon: FolderOpen, color: "from-violet-600 to-indigo-600" },
          { label: "Total Storage", value: "9.6 TB", icon: HardDrive, color: "from-cyan-600 to-blue-600" },
          { label: "Monthly Cost", value: `$${total.toFixed(2)}`, icon: Globe, color: "from-amber-600 to-orange-600" },
        ].map(({ label, value, icon: Icon, color }) => (
          <Card key={label}><CardContent className="p-5 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}><Icon className="w-6 h-6 text-white" /></div>
            <div><div className="text-2xl font-black text-white">{value}</div><div className="text-xs text-white/40">{label}</div></div>
          </CardContent></Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {buckets.map((bucket) => (
          <Card key={bucket.id} className="hover:border-white/[0.12]">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                    <HardDrive className="w-5 h-5 text-cyan-300" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{bucket.name}</div>
                    <div className="text-xs text-white/30">{bucket.files.toLocaleString()} files</div>
                  </div>
                </div>
                <Badge variant={bucket.access === "Public" ? "warning" : "outline"}>{bucket.access}</Badge>
              </div>
              <div className="space-y-2 mb-4 text-xs">
                <div className="flex justify-between"><span className="text-white/30">Region</span><span className="text-white/60">{bucket.region}</span></div>
                <div className="flex justify-between"><span className="text-white/30">Used</span><span className="text-white/60">{bucket.used}</span></div>
                <div className="flex justify-between"><span className="text-white/30">Monthly</span><span className="text-violet-300 font-semibold">${bucket.costPerMonth.toFixed(2)}/mo</span></div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 gap-1"><Upload className="w-3.5 h-3.5" /> Browse</Button>
                <Button variant="destructive" size="sm" onClick={() => deleteBucket(bucket.id)}><Trash2 className="w-3.5 h-3.5" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

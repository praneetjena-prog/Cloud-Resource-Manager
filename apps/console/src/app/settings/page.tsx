"use client";

import { useState } from "react";
import { Card, CardContent } from "@supercloud/shared-ui";
import { Settings, Bell, Shield, CreditCard, Globe, Moon, Save } from "lucide-react";

type Section = "general" | "notifications" | "security" | "billing";

const sections: { id: Section; label: string; icon: typeof Settings }[] = [
  { id: "general", label: "General", icon: Globe },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "billing", label: "Billing", icon: CreditCard },
];

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`relative w-10 h-5.5 rounded-full transition-colors duration-200 ${checked ? "bg-violet-600" : "bg-white/10"}`}
      style={{ height: 22 }}
    >
      <span className={`absolute top-0.5 left-0.5 w-[18px] h-[18px] rounded-full bg-white shadow transition-transform duration-200 ${checked ? "translate-x-[18px]" : ""}`} />
    </button>
  );
}

export default function SettingsPage() {
  const [active, setActive] = useState<Section>("general");
  const [prefs, setPrefs] = useState({
    darkMode: true, compactView: false,
    emailAlerts: true, slackAlerts: false, costThreshold: true, downtime: true,
    mfa: true, ssoEnabled: false,
    autoPay: true, invoiceEmails: true,
  });

  const toggle = (key: keyof typeof prefs) => setPrefs((p) => ({ ...p, [key]: !p[key] }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-white">Settings</h1>
        <p className="text-white/40 mt-1">Manage your account preferences and configuration.</p>
      </div>

      <div className="flex gap-8">
        <div className="w-48 shrink-0">
          <nav className="space-y-1">
            {sections.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActive(id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${active === id ? "bg-violet-600/15 text-violet-300 border border-violet-500/10" : "text-white/40 hover:text-white/70 hover:bg-white/[0.03]"}`}
              >
                <Icon className="w-4 h-4" /> {label}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex-1 space-y-4">
          {active === "general" && (
            <>
              <Card><CardContent className="p-6 space-y-4">
                <h3 className="text-sm font-bold text-white mb-2">Appearance</h3>
                {[
                  { key: "darkMode" as const, label: "Dark Mode", desc: "Use dark theme across the console" },
                  { key: "compactView" as const, label: "Compact View", desc: "Reduce spacing for denser layouts" },
                ].map(({ key, label, desc }) => (
                  <div key={key} className="flex items-center justify-between">
                    <div><div className="text-sm text-white">{label}</div><div className="text-xs text-white/30">{desc}</div></div>
                    <Toggle checked={prefs[key]} onChange={() => toggle(key)} />
                  </div>
                ))}
              </CardContent></Card>
              <Card><CardContent className="p-6">
                <h3 className="text-sm font-bold text-white mb-4">Profile</h3>
                <div className="space-y-3">
                  {[{ label: "Name", value: "Praneet Jena" }, { label: "Email", value: "praneet@supercloud.dev" }, { label: "Organization", value: "SuperCloud Inc." }].map(({ label, value }) => (
                    <div key={label}><label className="text-xs text-white/40 mb-1 block">{label}</label>
                      <input defaultValue={value} className="w-full bg-white/[0.05] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500/50" />
                    </div>
                  ))}
                  <button className="mt-2 flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium rounded-lg transition-colors">
                    <Save className="w-4 h-4" /> Save Changes
                  </button>
                </div>
              </CardContent></Card>
            </>
          )}

          {active === "notifications" && (
            <Card><CardContent className="p-6 space-y-4">
              <h3 className="text-sm font-bold text-white mb-2">Alert Preferences</h3>
              {[
                { key: "emailAlerts" as const, label: "Email Alerts", desc: "Receive alerts via email" },
                { key: "slackAlerts" as const, label: "Slack Alerts", desc: "Send alerts to your Slack workspace" },
                { key: "costThreshold" as const, label: "Cost Threshold Alerts", desc: "Alert when spend exceeds budget" },
                { key: "downtime" as const, label: "Downtime Notifications", desc: "Alert on service disruptions" },
              ].map(({ key, label, desc }) => (
                <div key={key} className="flex items-center justify-between">
                  <div><div className="text-sm text-white">{label}</div><div className="text-xs text-white/30">{desc}</div></div>
                  <Toggle checked={prefs[key]} onChange={() => toggle(key)} />
                </div>
              ))}
            </CardContent></Card>
          )}

          {active === "security" && (
            <Card><CardContent className="p-6 space-y-4">
              <h3 className="text-sm font-bold text-white mb-2">Security Options</h3>
              {[
                { key: "mfa" as const, label: "Two-Factor Authentication", desc: "Require MFA on every login" },
                { key: "ssoEnabled" as const, label: "Single Sign-On (SSO)", desc: "Enable SAML/OIDC SSO" },
              ].map(({ key, label, desc }) => (
                <div key={key} className="flex items-center justify-between">
                  <div><div className="text-sm text-white">{label}</div><div className="text-xs text-white/30">{desc}</div></div>
                  <Toggle checked={prefs[key]} onChange={() => toggle(key)} />
                </div>
              ))}
              <div className="pt-2 border-t border-white/[0.06]">
                <button className="text-sm text-red-400 hover:text-red-300 transition-colors">Change Password →</button>
              </div>
            </CardContent></Card>
          )}

          {active === "billing" && (
            <Card><CardContent className="p-6 space-y-4">
              <h3 className="text-sm font-bold text-white mb-2">Billing Preferences</h3>
              {[
                { key: "autoPay" as const, label: "Auto Top-Up", desc: "Automatically top up credits when balance is low" },
                { key: "invoiceEmails" as const, label: "Invoice Emails", desc: "Receive PDF invoices by email each month" },
              ].map(({ key, label, desc }) => (
                <div key={key} className="flex items-center justify-between">
                  <div><div className="text-sm text-white">{label}</div><div className="text-xs text-white/30">{desc}</div></div>
                  <Toggle checked={prefs[key]} onChange={() => toggle(key)} />
                </div>
              ))}
              <div className="pt-2 border-t border-white/[0.06]">
                <div className="text-xs text-white/30 mb-2">Payment Method</div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                  <CreditCard className="w-4 h-4 text-violet-400" />
                  <span className="text-sm text-white">Visa •••• 4242</span>
                  <span className="ml-auto text-xs text-white/40">Expires 12/27</span>
                </div>
              </div>
            </CardContent></Card>
          )}
        </div>
      </div>
    </div>
  );
}

import { Card, CardContent } from "@supercloud/shared-ui";
import { HelpCircle, BookOpen, MessageSquare, FileText, ExternalLink } from "lucide-react";

export const metadata = { title: "Support — SuperCloud Console" };

const resources = [
  { icon: BookOpen, title: "Documentation", desc: "Browse guides, tutorials, and API references.", href: "#", color: "from-violet-600 to-indigo-600" },
  { icon: MessageSquare, title: "Live Chat", desc: "Talk to our support team in real time.", href: "#", color: "from-cyan-600 to-blue-600" },
  { icon: FileText, title: "Submit Ticket", desc: "Open a support ticket for complex issues.", href: "#", color: "from-amber-600 to-orange-600" },
  { icon: HelpCircle, title: "Community Forum", desc: "Get help from other SuperCloud users.", href: "#", color: "from-emerald-600 to-teal-600" },
];

const faqs = [
  { q: "How do I top up my credits?", a: "Navigate to Credits → Top Up and select a payment method. Credits are applied instantly." },
  { q: "Can I get a refund for unused credits?", a: "Unused credits can be refunded within 30 days of purchase. Contact billing support." },
  { q: "How do I scale my compute instances?", a: "Go to Compute, click on an instance card, and select 'Resize'. Changes apply with < 30s downtime." },
  { q: "What regions are available?", a: "We currently support us-east-1, us-west-2, eu-west-1, ap-southeast-1, and global CDN edges." },
];

export default function SupportPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-white">Support</h1>
        <p className="text-white/40 mt-1">Documentation, live support, and community resources.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {resources.map(({ icon: Icon, title, desc, href, color }) => (
          <a key={title} href={href} className="block group">
            <Card className="hover:border-white/[0.15] group-hover:scale-[1.02] transition-all duration-200 cursor-pointer">
              <CardContent className="p-5 text-center">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-sm font-bold text-white mb-1 flex items-center justify-center gap-1">
                  {title} <ExternalLink className="w-3 h-3 text-white/30" />
                </div>
                <div className="text-xs text-white/40">{desc}</div>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>

      <div>
        <h2 className="text-lg font-bold text-white mb-4">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map(({ q, a }) => (
            <Card key={q}>
              <CardContent className="p-5">
                <div className="text-sm font-semibold text-white mb-2 flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" /> {q}
                </div>
                <p className="text-sm text-white/50 pl-6">{a}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

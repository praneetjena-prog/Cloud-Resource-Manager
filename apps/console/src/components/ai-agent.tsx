"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Button, ScrollArea, Input, Badge } from "@supercloud/shared-ui";
import { Bot, X, Send, Sparkles, Minus, Maximize2 } from "lucide-react";

type Message = {
  id: string;
  role: "user" | "agent";
  content: string;
  timestamp: Date;
  status?: "thinking" | "analyzing" | "complete";
};

const agentResponses: Record<string, string> = {
  credits: "Based on your current burn rate of $41.16/day, you have approximately 69 days of credits remaining. Your compute resources account for 58% of spending. I recommend right-sizing your `worker-batch` instance — it's been idle 62% of the time this week, which could save ~$15/day.",
  optimize: "I've analyzed your resource utilization patterns over the past 30 days. Here are my top recommendations:\n\n• **Downsize worker-batch** from 8 vCPU to 4 vCPU (saves $11.52/day)\n• **Enable auto-scaling** on api-prod-02 (saves $4.80/day during off-peak)\n• **Switch redis-cache** to reserved pricing (saves $1.44/day)\n\nTotal potential savings: **$17.76/day ($532.80/month)**",
  support: "I can help you create a support ticket. What category best describes your issue?\n\n• **Billing** — Credit discrepancies, invoices, refunds\n• **Technical** — Instance issues, networking, performance\n• **Account** — Access, permissions, team management\n\nJust describe your issue and I'll draft the ticket for you.",
  default: "I'm your SuperCloud AI assistant. I can help you with:\n\n• 💰 **Credit analysis** — Understanding your spending patterns\n• ⚡ **Resource optimization** — Reducing costs and improving performance\n• 🎫 **Support tickets** — Filing and tracking technical issues\n• 📊 **Usage insights** — Detailed breakdowns of your infrastructure\n\nWhat would you like to know?",
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("optim") || lower.includes("save") || lower.includes("reduce") || lower.includes("recommend") || lower.includes("downsize")) {
    return agentResponses.optimize;
  }
  if (lower.includes("credit") || lower.includes("balance") || lower.includes("spend") || lower.includes("cost") || lower.includes("burn")) {
    return agentResponses.credits;
  }
  if (lower.includes("support") || lower.includes("ticket") || lower.includes("help") || lower.includes("issue")) {
    return agentResponses.support;
  }
  return agentResponses.default;
}

export function AiAgent() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "agent",
      content: "Hey! 👋 I'm your SuperCloud AI assistant. I can analyze your credit usage, suggest optimizations, and help with support. What can I do for you?",
      timestamp: new Date(),
      status: "complete",
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };
    const agentId = `a-${Date.now()}`;
    setMessages((prev) => [
      ...prev,
      userMsg,
      { id: agentId, role: "agent", content: "", timestamp: new Date(), status: "thinking" },
    ]);
    const response = getResponse(input);
    setInput("");

    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) => (m.id === agentId ? { ...m, status: "analyzing" as const } : m))
      );
    }, 1000);

    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === agentId ? { ...m, content: response, status: "complete" as const } : m
        )
      );
    }, 2500);
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center shadow-2xl shadow-violet-500/30 hover:shadow-violet-500/50 hover:scale-110 transition-all duration-300 group"
      >
        <Bot className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#050510] animate-pulse" />
      </button>
    );
  }

  return (
    <div
      className={`fixed z-50 transition-all duration-300 ${
        minimized
          ? "bottom-6 right-6 w-72 h-14"
          : "bottom-6 right-6 w-[400px] h-[600px]"
      } flex flex-col rounded-2xl border border-white/[0.08] bg-[#0a0a1a]/95 backdrop-blur-2xl shadow-2xl shadow-black/40 overflow-hidden`}
    >
      <div className="flex items-center justify-between px-4 h-14 shrink-0 border-b border-white/[0.06] bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="text-sm font-bold text-white">AI Agent</span>
            <Badge variant="success" className="ml-2 text-[10px] py-0">Online</Badge>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setMinimized(!minimized)} className="p-1.5 rounded-lg text-white/30 hover:text-white/60 hover:bg-white/[0.05] transition-all">
            {minimized ? <Maximize2 className="w-4 h-4" /> : <Minus className="w-4 h-4" />}
          </button>
          <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-all">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!minimized && (
        <>
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-br-md"
                      : "bg-white/[0.05] border border-white/[0.06] text-white/80 rounded-bl-md"
                  }`}
                >
                  {msg.status === "thinking" && (
                    <div className="flex items-center gap-2 text-violet-300">
                      <Sparkles className="w-4 h-4 animate-spin" />
                      <span className="text-xs font-medium">Thinking...</span>
                    </div>
                  )}
                  {msg.status === "analyzing" && (
                    <div className="flex items-center gap-2 text-cyan-300">
                      <Sparkles className="w-4 h-4 animate-pulse" />
                      <span className="text-xs font-medium">Analyzing your data...</span>
                    </div>
                  )}
                  {msg.status === "complete" && (
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                  )}
                  {!msg.status && <div className="whitespace-pre-wrap">{msg.content}</div>}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-white/[0.06] bg-white/[0.01]">
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask about credits, resources..."
                className="flex-1 h-10 text-sm"
              />
              <Button size="icon" onClick={sendMessage} disabled={!input.trim()} className="shrink-0 h-10 w-10">
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex gap-1.5 mt-2">
              {["Credit analysis", "Optimize costs", "Support ticket"].map((q) => (
                <button
                  key={q}
                  onClick={() => { setInput(q); setTimeout(sendMessage, 50); }}
                  className="px-2.5 py-1 rounded-lg text-[10px] font-medium text-white/30 bg-white/[0.03] border border-white/[0.06] hover:text-white/50 hover:bg-white/[0.06] transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

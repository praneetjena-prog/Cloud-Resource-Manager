"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Card, CardContent, Input, Label, Textarea } from "@supercloud/shared-ui";
import { Send, Mail, MapPin, Phone, CheckCircle } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  company: z.string().optional(),
  category: z.string().min(1, "Please select a category"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactForm) => {
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-300 text-sm font-medium mb-6">
            <Mail className="w-4 h-4" />
            Get In Touch
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-6">
            Let&apos;s build
            <br />
            <span className="gradient-text">something great.</span>
          </h2>
          <p className="text-lg text-white/40 max-w-xl mx-auto">
            Whether you need technical support or want to explore enterprise solutions, we&apos;re here to help.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
          <div className="lg:col-span-2 space-y-6">
            {[
              { icon: Mail, label: "Email", value: "hello@supercloud.dev" },
              { icon: Phone, label: "Phone", value: "+1 (415) 555-0199" },
              { icon: MapPin, label: "HQ", value: "San Francisco, CA" },
            ].map((item) => (
              <Card key={item.label} className="hover:border-white/[0.12]">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600/20 to-cyan-600/20 flex items-center justify-center border border-white/[0.06]">
                    <item.icon className="w-5 h-5 text-violet-300" />
                  </div>
                  <div>
                    <div className="text-xs text-white/40 font-medium">{item.label}</div>
                    <div className="text-sm text-white font-semibold">{item.value}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="lg:col-span-3">
            <CardContent className="p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6">
                    <CheckCircle className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-white/40">We&apos;ll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contact-name">Name</Label>
                      <Input id="contact-name" placeholder="Your name" {...register("name")} />
                      {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-email">Email</Label>
                      <Input id="contact-email" placeholder="you@company.com" {...register("email")} />
                      {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contact-company">Company</Label>
                      <Input id="contact-company" placeholder="Optional" {...register("company")} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-category">Category</Label>
                      <select
                        id="contact-category"
                        {...register("category")}
                        className="flex h-11 w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 backdrop-blur-sm"
                      >
                        <option value="" className="bg-[#0a0a1a]">Select category</option>
                        <option value="sales" className="bg-[#0a0a1a]">Sales Inquiry</option>
                        <option value="support" className="bg-[#0a0a1a]">Technical Support</option>
                        <option value="billing" className="bg-[#0a0a1a]">Billing Question</option>
                        <option value="partnership" className="bg-[#0a0a1a]">Partnership</option>
                      </select>
                      {errors.category && <p className="text-xs text-red-400">{errors.category.message}</p>}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-message">Message</Label>
                    <Textarea id="contact-message" placeholder="Tell us about your project..." {...register("message")} />
                    {errors.message && <p className="text-xs text-red-400">{errors.message.message}</p>}
                  </div>
                  <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { X, Sparkles, CheckCircle2, Phone, Mail, User, MessageSquare } from "lucide-react";

export default function ConsultationModal({ isOpen, onClose, projectTitle = "" }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    budget: "AED 3M - 5M",
    timeline: "Immediate / 3 Months",
    message: projectTitle ? `I am interested in ${projectTitle}. Please share full brochure and availability.` : "",
  });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    // Send inquiry to WordPress Contact Form 7 endpoint or simulate success
    try {
      // In production, we POST to /wp-json/contact-form-7/v1/contact-forms/{id}/feedback
      await new Promise((r) => setTimeout(r, 1200));
      setStatus("success");
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-xl rounded-lg bg-neutral-900 border border-neutral-800 p-6 sm:p-8 text-white shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow Accent */}
        <div className="absolute top-0 right-0 h-40 w-40 bg-[#c5a880]/15 blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 h-8 w-8 flex items-center justify-center rounded-full border border-neutral-700 text-neutral-400 hover:text-white hover:border-neutral-500 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {status === "success" ? (
          <div className="text-center py-10 space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#c5a880]/20 text-[#dfc498]">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="font-serif-luxury text-2xl uppercase tracking-wider text-stone-100">
              Inquiry Received
            </h3>
            <p className="text-sm text-stone-400 max-w-md mx-auto">
              Thank you for reaching out to KL MAQAN. Our senior property advisor will connect with you via WhatsApp & Email within 15 minutes.
            </p>
            <button
              onClick={() => {
                setStatus("idle");
                onClose();
              }}
              className="mt-6 inline-flex items-center gap-2 rounded-sm bg-[#c5a880] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-neutral-950"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c5a880]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Private VIP Consultation</span>
            </div>
            <h2 className="mt-2 font-serif-luxury text-2xl uppercase tracking-wider text-stone-100">
              {projectTitle ? `Inquire About ${projectTitle}` : "Schedule Property Consultation"}
            </h2>
            <p className="mt-1 text-xs text-stone-400">
              Receive confidential price sheets, off-market floor plans, and VIP launch allocations.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-stone-400 mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-stone-500" />
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Sheikh Rashid Al Maktoum"
                      className="w-full rounded-sm border border-neutral-700 bg-neutral-800/80 pl-9 pr-3 py-2 text-sm text-white placeholder-stone-600 focus:border-[#c5a880] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-stone-400 mb-1">
                    Phone / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-stone-500" />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+971 50 000 0000"
                      className="w-full rounded-sm border border-neutral-700 bg-neutral-800/80 pl-9 pr-3 py-2 text-sm text-white placeholder-stone-600 focus:border-[#c5a880] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-stone-400 mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-stone-500" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="client@investment.com"
                    className="w-full rounded-sm border border-neutral-700 bg-neutral-800/80 pl-9 pr-3 py-2 text-sm text-white placeholder-stone-600 focus:border-[#c5a880] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-stone-400 mb-1">
                    Target Budget
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full rounded-sm border border-neutral-700 bg-neutral-800/80 px-3 py-2 text-sm text-stone-200 focus:border-[#c5a880] focus:outline-none"
                  >
                    <option value="AED 1.5M - 3M">AED 1.5M - 3M</option>
                    <option value="AED 3M - 5M">AED 3M - 5M</option>
                    <option value="AED 5M - 10M">AED 5M - 10M</option>
                    <option value="AED 10M - 20M+">AED 10M - 20M+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-stone-400 mb-1">
                    Timeline
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full rounded-sm border border-neutral-700 bg-neutral-800/80 px-3 py-2 text-sm text-stone-200 focus:border-[#c5a880] focus:outline-none"
                  >
                    <option value="Immediate / 30 Days">Immediate / 30 Days</option>
                    <option value="1 - 3 Months">1 - 3 Months</option>
                    <option value="Exploring Options">Exploring Options</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-stone-400 mb-1">
                  Specific Requirements / Message
                </label>
                <textarea
                  rows="3"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about desired views, preferred developers, or Golden Visa eligibility..."
                  className="w-full rounded-sm border border-neutral-700 bg-neutral-800/80 px-3 py-2 text-sm text-white placeholder-stone-600 focus:border-[#c5a880] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full flex items-center justify-center gap-2 rounded-sm bg-gradient-to-r from-[#dfc498] via-[#c5a880] to-[#9f8052] py-3 text-xs font-bold uppercase tracking-widest text-neutral-950 transition-all duration-300 hover:opacity-95 hover:shadow-lg hover:shadow-[#c5a880]/30"
              >
                {status === "loading" ? "Submitting Inquiry..." : "Submit Confidential Inquiry"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Sparkles,
  CheckCircle2,
  MessageSquare,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    propertyType: "Penthouse / Villa",
    budget: "AED 3M - 5M",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="luxury-page w-full bg-[#faf9f6] min-h-screen">
      {/* 1. HERO BANNER */}
      <section className="relative flex min-h-[420px] w-full flex-col justify-center overflow-hidden pt-36 pb-20 bg-neutral-950 text-white">
        <Image
          src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2000&q=85"
          alt="Dubai Skyline Downtown"
          fill
          priority
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-black/70" />

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
          <p className="text-xs uppercase tracking-[0.3em] text-[#dfc498] font-semibold">
            GET IN TOUCH
          </p>
          <h1 className="mt-4 max-w-3xl font-serif-luxury text-3xl font-bold uppercase leading-tight tracking-wide text-stone-100 sm:text-4xl md:text-5xl">
            Connect With Our <br />
            <span className="gold-gradient-text">Dubai Property Directors</span>
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-stone-300 font-light">
            Whether you are acquiring a signature primary residence, seeking
            off-plan developer allocations, or exploring UAE Golden Visa
            eligibility, our advisors are at your service.
          </p>
        </div>
      </section>

      {/* 2. MAIN CONTACT SECTION */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Details & Office Coordinates */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#9f8052]">
                Dubai Headquarters
              </span>
              <h2 className="mt-2 font-serif-luxury text-3xl font-bold uppercase text-neutral-900">
                KL MAQAN Advisory Office
              </h2>
              <p className="mt-3 text-sm text-stone-600 leading-relaxed font-light">
                Conveniently located in Downtown Dubai overlooking Burj Khalifa
                and Dubai Mall. Private client appointments available 7 days a
                week.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 rounded-md border border-neutral-200 bg-white p-5 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-neutral-900 text-[#dfc498] shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-serif-luxury font-bold uppercase text-neutral-900 text-sm">
                    Physical Address
                  </h3>
                  <p className="text-xs text-stone-600 mt-1">
                    Downtown Boulevard, Downtown Dubai, United Arab Emirates
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-md border border-neutral-200 bg-white p-5 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-neutral-900 text-[#dfc498] shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-serif-luxury font-bold uppercase text-neutral-900 text-sm">
                    Direct Phone & WhatsApp
                  </h3>
                  <p className="text-xs text-stone-600 mt-1">
                    +971 4 000 0000 / +971 50 000 0000
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-md border border-neutral-200 bg-white p-5 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-neutral-900 text-[#dfc498] shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-serif-luxury font-bold uppercase text-neutral-900 text-sm">
                    Confidential Email
                  </h3>
                  <p className="text-xs text-stone-600 mt-1">
                    concierge@klmaqan.com / vip@klmaqan.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-md border border-neutral-200 bg-white p-5 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-neutral-900 text-[#dfc498] shrink-0">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-serif-luxury font-bold uppercase text-neutral-900 text-sm">
                    Advisory Hours
                  </h3>
                  <p className="text-xs text-stone-600 mt-1">
                    Monday – Sunday: 9:00 AM – 8:00 PM GST
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="rounded-lg border border-neutral-200 bg-white p-8 sm:p-10 shadow-lg">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#c5a880]/20 text-[#9f8052]">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h3 className="font-serif-luxury text-2xl font-bold uppercase text-neutral-900">
                    Message Successfully Sent
                  </h3>
                  <p className="text-xs text-stone-600 max-w-md mx-auto">
                    Thank you for contacting KL MAQAN. One of our senior
                    property directors will review your inquiry and reach out
                    within 15 minutes.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 rounded-sm bg-[#c5a880] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-neutral-950"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#9f8052]">
                    <Sparkles className="h-4 w-4 text-[#c5a880]" />
                    <span>Inquire Online</span>
                  </div>
                  <h3 className="font-serif-luxury text-2xl font-bold uppercase text-neutral-900">
                    Send A Confidential Inquiry
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-stone-600 mb-1 font-semibold">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="Johnathan Sterling"
                        className="w-full rounded-sm border border-neutral-300 bg-white px-3.5 py-2.5 text-xs text-neutral-900 focus:border-[#c5a880] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-stone-600 mb-1 font-semibold">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="+971 50 000 0000"
                        className="w-full rounded-sm border border-neutral-300 bg-white px-3.5 py-2.5 text-xs text-neutral-900 focus:border-[#c5a880] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-600 mb-1 font-semibold">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="client@investments.com"
                      className="w-full rounded-sm border border-neutral-300 bg-white px-3.5 py-2.5 text-xs text-neutral-900 focus:border-[#c5a880] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-stone-600 mb-1 font-semibold">
                        Interested Property Type
                      </label>
                      <select
                        value={formData.propertyType}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            propertyType: e.target.value,
                          })
                        }
                        className="w-full rounded-sm border border-neutral-300 bg-white px-3 py-2.5 text-xs text-neutral-900 focus:border-[#c5a880] focus:outline-none cursor-pointer"
                      >
                        <option value="Penthouse / Villa">
                          Penthouse / Villa
                        </option>
                        <option value="Off-Plan Investment">
                          Off-Plan Investment
                        </option>
                        <option value="Beachfront Waterfront">
                          Beachfront Waterfront
                        </option>
                        <option value="Commercial / Full Building">
                          Commercial / Full Building
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-stone-600 mb-1 font-semibold">
                        Budget Range
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) =>
                          setFormData({ ...formData, budget: e.target.value })
                        }
                        className="w-full rounded-sm border border-neutral-300 bg-white px-3 py-2.5 text-xs text-neutral-900 focus:border-[#c5a880] focus:outline-none cursor-pointer"
                      >
                        <option value="AED 1.5M - 3M">AED 1.5M - 3M</option>
                        <option value="AED 3M - 5M">AED 3M - 5M</option>
                        <option value="AED 5M - 10M">AED 5M - 10M</option>
                        <option value="AED 10M+">AED 10M+</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-600 mb-1 font-semibold">
                      Your Message / Investment Goals
                    </label>
                    <textarea
                      rows="4"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Please mention preferred locations, payment plan preferences, or Golden Visa questions..."
                      className="w-full rounded-sm border border-neutral-300 bg-white p-3 text-xs text-neutral-900 focus:border-[#c5a880] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 rounded-sm bg-neutral-900 py-3.5 text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-[#c5a880] hover:text-neutral-950"
                  >
                    <Send className="h-4 w-4" />
                    <span>
                      {loading
                        ? "Sending Inquiry..."
                        : "Submit Confidential Inquiry"}
                    </span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

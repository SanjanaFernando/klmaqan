"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Crown,
  Sparkles,
  Check,
  ArrowRight,
  Phone,
  Mail,
  Layers,
  Clock,
  Gem,
  ShieldCheck,
  CheckCircle2,
  FileText,
} from "lucide-react";
import ConsultationModal from "@/components/ConsultationModal";

/**
 * Robust parser for ACF features text.
 * Handles:
 *  - Simple newline-separated lines: "Feature 1\nFeature 2"
 *  - Quoted comma-per-line: '"Feature 1",\n"Feature 2",'
 *  - Single-line comma-separated quoted: '"Feat 1", "Feat 2"'
 */
function parseFeatures(rawText) {
  if (!rawText) return [];
  if (Array.isArray(rawText))
    return rawText.map((f) => String(f).trim()).filter(Boolean);

  const text = rawText.trim();

  // Strategy 1: split on newlines first
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.replace(/^[\s"',•*\-]+|[\s"',]+$/g, "").trim())
    .filter(Boolean);

  if (lines.length > 1) return lines;

  // Strategy 2: try to extract quoted strings from a single-line CSV
  const quotedMatches = text.match(/"([^"]+)"/g);
  if (quotedMatches && quotedMatches.length > 1) {
    return quotedMatches
      .map((m) => m.replace(/^"|"$/g, "").trim())
      .filter(Boolean);
  }

  // Strategy 3: plain comma-separated (fallback)
  if (text.includes(",")) {
    return text
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }

  // Strategy 4: single item
  return [text].filter(Boolean);
}

export default function PackagesClient({ packages = [] }) {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleSelectPackage = (pkgTitle) => {
    setSelectedPackage(pkgTitle);
    setModalOpen(true);
  };

  return (
    <div className="luxury-page w-full bg-[#faf9f6] min-h-screen">
      {/* 1. HERO BANNER */}
      <section className="relative flex min-h-[440px] w-full flex-col justify-center overflow-hidden pt-36 pb-24 bg-neutral-950 text-white">
        <Image
          src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2000&q=85"
          alt="Dubai Skyline Packages"
          fill
          priority
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-black/70" />

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#c5a880]/40 bg-neutral-900/80 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#dfc498] backdrop-blur-md">
            <Crown className="h-3.5 w-3.5 text-[#c5a880]" />
            <span>VIP Real Estate Programs</span>
          </div>

          <h1 className="mt-5 font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-wide leading-tight text-stone-100 max-w-4xl">
            Exclusive Investor <br />
            <span className="gold-gradient-text">Packages & Programs</span>
          </h1>

          <p className="mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-stone-300 font-light">
            Bespoke tiers tailored for international investors, family offices,
            and high-yield property acquirers in Dubai.
          </p>
        </div>
      </section>

      {/* 2. REAL PACKAGES RENDERED FROM ACF */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 -mt-12 relative z-20 pb-24">
        {packages.length === 0 ? (
          <div className="my-12 rounded-lg border border-dashed border-neutral-300 bg-white p-12 text-center max-w-xl mx-auto shadow-sm">
            <Layers className="h-10 w-10 text-stone-400 mx-auto" />
            <h2 className="mt-4 font-serif-luxury text-xl font-bold uppercase text-neutral-900">
              No Packages Found
            </h2>
            <p className="mt-2 text-xs text-stone-500">
              No packages found at{" "}
              <code className="bg-stone-100 px-1 py-0.5 rounded text-neutral-800">
                /wp-json/wp/v2/packages
              </code>
              .
            </p>
          </div>
        ) : (
          <div
            className={`grid grid-cols-1 ${
              packages.length === 1
                ? "max-w-md mx-auto"
                : packages.length === 2
                  ? "lg:grid-cols-2 max-w-5xl mx-auto"
                  : "md:grid-cols-2 lg:grid-cols-3"
            } gap-8`}
          >
            {packages.map((pkg) => {
              const title = pkg.title?.rendered || "Package";
              const content = pkg.content?.rendered || "";
              const slug = pkg.slug || "";
              const acf = pkg.acf || {};

              const price = acf.package_price || "";
              const tagline = acf.package_tagline || "";
              const isFeatured =
                acf.is_featured === true ||
                acf.is_featured === "1" ||
                acf.is_featured === 1 ||
                acf.is_featured === "true";

              return (
                <div
                  key={pkg.id}
                  className={`relative rounded-2xl flex flex-col justify-between transition-all duration-500 overflow-hidden ${
                    isFeatured
                      ? "bg-neutral-950 text-white border-2 border-[#c5a880] shadow-2xl shadow-[#c5a880]/20 lg:-translate-y-2"
                      : "bg-white text-neutral-900 border border-neutral-200 shadow-xl"
                  }`}
                >
                  {/* Glowing Top Gold Gradient Line for Featured / Dark Line for Normal */}
                  <div
                    className={`h-2 w-full ${
                      isFeatured
                        ? "bg-gradient-to-r from-[#dfc498] via-[#c5a880] to-[#9f8052]"
                        : "bg-neutral-900"
                    }`}
                  />

                  <div className="p-8 sm:p-10 flex-1">
                    {/* Header Top Badges */}
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-md ${
                            isFeatured
                              ? "bg-[#c5a880] text-neutral-950 shadow-lg"
                              : "bg-neutral-900 text-[#dfc498]"
                          }`}
                        >
                          {isFeatured ? (
                            <Crown className="h-6 w-6 stroke-[2.2]" />
                          ) : (
                            <Gem className="h-6 w-6" />
                          )}
                        </div>
                        <div>
                          <span
                            className={`text-[10px] uppercase tracking-widest font-bold block ${
                              isFeatured ? "text-[#dfc498]" : "text-[#9f8052]"
                            }`}
                          >
                            {isFeatured ? "★ Featured Tier" : "VIP Tier"}
                          </span>
                          <h2 className="font-serif-luxury text-3xl font-bold uppercase tracking-wide">
                            {title}
                          </h2>
                        </div>
                      </div>

                      <Link
                        href={`/packages/${slug}`}
                        className={`text-xs uppercase tracking-wider font-semibold hover:underline flex items-center gap-1 ${
                          isFeatured ? "text-[#dfc498]" : "text-[#9f8052]"
                        }`}
                      >
                        <span>Details</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>

                    {/* Tagline from ACF */}
                    {tagline && (
                      <p
                        className={`mt-4 text-xs sm:text-sm leading-relaxed font-medium ${
                          isFeatured ? "text-stone-300" : "text-stone-600"
                        }`}
                      >
                        {tagline}
                      </p>
                    )}

                    {/* Price Box from ACF */}
                    {price && (
                      <div
                        className={`mt-6 rounded-lg p-5 border ${
                          isFeatured
                            ? "bg-stone-900/90 border-stone-800 text-[#dfc498]"
                            : "bg-stone-50 border-neutral-200 text-neutral-900"
                        }`}
                      >
                        <span className="text-[10px] uppercase tracking-widest text-stone-400 block font-semibold">
                          Pricing & Capital Allocation
                        </span>
                        <div className="font-serif-luxury text-2xl sm:text-3xl font-bold mt-1">
                          {price}
                        </div>
                      </div>
                    )}

                    {/* Content Narrative from WordPress (if present) */}
                    {content && (
                      <div
                        className={`mt-5 text-xs leading-relaxed font-light ${
                          isFeatured ? "text-stone-300" : "text-stone-600"
                        }`}
                        dangerouslySetInnerHTML={{ __html: content }}
                      />
                    )}
                  </div>

                  {/* Actions Footer */}
                  <div
                    className={`p-8 sm:p-10 pt-0 border-t space-y-3 ${
                      isFeatured ? "border-stone-800" : "border-neutral-100"
                    }`}
                  >
                    <button
                      onClick={() => handleSelectPackage(title)}
                      className={`w-full flex items-center justify-center gap-2 rounded-sm py-4 text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                        isFeatured
                          ? "bg-gradient-to-r from-[#dfc498] via-[#c5a880] to-[#9f8052] text-neutral-950 shadow-lg hover:shadow-xl hover:shadow-[#c5a880]/30 hover:scale-[1.02]"
                          : "bg-neutral-900 text-white hover:bg-[#c5a880] hover:text-neutral-950"
                      }`}
                    >
                      <span>Inquire About {title} Package</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>

                    <Link
                      href={`/packages/${slug}`}
                      className={`block text-center text-[11px] uppercase tracking-wider py-1 font-semibold ${
                        isFeatured
                          ? "text-stone-400 hover:text-white"
                          : "text-stone-500 hover:text-neutral-900"
                      }`}
                    >
                      View Comprehensive Itinerary & Breakdown →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 3. WHY CHOOSE KL MAQAN PACKAGES */}
      <section className="bg-stone-100 py-20 px-5 sm:px-8 border-t border-stone-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#9f8052]">
              The KL MAQAN Advantage
            </span>
            <h2 className="mt-2 font-serif-luxury text-3xl sm:text-4xl font-bold uppercase text-neutral-900">
              Complete VIP Investor Support
            </h2>
            <p className="mt-3 text-sm text-stone-600">
              Beyond standard brokerage: we provide holistic private wealth
              advisory and seamless residency structuring.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-md bg-white p-6 border border-neutral-200 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-neutral-900 p-1.5">
                <Image
                  src="/logo.png"
                  alt="KL MAQAN"
                  width={24}
                  height={24}
                  className="h-6 w-6 object-contain"
                />
              </div>
              <h3 className="mt-4 font-serif-luxury font-bold uppercase text-neutral-900 text-base">
                Direct Tier-1 Access
              </h3>
              <p className="mt-2 text-xs text-stone-600 leading-relaxed">
                Zero buyer fees and exclusive priority launch access with Emaar,
                Nakheel, and top Dubai developers.
              </p>
            </div>

            <div className="rounded-md bg-white p-6 border border-neutral-200 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-neutral-900 text-[#dfc498]">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-serif-luxury font-bold uppercase text-neutral-900 text-base">
                Golden Visa Legal
              </h3>
              <p className="mt-2 text-xs text-stone-600 leading-relaxed">
                End-to-end processing for your 10-year UAE residency visa
                including medical typing and Emirates ID.
              </p>
            </div>

            <div className="rounded-md bg-white p-6 border border-neutral-200 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-neutral-900 text-[#dfc498]">
                <Clock className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-serif-luxury font-bold uppercase text-neutral-900 text-base">
                Asset Management
              </h3>
              <p className="mt-2 text-xs text-stone-600 leading-relaxed">
                Turnkey post-handover management, tenant screening, and
                maximizing net rental dividend returns.
              </p>
            </div>

            <div className="rounded-md bg-white p-6 border border-neutral-200 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-neutral-900 text-[#dfc498]">
                <Gem className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-serif-luxury font-bold uppercase text-neutral-900 text-base">
                Private Wealth
              </h3>
              <p className="mt-2 text-xs text-stone-600 leading-relaxed">
                Confidential structuring, escrow coordination, and
                multi-currency banking setup.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        projectTitle={
          selectedPackage ? `${selectedPackage} Package` : "Investment Package"
        }
      />
    </div>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Crown,
  Sparkles,
  Check,
  ArrowRight,
  Building2,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Gem,
  FileText,
  Plane,
  Download,
  Share2,
  ChevronLeft,
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

export default function SinglePackageClient({ packageItem }) {
  const [modalOpen, setModalOpen] = useState(false);

  const title = packageItem?.title?.rendered || "Package";
  const content = packageItem?.content?.rendered || "";
  const acf = packageItem?.acf || {};

  const price = acf.package_price || "";
  const tagline = acf.package_tagline || "";
  const duration = acf.package_duration || "";
  const isFeatured =
    acf.is_featured === true ||
    acf.is_featured === "1" ||
    acf.is_featured === 1;
  const features = parseFeatures(acf.package_features);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${title} Package | KL MAQAN`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Package link copied to clipboard!");
    }
  };

  return (
    <div className="luxury-page w-full bg-[#faf9f6] min-h-screen pt-24 pb-20">
      {/* 1. BREADCRUMBS */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200">
        <nav className="flex items-center text-xs uppercase tracking-[0.15em] text-stone-500">
          <Link href="/" className="hover:text-neutral-900 transition-colors">
            Home
          </Link>
          <span className="mx-2 text-stone-300">/</span>
          <Link
            href="/packages"
            className="hover:text-neutral-900 transition-colors"
          >
            Packages
          </Link>
          <span className="mx-2 text-stone-300">/</span>
          <span className="font-semibold text-neutral-900">{title}</span>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 rounded-sm border border-neutral-300 bg-white px-3 py-1.5 text-xs text-neutral-700 hover:bg-neutral-50 transition-colors"
          >
            <Share2 className="h-3.5 w-3.5 text-stone-500" />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* 2. HERO OVERVIEW */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#c5a880]/40 bg-neutral-900/90 px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#dfc498]">
                <Crown className="h-3 w-3 text-[#c5a880]" />
                <span>
                  {isFeatured ? "★ Featured Package Tier" : "VIP Package Tier"}
                </span>
              </div>

              <h1 className="mt-3 font-serif-luxury text-3xl sm:text-5xl font-bold uppercase text-neutral-900 leading-tight">
                {title} Package
              </h1>

              {tagline && (
                <p className="mt-2 text-sm sm:text-base text-stone-600 font-light leading-relaxed">
                  {tagline}
                </p>
              )}

              {(price || duration) && (
                <div className="mt-6 flex flex-wrap items-baseline gap-4 border-y border-neutral-200 py-4">
                  {price && (
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-stone-400 block font-semibold">
                        Package Price / Target Bracket
                      </span>
                      <div className="font-serif-luxury text-3xl font-bold text-[#9f8052]">
                        {price}
                      </div>
                    </div>
                  )}
                  {duration && (
                    <div className="ml-auto flex items-center gap-2 text-xs text-stone-600 bg-stone-100 px-3 py-1.5 rounded-sm">
                      <Clock className="h-4 w-4 text-[#c5a880]" />
                      <span>
                        Timeline: <strong>{duration}</strong>
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Description Narrative (From WordPress Post Editor) */}
            {content && (
              <div className="rounded-lg border border-neutral-200 bg-white p-6 sm:p-8 shadow-sm">
                <h2 className="font-serif-luxury text-2xl font-bold uppercase text-neutral-900">
                  Package Overview
                </h2>
                <div
                  className="mt-4 text-sm leading-relaxed text-stone-700 space-y-4 font-light"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </div>
            )}

            {/* Detailed Feature Inclusions (From ACF) */}
            {features.length > 0 && (
              <div className="rounded-lg border border-neutral-200 bg-white p-6 sm:p-8 shadow-sm">
                <h2 className="font-serif-luxury text-2xl font-bold uppercase text-neutral-900">
                  Features & Inclusions
                </h2>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {features.map((feat, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 rounded-md bg-stone-50 p-4 border border-neutral-100"
                    >
                      <div className="h-5 w-5 rounded-full bg-[#c5a880]/20 text-[#9f8052] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                      </div>
                      <span className="text-xs font-medium text-stone-800 leading-relaxed">
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4-Step VIP Workflow */}
            <div className="rounded-lg border border-neutral-200 bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="font-serif-luxury text-2xl font-bold uppercase text-neutral-900">
                How It Works: Step-by-Step Acquisition
              </h2>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
                <div className="rounded-md bg-stone-50 p-4 border border-neutral-200">
                  <span className="font-serif-luxury text-2xl font-bold text-[#9f8052]">
                    01
                  </span>
                  <div className="font-bold text-xs uppercase mt-1">
                    Portfolio Strategy
                  </div>
                  <p className="text-[11px] text-stone-500 mt-1">
                    Confidential targets & ROI alignment
                  </p>
                </div>
                <div className="rounded-md bg-stone-50 p-4 border border-neutral-200">
                  <span className="font-serif-luxury text-2xl font-bold text-[#9f8052]">
                    02
                  </span>
                  <div className="font-bold text-xs uppercase mt-1">
                    VIP Viewing & Selection
                  </div>
                  <p className="text-[11px] text-stone-500 mt-1">
                    Private tours & off-market access
                  </p>
                </div>
                <div className="rounded-md bg-stone-50 p-4 border border-neutral-200">
                  <span className="font-serif-luxury text-2xl font-bold text-[#9f8052]">
                    03
                  </span>
                  <div className="font-bold text-xs uppercase mt-1">
                    Legal & Escrow
                  </div>
                  <p className="text-[11px] text-stone-500 mt-1">
                    Contract structuring & Golden Visa
                  </p>
                </div>
                <div className="rounded-md bg-stone-50 p-4 border border-neutral-200">
                  <span className="font-serif-luxury text-2xl font-bold text-[#9f8052]">
                    04
                  </span>
                  <div className="font-bold text-xs uppercase mt-1">
                    Asset Optimization
                  </div>
                  <p className="text-[11px] text-stone-500 mt-1">
                    Handover & high-yield management
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (4 cols) Sticky Inquire Box */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              <div className="rounded-xl bg-neutral-950 p-6 sm:p-8 text-white border border-[#c5a880]/40 shadow-2xl">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#c5a880] font-bold">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Direct Advisory Desk</span>
                </div>

                <h3 className="mt-2 font-serif-luxury text-2xl uppercase tracking-wider text-stone-100">
                  Inquire About {title}
                </h3>

                <p className="mt-2 text-xs text-stone-400">
                  Schedule a private consultation with our Senior Director to
                  discuss customized allocations under this tier.
                </p>

                <div className="mt-6 space-y-3">
                  <button
                    onClick={() => setModalOpen(true)}
                    className="w-full flex items-center justify-center gap-2 rounded-sm bg-gradient-to-r from-[#dfc498] via-[#c5a880] to-[#9f8052] py-3.5 text-xs font-bold uppercase tracking-widest text-neutral-950 shadow-lg hover:opacity-95 transition-opacity"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Inquire / Enroll in {title}</span>
                  </button>

                  <a
                    href="https://wa.me/971500000000"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-center gap-2 rounded-sm border border-stone-700 bg-neutral-900 py-3 text-xs font-semibold uppercase tracking-wider text-stone-200 hover:border-[#c5a880] hover:text-white transition-all"
                  >
                    <Phone className="h-4 w-4 text-[#c5a880]" />
                    <span>WhatsApp Senior Director</span>
                  </a>
                </div>

                <div className="mt-8 border-t border-neutral-800 pt-5 space-y-2 text-xs text-stone-400">
                  <div className="flex items-center justify-between">
                    <span>Buyer Commission:</span>
                    <strong className="text-white">
                      0% (Direct Developer)
                    </strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Golden Visa Support:</span>
                    <strong className="text-[#dfc498]">Included</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Legal Due Diligence:</span>
                    <strong className="text-white">Included</strong>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Link
                  href="/packages"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#9f8052] hover:text-neutral-900"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Compare All Packages</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      <ConsultationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        projectTitle={`${title} Package`}
      />
    </div>
  );
}

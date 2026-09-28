"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Landmark,
  Percent,
  Calendar,
  Wallet,
  ShieldCheck,
  CheckCircle2,
  Phone,
  Mail,
  Share2,
  ChevronLeft,
  ArrowRight,
  Calculator,
  FileCheck2,
  Clock,
  Sparkles,
} from "lucide-react";
import ConsultationModal from "@/components/ConsultationModal";

export default function SingleLoanClient({ loan }) {
  const [modalOpen, setModalOpen] = useState(false);

  const title = loan?.title?.rendered || loan?.rawTitle || "Financing Tier";
  const acf = loan?.acf || loan?.loanDetails || {};

  const interestRate = acf.interest_rate || acf.interestRate || "Market Competitive";
  const maxTenure = acf.max_tenure || acf.maxTenure || "25 Years";
  const minDownPayment = acf.min_down_payment || acf.minDownPayment || "20%";
  const maxLoanAmount = acf.max_loan_amount || acf.maxLoanAmount || "AED 50M+";

  // Calculator state preloaded
  const parsedRate = parseFloat(interestRate.replace(/[^0-9.]/g, "")) || 3.99;
  const [calcPrice, setCalcPrice] = useState(3000000);
  const [calcDownPaymentPercent, setCalcDownPaymentPercent] = useState(20);
  const [calcRate, setCalcRate] = useState(parsedRate);
  const [calcYears, setCalcYears] = useState(25);

  const loanAmount = calcPrice * (1 - calcDownPaymentPercent / 100);
  const monthlyRate = calcRate / 100 / 12;
  const totalMonths = calcYears * 12;

  const monthlyEMI =
    monthlyRate > 0 && totalMonths > 0
      ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
      : loanAmount / (totalMonths || 1);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${title} Mortgage Option | KL MAQAN`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
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
          <Link href="/loans" className="hover:text-neutral-900 transition-colors">
            Financing & Loans
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
          <Link
            href="/loans"
            className="flex items-center gap-1 text-xs text-stone-600 hover:text-neutral-900 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>All Loans</span>
          </Link>
        </div>
      </div>

      {/* 2. HERO HEADER */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 pt-10 pb-6">
        <div className="rounded-2xl bg-neutral-950 text-white p-8 sm:p-12 relative overflow-hidden shadow-2xl border border-neutral-800">
          <div className="absolute top-0 right-0 h-64 w-64 bg-[#c5a880]/15 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#c5a880]/40 bg-neutral-900 px-3.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-[#dfc498]">
                <Landmark className="h-3.5 w-3.5 text-[#c5a880]" />
                <span>Prime Mortgage Structure</span>
              </div>

              <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold uppercase tracking-wide text-stone-100">
                {title} Financing
              </h1>

              <p className="text-sm sm:text-base text-stone-300 font-light leading-relaxed">
                Structured borrowing solution with competitive interest terms,
                rapid bank pre-approval, and comprehensive advisory for Dubai
                real estate.
              </p>
            </div>

            <div className="bg-neutral-900/90 border border-[#c5a880]/40 rounded-xl p-6 text-center sm:min-w-[280px]">
              <span className="text-[10px] uppercase tracking-widest text-stone-400 font-semibold block">
                Headline Rate
              </span>
              <div className="mt-1 font-serif-luxury text-4xl sm:text-5xl font-extrabold text-[#dfc498]">
                {interestRate}
              </div>
              <button
                onClick={() => setModalOpen(true)}
                className="mt-5 w-full py-3 px-5 rounded-sm bg-gradient-to-r from-[#dfc498] via-[#c5a880] to-[#9f8052] text-neutral-950 text-xs uppercase tracking-widest font-bold shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2"
              >
                <span>Apply For This Loan</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. KEY SPECIFICATIONS */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 text-stone-500 mb-2">
              <Percent className="h-5 w-5 text-[#c5a880]" />
              <span className="text-xs uppercase tracking-wider font-semibold">
                Interest Rate
              </span>
            </div>
            <div className="font-serif-luxury text-2xl font-bold text-neutral-900">
              {interestRate}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 text-stone-500 mb-2">
              <Calendar className="h-5 w-5 text-[#c5a880]" />
              <span className="text-xs uppercase tracking-wider font-semibold">
                Max Tenure
              </span>
            </div>
            <div className="font-serif-luxury text-2xl font-bold text-neutral-900">
              {maxTenure}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 text-stone-500 mb-2">
              <ShieldCheck className="h-5 w-5 text-[#c5a880]" />
              <span className="text-xs uppercase tracking-wider font-semibold">
                Min Down Payment
              </span>
            </div>
            <div className="font-serif-luxury text-2xl font-bold text-neutral-900">
              {minDownPayment}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 text-stone-500 mb-2">
              <Wallet className="h-5 w-5 text-[#c5a880]" />
              <span className="text-xs uppercase tracking-wider font-semibold">
                Max Loan Cap
              </span>
            </div>
            <div className="font-serif-luxury text-2xl font-bold text-neutral-900">
              {maxLoanAmount}
            </div>
          </div>
        </div>
      </section>

      {/* 4. APPLICATION PROCESS & DOCUMENTS */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Steps */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-8 shadow-sm">
            <h3 className="font-serif-luxury text-2xl font-bold uppercase text-neutral-900 mb-6 flex items-center gap-2">
              <Clock className="h-5 w-5 text-[#c5a880]" />
              <span>Mortgage Approval Workflow</span>
            </h3>

            <ol className="space-y-6">
              <li className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-950 text-[#dfc498] text-xs font-bold">
                  1
                </div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-900 uppercase">
                    Initial Eligibility & Pre-Approval (48h)
                  </h4>
                  <p className="mt-1 text-xs text-stone-600 leading-relaxed font-light">
                    Submit initial KYC documents to secure a pre-approval
                    certificate giving you official purchasing leverage.
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-950 text-[#dfc498] text-xs font-bold">
                  2
                </div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-900 uppercase">
                    Property Selection & Bank Valuation
                  </h4>
                  <p className="mt-1 text-xs text-stone-600 leading-relaxed font-light">
                    Our team coordinates with RERA-licensed bank valuators for an
                    independent assessment of the chosen unit.
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-950 text-[#dfc498] text-xs font-bold">
                  3
                </div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-900 uppercase">
                    Formal Offer Letter & Title Deed Transfer
                  </h4>
                  <p className="mt-1 text-xs text-stone-600 leading-relaxed font-light">
                    Sign the mortgage contract with the lender and complete the
                    DLD (Dubai Land Department) transfer with trustee offices.
                  </p>
                </div>
              </li>
            </ol>
          </div>

          {/* Documentation Checklist */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-8 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-serif-luxury text-2xl font-bold uppercase text-neutral-900 mb-6 flex items-center gap-2">
                <FileCheck2 className="h-5 w-5 text-[#c5a880]" />
                <span>Required Documentation</span>
              </h3>

              <div className="space-y-3.5 text-xs text-stone-700">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#c5a880] shrink-0 mt-0.5" />
                  <span>Valid Passport, Emirates ID (or National ID for non-residents)</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#c5a880] shrink-0 mt-0.5" />
                  <span>Last 6 months personal bank statements</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#c5a880] shrink-0 mt-0.5" />
                  <span>Salary certificate / proof of ongoing income</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#c5a880] shrink-0 mt-0.5" />
                  <span>Company Trade License & 2-year audited financials (Self-employed)</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#c5a880] shrink-0 mt-0.5" />
                  <span>Credit report / overseas credit verification if applicable</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-100 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setModalOpen(true)}
                className="flex-1 py-3 px-4 rounded-sm bg-neutral-950 text-white text-xs uppercase tracking-widest font-bold hover:bg-neutral-800 transition-colors text-center"
              >
                Request Consultation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CONSULTATION MODAL */}
      <ConsultationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        projectTitle={`Loan Inquiry: ${title}`}
      />
    </div>
  );
}

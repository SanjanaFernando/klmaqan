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
  ArrowRight,
  Sparkles,
  Calculator,
  CheckCircle2,
  Phone,
  FileText,
  BadgeCheck,
  Building2,
  TrendingDown,
  ChevronRight,
} from "lucide-react";
import ConsultationModal from "@/components/ConsultationModal";

export default function LoansClient({ loans = [] }) {
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Interactive Calculator State
  const [calcPrice, setCalcPrice] = useState(3000000);
  const [calcDownPaymentPercent, setCalcDownPaymentPercent] = useState(20);
  const [calcRate, setCalcRate] = useState(3.99);
  const [calcYears, setCalcYears] = useState(25);

  const loanAmount = calcPrice * (1 - calcDownPaymentPercent / 100);
  const monthlyRate = calcRate / 100 / 12;
  const totalMonths = calcYears * 12;

  const monthlyEMI =
    monthlyRate > 0 && totalMonths > 0
      ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
      : loanAmount / (totalMonths || 1);

  const totalPayment = monthlyEMI * totalMonths;
  const totalInterest = totalPayment - loanAmount;

  const handleApply = (loanTitle) => {
    setSelectedLoan(loanTitle);
    setModalOpen(true);
  };

  const handleSelectLoanForCalc = (loan) => {
    const rateStr = loan.acf?.interest_rate || loan.loanDetails?.interestRate || "";
    const parsedRate = parseFloat(rateStr.replace(/[^0-9.]/g, ""));
    if (!isNaN(parsedRate) && parsedRate > 0) {
      setCalcRate(parsedRate);
    }
    // Scroll to calculator
    const calcElement = document.getElementById("loan-calculator");
    if (calcElement) {
      calcElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="luxury-page w-full bg-[#faf9f6] min-h-screen">
      {/* 1. HERO BANNER */}
      <section className="relative flex min-h-[460px] w-full flex-col justify-center overflow-hidden pt-36 pb-24 bg-neutral-950 text-white">
        <Image
          src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=2000&q=85"
          alt="Dubai Real Estate Finance"
          fill
          priority
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-black/80" />

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#c5a880]/40 bg-neutral-900/80 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#dfc498] backdrop-blur-md">
            <Landmark className="h-3.5 w-3.5 text-[#c5a880]" />
            <span>Private Mortgage & Asset Financing</span>
          </div>

          <h1 className="mt-5 font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-wide leading-tight text-stone-100 max-w-4xl">
            Prime Dubai <br />
            <span className="gold-gradient-text">Property Loans & Mortgages</span>
          </h1>

          <p className="mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-stone-300 font-light">
            Competitive mortgage financing, flexible down payment options, and
            tailored loan structures for UAE residents, expats, and foreign
            investors.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#loan-tiers"
              className="rounded-sm bg-gradient-to-r from-[#dfc498] via-[#c5a880] to-[#9f8052] px-7 py-3 text-xs font-semibold uppercase tracking-widest text-neutral-950 shadow-lg hover:brightness-110 transition-all"
            >
              Explore Loan Options
            </a>
            <a
              href="#loan-calculator"
              className="rounded-sm border border-neutral-700 bg-neutral-900/80 backdrop-blur-sm px-7 py-3 text-xs font-semibold uppercase tracking-widest text-stone-200 hover:border-[#c5a880] hover:text-[#dfc498] transition-all flex items-center gap-2"
            >
              <Calculator className="h-4 w-4 text-[#c5a880]" />
              <span>EMI Calculator</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. LOAN TIERS / PACKAGES LIST */}
      <section id="loan-tiers" className="py-20 px-5 sm:px-8 mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#9f8052] block mb-2">
            Financing Programs
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold uppercase tracking-wide text-neutral-900">
            Available Loan Structures
          </h2>
          <p className="mt-3 text-sm text-stone-600 font-light">
            Live rates and loan criteria fetched directly via WPGraphQL from our
            approved financial panel.
          </p>
        </div>

        {loans.length === 0 ? (
          <div className="rounded-2xl border border-neutral-200 bg-white p-12 text-center shadow-sm max-w-lg mx-auto">
            <Landmark className="mx-auto h-12 w-12 text-stone-400" />
            <h3 className="mt-4 font-serif-luxury text-xl font-bold text-neutral-800 uppercase">
              No Loan Options Found
            </h3>
            <p className="mt-2 text-xs text-stone-500">
              Loan programs are being updated. Contact our private financing desk
              for current options.
            </p>
          </div>
        ) : (
          <div
            className={`grid grid-cols-1 ${
              loans.length === 1
                ? "max-w-md mx-auto"
                : loans.length === 2
                  ? "lg:grid-cols-2 max-w-4xl mx-auto"
                  : "md:grid-cols-2 lg:grid-cols-3"
            } gap-8`}
          >
            {loans.map((loan, idx) => {
              const title = loan.title?.rendered || loan.rawTitle || "Loan Program";
              const slug = loan.slug || "";
              const acf = loan.acf || loan.loanDetails || {};

              const interestRate = acf.interest_rate || acf.interestRate || "Competitive Rate";
              const maxTenure = acf.max_tenure || acf.maxTenure || "Up to 25 Years";
              const minDownPayment = acf.min_down_payment || acf.minDownPayment || "From 20%";
              const maxLoanAmount = acf.max_loan_amount || acf.maxLoanAmount || "Up to AED 50M";

              const isHighlighted = idx === 0;

              return (
                <div
                  key={loan.id}
                  className={`relative rounded-2xl flex flex-col justify-between transition-all duration-500 overflow-hidden ${
                    isHighlighted
                      ? "bg-neutral-950 text-white border-2 border-[#c5a880] shadow-2xl shadow-[#c5a880]/20 lg:-translate-y-2"
                      : "bg-white text-neutral-900 border border-neutral-200 shadow-xl"
                  }`}
                >
                  {/* Glowing Top Gold Gradient Line */}
                  <div
                    className={`h-2 w-full ${
                      isHighlighted
                        ? "bg-gradient-to-r from-[#dfc498] via-[#c5a880] to-[#9f8052]"
                        : "bg-neutral-900"
                    }`}
                  />

                  <div className="p-8 sm:p-10 flex-1 flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-md ${
                            isHighlighted
                              ? "bg-[#c5a880] text-neutral-950 shadow-lg"
                              : "bg-neutral-900 text-[#dfc498]"
                          }`}
                        >
                          <Landmark className="h-6 w-6 stroke-[2.2]" />
                        </div>
                        <div>
                          <span
                            className={`text-[10px] uppercase tracking-widest font-bold block ${
                              isHighlighted ? "text-[#dfc498]" : "text-[#9f8052]"
                            }`}
                          >
                            {isHighlighted ? "★ Featured Tier" : "Mortgage Tier"}
                          </span>
                          <h3 className="font-serif-luxury text-2xl font-bold uppercase tracking-wide">
                            {title}
                          </h3>
                        </div>
                      </div>

                      <Link
                        href={`/loans/${slug}`}
                        className={`text-xs uppercase tracking-wider font-semibold hover:underline flex items-center gap-1 ${
                          isHighlighted ? "text-[#dfc498]" : "text-[#9f8052]"
                        }`}
                      >
                        <span>Details</span>
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </div>

                    {/* Rate Callout Box */}
                    <div
                      className={`mt-6 rounded-xl p-5 border ${
                        isHighlighted
                          ? "bg-stone-900/90 border-stone-800 text-[#dfc498]"
                          : "bg-stone-50 border-neutral-200 text-neutral-900"
                      }`}
                    >
                      <div className="flex items-baseline justify-between">
                        <span className="text-[10px] uppercase tracking-widest text-stone-400 font-semibold">
                          Interest Rate
                        </span>
                        <span className="text-[10px] uppercase tracking-widest font-bold text-[#c5a880]">
                          Fixed / Variable
                        </span>
                      </div>
                      <div className="mt-1 font-serif-luxury text-3xl sm:text-4xl font-bold tracking-tight">
                        {interestRate}
                      </div>
                    </div>

                    {/* Loan Metrics Grid */}
                    <div className="mt-6 grid grid-cols-1 gap-3.5 flex-1">
                      <div
                        className={`flex items-center justify-between p-3 rounded-lg border text-xs ${
                          isHighlighted
                            ? "bg-neutral-900/70 border-neutral-800"
                            : "bg-neutral-50 border-neutral-100"
                        }`}
                      >
                        <div className="flex items-center gap-2 text-stone-400">
                          <Calendar className="h-4 w-4 text-[#c5a880]" />
                          <span>Max Tenure</span>
                        </div>
                        <span className="font-semibold">{maxTenure}</span>
                      </div>

                      <div
                        className={`flex items-center justify-between p-3 rounded-lg border text-xs ${
                          isHighlighted
                            ? "bg-neutral-900/70 border-neutral-800"
                            : "bg-neutral-50 border-neutral-100"
                        }`}
                      >
                        <div className="flex items-center gap-2 text-stone-400">
                          <Percent className="h-4 w-4 text-[#c5a880]" />
                          <span>Min Down Payment</span>
                        </div>
                        <span className="font-semibold">{minDownPayment}</span>
                      </div>

                      <div
                        className={`flex items-center justify-between p-3 rounded-lg border text-xs ${
                          isHighlighted
                            ? "bg-neutral-900/70 border-neutral-800"
                            : "bg-neutral-50 border-neutral-100"
                        }`}
                      >
                        <div className="flex items-center gap-2 text-stone-400">
                          <Wallet className="h-4 w-4 text-[#c5a880]" />
                          <span>Max Financing Amount</span>
                        </div>
                        <span className="font-semibold">{maxLoanAmount}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-8 flex flex-col gap-3">
                      <button
                        onClick={() => handleApply(title)}
                        className={`w-full py-3.5 px-5 rounded-sm text-xs uppercase tracking-widest font-bold transition-all shadow-md flex items-center justify-center gap-2 ${
                          isHighlighted
                            ? "bg-gradient-to-r from-[#dfc498] via-[#c5a880] to-[#9f8052] text-neutral-950 hover:brightness-110"
                            : "bg-neutral-900 text-white hover:bg-neutral-800"
                        }`}
                      >
                        <span>Apply For Pre-Approval</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() => handleSelectLoanForCalc(loan)}
                        className={`w-full py-2.5 px-4 rounded-sm text-[11px] uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-2 border ${
                          isHighlighted
                            ? "border-neutral-800 text-stone-300 hover:border-neutral-600 hover:text-white"
                            : "border-neutral-300 text-neutral-700 hover:bg-neutral-100"
                        }`}
                      >
                        <Calculator className="h-3.5 w-3.5 text-[#c5a880]" />
                        <span>Simulate in Calculator</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 3. INTERACTIVE LOAN & MORTGAGE CALCULATOR */}
      <section
        id="loan-calculator"
        className="py-20 px-5 sm:px-8 bg-neutral-950 text-white relative overflow-hidden"
      >
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#c5a880]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#c5a880]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-7xl relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#c5a880]/40 bg-neutral-900 px-3.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-[#dfc498] mb-3">
              <Calculator className="h-3.5 w-3.5 text-[#c5a880]" />
              <span>Real-Time Estimation</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold uppercase tracking-wide text-stone-100">
              Mortgage EMI Calculator
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-stone-400 font-light">
              Customize property valuation, down payment, and tenure to estimate
              your monthly installment.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Input Controls */}
            <div className="lg:col-span-7 bg-neutral-900/90 border border-neutral-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
              <div className="space-y-6">
                {/* Property Price */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs uppercase tracking-wider font-semibold text-stone-300">
                      Property Value (AED)
                    </label>
                    <span className="font-serif-luxury text-lg font-bold text-[#dfc498]">
                      AED {Number(calcPrice).toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="500000"
                    max="30000000"
                    step="100000"
                    value={calcPrice}
                    onChange={(e) => setCalcPrice(Number(e.target.value))}
                    className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#c5a880]"
                  />
                  <div className="flex justify-between text-[10px] text-stone-500 mt-1">
                    <span>AED 500K</span>
                    <span>AED 15M</span>
                    <span>AED 30M+</span>
                  </div>
                </div>

                {/* Down Payment */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs uppercase tracking-wider font-semibold text-stone-300">
                      Down Payment ({calcDownPaymentPercent}%)
                    </label>
                    <span className="font-serif-luxury text-sm font-bold text-stone-200">
                      AED {Number((calcPrice * calcDownPaymentPercent) / 100).toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="60"
                    step="5"
                    value={calcDownPaymentPercent}
                    onChange={(e) => setCalcDownPaymentPercent(Number(e.target.value))}
                    className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#c5a880]"
                  />
                  <div className="flex justify-between text-[10px] text-stone-500 mt-1">
                    <span>15% (Expats)</span>
                    <span>20% (Standard)</span>
                    <span>60% (Max)</span>
                  </div>
                </div>

                {/* Interest Rate */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs uppercase tracking-wider font-semibold text-stone-300">
                      Interest Rate (%)
                    </label>
                    <span className="font-serif-luxury text-lg font-bold text-[#dfc498]">
                      {calcRate.toFixed(2)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    step="0.05"
                    value={calcRate}
                    onChange={(e) => setCalcRate(Number(e.target.value))}
                    className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#c5a880]"
                  />
                  <div className="flex justify-between text-[10px] text-stone-500 mt-1">
                    <span>1.0%</span>
                    <span>4.5% (Avg)</span>
                    <span>15.0%</span>
                  </div>
                </div>

                {/* Loan Tenure */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs uppercase tracking-wider font-semibold text-stone-300">
                      Loan Tenure (Years)
                    </label>
                    <span className="font-serif-luxury text-lg font-bold text-[#dfc498]">
                      {calcYears} Years
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="30"
                    step="1"
                    value={calcYears}
                    onChange={(e) => setCalcYears(Number(e.target.value))}
                    className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#c5a880]"
                  />
                  <div className="flex justify-between text-[10px] text-stone-500 mt-1">
                    <span>5 Yrs</span>
                    <span>20 Yrs</span>
                    <span>30 Yrs</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-neutral-800 flex items-center justify-between text-xs text-stone-400">
                <span>Calculated on standard reducing balance method</span>
                <span className="text-[#dfc498] font-semibold">Pre-approval in 48h</span>
              </div>
            </div>

            {/* Results Card */}
            <div className="lg:col-span-5 bg-gradient-to-b from-neutral-900 to-black border border-[#c5a880]/40 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative">
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#dfc498] block">
                    Estimated Monthly Repayment
                  </span>
                  <div className="mt-2 font-serif-luxury text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                    AED {Math.round(monthlyEMI).toLocaleString()}
                    <span className="text-xs font-normal text-stone-400 block sm:inline sm:ml-2">
                      / month
                    </span>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-neutral-800">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-stone-400">Total Loan Amount:</span>
                    <span className="font-semibold text-stone-200">
                      AED {Math.round(loanAmount).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span className="text-stone-400">Total Interest Payable:</span>
                    <span className="font-semibold text-stone-200">
                      AED {Math.round(totalInterest).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span className="text-stone-400">Total Overall Payment:</span>
                    <span className="font-semibold text-[#dfc498]">
                      AED {Math.round(totalPayment).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="rounded-lg bg-neutral-900/90 border border-neutral-800 p-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-stone-200">
                    <ShieldCheck className="h-4 w-4 text-[#c5a880]" />
                    <span>Bank Eligibility Pre-Requisites</span>
                  </div>
                  <p className="text-[11px] text-stone-400 leading-relaxed">
                    Available for salaried individuals (min. AED 15K/month),
                    self-employed entrepreneurs, and international property buyers.
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleApply("Custom Loan Calculation")}
                className="mt-8 w-full py-3.5 px-6 rounded-sm bg-gradient-to-r from-[#dfc498] via-[#c5a880] to-[#9f8052] text-neutral-950 text-xs uppercase tracking-widest font-bold shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2"
              >
                <span>Request Formal Pre-Approval</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ELIGIBILITY & FINANCING ADVANTAGES */}
      <section className="py-20 px-5 sm:px-8 mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#9f8052] block mb-2">
            Why Finance With KL MAQAN
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold uppercase tracking-wide text-neutral-900">
            Seamless Mortgage Advisory
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl border border-neutral-200 p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 rounded-lg bg-neutral-950 text-[#dfc498] flex items-center justify-center mb-6">
              <Building2 className="h-6 w-6" />
            </div>
            <h3 className="font-serif-luxury text-xl font-bold uppercase text-neutral-900">
              UAE Residents & Expats
            </h3>
            <p className="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
              Up to 80% Loan-to-Value (LTV) on first property purchase with
              tenures extending up to 25 years and lowest market spreads.
            </p>
            <ul className="mt-5 space-y-2 text-xs text-stone-600">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#c5a880]" />
                <span>Salaried & self-employed paths</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#c5a880]" />
                <span>Fast in-principle approval in 48h</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl border border-neutral-200 p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 rounded-lg bg-neutral-950 text-[#dfc498] flex items-center justify-center mb-6">
              <Landmark className="h-6 w-6" />
            </div>
            <h3 className="font-serif-luxury text-xl font-bold uppercase text-neutral-900">
              Non-Resident Foreign Buyers
            </h3>
            <p className="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
              International investors can finance ready and off-plan Dubai
              properties up to 50%–60% LTV without UAE residency.
            </p>
            <ul className="mt-5 space-y-2 text-xs text-stone-600">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#c5a880]" />
                <span>No UAE residency required</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#c5a880]" />
                <span>Multi-currency mortgage options</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl border border-neutral-200 p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 rounded-lg bg-neutral-950 text-[#dfc498] flex items-center justify-center mb-6">
              <BadgeCheck className="h-6 w-6" />
            </div>
            <h3 className="font-serif-luxury text-xl font-bold uppercase text-neutral-900">
              Golden Visa Linked Mortgages
            </h3>
            <p className="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
              Acquire AED 2M+ properties with financing and qualify for the
              10-Year UAE Golden Visa through our dedicated legal desk.
            </p>
            <ul className="mt-5 space-y-2 text-xs text-stone-600">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#c5a880]" />
                <span>Family visa sponsorship included</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#c5a880]" />
                <span>Complete escrow & title deed setup</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. CONSULTATION MODAL */}
      <ConsultationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        projectTitle={selectedLoan ? `Loan Option: ${selectedLoan}` : "Mortgage Financing"}
      />
    </div>
  );
}

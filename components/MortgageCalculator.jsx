"use client";

import { useState } from "react";
import { Calculator, DollarSign, Percent, Calendar, HelpCircle, ArrowRight } from "lucide-react";

export default function MortgageCalculator({ basePrice = 3850000 }) {
  // Parse base price if string
  const numericBasePrice = typeof basePrice === "number" 
    ? basePrice 
    : parseInt(String(basePrice).replace(/[^0-9]/g, ""), 10) || 3850000;

  const [price, setPrice] = useState(numericBasePrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [loanTermYears, setLoanTermYears] = useState(25);
  const [interestRate, setInterestRate] = useState(4.25);

  const downPayment = (price * downPaymentPercent) / 100;
  const loanAmount = price - downPayment;
  
  // Monthly interest rate
  const monthlyRate = interestRate / 100 / 12;
  const totalPayments = loanTermYears * 12;

  // Monthly mortgage calculation formula: P * (r * (1 + r)^n) / ((1 + r)^n - 1)
  const monthlyPayment = loanAmount > 0 && monthlyRate > 0
    ? (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments))) / (Math.pow(1 + monthlyRate, totalPayments) - 1)
    : 0;

  const totalMortgageCost = monthlyPayment * totalPayments;
  const totalInterest = totalMortgageCost - loanAmount;

  return (
    <div className="rounded-lg border border-neutral-200/80 bg-stone-50/60 p-6 sm:p-8 shadow-sm">
      <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-[#c5a880] text-neutral-950">
            <Calculator className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-serif-luxury text-xl font-bold uppercase text-neutral-900">
              Dubai Mortgage & Payment Estimator
            </h3>
            <p className="text-xs text-stone-500">
              Calculate projected monthly mortgage payments for UAE residents & international investors.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Controls Column */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Property Price Input */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold uppercase text-stone-600 mb-1.5">
              <span>Property Value (AED)</span>
              <span className="text-[#9f8052] font-bold text-sm">AED {price.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="500000"
              max="30000000"
              step="50000"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full accent-[#c5a880] cursor-pointer"
            />
          </div>

          {/* Down Payment % */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold uppercase text-stone-600 mb-1.5">
              <span>Down Payment ({downPaymentPercent}%)</span>
              <span className="text-stone-800 font-bold">AED {Math.round(downPayment).toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2">
              {[20, 25, 30, 40, 50].map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => setDownPaymentPercent(pct)}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-sm border transition-all ${
                    downPaymentPercent === pct
                      ? "bg-[#c5a880] border-[#c5a880] text-neutral-950"
                      : "bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-100"
                  }`}
                >
                  {pct}%
                </button>
              ))}
            </div>
          </div>

          {/* Loan Duration & Interest Rate */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">
                Loan Duration
              </label>
              <select
                value={loanTermYears}
                onChange={(e) => setLoanTermYears(Number(e.target.value))}
                className="w-full rounded-sm border border-neutral-300 bg-white px-3 py-2 text-xs font-medium text-neutral-800 focus:border-[#c5a880] focus:outline-none"
              >
                <option value={15}>15 Years</option>
                <option value={20}>20 Years</option>
                <option value={25}>25 Years (Standard)</option>
                <option value={30}>30 Years</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">
                Interest Rate (% p.a.)
              </label>
              <input
                type="number"
                step="0.05"
                min="2.0"
                max="10.0"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full rounded-sm border border-neutral-300 bg-white px-3 py-2 text-xs font-medium text-neutral-800 focus:border-[#c5a880] focus:outline-none"
              />
            </div>
          </div>

          <div className="rounded-sm bg-neutral-100/80 p-3 text-[11px] text-stone-500">
            * Note: UAE Central Bank regulations require minimum 20% down payment for expat residents on first residential purchase under AED 5M.
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-md bg-neutral-950 p-6 text-white border border-neutral-800 shadow-xl">
          <div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#c5a880] font-semibold">
              Estimated Monthly Cost
            </span>
            <div className="mt-2 font-serif-luxury text-3xl sm:text-4xl font-bold text-[#dfc498]">
              AED {Math.round(monthlyPayment).toLocaleString()}
              <span className="text-xs font-normal text-stone-400"> / month</span>
            </div>
            
            <div className="mt-6 space-y-3 border-t border-neutral-800 pt-4 text-xs">
              <div className="flex justify-between text-stone-300">
                <span>Loan Principal Amount:</span>
                <span className="font-semibold text-white">AED {Math.round(loanAmount).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-stone-300">
                <span>Total Interest Payable:</span>
                <span className="font-semibold text-white">AED {Math.round(totalInterest).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-stone-300">
                <span>Total Payment over {loanTermYears} yrs:</span>
                <span className="font-semibold text-white">AED {Math.round(totalMortgageCost).toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-neutral-800">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 rounded-sm bg-gradient-to-r from-[#dfc498] via-[#c5a880] to-[#9f8052] py-2.5 text-xs font-bold uppercase tracking-wider text-neutral-950 hover:opacity-95 transition-opacity"
            >
              <span>Get Bank Pre-Approval</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

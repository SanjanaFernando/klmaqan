"use client";

import { useState } from "react";
import Image from "next/image";
import {
  MapPin,
  Home,
  Layers,
  DollarSign,
  Bed,
  Search,
  RotateCcw,
  SlidersHorizontal,
  X,
} from "lucide-react";

export default function FilterBar({
  filters,
  setFilters,
  developers = [],
  locations = [],
  types = [],
  statuses = [],
  priceRanges = [],
  bedsList = [],
  onSearch,
  totalResults = 0,
}) {
  const [activeTab, setActiveTab] = useState(null);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      developer: "",
      location: "",
      type: "",
      status: "",
      priceRange: "",
      beds: "",
      search: "",
    });
  };

  const hasActiveFilters = Object.values(filters).some((v) => v !== "");

  return (
    <div className="w-full border-y border-[#d4af37]/25 bg-[#1a1a1a] py-6 shadow-xl">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Top Quick Filters Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-neutral-100">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() =>
                handleFilterChange(
                  "developer",
                  filters.developer ? "" : developers[0]?.slug || "",
                )
              }
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs uppercase tracking-wider rounded-sm transition-all ${
                filters.developer
                  ? "bg-[#c5a880] text-neutral-950 font-bold shadow-sm"
                  : "border border-neutral-200 bg-neutral-50 text-neutral-700 hover:bg-neutral-100"
              }`}
            >
              <Image
                src="/logo.png"
                alt="KL MAQAN"
                width={14}
                height={14}
                className="h-3.5 w-3.5 object-contain"
              />
              <span>By Builder</span>
            </button>

            <button
              type="button"
              onClick={() =>
                handleFilterChange(
                  "type",
                  filters.type ? "" : types[0]?.slug || "",
                )
              }
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs uppercase tracking-wider rounded-sm transition-all ${
                filters.type
                  ? "bg-[#c5a880] text-neutral-950 font-bold shadow-sm"
                  : "border border-neutral-200 bg-neutral-50 text-neutral-700 hover:bg-neutral-100"
              }`}
            >
              <Home className="h-3.5 w-3.5" />
              <span>By Property Type</span>
            </button>

            <button
              type="button"
              onClick={() =>
                handleFilterChange(
                  "status",
                  filters.status ? "" : statuses[0]?.slug || "",
                )
              }
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs uppercase tracking-wider rounded-sm transition-all ${
                filters.status
                  ? "bg-[#c5a880] text-neutral-950 font-bold shadow-sm"
                  : "border border-neutral-200 bg-neutral-50 text-neutral-700 hover:bg-neutral-100"
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              <span>By Project Status</span>
            </button>
          </div>

          <div className="flex items-center gap-3 text-xs text-stone-400">
            <span>
              Showing{" "}
              <strong className="font-bold text-[#d4af37]">
                {totalResults}
              </strong>{" "}
              luxury developments
            </span>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="flex items-center gap-1 text-xs font-medium text-[#f0dfa8] underline"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset All</span>
              </button>
            )}
          </div>
        </div>

        {/* Main 6 Filter Dropdowns matching page-projects.php */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-3">
          {/* 1. Builder / Developer */}
          <div className="flex items-center gap-2 border border-neutral-200 bg-white px-3 py-2.5 rounded-sm focus-within:border-[#c5a880]">
            <Image
              src="/logo.png"
              alt="KL MAQAN"
              width={16}
              height={16}
              className="h-4 w-4 object-contain opacity-70 shrink-0"
            />
            <select
              value={filters.developer}
              onChange={(e) => handleFilterChange("developer", e.target.value)}
              className="w-full bg-transparent text-xs text-neutral-800 focus:outline-none cursor-pointer"
            >
              <option value="">Select Builder</option>
              {developers.map((dev) => (
                <option key={dev.id} value={dev.slug}>
                  {dev.name}
                </option>
              ))}
            </select>
          </div>

          {/* 2. Location */}
          <div className="flex items-center gap-2 border border-neutral-200 bg-white px-3 py-2.5 rounded-sm focus-within:border-[#c5a880]">
            <MapPin className="h-4 w-4 text-stone-400 shrink-0" />
            <select
              value={filters.location}
              onChange={(e) => handleFilterChange("location", e.target.value)}
              className="w-full bg-transparent text-xs text-neutral-800 focus:outline-none cursor-pointer"
            >
              <option value="">Select Location</option>
              {locations.map((loc) => (
                <option key={loc.id} value={loc.slug}>
                  {loc.name}
                </option>
              ))}
            </select>
          </div>

          {/* 3. Property Type */}
          <div className="flex items-center gap-2 border border-neutral-200 bg-white px-3 py-2.5 rounded-sm focus-within:border-[#c5a880]">
            <Home className="h-4 w-4 text-stone-400 shrink-0" />
            <select
              value={filters.type}
              onChange={(e) => handleFilterChange("type", e.target.value)}
              className="w-full bg-transparent text-xs text-neutral-800 focus:outline-none cursor-pointer"
            >
              <option value="">Property Type</option>
              {types.map((t) => (
                <option key={t.id} value={t.slug}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          {/* 4. Project Status */}
          <div className="flex items-center gap-2 border border-neutral-200 bg-white px-3 py-2.5 rounded-sm focus-within:border-[#c5a880]">
            <Layers className="h-4 w-4 text-stone-400 shrink-0" />
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
              className="w-full bg-transparent text-xs text-neutral-800 focus:outline-none cursor-pointer"
            >
              <option value="">Project Status</option>
              {statuses.map((s) => (
                <option key={s.id} value={s.slug}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* 5. Price Range */}
          <div className="flex items-center gap-2 border border-neutral-200 bg-white px-3 py-2.5 rounded-sm focus-within:border-[#c5a880]">
            <DollarSign className="h-4 w-4 text-stone-400 shrink-0" />
            <select
              value={filters.priceRange}
              onChange={(e) => handleFilterChange("priceRange", e.target.value)}
              className="w-full bg-transparent text-xs text-neutral-800 focus:outline-none cursor-pointer"
            >
              <option value="">Price Range</option>
              {priceRanges.map((pr) => (
                <option key={pr.id} value={pr.slug}>
                  {pr.name}
                </option>
              ))}
            </select>
          </div>

          {/* 6. Beds */}
          <div className="flex items-center gap-2 border border-neutral-200 bg-white px-3 py-2.5 rounded-sm focus-within:border-[#c5a880]">
            <Bed className="h-4 w-4 text-stone-400 shrink-0" />
            <select
              value={filters.beds}
              onChange={(e) => handleFilterChange("beds", e.target.value)}
              className="w-full bg-transparent text-xs text-neutral-800 focus:outline-none cursor-pointer"
            >
              <option value="">Bedrooms</option>
              {bedsList.map((b) => (
                <option key={b.id} value={b.slug}>
                  {b.name} Beds
                </option>
              ))}
            </select>
          </div>

          {/* 7. Search Keyword / Button */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={filters.search || ""}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                placeholder="Search by name..."
                className="w-full rounded-sm border border-neutral-200 bg-white pl-8 pr-2 py-2 text-xs text-neutral-900 placeholder-stone-400 focus:border-[#c5a880] focus:outline-none"
              />
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-stone-400" />
            </div>
            {filters.search && (
              <button
                onClick={() => handleFilterChange("search", "")}
                className="p-2 text-stone-400 hover:text-stone-600"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Active Filter Pills */}
        {hasActiveFilters && (
          <div className="mt-3.5 flex flex-wrap items-center gap-2 pt-2 text-xs">
            <span className="text-stone-400 text-[11px] uppercase tracking-wider">
              Active:
            </span>
            {Object.entries(filters).map(([k, v]) => {
              if (!v) return null;
              return (
                <span
                  key={k}
                  className="inline-flex items-center gap-1.5 rounded-full bg-stone-100 border border-stone-200 px-2.5 py-0.5 text-[11px] text-stone-800"
                >
                  <span className="capitalize">
                    {k}: <strong>{v}</strong>
                  </span>
                  <button
                    onClick={() => handleFilterChange(k, "")}
                    className="hover:text-red-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

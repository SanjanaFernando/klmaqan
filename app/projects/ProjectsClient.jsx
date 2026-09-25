"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { LayoutGrid, List, SlidersHorizontal, Sparkles, Building2, MapPin } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import FilterBar from "@/components/FilterBar";

export default function ProjectsClient({
  initialProjects = [],
  developers = [],
  locations = [],
  types = [],
  statuses = [],
  priceRanges = [],
  bedsList = []
}) {
  const [viewMode, setViewMode] = useState("grid"); // grid | list
  const [filters, setFilters] = useState({
    developer: "",
    location: "",
    type: "",
    status: "",
    priceRange: "",
    beds: "",
    search: "",
  });

  // Client-side filtering across taxonomies, ACF fields, and search query
  const filteredProjects = useMemo(() => {
    return initialProjects.filter((project) => {
      // 1. Search Query
      if (filters.search) {
        const q = filters.search.toLowerCase();
        const title = (project.title?.rendered || "").toLowerCase();
        const address = (project.acf?.property_address || "").toLowerCase();
        if (!title.includes(q) && !address.includes(q)) {
          return false;
        }
      }

      // 2. Developer
      if (filters.developer) {
        const devList = project.project_taxonomies?.['property-developer'] || [];
        const hasDev = devList.some((d) => d.slug === filters.developer || d.name?.toLowerCase().includes(filters.developer.toLowerCase()));
        if (!hasDev && !project.class_list?.some(c => c.includes(filters.developer))) {
          return false;
        }
      }

      // 3. Location
      if (filters.location) {
        const locList = project.project_taxonomies?.location || [];
        const hasLoc = locList.some((l) => l.slug === filters.location || l.name?.toLowerCase().includes(filters.location.toLowerCase()));
        if (!hasLoc && !project.class_list?.some(c => c.includes(filters.location))) {
          return false;
        }
      }

      // 4. Property Type
      if (filters.type) {
        const typeList = project.project_taxonomies?.['property-type'] || [];
        const hasType = typeList.some((t) => t.slug === filters.type || t.name?.toLowerCase().includes(filters.type.toLowerCase()));
        if (!hasType && !project.class_list?.some(c => c.includes(filters.type))) {
          return false;
        }
      }

      // 5. Property Status
      if (filters.status) {
        const statusList = project.project_taxonomies?.['property-status'] || [];
        const hasStatus = statusList.some((s) => s.slug === filters.status || s.name?.toLowerCase().includes(filters.status.toLowerCase()));
        if (!hasStatus && !project.class_list?.some(c => c.includes(filters.status))) {
          return false;
        }
      }

      // 6. Beds
      if (filters.beds) {
        const bedsVal = project.acf?.bedrooms || "";
        const bedsTax = project.project_taxonomies?.beds || [];
        const matchesTax = bedsTax.some(b => b.slug === filters.beds || b.name === filters.beds);
        if (!matchesTax && !bedsVal.includes(filters.beds)) {
          return false;
        }
      }

      // 7. Price Range
      if (filters.priceRange) {
        const prTax = project.project_taxonomies?.['price-range'] || [];
        const matchesPr = prTax.some(p => p.slug === filters.priceRange);
        if (!matchesPr && !project.class_list?.some(c => c.includes(filters.priceRange))) {
          return false;
        }
      }

      return true;
    });
  }, [initialProjects, filters]);

  return (
    <div className="w-full bg-[#faf9f6] min-h-screen">
      
      {/* 1. HERO BANNER (Matching page-projects.php) */}
      <section className="relative flex min-h-[420px] w-full flex-col justify-center overflow-hidden pt-36 pb-20 bg-neutral-950 text-white">
        <Image
          src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2000&q=85"
          alt="Modern luxury developments Dubai"
          fill
          priority
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-black/70" />

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
          <p className="text-xs uppercase tracking-[0.3em] text-[#dfc498] font-semibold">
            PROJECTS PORTFOLIO
          </p>
          <h1 className="mt-4 max-w-3xl font-serif-luxury text-3xl font-bold uppercase leading-tight tracking-wide text-stone-100 sm:text-4xl md:text-5xl">
            Explore Dubai’s Leading <br />
            <span className="gold-gradient-text">Property Projects</span>
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-stone-300 font-light">
            Discover a curated selection of off-plan and ready developments across Dubai. Explore available options and find opportunities that align with your budget and long-term investment goals.
          </p>
        </div>
      </section>

      {/* 2. TAXONOMY FILTER BAR */}
      <FilterBar
        filters={filters}
        setFilters={setFilters}
        developers={developers}
        locations={locations}
        types={types}
        statuses={statuses}
        priceRanges={priceRanges}
        bedsList={bedsList}
        totalResults={filteredProjects.length}
      />

      {/* 3. LISTING GRID */}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        
        {/* Results Header */}
        <div className="flex items-center justify-between pb-6 border-b border-neutral-200">
          <div>
            <h2 className="font-serif-luxury text-xl font-bold uppercase text-neutral-900">
              Available Properties ({filteredProjects.length})
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Verified inventory directly from leading master developers
            </p>
          </div>

          {/* View Toggles */}
          <div className="flex items-center gap-2 border border-neutral-200 bg-white p-1 rounded-sm">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-sm transition-colors ${
                viewMode === "grid" ? "bg-neutral-900 text-white" : "text-stone-400 hover:text-neutral-900"
              }`}
              aria-label="Grid view"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-sm transition-colors ${
                viewMode === "list" ? "bg-neutral-900 text-white" : "text-stone-400 hover:text-neutral-900"
              }`}
              aria-label="List view"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Property Results */}
        {filteredProjects.length === 0 ? (
          <div className="my-16 rounded-md border border-dashed border-neutral-300 bg-white p-12 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-stone-100 text-stone-400">
              <Building2 className="h-6 w-6" />
            </div>
            <h3 className="mt-4 font-serif-luxury text-lg uppercase text-neutral-900">
              No Properties Found
            </h3>
            <p className="mt-2 text-xs text-stone-500 max-w-md mx-auto">
              We couldn't find any developments matching your selected filters. Try resetting the builder, location, or price filters to browse more listings.
            </p>
            <button
              onClick={() => setFilters({ developer: "", location: "", type: "", status: "", priceRange: "", beds: "", search: "" })}
              className="mt-6 inline-flex items-center gap-2 rounded-sm bg-[#c5a880] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-neutral-950"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className={`mt-8 ${
            viewMode === "grid" 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
              : "grid grid-cols-1 gap-6"
          }`}>
            {filteredProjects.map((project, idx) => (
              <ProjectCard key={project.id} project={project} priority={idx < 3} />
            ))}
          </div>
        )}

      </section>

    </div>
  );
}

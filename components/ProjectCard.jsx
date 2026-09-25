"use client";

import Link from "next/link";
import Image from "next/image";
import { Bed, Bath, Maximize2, MapPin, Calendar, ArrowRight, Building, Sparkles } from "lucide-react";
import { useState } from "react";

export default function ProjectCard({ project, priority = false }) {
  const [imgSrc, setImgSrc] = useState(
    project.featured_image ||
    project.featured_image_medium ||
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
  );

  const title = project.title?.rendered?.replace(/&#8217;/g, "'") || "Exclusive Property";
  const slug = project.slug || `project-${project.id}`;

  const address = project.acf?.property_address || "Dubai Prime Location";
  const price = project.acf?.property_price || "Price On Application";
  const beds = project.acf?.bedrooms || project.project_taxonomies?.beds?.[0]?.name || "3";
  const baths = project.acf?.bathrooms || "3";
  const area = project.acf?.area_from || "1,800 Sq Ft";
  const handover = project.acf?.handover || "Q4 2026";
  const paymentPlan = project.acf?.payment_plan || "Flexible Payment";

  const developer = project.project_taxonomies?.['property-developer']?.[0]?.name || "Emaar";
  const location = project.project_taxonomies?.location?.[0]?.name || "Dubai";
  const status = project.project_taxonomies?.['property-status']?.[0]?.name || "Off-Plan";
  const type = project.project_taxonomies?.['property-type']?.[0]?.name || "Luxury Residence";

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-none border border-neutral-200/80 bg-white transition-all duration-500 hover:-translate-y-1.5 hover:border-[#d4af37]/60 hover:shadow-2xl hover:shadow-[#9f8052]/15">
      
      {/* Property Thumbnail Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-900">
        <Image
          src={imgSrc}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
          onError={() => setImgSrc("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80")}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        
        {/* Subtle Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1.5 rounded-sm bg-black/60 backdrop-blur-md px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#dfc498] border border-[#c5a880]/30">
            <Building className="h-3 w-3" />
            <span>{developer}</span>
          </div>

          <span className="rounded-sm bg-neutral-950/80 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white border border-white/10">
            {status}
          </span>
        </div>

        {/* Bottom Image Info */}
        <div className="absolute bottom-3 left-3.5 right-3.5 flex items-end justify-between text-white">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-stone-300">Starting From</span>
            <div className="font-serif-luxury text-lg sm:text-xl font-bold text-[#dfc498] drop-shadow-sm">
              {price}
            </div>
          </div>
          <div className="text-[11px] text-stone-300 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded border border-white/10">
            {type}
          </div>
        </div>
      </div>

      {/* Card Details */}
      <div className="flex flex-1 flex-col border-t-2 border-[#d4af37]/35 p-5">
        
        {/* Location & Title */}
        <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
          <MapPin className="h-3.5 w-3.5 text-[#c5a880] shrink-0" />
          <span className="truncate">{address}</span>
        </div>

        <h3 className="mt-1.5 font-serif-luxury text-lg font-bold uppercase text-neutral-900 group-hover:text-[#9f8052] transition-colors line-clamp-1">
          <Link href={`/projects/${slug}`}>
            {title}
          </Link>
        </h3>

        {/* Specs Grid */}
        <div className="mt-4 grid grid-cols-3 gap-2 border-y border-neutral-100 py-3 text-xs text-neutral-600">
          <div className="flex items-center gap-1.5">
            <Bed className="h-3.5 w-3.5 text-stone-400" />
            <span>{beds} Beds</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="h-3.5 w-3.5 text-stone-400" />
            <span>{baths} Baths</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Maximize2 className="h-3.5 w-3.5 text-stone-400" />
            <span className="truncate">{area}</span>
          </div>
        </div>

        {/* Payment Plan & Handover */}
        <div className="mt-3 flex items-center justify-between text-[11px] text-stone-500">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3 text-[#c5a880]" />
            <span>Handover: {handover}</span>
          </div>
          <div className="truncate text-right font-medium text-stone-600">
            {paymentPlan}
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-5 pt-2">
          <Link
            href={`/projects/${slug}`}
            className="flex w-full items-center justify-center gap-2 rounded-none bg-neutral-900 py-3 text-xs font-semibold uppercase tracking-wider text-white transition-all duration-300 group-hover:bg-[#d4af37] group-hover:text-neutral-950"
          >
            <span>View Full Details</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

      </div>

    </div>
  );
}

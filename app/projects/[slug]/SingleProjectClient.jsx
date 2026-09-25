"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Building, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize2, 
  Calendar, 
  DollarSign, 
  CheckCircle2, 
  Share2, 
  Heart, 
  Download, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Phone, 
  Mail, 
  Eye,
  Layers,
  ArrowRight,
  Compass
} from "lucide-react";
import MortgageCalculator from "@/components/MortgageCalculator";
import ConsultationModal from "@/components/ConsultationModal";
import ProjectCard from "@/components/ProjectCard";

export default function SingleProjectClient({ project, relatedProjects = [] }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [liked, setLiked] = useState(false);

  const title = project?.title?.rendered?.replace(/&#8217;/g, "'") || "Dubai Luxury Project";
  const content = project?.content?.rendered || "";
  
  const acf = project?.acf || {};
  const price = acf.property_price || "AED 3,850,000";
  const address = acf.property_address || "Downtown Dubai, United Arab Emirates";
  const handover = acf.handover || "Q4 2026";
  const paymentPlan = acf.payment_plan || "60/40 Post Handover";
  const bedrooms = acf.bedrooms || project?.project_taxonomies?.beds?.[0]?.name || "3";
  const bathrooms = acf.bathrooms || "4";
  const area = acf.area_from || "1,850 Sq Ft";
  const pricePerSqFt = acf.price_per_sq_ft_display || (acf.price_per_sq_ft ? `AED ${acf.price_per_sq_ft}` : "AED 2,081");

  const developer = project?.project_taxonomies?.['property-developer']?.[0]?.name || "Emaar";
  const location = project?.project_taxonomies?.location?.[0]?.name || "Downtown Dubai";
  const type = project?.project_taxonomies?.['property-type']?.[0]?.name || "Luxury Residence";
  const status = project?.project_taxonomies?.['property-status']?.[0]?.name || "Off-Plan";

  // Gallery images
  const galleryImages = [
    project?.featured_image || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=85"
  ];

  const keyFeatures = acf.key_features && Array.isArray(acf.key_features) && acf.key_features.length > 0
    ? acf.key_features
    : [
        "Panoramic Floor-to-Ceiling Dubai Skyline Views",
        "World-Class Infinity Swimming Pool & Sun Deck",
        "State-of-the-Art Fitness Center & Pilates Studio",
        "24/7 Dedicated Concierge & Valet Services",
        "Smart Home Automation System by Crestron",
        "Custom Italian Designer Kitchen with Miele Appliances",
        "Private Direct Resident Elevator Access",
        "Landscaped Wellness Zen Courtyards"
      ];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="luxury-page w-full bg-[#faf9f6] min-h-screen pt-24 pb-20">
      
      {/* 1. BREADCRUMBS & TOP BAR */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200">
        <nav className="flex items-center text-xs uppercase tracking-[0.15em] text-stone-500">
          <Link href="/" className="hover:text-neutral-900 transition-colors">Home</Link>
          <span className="mx-2 text-stone-300">/</span>
          <Link href="/projects" className="hover:text-neutral-900 transition-colors">Projects</Link>
          <span className="mx-2 text-stone-300">/</span>
          <span className="font-semibold text-neutral-900 truncate max-w-xs">{title}</span>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 rounded-sm border border-neutral-300 bg-white px-3 py-1.5 text-xs text-neutral-700 hover:bg-neutral-50 transition-colors"
          >
            <Share2 className="h-3.5 w-3.5 text-stone-500" />
            <span>Share</span>
          </button>
          <button
            onClick={() => setLiked(!liked)}
            className={`flex items-center gap-1.5 rounded-sm border px-3 py-1.5 text-xs transition-colors ${
              liked 
                ? "border-red-300 bg-red-50 text-red-600 font-semibold" 
                : "border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50"
            }`}
          >
            <Heart className={`h-3.5 w-3.5 ${liked ? "fill-current text-red-500" : "text-stone-500"}`} />
            <span>{liked ? "Saved" : "Save"}</span>
          </button>
        </div>
      </div>

      {/* 2. LUXURY EDITORIAL GALLERY (Matching single-project.php) */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 rounded-lg overflow-hidden border border-neutral-200 bg-neutral-950">
          
          {/* Main Hero Shot */}
          <div className="relative lg:col-span-2 h-[340px] sm:h-[480px] w-full overflow-hidden group">
            <Image
              src={galleryImages[activeImageIndex]}
              alt={title}
              fill
              priority
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="rounded-sm bg-black/70 backdrop-blur-md px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#dfc498] border border-[#c5a880]/30">
                {developer}
              </span>
              <span className="rounded-sm bg-neutral-900/80 backdrop-blur-md px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
                {status}
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
              <span className="rounded-sm bg-black/60 backdrop-blur-md px-3 py-1 text-xs text-stone-200">
                Image {activeImageIndex + 1} of {galleryImages.length}
              </span>
            </div>
          </div>

          {/* Right Thumbnails Grid */}
          <div className="grid grid-cols-2 gap-2 lg:col-span-2">
            {galleryImages.slice(1, 5).map((img, idx) => {
              const imageIndex = idx + 1;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveImageIndex(imageIndex)}
                  className={`relative h-[166px] sm:h-[236px] w-full cursor-pointer overflow-hidden group ${
                    activeImageIndex === imageIndex ? "ring-2 ring-[#c5a880]" : ""
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${title} view ${imageIndex}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                  {idx === 1 && (
                    <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/80 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white border border-white/20">
                      <Eye className="h-3 w-3 text-[#c5a880]" />
                      <span>360° View</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 3. MAIN PROPERTY OVERVIEW */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column (8 cols): Details, Specs, Key Features, Calculator */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Header Title & Price */}
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#9f8052]">
                <MapPin className="h-4 w-4 text-[#c5a880]" />
                <span>{address}</span>
              </div>
              <h1 className="mt-2 font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold uppercase text-neutral-900 leading-tight">
                {title}
              </h1>
              <div className="mt-4 flex flex-wrap items-baseline gap-4">
                <div className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#9f8052]">
                  {price}
                </div>
                <div className="text-xs font-medium text-stone-500 uppercase tracking-wider">
                  ({pricePerSqFt} / sq. ft)
                </div>
              </div>
            </div>

            {/* Spec Badges Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 rounded-md border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-neutral-900 text-[#dfc498]">
                  <Bed className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-stone-500">Bedrooms</div>
                  <div className="font-serif-luxury font-bold text-neutral-900 text-sm">{bedrooms} Beds</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-neutral-900 text-[#dfc498]">
                  <Bath className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-stone-500">Bathrooms</div>
                  <div className="font-serif-luxury font-bold text-neutral-900 text-sm">{bathrooms} Baths</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-neutral-900 text-[#dfc498]">
                  <Maximize2 className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-stone-500">Total Area</div>
                  <div className="font-serif-luxury font-bold text-neutral-900 text-sm">{area}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-neutral-900 text-[#dfc498]">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-stone-500">Handover</div>
                  <div className="font-serif-luxury font-bold text-neutral-900 text-sm">{handover}</div>
                </div>
              </div>
            </div>

            {/* Description Narrative */}
            <div className="rounded-md border border-neutral-200 bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="font-serif-luxury text-2xl font-bold uppercase text-neutral-900">
                Development Narrative & Overview
              </h2>
              <div 
                className="mt-4 text-sm leading-relaxed text-stone-700 space-y-4 font-light"
                dangerouslySetInnerHTML={{ 
                  __html: content || `<p>${title} is an exquisite architectural triumph situated at one of Dubai's most prestigious coordinates. Conceived with meticulous attention to detail, this development harmonizes grand living spaces, bespoke finishes, and world-class resort style amenities.</p><p>Residents will enjoy effortless access to the city's premier financial districts, fine dining enclaves, luxury yacht marinas, and major international transit hubs.</p>` 
                }}
              />
            </div>

            {/* Key Features & Amenities */}
            <div className="rounded-md border border-neutral-200 bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="font-serif-luxury text-2xl font-bold uppercase text-neutral-900">
                Key Features & Signature Amenities
              </h2>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {keyFeatures.map((feat, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-sm bg-neutral-50 p-3.5 border border-neutral-100">
                    <CheckCircle2 className="h-4 w-4 text-[#9f8052] shrink-0 mt-0.5" />
                    <span className="text-xs text-neutral-800 font-medium">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Plan Breakdown */}
            <div className="rounded-md border border-neutral-200 bg-white p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                <h2 className="font-serif-luxury text-2xl font-bold uppercase text-neutral-900">
                  Developer Payment Structure
                </h2>
                <span className="rounded bg-[#c5a880]/20 px-3 py-1 text-xs font-bold uppercase text-[#9f8052]">
                  {paymentPlan}
                </span>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="rounded-md border border-neutral-200 bg-stone-50 p-4">
                  <div className="text-[11px] uppercase tracking-wider text-stone-500 font-medium">On Booking</div>
                  <div className="mt-1 font-serif-luxury text-2xl font-bold text-neutral-900">20%</div>
                  <div className="text-[10px] text-stone-400 mt-1">+ 4% DLD Fee</div>
                </div>
                <div className="rounded-md border border-neutral-200 bg-stone-50 p-4">
                  <div className="text-[11px] uppercase tracking-wider text-stone-500 font-medium">During Construction</div>
                  <div className="mt-1 font-serif-luxury text-2xl font-bold text-neutral-900">40% - 60%</div>
                  <div className="text-[10px] text-stone-400 mt-1">Easy Milestone Installments</div>
                </div>
                <div className="rounded-md border border-neutral-200 bg-stone-50 p-4">
                  <div className="text-[11px] uppercase tracking-wider text-stone-500 font-medium">On Handover</div>
                  <div className="mt-1 font-serif-luxury text-2xl font-bold text-neutral-900">20% - 40%</div>
                  <div className="text-[10px] text-stone-400 mt-1">{handover}</div>
                </div>
              </div>
            </div>

            {/* Mortgage & Payment Calculator */}
            <MortgageCalculator basePrice={price} />

          </div>

          {/* Right Column (4 cols): Sticky Lead & Inquiry Box */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              
              {/* Inquiry Action Box */}
              <div className="rounded-md bg-neutral-950 p-6 sm:p-8 text-white border border-neutral-800 shadow-2xl">
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#c5a880] font-semibold">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Direct Developer Sales</span>
                </div>
                <h3 className="mt-2 font-serif-luxury text-2xl uppercase tracking-wider text-stone-100">
                  Request Private Viewing
                </h3>
                <p className="mt-2 text-xs text-stone-400">
                  Speak directly with an accredited property director for official floor plans, unit availability, and customized payment arrangements.
                </p>

                <div className="mt-6 space-y-3">
                  <button
                    onClick={() => setModalOpen(true)}
                    className="w-full flex items-center justify-center gap-2 rounded-sm bg-gradient-to-r from-[#dfc498] via-[#c5a880] to-[#9f8052] py-3.5 text-xs font-bold uppercase tracking-widest text-neutral-950 shadow-lg hover:opacity-95 transition-opacity"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Inquire / Book Viewing</span>
                  </button>

                  <a
                    href="https://wa.me/971500000000"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-center gap-2 rounded-sm border border-stone-700 bg-neutral-900 py-3 text-xs font-semibold uppercase tracking-wider text-stone-200 hover:border-[#c5a880] hover:text-white transition-all"
                  >
                    <Phone className="h-4 w-4 text-[#c5a880]" />
                    <span>Chat on WhatsApp</span>
                  </a>

                  <button
                    onClick={() => {
                      alert("Official brochure download link requested. Our team will email the PDF package.");
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2 text-xs uppercase tracking-wider text-stone-400 hover:text-stone-200 transition-colors"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download Official PDF Brochure</span>
                  </button>
                </div>

                {/* Developer Stamp */}
                <div className="mt-8 border-t border-neutral-800 pt-5 flex items-center justify-between text-xs text-stone-400">
                  <div>
                    <span className="text-[10px] uppercase text-stone-500 block">Master Developer</span>
                    <strong className="text-stone-200">{developer}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-stone-500 block">Status</span>
                    <strong className="text-[#dfc498]">{status}</strong>
                  </div>
                </div>
              </div>

              {/* UAE Golden Visa Banner */}
              <div className="rounded-md border border-[#c5a880]/30 bg-stone-900/90 p-5 text-white">
                <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#dfc498]">
                  <Sparkles className="h-4 w-4 text-[#c5a880]" />
                  <span>10-Year Golden Visa Eligible</span>
                </div>
                <p className="mt-2 text-xs text-stone-300">
                  Purchasing real estate valued at AED 2M+ qualifies you and your immediate family for the 10-year renewable UAE Golden Residency Visa.
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 4. SIMILAR DEVELOPMENTS */}
      {relatedProjects.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 sm:px-8 pt-16 border-t border-neutral-200">
          <div className="flex items-center justify-between pb-8">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#9f8052] font-semibold">
                More Opportunities
              </span>
              <h2 className="mt-1 font-serif-luxury text-2xl sm:text-3xl font-bold uppercase text-neutral-900">
                Similar Dubai Developments
              </h2>
            </div>
            <Link
              href="/projects"
              className="text-xs font-bold uppercase tracking-widest text-[#9f8052] hover:text-neutral-900 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProjects.slice(0, 3).map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </section>
      )}

      {/* Lead Modal */}
      <ConsultationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        projectTitle={title}
      />

    </div>
  );
}

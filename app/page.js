import Link from "next/link";
import Image from "next/image";
import { 
  Building2, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp, 
  MapPin, 
  Award, 
  Globe2, 
  CheckCircle,
  Star,
  Key,
  Compass
} from "lucide-react";
import { getProjects, getServices, getTestimonials } from "@/lib/wp";
import ProjectCard from "@/components/ProjectCard";

export default async function HomePage() {
  const [projects, services, testimonials] = await Promise.all([
    getProjects(),
    getServices(),
    getTestimonials()
  ]);

  const featuredProjects = projects.slice(0, 3);

  return (
    <div className="flex flex-col bg-[#faf9f6]">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[92vh] w-full flex items-center justify-center overflow-hidden bg-neutral-950 pt-28 pb-20">
        
        {/* Background Luxury Dubai Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2000&q=85"
            alt="Dubai Skyline at Dusk"
            fill
            priority
            className="object-cover opacity-35 scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-black/70" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#faf9f6] to-transparent opacity-10" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 text-center text-white flex flex-col items-center">
          
          {/* Top Brand Accent */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#c5a880]/40 bg-neutral-900/80 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#dfc498] backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-[#c5a880]" />
            <span>Curated Dubai Property Portfolio</span>
          </div>

          <h1 className="mt-6 font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-wide leading-[1.1] max-w-5xl text-stone-100">
            Own Iconic Luxury In <br className="hidden sm:inline" />
            <span className="gold-gradient-text">Dubai’s Prime Skyline</span>
          </h1>

          <p className="mt-6 max-w-2xl text-sm sm:text-base text-stone-300 leading-relaxed font-light">
            Direct access to prime off-plan launches, bespoke penthouses, and private beachfront villas by Emaar, Nakheel, and Dubai’s top developers.
          </p>

          {/* Action CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/projects"
              className="flex items-center gap-3 rounded-sm bg-gradient-to-r from-[#dfc498] via-[#c5a880] to-[#9f8052] px-8 py-4 text-xs font-bold uppercase tracking-widest text-neutral-950 shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-[#c5a880]/30"
            >
              <span>Explore Projects</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/services"
              className="flex items-center gap-2 rounded-sm border border-stone-600 bg-neutral-900/60 px-8 py-4 text-xs font-semibold uppercase tracking-widest text-stone-200 backdrop-blur-md hover:border-[#c5a880] hover:text-white transition-all"
            >
              <span>Investor Advisory</span>
            </Link>
          </div>

          {/* Market Trust Badges */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-12 border-t border-stone-800/80 pt-8 w-full max-w-4xl text-stone-300">
            <div>
              <div className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#dfc498]">0%</div>
              <div className="text-[10px] uppercase tracking-wider text-stone-400 mt-0.5">Personal & Property Tax</div>
            </div>
            <div>
              <div className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#dfc498]">8 - 12%</div>
              <div className="text-[10px] uppercase tracking-wider text-stone-400 mt-0.5">Projected Rental ROI</div>
            </div>
            <div>
              <div className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#dfc498]">10 Years</div>
              <div className="text-[10px] uppercase tracking-wider text-stone-400 mt-0.5">UAE Golden Visa</div>
            </div>
            <div>
              <div className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#dfc498]">$10B+</div>
              <div className="text-[10px] uppercase tracking-wider text-stone-400 mt-0.5">Developer Allocations</div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. FEATURED DEVELOPMENTS (FROM LIVE BACKEND) */}
      {featuredProjects.length > 0 && (
        <section className="py-24 px-5 sm:px-8 max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-neutral-200">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] font-semibold text-[#9f8052]">
                Exclusive Selection
              </div>
              <h2 className="mt-2 font-serif-luxury text-3xl sm:text-4xl font-bold uppercase text-neutral-900">
                Featured Dubai Developments
              </h2>
              <p className="mt-2 text-sm text-stone-600 max-w-xl">
                Handpicked off-plan and ready developments offering prime locations, attractive post-handover payment structures, and high rental yields.
              </p>
            </div>

            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#9f8052] hover:text-neutral-900 transition-colors"
            >
              <span>View All Properties ({projects.length})</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Project Cards Grid */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, idx) => (
              <ProjectCard key={project.id} project={project} priority={idx === 0} />
            ))}
          </div>
        </section>
      )}

      {/* 3. PRIME NEIGHBORHOODS SHOWCASE */}
      <section className="bg-neutral-950 text-white py-24 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.3em] text-[#c5a880] font-semibold">
              Iconic Addresses
            </span>
            <h2 className="mt-2 font-serif-luxury text-3xl sm:text-4xl uppercase text-stone-100">
              Dubai’s Most Prestigious Destinations
            </h2>
            <p className="mt-3 text-sm text-stone-400">
              Explore premier enclaves that define luxury living and generate unmatched global capital appreciation.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Palm Jumeirah */}
            <Link
              href="/projects?location=palm-jumeirah"
              className="group relative h-80 rounded-md overflow-hidden border border-neutral-800"
            >
              <Image
                src="https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=800&q=80"
                alt="Palm Jumeirah"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <span className="text-[10px] uppercase tracking-widest text-[#c5a880]">Waterfront Living</span>
                <h3 className="font-serif-luxury text-xl font-bold uppercase text-white group-hover:text-[#dfc498] transition-colors">
                  Palm Jumeirah
                </h3>
                <p className="text-[11px] text-stone-400 mt-1">Signature Beachfront Villas & Penthouses</p>
              </div>
            </Link>

            {/* Downtown Dubai */}
            <Link
              href="/projects?location=downtown-dubai"
              className="group relative h-80 rounded-md overflow-hidden border border-neutral-800"
            >
              <Image
                src="https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80"
                alt="Downtown Dubai"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <span className="text-[10px] uppercase tracking-widest text-[#c5a880]">Urban Center</span>
                <h3 className="font-serif-luxury text-xl font-bold uppercase text-white group-hover:text-[#dfc498] transition-colors">
                  Downtown Dubai
                </h3>
                <p className="text-[11px] text-stone-400 mt-1">Burj Khalifa District & Opera Grand</p>
              </div>
            </Link>

            {/* Dubai Creek Harbour */}
            <Link
              href="/projects?location=dubai-creek"
              className="group relative h-80 rounded-md overflow-hidden border border-neutral-800"
            >
              <Image
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80"
                alt="Dubai Creek Harbour"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <span className="text-[10px] uppercase tracking-widest text-[#c5a880]">Future Waterfront</span>
                <h3 className="font-serif-luxury text-xl font-bold uppercase text-white group-hover:text-[#dfc498] transition-colors">
                  Dubai Creek Harbour
                </h3>
                <p className="text-[11px] text-stone-400 mt-1">Emaar Master Community & Marinas</p>
              </div>
            </Link>

            {/* Dubai Hills Estate */}
            <Link
              href="/projects?location=dubai-hills"
              className="group relative h-80 rounded-md overflow-hidden border border-neutral-800"
            >
              <Image
                src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=80"
                alt="Dubai Hills Estate"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <span className="text-[10px] uppercase tracking-widest text-[#c5a880]">Golf Community</span>
                <h3 className="font-serif-luxury text-xl font-bold uppercase text-white group-hover:text-[#dfc498] transition-colors">
                  Dubai Hills Estate
                </h3>
                <p className="text-[11px] text-stone-400 mt-1">18-Hole Championship Golf Mansions</p>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* 4. BESPOKE SERVICES (FROM LIVE WP API) */}
      {services.length > 0 && (
        <section className="py-24 px-5 sm:px-8 max-w-7xl mx-auto w-full">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#9f8052]">
              End-To-End Advisory
            </span>
            <h2 className="mt-2 font-serif-luxury text-3xl sm:text-4xl font-bold uppercase text-neutral-900">
              Comprehensive Real Estate Services
            </h2>
            <p className="mt-3 text-sm text-stone-600">
              Tailored solutions for international high-net-worth individuals, institutional funds, and discerning homeowners.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => {
              const title = typeof service.title === "object" ? service.title.rendered : service.title;
              const content = typeof service.content === "object" ? service.content.rendered : service.content;

              return (
                <div
                  key={service.id || i}
                  className="group rounded-md border border-neutral-200 bg-white p-7 transition-all duration-300 hover:border-[#c5a880] hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-neutral-900 text-[#dfc498] group-hover:bg-[#c5a880] group-hover:text-neutral-950 transition-colors">
                      {i === 0 ? <TrendingUp className="h-6 w-6" /> :
                       i === 1 ? <Key className="h-6 w-6" /> :
                       i === 2 ? <ShieldCheck className="h-6 w-6" /> :
                       <Building2 className="h-6 w-6" />}
                    </div>

                    <h3 className="mt-6 font-serif-luxury text-lg font-bold uppercase text-neutral-900 group-hover:text-[#9f8052] transition-colors">
                      {title}
                    </h3>

                    <div 
                      className="mt-3 text-xs leading-relaxed text-stone-600 line-clamp-4"
                      dangerouslySetInnerHTML={{ __html: content }}
                    />
                  </div>

                  <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center text-xs font-semibold uppercase tracking-wider text-[#9f8052] group-hover:text-neutral-950">
                    <span>Learn More</span>
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 5. CLIENT TESTIMONIALS & TRUST (FROM LIVE WP API) */}
      {testimonials.length > 0 && (
        <section className="bg-stone-100 py-24 px-5 sm:px-8 border-y border-stone-200">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-stone-300/80">
              <div>
                <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#9f8052]">
                  Client Experience
                </span>
                <h2 className="mt-2 font-serif-luxury text-3xl sm:text-4xl font-bold uppercase text-neutral-900">
                  Trusted by Global Investors
                </h2>
              </div>
              <div className="flex items-center gap-1 text-[#d4af37]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
                <span className="ml-2 text-xs font-bold text-neutral-800">5.0 Star Rated Concierge</span>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((t, idx) => (
                <div
                  key={t.id || idx}
                  className="flex flex-col justify-between rounded-md bg-white p-8 border border-neutral-200/80 shadow-sm"
                >
                  <div>
                    <div className="flex gap-1 text-[#c5a880] mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm italic leading-relaxed text-stone-700">
                      "{t.quote || t.content?.rendered?.replace(/<[^>]+>/g, '') || "Outstanding professionalism throughout our acquisition."}"
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-neutral-100">
                    <div className="font-serif-luxury font-bold text-neutral-900">
                      {t.author || t.title?.rendered || "Distinguished Client"}
                    </div>
                    <div className="text-xs text-stone-500">
                      {t.role || t.province || "International Investor"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
}

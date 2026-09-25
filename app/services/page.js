import Image from "next/image";
import Link from "next/link";
import { 
  Building2, 
  Key, 
  ShieldCheck, 
  TrendingUp, 
  Globe2, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Users,
  Briefcase
} from "lucide-react";
import { getServices } from "@/lib/wp";

export const metadata = {
  title: "Real Estate Services & Wealth Advisory | KL MAQAN",
  description: "Comprehensive luxury property advisory in Dubai: Off-plan allocations, trophy residential acquisitions, UAE Golden Visa processing, and asset management.",
};

export default async function ServicesPage() {
  const services = await getServices();

  const serviceIcons = [
    <TrendingUp key="1" className="h-7 w-7" />,
    <Key key="2" className="h-7 w-7" />,
    <ShieldCheck key="3" className="h-7 w-7" />,
    <Building2 key="4" className="h-7 w-7" />,
  ];

  return (
    <div className="w-full bg-[#faf9f6] min-h-screen">
      
      {/* 1. HERO BANNER */}
      <section className="relative flex min-h-[420px] w-full flex-col justify-center overflow-hidden pt-36 pb-20 bg-neutral-950 text-white">
        <Image
          src="https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=2000&q=85"
          alt="Dubai Architecture"
          fill
          priority
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-black/70" />

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
          <p className="text-xs uppercase tracking-[0.3em] text-[#dfc498] font-semibold">
            BESPOKE ADVISORY
          </p>
          <h1 className="mt-4 max-w-3xl font-serif-luxury text-3xl font-bold uppercase leading-tight tracking-wide text-stone-100 sm:text-4xl md:text-5xl">
            Tailored Real Estate & <br />
            <span className="gold-gradient-text">Investment Services</span>
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-stone-300 font-light">
            Guiding high-net-worth individuals and international investment funds through seamless acquisitions, legal structuring, and asset optimization in Dubai.
          </p>
        </div>
      </section>

      {/* 2. SERVICES LIST */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, idx) => {
            const title = typeof service.title === "object" ? service.title.rendered : service.title;
            const content = typeof service.content === "object" ? service.content.rendered : service.content;

            return (
              <div
                key={service.id || idx}
                className="rounded-lg border border-neutral-200/90 bg-white p-8 sm:p-10 shadow-sm flex flex-col justify-between hover:border-[#c5a880] transition-colors"
              >
                <div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-sm bg-neutral-950 text-[#dfc498]">
                    {serviceIcons[idx % serviceIcons.length]}
                  </div>

                  <h2 className="mt-6 font-serif-luxury text-2xl font-bold uppercase text-neutral-900">
                    {title}
                  </h2>

                  <div 
                    className="mt-4 text-sm leading-relaxed text-stone-600 font-light"
                    dangerouslySetInnerHTML={{ __html: content }}
                  />

                  <div className="mt-6 space-y-2 border-t border-neutral-100 pt-6">
                    <div className="flex items-center gap-2 text-xs text-stone-700 font-medium">
                      <CheckCircle2 className="h-4 w-4 text-[#9f8052]" />
                      <span>Dedicated Senior Client Advisor</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-stone-700 font-medium">
                      <CheckCircle2 className="h-4 w-4 text-[#9f8052]" />
                      <span>Confidential Off-Market Inventory</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-stone-700 font-medium">
                      <CheckCircle2 className="h-4 w-4 text-[#9f8052]" />
                      <span>Full Legal & DLD Escrow Guidance</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-neutral-100">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#9f8052] hover:text-neutral-900 transition-colors"
                  >
                    <span>Inquire About Service</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. GOLDEN VISA SECTION */}
      <section className="bg-neutral-950 text-white py-20 px-5 sm:px-8 border-t border-neutral-800">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase tracking-[0.3em] text-[#c5a880] font-semibold">
              UAE Residency Program
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl uppercase text-stone-100">
              UAE 10-Year Golden Visa Concierge
            </h2>
            <p className="text-sm text-stone-300 leading-relaxed font-light">
              Foreign investors purchasing real estate with a combined value of AED 2 Million (approx. USD $545,000) or above qualify for a 10-year renewable residency visa.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="rounded-sm bg-neutral-900 border border-neutral-800 p-4">
                <div className="font-serif-luxury text-xl font-bold text-[#dfc498]">100% Family Coverage</div>
                <div className="text-xs text-stone-400 mt-1">Includes spouse, children of any age, and domestic staff.</div>
              </div>
              <div className="rounded-sm bg-neutral-900 border border-neutral-800 p-4">
                <div className="font-serif-luxury text-xl font-bold text-[#dfc498]">No Stay Requirement</div>
                <div className="text-xs text-stone-400 mt-1">Remain abroad indefinitely without risking visa cancellation.</div>
              </div>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-sm bg-gradient-to-r from-[#dfc498] via-[#c5a880] to-[#9f8052] px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-neutral-950 hover:scale-105 transition-transform"
            >
              <span>Consult Our Visa Specialist</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="lg:col-span-5 relative h-96 rounded-lg overflow-hidden border border-neutral-800">
            <Image
              src="https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=1000&q=80"
              alt="Dubai Skyline Palm"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="font-serif-luxury text-xl font-bold uppercase text-white">Live & Invest in Dubai</div>
              <div className="text-xs text-stone-300 mt-1">World’s safest and most dynamic business metropolis.</div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

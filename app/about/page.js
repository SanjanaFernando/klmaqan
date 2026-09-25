import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  Award,
  ShieldCheck,
  Globe,
  Users,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export const metadata = {
  title: "About KL MAQAN | Dubai Luxury Real Estate Advisory",
  description:
    "Learn about KL MAQAN, Dubai's premier real estate consultancy. Delivering unparalleled market insights, developer allocations, and bespoke investor services.",
};

export default function AboutPage() {
  const masterDevelopers = [
    {
      name: "Emaar Properties",
      desc: "Creator of Downtown Dubai, Burj Khalifa & Dubai Hills.",
    },
    {
      name: "Nakheel",
      desc: "Pioneers of Palm Jumeirah & Dubai Islands waterfronts.",
    },
    {
      name: "Meraas",
      desc: "Design-led prime urban destinations including City Walk & Bluewaters.",
    },
    {
      name: "Damac Properties",
      desc: "Luxury lifestyle master-communities & branded residences.",
    },
    {
      name: "Sobha Realty",
      desc: "Signature craftsmanship & backward-integrated luxury construction.",
    },
    {
      name: "Omniyat",
      desc: "Ultra-luxury architectural landmarks designed by Zaha Hadid.",
    },
  ];

  return (
    <div className="luxury-page w-full bg-[#faf9f6] min-h-screen">
      {/* 1. HERO BANNER */}
      <section className="relative flex min-h-[420px] w-full flex-col justify-center overflow-hidden pt-36 pb-20 bg-neutral-950 text-white">
        <Image
          src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2000&q=85"
          alt="Dubai Skyline"
          fill
          priority
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-black/70" />

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
          <p className="text-xs uppercase tracking-[0.3em] text-[#dfc498] font-semibold">
            ABOUT KL MAQAN
          </p>
          <h1 className="mt-4 max-w-3xl font-serif-luxury text-3xl font-bold uppercase leading-tight tracking-wide text-stone-100 sm:text-4xl md:text-5xl">
            Redefining Luxury Property <br />
            <span className="gold-gradient-text">Advisory in Dubai</span>
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-stone-300 font-light">
            Bridging international capital with premier Middle Eastern real
            estate through deep local intelligence, discreet advisory, and
            priority developer relationships.
          </p>
        </div>
      </section>

      {/* 2. OUR STORY & PHILOSOPHY */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#9f8052]">
              Our Heritage & Vision
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold uppercase text-neutral-900 leading-tight">
              A Legacy Built on Discretion, Trust & Exceptional Returns
            </h2>
            <p className="text-sm leading-relaxed text-stone-700 font-light">
              KL MAQAN was established to provide an elevated standard of real
              estate advisory for international private clients, family offices,
              and institutional investors seeking exposure to Dubai’s
              hyper-growth market.
            </p>
            <p className="text-sm leading-relaxed text-stone-700 font-light">
              With decades of collective experience, our advisory team offers
              unparalleled insider access to tier-one developer allocations
              before they hit the open market, ensuring our clients capitalize
              on prime capital growth and optimal payment flexibility.
            </p>

            <div className="grid grid-cols-2 gap-6 border-t border-neutral-200 pt-6">
              <div>
                <div className="font-serif-luxury text-3xl font-bold text-[#9f8052]">
                  AED 4.2B+
                </div>
                <div className="text-xs text-stone-500 uppercase tracking-wider mt-1">
                  Transacted Volume
                </div>
              </div>
              <div>
                <div className="font-serif-luxury text-3xl font-bold text-[#9f8052]">
                  45+
                </div>
                <div className="text-xs text-stone-500 uppercase tracking-wider mt-1">
                  Nationalities Served
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative h-[450px] rounded-lg overflow-hidden border border-neutral-200 shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85"
              alt="Luxury Dubai Villa"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 3. MASTER DEVELOPER PARTNERS */}
      <section className="bg-stone-100 py-20 px-5 sm:px-8 border-y border-stone-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#9f8052]">
              Strategic Alliances
            </span>
            <h2 className="mt-2 font-serif-luxury text-3xl sm:text-4xl font-bold uppercase text-neutral-900">
              Direct Tier-1 Master Developers
            </h2>
            <p className="mt-3 text-sm text-stone-600">
              We partner directly with the UAE’s most established master
              developers to guarantee legitimate escrow compliance and zero
              buyer commission.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {masterDevelopers.map((dev, i) => (
              <div
                key={i}
                className="rounded-md bg-white p-6 border border-neutral-200/80 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-neutral-900 text-[#dfc498]">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-serif-luxury font-bold uppercase text-neutral-900 text-base">
                      {dev.name}
                    </h3>
                    <span className="text-[10px] uppercase tracking-wider text-[#9f8052]">
                      Accredited Partner
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-xs text-stone-600 leading-relaxed">
                  {dev.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ChevronDown,
  Gem,
  MapPin,
  MoveUpRight,
  Sparkles,
  Star,
} from "lucide-react";

const heroImage =
  "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2200&q=90";
const districts = [
  {
    name: "Palm Jumeirah",
    type: "Waterfront residences",
    image:
      "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Downtown Dubai",
    type: "Skyline apartments",
    image:
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Dubai Hills",
    type: "Contemporary estates",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1000&q=85",
  },
];

const reveal = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
};

function titleOf(item, fallback) {
  return typeof item?.title === "object"
    ? item.title?.rendered
    : item?.title || fallback;
}

function imageOf(project) {
  return (
    project?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    project?.acf?.image ||
    heroImage
  );
}

export default function HomeClient({ projects, services, testimonials }) {
  const featuredProjects = projects.slice(0, 3);
  const featuredServices = services.slice(0, 3);
  const featuredTestimonials = testimonials.slice(0, 2);

  return (
    <div className="overflow-hidden bg-[#0b0b0b] text-[#f5f5f7]">
      <section className="relative isolate min-h-[760px] overflow-hidden border-b border-[#d4af37]/20 px-5 pb-20 pt-36 sm:px-8 lg:min-h-[900px] lg:px-12 lg:pt-48">
        <Image
          src={heroImage}
          alt="Dubai skyline at golden hour"
          fill
          priority
          className="-z-20 object-cover object-center opacity-45"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#0b0b0b_0%,rgba(11,11,11,.8)_38%,rgba(11,11,11,.2)_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,#0b0b0b_0%,transparent_42%,rgba(11,11,11,.6)_100%)]" />
        <div className="absolute right-[8%] top-[22%] -z-10 h-56 w-56 rounded-full border border-[#d4af37]/20 blur-[1px] sm:h-80 sm:w-80" />
        <div className="mx-auto flex max-w-[1400px] flex-col">
          <motion.div
            initial="hidden"
            animate="show"
            variants={reveal}
            className="max-w-3xl"
          >
            <div className="mb-7 flex items-center gap-3 text-[10px] uppercase tracking-[.35em] text-[#d4af37] sm:text-xs">
              <span className="h-px w-10 bg-[#d4af37]" /> Private property
              advisory
            </div>
            <h1 className="max-w-4xl font-serif-luxury text-[clamp(3.5rem,8vw,8.5rem)] font-medium leading-[.82] tracking-[-.03em] text-[#f5f5f7]">
              The art of <span className="gold-shimmer italic">arrival.</span>
            </h1>
            <p className="mt-9 max-w-lg text-sm leading-7 text-[#f5f5f7]/65 sm:text-base">
              A considered collection of Dubai residences for those who expect
              more from the places they call home.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/projects"
                className="group inline-flex items-center gap-4 bg-[#d4af37] px-6 py-4 text-[11px] font-bold uppercase tracking-[.2em] text-[#0b0b0b] transition-colors hover:bg-[#f0dfa8]"
              >
                Explore the collection{" "}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 border border-[#f5f5f7]/35 px-6 py-4 text-[11px] uppercase tracking-[.2em] text-[#f5f5f7] transition-colors hover:border-[#d4af37] hover:text-[#d4af37]"
              >
                Private consultation
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial="hidden"
            animate="show"
            variants={reveal}
            transition={{ delay: 0.25 }}
            className="mt-24 grid max-w-3xl grid-cols-2 gap-y-8 border-t border-[#f5f5f7]/20 pt-6 sm:grid-cols-4 sm:gap-8"
          >
            {[
              ["01", "Curated residences"],
              ["18", "Prime communities"],
              ["12%", "Target rental yield"],
              ["10yr", "Golden visa access"],
            ].map(([value, label]) => (
              <div key={label}>
                <p className="font-serif-luxury text-3xl text-[#d4af37] sm:text-4xl">
                  {value}
                </p>
                <p className="mt-1 max-w-28 text-[10px] uppercase leading-4 tracking-[.12em] text-[#f5f5f7]/50">
                  {label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
        <div className="absolute bottom-8 right-8 hidden items-center gap-3 text-[10px] uppercase tracking-[.25em] text-[#f5f5f7]/50 lg:flex">
          <ChevronDown className="h-4 w-4 text-[#d4af37]" /> Discover below
        </div>
      </section>

      <section className="bg-[#f5f5f7] px-5 py-24 text-[#0b0b0b] sm:px-8 lg:px-12 lg:py-36">
        <div className="mx-auto max-w-[1400px]">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={reveal}
            className="flex flex-col justify-between gap-8 border-b border-[#0b0b0b]/15 pb-10 md:flex-row md:items-end"
          >
            <div>
              <p className="text-[10px] uppercase tracking-[.35em] text-[#aa7c11]">
                The edit / 01
              </p>
              <h2 className="mt-4 max-w-xl font-serif-luxury text-5xl font-medium leading-[.9] sm:text-7xl">
                A rarer point of view.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-[#0b0b0b]/60">
              We bring the intuition of a local insider and the discretion of a
              private office to every acquisition.
            </p>
          </motion.div>
          {featuredProjects.length > 0 && (
            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id || index}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={reveal}
                  transition={{ delay: index * 0.08 }}
                >
                  <Link
                    href={`/projects/${project.slug || ""}`}
                    className="group block"
                  >
                    <div className="relative aspect-[.82] overflow-hidden bg-[#1a1a1a]">
                      <Image
                        src={imageOf(project)}
                        alt={titleOf(project, "Featured residence")}
                        fill
                        className="object-cover transition duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b]/80 via-transparent to-transparent" />
                      <span className="absolute left-5 top-5 border border-[#f5f5f7]/40 px-3 py-2 text-[9px] uppercase tracking-[.2em] text-[#f5f5f7]">
                        0{index + 1} / Residence
                      </span>
                      <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-[#f5f5f7]">
                        <div>
                          <p className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[.18em] text-[#d4af37]">
                            <MapPin className="h-3 w-3" /> Dubai, UAE
                          </p>
                          <h3 className="font-serif-luxury text-3xl">
                            {titleOf(project, "Signature Residence")}
                          </h3>
                        </div>
                        <MoveUpRight className="h-5 w-5 opacity-70 transition group-hover:-translate-y-1 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
          <Link
            href="/projects"
            className="mt-12 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[.2em] text-[#aa7c11]"
          >
            View all residences <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="bg-[#1a1a1a] px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[.35em] text-[#d4af37]">
                The edit / 02
              </p>
              <h2 className="mt-4 font-serif-luxury text-5xl leading-[.9] text-[#f5f5f7] sm:text-7xl">
                Addresses with gravity.
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-7 text-[#f5f5f7]/55">
              Three distinct expressions of the Dubai lifestyle, selected for
              their enduring value.
            </p>
          </div>
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {districts.map((district, index) => (
              <Link
                key={district.name}
                href={`/projects?location=${district.name.toLowerCase().replaceAll(" ", "-")}`}
                className={`group relative overflow-hidden ${index === 1 ? "md:mt-16" : ""}`}
              >
                <div className="relative aspect-[.72]">
                  <Image
                    src={district.image}
                    alt={district.name}
                    fill
                    className="object-cover opacity-75 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <p className="mb-2 text-[10px] uppercase tracking-[.25em] text-[#d4af37]">
                      0{index + 1} / {district.type}
                    </p>
                    <h3 className="font-serif-luxury text-3xl text-[#f5f5f7]">
                      {district.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0b0b0b] px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
        <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-[10px] uppercase tracking-[.35em] text-[#d4af37]">
              The edit / 03
            </p>
            <h2 className="mt-4 max-w-md font-serif-luxury text-5xl leading-[.9] text-[#f5f5f7] sm:text-7xl">
              Quietly exceptional service.
            </h2>
            <p className="mt-8 max-w-sm text-sm leading-7 text-[#f5f5f7]/55">
              From first conversation to key handover, every detail is managed
              with clarity, discretion, and care.
            </p>
            <Link
              href="/services"
              className="mt-8 inline-flex items-center gap-3 text-[11px] uppercase tracking-[.2em] text-[#d4af37]"
            >
              Our expertise <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="divide-y divide-[#f5f5f7]/15 border-y border-[#f5f5f7]/15">
            {(featuredServices.length
              ? featuredServices
              : [
                  { title: "Acquisition advisory" },
                  { title: "Portfolio strategy" },
                  { title: "Private client care" },
                ]
            ).map((service, index) => (
              <div
                key={service.id || index}
                className="group flex items-center justify-between py-7"
              >
                <div className="flex items-center gap-5">
                  <span className="font-serif-luxury text-xl text-[#aa7c11]">
                    0{index + 1}
                  </span>
                  <h3 className="font-serif-luxury text-3xl text-[#f5f5f7] transition group-hover:text-[#d4af37]">
                    {titleOf(service, "Bespoke advisory")}
                  </h3>
                </div>
                <Gem className="h-5 w-5 text-[#d4af37]/70" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {featuredTestimonials.length > 0 && (
        <section className="border-t border-[#d4af37]/20 bg-[#f5f5f7] px-5 py-24 text-[#0b0b0b] sm:px-8 lg:px-12">
          <div className="mx-auto max-w-[1400px]">
            <div className="flex items-center gap-3 text-[#aa7c11]">
              <Sparkles className="h-4 w-4" />
              <span className="text-[10px] uppercase tracking-[.3em]">
                Private client notes
              </span>
            </div>
            <div className="mt-12 grid gap-10 md:grid-cols-2">
              {featuredTestimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id || index}
                  className="border-t border-[#0b0b0b]/20 pt-6"
                >
                  <div className="mb-6 flex gap-1 text-[#d4af37]">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="max-w-xl font-serif-luxury text-3xl leading-tight">
                    “
                    {testimonial.quote ||
                      testimonial.content?.rendered?.replace(/<[^>]+>/g, "") ||
                      "An exceptional experience from beginning to end."}
                    ”
                  </p>
                  <p className="mt-7 text-[10px] uppercase tracking-[.2em] text-[#0b0b0b]/50">
                    {testimonial.author ||
                      titleOf(testimonial, "Private client")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

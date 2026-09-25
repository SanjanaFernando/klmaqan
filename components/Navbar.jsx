"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2,
  Menu,
  X,
  Phone,
  ArrowUpRight,
  Sparkles,
  Compass,
  Briefcase,
  HelpCircle,
  Mail
} from "lucide-react";
import ConsultationModal from "./ConsultationModal";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Packages", href: "/packages" },
    { name: "Services", href: "/services" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const isHome = pathname === "/";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
            ? "glass-nav py-3.5 shadow-2xl shadow-black/20"
            : isHome
              ? "bg-transparent py-5"
              : "bg-neutral-950 py-4 border-b border-neutral-800"
          }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">

          {/* Brand Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-gradient-to-br from-[#dfc498] via-[#c5a880] to-[#9f8052] text-neutral-950 shadow-md group-hover:scale-105 transition-transform duration-300">
              <Building2 className="h-5 w-5 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif-luxury text-xl font-bold tracking-[0.2em] text-white uppercase group-hover:text-[#dfc498] transition-colors">
                KL MAQAN
              </span>
              <span className="text-[9px] tracking-[0.35em] text-stone-400 uppercase -mt-1">
                Luxury Real Estate Dubai
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-xs uppercase tracking-[0.2em] transition-all duration-300 relative py-1 ${active
                      ? "text-[#dfc498] font-semibold"
                      : "text-stone-300 hover:text-white"
                    }`}
                >
                  {link.name}
                  {active && (
                    <span className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-[#dfc498] to-[#9f8052] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-5">


            <button
              onClick={() => setModalOpen(true)}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-sm bg-gradient-to-r from-[#c5a880] to-[#9f8052] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-neutral-950 shadow-lg transition-all duration-300 hover:shadow-[#c5a880]/30 hover:scale-[1.02]"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Book VIP Consultation</span>
              <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex md:hidden h-10 w-10 items-center justify-center rounded-sm border border-stone-700 bg-neutral-900 text-stone-300 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden glass-card-dark border-t border-stone-800 px-6 py-6 mt-3 space-y-4 animate-fade-in">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-sm uppercase tracking-wider py-2 px-3 rounded-sm ${active
                        ? "bg-stone-800 text-[#dfc498] font-semibold"
                        : "text-stone-300 hover:bg-stone-900"
                      }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            <div className="pt-4 border-t border-stone-800 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 rounded-sm bg-gradient-to-r from-[#c5a880] to-[#9f8052] py-3 text-xs font-semibold uppercase tracking-wider text-neutral-950"
              >
                <Sparkles className="h-4 w-4" />
                <span>Book VIP Consultation</span>
              </button>
              <a
                href="tel:+97140000000"
                className="flex items-center justify-center gap-2 py-2 text-xs uppercase tracking-widest text-stone-400 hover:text-white"
              >
                <Phone className="h-3.5 w-3.5 text-[#c5a880]" />
                <span>+971 4 000 0000</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Consultation Modal */}
      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}

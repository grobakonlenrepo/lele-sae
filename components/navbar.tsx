"use client";

import Link from "next/link";
import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { content } from "@/data/content";
import {
  IconShoppingBagPlus,
  IconClockHour8,
  IconMenu2,
  IconX,
} from "@tabler/icons-react";
import { ANIMATIONS, VISIBLE_STATE } from "@/constants/animations";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [visibleItems, setVisibleItems] = useState<string[]>([]);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  const whatsappUrl = `https://wa.me/${content.navbar.noWaUsaha}`;

  const navigationItems = [
    { href: "#menu", label: "menu" },
    { href: "#testimoni", label: "testimoni" },
    { href: "#faq", label: "faq" },
    { href: "#tentang-kami", label: "tentang kami" },
    { href: "#kontak", label: "kontak" },
  ];

  // Initial load animation with staggered effect
  useEffect(() => {
    const items = ["logo", "info", "nav", "cta", "toggle"];
    items.forEach((item, index) => {
      setTimeout(() => {
        setVisibleItems((prev) => [...prev, item]);
      }, index * ANIMATIONS.DELAYS.STAGGER);
    });
  }, []);

  // Enhanced scroll effect dengan hide/show behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Set scrolled state
      setIsScrolled(currentScrollY > 50);

      // Hide/show navbar based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & past threshold - hide navbar
        setIsVisible(false);
      } else {
        // Scrolling up or at top - show navbar
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close mobile menu when clicking navigation links
  const handleNavClick = useCallback(() => {
    closeMobileMenu();
  }, [closeMobileMenu]);

  // Animation classes - reusable
  const getAnimationClasses = (itemKey: string, variant = "fadeUp") => {
    const isItemVisible = visibleItems.includes(itemKey);
    const variants = {
      fadeUp: "opacity-0 translate-y-8",
      fadeDown: "opacity-0 -translate-y-8",
      fadeLeft: "opacity-0 -translate-x-8",
      fadeRight: "opacity-0 translate-x-8",
      scale: "opacity-0 scale-75",
    };

    return `transition-all duration-${ANIMATIONS.DURATION.SLOW} ${ANIMATIONS.EASING} ${
      isItemVisible ? VISIBLE_STATE : variants[variant as keyof typeof variants]
    }`;
  };

  return (
    <header
      className={`font-antonio fixed top-0 right-0 left-0 z-50 flex items-center justify-between px-4 py-3 backdrop-blur-md transition-all duration-500 sm:px-[64px] ${
        isScrolled
          ? "bg-brand-prim/95 border-b border-white/20 shadow-lg shadow-black/10"
          : "bg-brand-prim/98 border-b border-white/10"
      } ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
      style={{
        backdropFilter: "blur(12px) saturate(180%)",
        boxShadow: isScrolled
          ? "0 4px 32px -4px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.05)"
          : "0 1px 0 0 rgba(255, 255, 255, 0.1)",
      }}
    >
      {/* Left Section */}
      <div className="flex items-center gap-3">
        {/* Desktop Logo */}
        <Link
          href="/"
          className={`hidden sm:flex ${getAnimationClasses("logo", "fadeLeft")}`}
          style={{
            transitionDelay: `${ANIMATIONS.DELAYS.ELEMENT}ms`,
          }}
        >
          <Image
            src={content.navbar.logo || "/placeholder.svg"}
            alt={`${content.biodata.namaBrand} Logo`}
            className={` transition-all duration-300 hover:scale-110 hover:rotate-8 ${
              isScrolled ? "w-[64px]" : "w-[64px]"
            }`}
            width={120}
            height={120}
            priority
          />
        </Link>

        {/* Operational Info - Hide on scroll untuk mobile */}
        <div
          className={`hidden items-center gap-1 text-white transition-all duration-500 sm:flex ${getAnimationClasses("info", "fadeRight")} ${
            isScrolled ? "hidden lg:flex" : ""
          }`}
          style={{
            transitionDelay: `${ANIMATIONS.DELAYS.STAGGER}ms`,
          }}
        >
          <IconClockHour8
            size={isScrolled ? 24 : 28}
            className="transition-all duration-300"
          />
          <div
            className={`font-antonio flex flex-col gap-1 font-semibold tracking-normal break-normal uppercase decoration-solid transition-all duration-300 ${
              isScrolled
                ? "text-[12px] leading-[12px]"
                : "text-[14px] leading-[14px]"
            }`}
          >
            <span>{content.navbar.hariOperasional}</span>
            <span>{content.navbar.jamOperasional}</span>
          </div>
        </div>

        {/* Mobile Logo */}
        <Link
          href="/"
          className={`sm:hidden ${getAnimationClasses("logo", "fadeLeft")}`}
          style={{
            transitionDelay: `${ANIMATIONS.DELAYS.ELEMENT}ms`,
          }}
        >
          <Image
            src={content.navbar.logo || "/placeholder.svg"}
            alt={`${content.biodata.namaBrand} Logo`}
            className={` transition-all hover:scale-110 hover:rotate-8 duration-300 ${isScrolled ? "w-[64px]" : "w-[64px]"}`}
            width={50}
            height={50}
            priority
          />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <nav
        className={`hidden text-white lg:flex ${getAnimationClasses("nav", "fadeDown")}`}
        style={{
          transitionDelay: `${ANIMATIONS.DELAYS.STAGGER * 2}ms`,
        }}
      >
        <div className="flex items-center gap-8">
          {navigationItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-menu group relative transition-all duration-500 hover:opacity-80 ${
                visibleItems.includes("nav")
                  ? "translate-y-0 opacity-100"
                  : "translate-y-2 opacity-0"
              }`}
              style={{
                transitionDelay: `${ANIMATIONS.DELAYS.STAGGER * 2 + index * ANIMATIONS.DELAYS.ELEMENT}ms`,
              }}
            >
              {item.label}
              {/* Hover underline effect */}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Enhanced CTA Button */}
        <Link
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`group flex items-center gap-1 rounded-full border border-white/10 bg-black/20 px-4 py-3 text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-black/30 ${getAnimationClasses("cta", "fadeRight")} ${
            isScrolled ? "px-3 py-2" : "px-4 py-3"
          }`}
          style={{
            transitionDelay: `${ANIMATIONS.DELAYS.STAGGER * 3}ms`,
          }}
        >
          <span
            className={`text-cta transition-all duration-300 ${isScrolled ? "text-sm" : ""}`}
          >
            pesan sekarang
          </span>
          <IconShoppingBagPlus
            size={isScrolled ? 15 : 17}
            className="transition-all duration-300 group-hover:rotate-12"
          />

          {/* Pulse effect */}
          <div className="absolute inset-0 animate-ping rounded-full bg-white/20 opacity-0 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100"></div>
        </Link>

        {/* Enhanced Mobile Toggle */}
        <button
          className={`rounded p-1 transition-all duration-300 hover:bg-black/10 lg:hidden ${getAnimationClasses("toggle", "scale")}`}
          style={{
            transitionDelay: `${ANIMATIONS.DELAYS.STAGGER * 4}ms`,
          }}
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu"}
        >
          <div className="relative cursor-pointer">
            {mobileMenuOpen ? (
              <IconX
                size={isScrolled ? 26 : 30}
                className="rotate-90 text-white transition-transform duration-200"
              />
            ) : (
              <IconMenu2
                size={isScrolled ? 26 : 30}
                className="text-white transition-transform duration-200"
              />
            )}
          </div>
        </button>
      </div>

      {/* Enhanced Mobile Menu */}
      <nav
        className={`absolute top-full right-0 left-0 flex w-full flex-col gap-7 overflow-hidden border-b border-white/10 bg-black/90 text-white backdrop-blur-md transition-all duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen
            ? "max-h-[500px] py-6 opacity-100"
            : "max-h-0 py-0 opacity-0"
        }`}
        style={{
          boxShadow: mobileMenuOpen
            ? "0 8px 32px -8px rgba(0, 0, 0, 0.2)"
            : "none",
        }}
      >
        {/* Mobile Info */}
        <div
          className={`mb-2 flex items-center justify-center gap-1 border-b border-white/20 pb-4 text-white/80 transition-all duration-500 ${
            mobileMenuOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-4 opacity-0"
          }`}
          style={{ transitionDelay: mobileMenuOpen ? "100ms" : "0ms" }}
        >
          <IconClockHour8 size={20} />
          <div className="flex flex-row items-center gap-2 text-sm leading-[14px] uppercase">
            <span>{content.navbar.hariOperasional}</span>
            <span>{content.navbar.jamOperasional}</span>
          </div>
        </div>

        {/* Navigation Items dengan enhanced effects */}
        {navigationItems.map((item, index) => (
          <Link
            key={item.href}
            href={item.href}
            className={`text-menu group relative pl-6 transition-all duration-500 hover:translate-x-2 hover:opacity-80 ${
              mobileMenuOpen
                ? "translate-x-0 opacity-100"
                : "translate-x-4 opacity-0"
            }`}
            style={{
              transitionDelay: mobileMenuOpen
                ? `${200 + index * 100}ms`
                : "0ms",
            }}
            onClick={handleNavClick}
          >
            <span className="relative">
              {item.label}
              {/* Mobile hover effect */}
              <span className="absolute top-1/2 -left-4 h-2 w-2 -translate-y-1/2 rounded-full bg-white opacity-0 transition-all duration-300 group-hover:opacity-100"></span>
            </span>
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Navbar;

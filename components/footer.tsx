"use client";

import Link from "next/link";
import Image from "next/image";
import { content } from "@/data/content";
import { sosmed } from "@/data/sosmed";
import {
  IconMapPin,
  IconPhone,
  IconClock,
  IconBrandWhatsapp,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandYoutube,
} from "@tabler/icons-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ANIMATIONS, VISIBLE_STATE } from "@/constants/animations";
import { useState, useEffect } from "react";

const Footer = () => {
  const { navbar, kontak, tentangKami } = content;
  const whatsappUrl = `https://wa.me/${navbar.noWaUsaha.replace(/\+/g, "")}`;
  const currentYear = new Date().getFullYear();
  const [visibleItems, setVisibleItems] = useState<string[]>([]);

  // Scroll animation with individual item control
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  });

  // Staggered animation for individual items
  useEffect(() => {
    if (isVisible) {
      const items = ["brand", "navigation", "contact", "social", "bottom"];
      items.forEach((item, index) => {
        setTimeout(() => {
          setVisibleItems((prev) => [...prev, item]);
        }, index * ANIMATIONS.DELAYS.STAGGER);
      });
    }
  }, [isVisible]);

  const navigationLinks = [
    { href: "#menu", label: "Menu" },
    { href: "#testimoni", label: "Testimoni" },
    { href: "#faq", label: "FAQ" },
    { href: "#tentang-kami", label: "Tentang Kami" },
    { href: "#kontak", label: "Kontak" },
  ];

  const getIconComponent = (platform: string) => {
    const platformLower = platform.toLowerCase();
    const icons = {
      whatsapp: IconBrandWhatsapp,
      instagram: IconBrandInstagram,
      tiktok: IconBrandTiktok,
      facebook: IconBrandFacebook,
      twitter: IconBrandTwitter,
      youtube: IconBrandYoutube,
    };
    return icons[platformLower as keyof typeof icons] || IconBrandInstagram;
  };

  const getHoverColor = (platform: string) => {
    const platformLower = platform.toLowerCase();
    const colors = {
      whatsapp: "hover:bg-green-500",
      instagram: "hover:bg-pink-500",
      tiktok: "hover:bg-black",
      facebook: "hover:bg-blue-600",
      twitter: "hover:bg-blue-400",
      youtube: "hover:bg-red-600",
    };
    return colors[platformLower as keyof typeof colors] || "hover:bg-gray-500";
  };

  const socialLinks = sosmed.map((social) => ({
    href: social.url || "#",
    icon: getIconComponent(social.platform),
    label: social.platform,
    color: getHoverColor(social.platform),
  }));

  // Animation classes - reusable
  const getAnimationClasses = (itemKey: string, variant = "fadeUp") => {
    const isItemVisible = visibleItems.includes(itemKey);
    const variants = {
      fadeUp: "opacity-0 translate-y-8",
      fadeDown: "opacity-0 -translate-y-8",
      fadeLeft: "opacity-0 -translate-x-8",
      fadeRight: "opacity-0 translate-x-8",
    };

    return `transition-all duration-${ANIMATIONS.DURATION.SLOW} ${ANIMATIONS.EASING} ${
      isItemVisible ? VISIBLE_STATE : variants[variant as keyof typeof variants]
    }`;
  };

  return (
    <footer ref={ref} className="bg-bg-footer text-white">
      <div className="container mx-auto w-[90%] py-8">
        {/* Main Content */}
        <div className="mb-12 flex flex-col justify-between gap-8 lg:flex-row lg:gap-12">
          {/* Brand Section */}
          <div
            className={`flex-shrink-0 lg:w-80 ${getAnimationClasses("brand", "fadeUp")}`}
            style={{
              transitionDelay: `${ANIMATIONS.DELAYS.ELEMENT}ms`,
            }}
          >
            <Image
              src={navbar.logo || "/placeholder.svg"}
              alt={`${content.biodata.namaBrand} Logo`}
              width={64}
              height={64}
              className="transition-transform hover:scale-110 hover:rotate-8 mb-4"
            />
            <p className="text-text-smoke mb-3 text-lg leading-relaxed font-medium">
              {tentangKami.slogan}
            </p>
            <p className="text-text-gray text-sm leading-relaxed">
              {tentangKami.keunggulan.length > 120
                ? `${tentangKami.keunggulan.substring(0, 120)}...`
                : tentangKami.keunggulan}
            </p>
          </div>

          {/* Right Content */}
          <div className="flex flex-1 flex-col justify-between gap-8 md:flex-row md:gap-12">
            {/* Navigation */}
            <div
              className={`flex-1 ${getAnimationClasses("navigation", "fadeUp")}`}
              style={{
                transitionDelay: `${ANIMATIONS.DELAYS.STAGGER}ms`,
              }}
            >
              <h4 className="text-brand-sec mb-4 text-lg font-semibold uppercase">
                Menu
              </h4>
              <nav className="space-y-3">
                {navigationLinks.map((link, index) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`font-antonio text-text-smoke hover:text-brand-sec block uppercase transition-all duration-100 ${
                      visibleItems.includes("navigation")
                        ? "translate-x-0 opacity-100"
                        : "translate-x-4 opacity-0"
                    }`}
                    style={{
                      transitionDelay: `${ANIMATIONS.DELAYS.STAGGER + index * ANIMATIONS.DELAYS.ELEMENT}ms`,
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contact */}
            <div
              className={`flex-1 ${getAnimationClasses("contact", "fadeUp")}`}
              style={{
                transitionDelay: `${ANIMATIONS.DELAYS.STAGGER * 2}ms`,
              }}
            >
              <h4 className="text-brand-sec mb-4 text-lg font-semibold uppercase">
                Kontak
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <IconMapPin className="text-brand-sec mt-0.5 h-5 w-5 flex-shrink-0" />
                  <div className="text-text-smoke text-sm">
                    <p className="leading-relaxed">
                      {kontak.lokasi.kota}, {kontak.lokasi.provinsi}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <IconPhone className="text-brand-sec h-5 w-5 flex-shrink-0" />
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-smoke hover:text-brand-sec text-sm transition-colors"
                  >
                    {navbar.noWaUsaha}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <IconClock className="text-brand-sec mt-0.5 h-5 w-5 flex-shrink-0" />
                  <div className="text-text-smoke flex gap-1 text-sm">
                    <p>{navbar.hariOperasional.replace(",", ", ")}</p>
                    <p>{navbar.jamOperasional}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div
              className={`flex-1 ${getAnimationClasses("social", "fadeUp")}`}
              style={{
                transitionDelay: `${ANIMATIONS.DELAYS.STAGGER * 3}ms`,
              }}
            >
              <h4 className="text-brand-sec mb-4 text-lg font-semibold uppercase">
                Ikuti Kami
              </h4>
              <div className="mb-6 flex flex-wrap gap-3">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={`${social.label}-${index}`}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-text-smoke flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 hover:scale-110 ${
                        social.color
                      } ${visibleItems.includes("social") ? "scale-100 opacity-100" : "scale-75 text-white opacity-0"}`}
                      style={{
                        transitionDelay: `${ANIMATIONS.DELAYS.STAGGER * 1 + index * ANIMATIONS.DELAYS.ELEMENT}ms`,
                      }}
                      aria-label={social.label}
                    >
                      <IconComponent className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          className={`border-t border-stone-700 pt-8 ${getAnimationClasses("bottom", "fadeUp")}`}
          style={{
            transitionDelay: `${ANIMATIONS.DELAYS.STAGGER * 4}ms`,
          }}
        >
          <div className="text-text-gray text-center text-sm">
            <p>
              © {currentYear} {content.biodata.namaBrand}. All rights reserved.
              Powered by{" "}
              <a
                target="_blank"
                className="underline hover:text-brand-prim"
                href="https://grobakonlen.com"
              >
                grobakonlen
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

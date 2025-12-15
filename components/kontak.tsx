"use client";

import { content } from "@/data/content";
import { sosmed } from "@/data/sosmed";
import { embedLink } from "@/data/embed-link";
import {
  IconMapPin,
  IconPhone,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandWhatsapp,
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandYoutube,
  IconClock,
} from "@tabler/icons-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ANIMATIONS, VISIBLE_STATE } from "@/constants/animations";
import { useState, useEffect } from "react";

const Kontak = () => {
  const { kontak, navbar } = content;
  const whatsappUrl = `https://wa.me/${navbar.noWaUsaha}`;
  const [visibleItems, setVisibleItems] = useState<string[]>([]);

  // Scroll animation with individual item control
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  });

  // Staggered animation for individual items
  useEffect(() => {
    if (isVisible) {
      const items = ["header", "map", "address", "phone", "hours", "social"];
      items.forEach((item, index) => {
        setTimeout(() => {
          setVisibleItems((prev) => [...prev, item]);
        }, index * ANIMATIONS.DELAYS.STAGGER);
      });
    }
  }, [isVisible]);

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

  const getColors = (platform: string) => {
    const platformLower = platform.toLowerCase();
    const colors = {
      whatsapp: { bg: "bg-green-500", hover: "hover:bg-green-600" },
      instagram: { bg: "bg-pink-500", hover: "hover:bg-pink-600" },
      tiktok: { bg: "bg-black", hover: "hover:bg-gray-800" },
      facebook: { bg: "bg-blue-600", hover: "hover:bg-blue-700" },
      twitter: { bg: "bg-blue-400", hover: "hover:bg-blue-500" },
      youtube: { bg: "bg-red-600", hover: "hover:bg-red-700" },
    };
    return (
      colors[platformLower as keyof typeof colors] || {
        bg: "bg-gray-500",
        hover: "hover:bg-gray-600",
      }
    );
  };

  const socialLinks = sosmed.map((social) => ({
    href: social.url || "#",
    icon: getIconComponent(social.platform),
    label: social.platform,
    colors: getColors(social.platform),
  }));

  // Animation classes - reusable
  const getAnimationClasses = (itemKey: string, variant = "fadeUp") => {
    const isItemVisible = visibleItems.includes(itemKey);
    const variants = {
      fadeUp: "opacity-0 translate-y-8",
      fadeDown: "opacity-0 -translate-y-8",
      fadeLeft: "opacity-0 -translate-x-8",
      fadeRight: "opacity-0 translate-x-8",
      scale: "opacity-0 scale-95",
    };

    return `transition-all duration-${ANIMATIONS.DURATION.SLOW} ${ANIMATIONS.EASING} ${
      isItemVisible ? VISIBLE_STATE : variants[variant as keyof typeof variants]
    }`;
  };

  return (
    <section ref={ref} className="kontak bg-gray-50 py-20" id="kontak">
      <div className="container mx-auto px-4">
        {/* Header with fancy entrance */}
        <div
          className={`mb-16 text-center ${getAnimationClasses("header", "fadeDown")}`}
        >
          <span className="text-sub-heading-sec text-text-section mb-2 block">
            KONTAK
          </span>
          <h2 className="text-sub-heading text-text-prim mb-8">Hubungi Kami</h2>
          <div
            className={`bg-brand-sec mx-auto h-1 transition-all duration-${ANIMATIONS.DURATION.EXTRA_SLOW} ${ANIMATIONS.EASING} delay-300 ${
              isVisible ? "w-24" : "w-0"
            }`}
          ></div>
        </div>

        {/* Content */}
        <div className="mx-auto flex max-w-6xl flex-col gap-12 lg:flex-row">
          {/* Map */}
          <div
            className={`relative lg:w-1/2 ${getAnimationClasses("map", "fadeLeft")}`}
            style={{
              transitionDelay: `${ANIMATIONS.DELAYS.STAGGER}ms`,
            }}
          >
            <div className="relative h-96 min-h-[400px] overflow-hidden rounded-2xl bg-gray-100 shadow-lg lg:h-full">
              <iframe
                src={embedLink.gmaps}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi"
                className="h-full w-full"
              ></iframe>
              <div className="absolute right-4 bottom-4 left-4">
                <a
                  href={kontak.linkGmaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-sec px-4 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-yellow-500 font-schibsted-grotesk"
                >
                  <IconMapPin className="h-5 w-5 " />
                  Lihat di Google Maps
                </a>
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className="lg:w-1/2">
            <div className="grid h-full grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Address Card */}
              <div
                className={`rounded-2xl bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${getAnimationClasses("address", "fadeRight")}`}
                style={{
                  transitionDelay: `${ANIMATIONS.DELAYS.STAGGER * 2}ms`,
                }}
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100">
                  <IconMapPin className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  ALAMAT
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  {kontak.lokasi.alamat}
                </p>
              </div>

              {/* Phone Card */}
              <div
                className={`rounded-2xl bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${getAnimationClasses("phone", "fadeRight")}`}
                style={{
                  transitionDelay: `${ANIMATIONS.DELAYS.STAGGER * 3}ms`,
                }}
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <IconPhone className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  TELEPON
                </h3>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 transition-colors hover:text-green-600"
                >
                  {navbar.noWaUsaha}
                </a>
              </div>

              {/* Hours Card */}
              <div
                className={`rounded-2xl bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${getAnimationClasses("hours", "fadeRight")}`}
                style={{
                  transitionDelay: `${ANIMATIONS.DELAYS.STAGGER * 4}ms`,
                }}
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <IconClock className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  JAM BUKA
                </h3>
                <p className="text-sm text-gray-600">
                  {navbar.hariOperasional}
                  <br />
                  {navbar.jamOperasional}
                </p>
              </div>

              {/* Social Media Card */}
              <div
                className={`rounded-2xl bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${getAnimationClasses("social", "fadeRight")}`}
                style={{
                  transitionDelay: `${ANIMATIONS.DELAYS.STAGGER * 5}ms`,
                }}
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-pink-100">
                  <IconBrandInstagram className="h-8 w-8 text-pink-600" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  SOSIAL MEDIA
                </h3>
                <div className="mt-3 flex justify-center space-x-3">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <a
                        key={`${social.label}-${index}`}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:scale-110 ${social.colors.bg} ${social.colors.hover}`}
                        aria-label={social.label}
                      >
                        <IconComponent className="h-5 w-5 text-white" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Kontak;

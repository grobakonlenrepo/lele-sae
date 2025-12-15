"use client";

import type React from "react";
import Image from "next/image";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ANIMATIONS, VISIBLE_STATE } from "@/constants/animations";
import { useState, useEffect } from "react";

const Watermark = () => {
  const formulirGrobakOnlen =
    "https://grobakonlen.fillout.com/gerobak-mini";
  const [visibleItems, setVisibleItems] = useState<string[]>([]);

  // Generate WhatsApp URL dengan pesan otomatis
  const generateWhatsAppUrl = () => {
    const phoneNumber = "6282257999523";
    const message = "Kak, saya mau bikin website pakai template gerobak mini";
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  };

  const whatsappUrl = generateWhatsAppUrl();

  // Scroll animation with individual item control
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  });

  // Staggered animation for individual items
  useEffect(() => {
    if (isVisible) {
      const items = ["logo", "slogan", "pricing", "cta", "bottom", "link"];
      items.forEach((item, index) => {
        setTimeout(() => {
          setVisibleItems((prev) => [...prev, item]);
        }, index * ANIMATIONS.DELAYS.STAGGER);
      });
    }
  }, [isVisible]);

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
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="watermark border-t border-slate-700 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 pt-8 pb-12"
      id="grobakonlen"
    >
      <div className="container mx-auto w-[90%]">
        {/* Main Content */}
        <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
          {/* Left - Logo & Slogan */}
          <div className="flex flex-col items-center gap-2 lg:flex-row">
            <div
              className={`flex flex-col items-center gap-1 ${getAnimationClasses("logo", "fadeLeft")}`}
              style={{
                transitionDelay: `${ANIMATIONS.DELAYS.ELEMENT}ms`,
              }}
            >
              <Image
                src="/wm.svg"
                alt="Grobakonlen Logo"
                width={128}
                height={48}
                className="rounded-lg transition-transform hover:scale-110 hover:rotate-8"
              />
              <p className="text-sm text-slate-400">Jasa Pembuatan Website</p>
            </div>

            <div className="hidden h-12 w-px bg-slate-600 lg:block"></div>
            <p
              className={`max-w-md text-center text-sm font-medium text-slate-200 lg:text-left lg:text-base ${getAnimationClasses("slogan", "fadeRight")}`}
              style={{
                transitionDelay: `${ANIMATIONS.DELAYS.STAGGER}ms`,
              }}
            >
              Bantu UMKM Bikin Website Walau Budget Mepet
            </p>
          </div>

          {/* Right - CTA */}
          <div className="flex flex-col items-center gap-4 lg:flex-row">
            <div
              className={`text-center lg:text-right ${getAnimationClasses("pricing", "fadeLeft")}`}
              style={{
                transitionDelay: `${ANIMATIONS.DELAYS.STAGGER * 2}ms`,
              }}
            >
              <p className="font-medium text-white">
                Bikin website cuma 100ribuan
              </p>
              <p className="text-sm text-slate-400">
                Hanya isi formulir kurang dari 10 menit
              </p>
            </div>

            <a
              href={formulirGrobakOnlen}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-600 to-emerald-500 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-green-700 hover:to-emerald-600 hover:shadow-xl ${getAnimationClasses("cta", "scale")}`}
              style={{
                transitionDelay: `${ANIMATIONS.DELAYS.STAGGER * 3}ms`,
              }}
            >
              <span className="font-antonio text-[14px] leading-[21px] font-semibold tracking-normal break-normal uppercase decoration-solid lg:text-[16px] lg:leading-[26px]">
                Bikin Sekarang
              </span>
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-6 flex flex-col items-center gap-1 border-t border-slate-700 pt-4 text-center">
          <p
            className={`text-md w-[70%] text-slate-400 lg:w-[100%] ${getAnimationClasses("bottom", "fadeUp")}`}
            style={{
              transitionDelay: `${ANIMATIONS.DELAYS.STAGGER * 4}ms`,
            }}
          >
            Website ini dibuat menggunakan template gerobak mini
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`font-schibsted-grotesk group ml-1 pt-1 text-sm font-medium text-green-500 underline transition-all duration-200 hover:scale-105 hover:text-green-400 active:scale-95 ${getAnimationClasses("link", "fadeUp")}`}
            style={{
              transitionDelay: `${ANIMATIONS.DELAYS.STAGGER * 5}ms`,
            }}
          >
            <span className="relative">
              Mau bikin yang sama?
              {/* Hover underline effect */}
              <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-green-400 transition-all duration-200 group-hover:w-full"></span>
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Watermark;

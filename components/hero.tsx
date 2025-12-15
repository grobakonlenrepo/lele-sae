"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { content } from "@/data/content";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ANIMATIONS, VISIBLE_STATE } from "@/constants/animations";

const Hero = () => {
  const { produkTerlaris } = content.hero;
  const [showPrice, setShowPrice] = useState(false);
  const [visibleItems, setVisibleItems] = useState<string[]>([]);

  // Generate WhatsApp URL dengan pesan otomatis
  const generateWhatsAppUrl = () => {
    const phoneNumber = content.navbar.noWaUsaha
      .replace(/\+/g, "")
      .replace(/\s/g, "");
    const message = `Kak, saya mau pesan ${produkTerlaris.nama}`;
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  };

  const whatsappUrl = generateWhatsAppUrl();

  // Scroll animation with individual item control
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.1,
  });

  // Staggered animation for individual items
  useEffect(() => {
    if (isVisible) {
      const items = ["badge", "title", "image", "cta"];
      items.forEach((item, index) => {
        setTimeout(() => {
          setVisibleItems((prev) => [...prev, item]);
        }, index * ANIMATIONS.DELAYS.STAGGER);
      });
    }
  }, [isVisible]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setShowPrice((prev) => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Animation classes - reusable
  const getAnimationClasses = (itemKey: string, variant = "scale") => {
    const isItemVisible = visibleItems.includes(itemKey);
    const variants = {
      scale: "opacity-0 scale-95",
      fadeUp: "opacity-0 translate-y-8",
      fadeDown: "opacity-0 -translate-y-8",
    };

    return `transition-all duration-${ANIMATIONS.DURATION.SLOW} ${ANIMATIONS.EASING} ${
      isItemVisible ? VISIBLE_STATE : variants[variant as keyof typeof variants]
    }`;
  };

  return (
    <section ref={ref} className="hero relative text-center">
      <div className="bg-brand-prim relative h-[500px] w-full overflow-hidden rounded-b-[75%] pt-24 sm:h-[650px] sm:pt-28">
        <div
          className={getAnimationClasses("badge", "scale")}
          style={{
            transitionDelay: `${ANIMATIONS.DELAYS.ELEMENT}ms`,
          }}
        >
          <span className="text-sub-heading-sec text-text-section inline-block">
            best seller
          </span>
        </div>

        <div
          className={getAnimationClasses("title", "fadeUp")}
          style={{
            transitionDelay: `${ANIMATIONS.DELAYS.STAGGER * 2}ms`,
          }}
        >
          <h1 className="text-sub-heading px-4 leading-tight text-white sm:text-[84px]">
            {produkTerlaris.nama}
          </h1>
        </div>

        <div
          className={getAnimationClasses("image", "scale")}
          style={{
            transitionDelay: `${ANIMATIONS.DELAYS.STAGGER * 3}ms`,
          }}
        >
          <div className="relative z-10 mx-auto w-[80%] md:w-[60%] lg:w-[50%]">
            <Image
              src={produkTerlaris.hero || "/placeholder.svg"}
              width={500}
              height={500}
              alt={`Gambar ${produkTerlaris.nama}`}
              className="float mx-auto h-auto w-full object-contain transition-transform duration-300 hover:scale-105"
              priority
              sizes="(max-width: 640px) 90vw, 40vw"
            />
          </div>
        </div>
      </div>

      <div
        className={getAnimationClasses("cta", "scale")}
        style={{
          transitionDelay: `${ANIMATIONS.DELAYS.STAGGER * 4}ms`,
        }}
      >
        <Link
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-best-seller-cta group border-brand-sec bg-brand-prim absolute bottom-0 left-1/2 z-10 flex h-22 w-22 -translate-x-1/2 translate-y-1/2 transform items-center justify-center rounded-full border-6 text-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg sm:h-38 sm:w-38 sm:border-10"
          title={`Pesan ${produkTerlaris.nama} sekarang`}
        >
          <div className="relative text-center leading-tight transition-transform group-hover:scale-110">
            <span
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                showPrice ? "opacity-0" : "opacity-100"
              }`}
            >
              coba <br /> sekarang
            </span>
            <span
              className={`absolute inset-0 flex items-center justify-center font-bold transition-opacity duration-300 ${
                showPrice ? "opacity-100" : "opacity-0"
              }`}
            >
              {formatPrice(produkTerlaris.harga)}
            </span>
            <span className="invisible">
              coba <br /> sekarang
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default Hero;

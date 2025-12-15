"use client";

import { content } from "@/data/content";
import Image from "next/image";
import StarRating from "./star-rating";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ANIMATIONS, VISIBLE_STATE } from "@/constants/animations";
import { useState, useEffect } from "react";

const Menu = () => {
  const [visibleItems, setVisibleItems] = useState<string[]>([]);

  // Scroll animation with individual item control
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  });

  // Staggered animation for individual items
  useEffect(() => {
    if (isVisible) {
      const items = [
        "header",
        ...content.produk.map((_, index) => `item-${index}`),
      ];
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

  // Animation classes - reusable
  const getAnimationClasses = (itemKey: string, variant = "fadeUp") => {
    const isItemVisible = visibleItems.includes(itemKey);
    const variants = {
      fadeUp: "opacity-0 translate-y-8",
      fadeDown: "opacity-0 -translate-y-8",
    };

    return `transition-all duration-${ANIMATIONS.DURATION.SLOW} ${ANIMATIONS.EASING} ${
      isItemVisible ? VISIBLE_STATE : variants[variant as keyof typeof variants]
    }`;
  };

  return (
    <section
      ref={ref}
      className="produk bg-bg-trans mt-30 py-20 text-center"
      id="menu"
    >
      {/* Header */}
      <div
        className={`mb-16 text-center ${getAnimationClasses("header", "fadeDown")}`}
      >
        <span className="text-sub-heading-sec text-text-section mb-2 block">
          MENU
        </span>
        <h2 className="text-sub-heading text-text-prim mb-8">
          menu andalan kami
        </h2>
        <div
          className={`bg-brand-sec mx-auto h-1 transition-all duration-${ANIMATIONS.DURATION.EXTRA_SLOW} ${ANIMATIONS.EASING} delay-300 ${
            visibleItems.includes("header") ? "w-24" : "w-0"
          }`}
        ></div>
      </div>

      {/* Products Grid */}
      <div className="produk-list container mx-auto grid w-[90%] grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {content.produk.map((item, index) => (
          <article
            key={`${item.nama}-${index}`}
            className={`produk-item group flex flex-col items-center overflow-hidden rounded-lg bg-transparent p-6 transition-all duration-300 hover:-translate-y-2 hover:bg-white hover:shadow-xl ${getAnimationClasses(`item-${index}`, "fadeUp")}`}
            style={{
              transitionDelay: `${(index + 1) * ANIMATIONS.DELAYS.STAGGER}ms`,
            }}
          >
            <div className="relative mb-4 aspect-square overflow-hidden rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 p-4">
              <Image
                src={item.src || "/placeholder.svg"}
                alt={`Gambar ${item.nama}`}
                width={300}
                height={300}
                className="h-full w-full rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            </div>

            <div className="rating mb-3 flex items-center justify-center">
              <div className="bg-brand-sec flex h-9 items-center justify-center rounded-l-md px-3">
                <StarRating rating={item.rating} />
              </div>
              <div className="font-antonio bg-text-prim flex h-9 items-center justify-center rounded-r-md px-3 text-base font-medium text-white">
                {item.rating}
              </div>
            </div>

            <h3 className="text-nama-produk mb-2 text-center leading-tight">
              {item.nama}
            </h3>
            <div className="text-harga-produk text-text-section font-semibold">
              {formatPrice(item.harga)}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Menu;

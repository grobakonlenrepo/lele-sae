"use client";

import Image from "next/image";
import { content } from "@/data/content";
import { IconWorldWww } from "@tabler/icons-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ANIMATIONS, VISIBLE_STATE } from "@/constants/animations";
import { useState, useEffect } from "react";

const TentangKami = () => {
  const { tentangKami } = content;
  const [visibleItems, setVisibleItems] = useState<string[]>([]);
  const [visiblePoints, setVisiblePoints] = useState<number[]>([]);

  // Scroll animation with individual item control
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  });

  // Staggered animation for individual items
  useEffect(() => {
    if (isVisible) {
      const items = ["header", "image", "content"];
      items.forEach((item, index) => {
        setTimeout(() => {
          setVisibleItems((prev) => [...prev, item]);
        }, index * ANIMATIONS.DELAYS.STAGGER);
      });
    }
  }, [isVisible]);

  // Staggered animation for advantage points
  useEffect(() => {
    if (visibleItems.includes("content")) {
      const points =
        tentangKami.poinKeunggulan?.length > 0
          ? tentangKami.poinKeunggulan
          : [
              "Kualitas terjamin dengan harga terjangkau",
              "Porsi yang mengenyangkan",
              "Pelayanan ramah dan cepat",
            ];

      points.forEach((_, index) => {
        setTimeout(
          () => {
            setVisiblePoints((prev) => [...prev, index]);
          },
          (index + 1) * ANIMATIONS.DELAYS.ELEMENT + 500,
        ); // 500ms delay setelah content muncul
      });
    }
  }, [visibleItems, tentangKami.poinKeunggulan]);

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
    <section ref={ref} className="about bg-white py-20" id="tentang-kami">
      <div className="container mx-auto w-[90%]">
        {/* Header */}
        <div
          className={`mb-16 text-center ${getAnimationClasses("header", "fadeDown")}`}
          style={{
            transitionDelay: `${ANIMATIONS.DELAYS.ELEMENT}ms`,
          }}
        >
          <span className="text-sub-heading-sec text-text-section mb-2 block">
            TENTANG KAMI
          </span>
          <h2 className="text-sub-heading text-text-prim mb-8">
            kenapa pilih {content.biodata.namaBrand.toLowerCase()}?
          </h2>
          <div
            className={`bg-brand-sec mx-auto h-1 transition-all duration-${ANIMATIONS.DURATION.EXTRA_SLOW} ${ANIMATIONS.EASING} delay-300 ${
              visibleItems.includes("header") ? "w-24" : "w-0"
            }`}
          ></div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Image */}
          <div
            className={`relative ${getAnimationClasses("image", "fadeLeft")}`}
            style={{
              transitionDelay: `${ANIMATIONS.DELAYS.STAGGER}ms`,
            }}
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src={
                  tentangKami.fotoRuko ||
                  "/placeholder.svg?height=400&width=600"
                }
                alt={`Foto Ruko ${content.biodata.namaBrand}`}
                width={600}
                height={400}
                className="h-80 w-full object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

              {/* Enhanced UMKM Digital Badge dengan pulse animation */}
              <div className="bg-brand-prim absolute bottom-4 left-4 overflow-hidden rounded-full px-5 py-3 text-sm font-semibold text-white shadow-lg">
                {/* Multiple pulse rings */}
                <div className="animation-delay-0 absolute -inset-1 animate-ping rounded-full bg-yellow-400 opacity-20"></div>
                <div className="animation-delay-300 absolute -inset-2 animate-ping rounded-full bg-yellow-300 opacity-15"></div>
                <div className="animation-delay-600 absolute -inset-3 animate-ping rounded-full bg-yellow-200 opacity-10"></div>

                {/* Breathing effect */}
                <div className="absolute inset-0 animate-pulse rounded-full bg-yellow-400 opacity-20"></div>

                {/* Badge content */}
                <div className="relative z-10 flex items-center gap-1">
                  <IconWorldWww className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                  <p>UMKM Digital</p>
                </div>

                {/* Subtle glow effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400/30 to-orange-400/30 opacity-50"></div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div
            className={`space-y-6 ${getAnimationClasses("content", "fadeRight")}`}
            style={{
              transitionDelay: `${ANIMATIONS.DELAYS.STAGGER * 2}ms`,
            }}
          >
            <h3 className="font-schibsted-grotesk text-text-prim text-3xl font-bold">
              {tentangKami.slogan}
            </h3>
            <p className="text-text-sec text-lg leading-relaxed">
              {tentangKami.keunggulan}
            </p>

            {/* Points */}
            <div>
              {tentangKami.poinKeunggulan &&
                tentangKami.poinKeunggulan.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-schibsted-grotesk text-text-prim mb-4 text-xl font-semibold">
                      Keunggulan Kami:
                    </h4>
                    {tentangKami.poinKeunggulan.map((poin, index) => (
                      <div
                        key={index}
                        className={`flex items-start gap-3 transition-all duration-${ANIMATIONS.DURATION.NORMAL} ${ANIMATIONS.EASING} ${
                          visiblePoints.includes(index)
                            ? "translate-x-0 opacity-100"
                            : "translate-x-4 opacity-0"
                        }`}
                        style={{
                          transitionDelay: `${ANIMATIONS.DELAYS.STAGGER * 2 + 500 + index * ANIMATIONS.DELAYS.ELEMENT}ms`,
                        }}
                      >
                        {/* Enhanced pulse dot */}
                        <div className="relative mt-2 flex-shrink-0">
                          {/* Multiple pulse rings untuk dot */}
                          <div className="animation-delay-0 absolute -inset-1 animate-ping rounded-full bg-yellow-400 opacity-30"></div>
                          <div className="animation-delay-200 absolute -inset-1.5 animate-ping rounded-full bg-yellow-300 opacity-20"></div>
                          <div className="animation-delay-400 absolute -inset-2 animate-ping rounded-full bg-yellow-200 opacity-10"></div>

                          {/* Main dot dengan breathing effect */}
                          <div className="bg-brand-sec relative z-10 h-2 w-2 animate-pulse rounded-full"></div>

                          {/* Glow effect */}
                          <div className="absolute inset-0 animate-pulse rounded-full bg-yellow-400 opacity-40"></div>
                        </div>
                        <p className="text-text-sec leading-relaxed">{poin}</p>
                      </div>
                    ))}
                  </div>
                )}

              {(!tentangKami.poinKeunggulan ||
                tentangKami.poinKeunggulan.length === 0) && (
                <div className="space-y-4">
                  <h4 className="font-schibsted-grotesk text-text-prim mb-4 text-xl font-semibold">
                    Keunggulan Kami:
                  </h4>
                  {[
                    "Kualitas terjamin dengan harga terjangkau",
                    "Porsi yang mengenyangkan",
                    "Pelayanan ramah dan cepat",
                  ].map((poin, index) => (
                    <div
                      key={index}
                      className={`flex items-start gap-3 transition-all duration-${ANIMATIONS.DURATION.NORMAL} ${ANIMATIONS.EASING} ${
                        visiblePoints.includes(index)
                          ? "translate-x-0 opacity-100"
                          : "translate-x-4 opacity-0"
                      }`}
                      style={{
                        transitionDelay: `${ANIMATIONS.DELAYS.STAGGER * 2 + 500 + index * ANIMATIONS.DELAYS.ELEMENT}ms`,
                      }}
                    >
                      {/* Enhanced pulse dot */}
                      <div className="relative mt-2 flex-shrink-0">
                        {/* Multiple pulse rings untuk dot */}
                        <div className="animation-delay-0 absolute -inset-1 animate-ping rounded-full bg-yellow-400 opacity-30"></div>
                        <div className="animation-delay-200 absolute -inset-1.5 animate-ping rounded-full bg-yellow-300 opacity-20"></div>
                        <div className="animation-delay-400 absolute -inset-2 animate-ping rounded-full bg-yellow-200 opacity-10"></div>

                        {/* Main dot dengan breathing effect */}
                        <div className="bg-brand-sec relative z-10 h-2 w-2 animate-pulse rounded-full"></div>

                        {/* Glow effect */}
                        <div className="absolute inset-0 animate-pulse rounded-full bg-yellow-400 opacity-40"></div>
                      </div>
                      <p className="text-text-sec leading-relaxed">{poin}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TentangKami;

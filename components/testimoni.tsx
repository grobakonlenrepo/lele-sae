"use client";

import { content } from "@/data/content";
import Image from "next/image";
import StarRating from "./star-rating";
import { useState, useCallback, useEffect } from "react";
import {
  IconChevronLeft,
  IconChevronRight,
  IconUser,
} from "@tabler/icons-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ANIMATIONS, VISIBLE_STATE } from "@/constants/animations";

interface Testimonial {
  nama: string;
  isi: string;
  rating: number;
  src?: string;
}

const Testimoni = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  const testimonials = content.testimoni.list as Testimonial[];
  const showProfilePhoto = content.testimoni.tampilkanFotoProfil;

  // Scroll animation with individual item control
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  });

  // Responsive items per view
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const newItemsPerView = width >= 1024 ? 3 : 1;
      setItemsPerView(newItemsPerView);
      setCurrentIndex(0);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fancy staggered animation for individual items
  useEffect(() => {
    if (isVisible) {
      // Staggered reveal for testimonial cards
      testimonials.forEach((_, index) => {
        setTimeout(() => {
          setVisibleItems((prev) => [...prev, index]);
        }, index * ANIMATIONS.DELAYS.STAGGER);
      });
    }
  }, [isVisible, testimonials]);

  const maxSlides = Math.max(0, testimonials.length - itemsPerView + 1);

  // Navigation handlers
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % maxSlides);
  }, [maxSlides]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + maxSlides) % maxSlides);
  }, [maxSlides]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Animation classes - reusable
  const getAnimationClasses = (index: number, baseDelay = 0) => {
    const isItemVisible = visibleItems.includes(index);
    return {
      container: `transition-all duration-${ANIMATIONS.DURATION.SLOW} ${ANIMATIONS.EASING} ${
        isItemVisible ? VISIBLE_STATE : "opacity-0 translate-y-12 scale-95"
      }`,
      image: `transition-all duration-${ANIMATIONS.DURATION.NORMAL} ${
        isItemVisible ? "scale-100 opacity-100" : "scale-110 opacity-0"
      }`,
      rating: `transition-all duration-${ANIMATIONS.DURATION.NORMAL} ${
        isItemVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
      }`,
      name: `transition-all duration-${ANIMATIONS.DURATION.NORMAL} ${
        isItemVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`,
      text: `transition-all duration-${ANIMATIONS.DURATION.NORMAL} ${
        isItemVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`,
      style: {
        transitionDelay: `${baseDelay + index * ANIMATIONS.DELAYS.STAGGER}ms`,
      },
    };
  };

  if (testimonials.length === 0) {
    return (
      <section className="testimoni bg-white py-20">
        <div className="py-16 text-center text-gray-600">
          <p>Belum ada testimoni tersedia</p>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      className="testimoni bg-white py-20"
      id="testimoni"
      aria-labelledby="testimoni-heading"
    >
      <div className="container mx-auto w-[90%]">
        {/* Section Header with fancy entrance */}
        <div
          className={`mb-16 text-center transition-all duration-${ANIMATIONS.DURATION.EXTRA_SLOW} ${ANIMATIONS.EASING} ${
            isVisible ? VISIBLE_STATE : "-translate-y-8 opacity-0"
          }`}
        >
          <span className="text-sub-heading-sec text-text-section mb-2 block">
            TESTIMONI
          </span>
          <h2 className="text-sub-heading text-text-prim mb-8">
            Apa Kata Pelanggan Kami
          </h2>
          <div
            className={`bg-brand-sec mx-auto h-1 transition-all duration-${ANIMATIONS.DURATION.EXTRA_SLOW} ${ANIMATIONS.EASING} delay-300 ${
              isVisible ? "w-24" : "w-0"
            }`}
          ></div>
        </div>

        {/* Carousel Container */}
        <div
          className={`relative mx-auto max-w-6xl transition-all duration-${ANIMATIONS.DURATION.EXTRA_SLOW} ${ANIMATIONS.EASING} delay-500 ${
            isVisible ? VISIBLE_STATE : "translate-y-8 opacity-0"
          }`}
        >
          {/* Testimonials Carousel with individual animations */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
              }}
            >
              {testimonials.map((item, index) => {
                const animations = getAnimationClasses(index);

                return (
                  <article
                    key={`${item.nama}-${index}`}
                    className={`testimoni-item flex-shrink-0 px-4 ${animations.container}`}
                    style={{
                      width: `${100 / itemsPerView}%`,
                      ...animations.style,
                    }}
                  >
                    <div className="h-full rounded-2xl bg-gray-50 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg lg:p-8">
                      {/* Customer Photo with individual animation */}
                      <div className="mb-6 flex flex-col items-center">
                        <div
                          className={`relative mb-4 ${animations.image}`}
                          style={{
                            transitionDelay: `${index * ANIMATIONS.DELAYS.STAGGER + 100}ms`,
                          }}
                        >
                          {showProfilePhoto ? (
                            <Image
                              src={
                                item.src ||
                                `/placeholder.svg?height=80&width=80&text=${encodeURIComponent(
                                  item.nama,
                                )}`
                              }
                              alt={`Foto ${item.nama}`}
                              width={80}
                              height={80}
                              className="h-16 w-16 rounded-full border-4 border-white object-cover shadow-md md:h-20 md:w-20"
                              sizes="(max-width: 768px) 64px, 80px"
                            />
                          ) : (
                            <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-gray-200 shadow-md md:h-20 md:w-20">
                              <IconUser className="h-8 w-8 text-gray-600 md:h-10 md:w-10" />
                            </div>
                          )}
                        </div>

                        {/* Customer Name with stagger */}
                        <h3
                          className={`mb-2 text-lg font-semibold text-gray-900 md:text-xl ${animations.name}`}
                          style={{
                            transitionDelay: `${index * ANIMATIONS.DELAYS.STAGGER + 200}ms`,
                          }}
                        >
                          {item.nama}
                        </h3>

                        {/* Star Rating with stagger */}
                        <div
                          className={`rating mb-4 flex items-center justify-center ${animations.rating}`}
                          style={{
                            transitionDelay: `${index * ANIMATIONS.DELAYS.STAGGER + 300}ms`,
                          }}
                          role="img"
                          aria-label={`Rating ${item.rating} dari 5 bintang`}
                        >
                          <div className="bg-brand-sec flex h-6 items-center justify-center rounded-l-md px-2 md:h-7">
                            <StarRating rating={item.rating} />
                          </div>
                          <div className="font-antonio bg-text-prim flex h-6 items-center justify-center rounded-r-md px-2 text-xs font-medium text-white md:h-7 md:text-sm">
                            {item.rating}
                          </div>
                        </div>
                      </div>

                      {/* Testimonial Text with final stagger - FIXED QUOTES */}
                      <blockquote
                        className={`text-center ${animations.text}`}
                        style={{
                          transitionDelay: `${index * ANIMATIONS.DELAYS.STAGGER + 400}ms`,
                        }}
                      >
                        <p className="text-sm leading-relaxed text-gray-600 italic md:text-base">
                          &ldquo;{item.isi}&rdquo;
                        </p>
                      </blockquote>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* Navigation Controls with entrance animation */}
          {testimonials.length > itemsPerView && maxSlides > 1 && (
            <>
              <button
                onClick={goToPrev}
                className={`absolute top-1/2 left-0 z-10 -translate-x-2 -translate-y-1/2 cursor-pointer rounded-full bg-white p-2 shadow-lg transition-all duration-500 hover:scale-110 hover:shadow-xl md:-translate-x-4 md:p-3 ${
                  isVisible
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-8 opacity-0"
                }`}
                style={{ transitionDelay: "800ms" }}
                aria-label="Testimoni sebelumnya"
              >
                <IconChevronLeft className="h-5 w-5 text-gray-600 md:h-6 md:w-6" />
              </button>

              <button
                onClick={goToNext}
                className={`absolute top-1/2 right-0 z-10 translate-x-2 -translate-y-1/2 cursor-pointer rounded-full bg-white p-2 shadow-lg transition-all duration-500 hover:scale-110 hover:shadow-xl md:translate-x-4 md:p-3 ${
                  isVisible
                    ? "translate-x-0 opacity-100"
                    : "translate-x-8 opacity-0"
                }`}
                style={{ transitionDelay: "800ms" }}
                aria-label="Testimoni selanjutnya"
              >
                <IconChevronRight className="h-5 w-5 text-gray-600 md:h-6 md:w-6" />
              </button>
            </>
          )}

          {/* Dots Indicator with entrance animation */}
          {testimonials.length > itemsPerView && maxSlides > 1 && (
            <div
              className={`mt-6 flex justify-center gap-2 transition-all duration-500 md:mt-8 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: "900ms" }}
            >
              {Array.from({ length: maxSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 w-2 rounded-full transition-all duration-300 md:h-3 md:w-3 ${
                    index === currentIndex
                      ? "bg-brand-sec scale-125"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Ke testimoni slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimoni;

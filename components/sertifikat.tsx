"use client";

import { content } from "@/data/content";
import Image from "next/image";
import MediaModal from "./media-modal";
import { useState, useEffect, useCallback, useMemo } from "react";
import {
  IconCertificate,
  IconEye,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ANIMATIONS, VISIBLE_STATE } from "@/constants/animations";

interface Certificate {
  nama: string;
  localPath?: string;
}

interface CertificateCardProps {
  cert: Certificate;
  index: number;
  onImageClick: (index: number) => void;
  visibleItems: number[];
}

const Sertifikat = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  const { ada: adaSertifikat, list: sertifikatList } = content.sertifikat;

  // Scroll animation
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  });

  // Responsive items per view for carousel
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const newItemsPerView = width >= 1024 ? 3 : width >= 768 ? 2 : 1;
      setItemsPerView(newItemsPerView);
      setCurrentIndex(0);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Staggered animation for individual certificates
  useEffect(() => {
    if (isVisible) {
      setVisibleItems([]);
      sertifikatList.forEach((_, index) => {
        setTimeout(() => {
          setVisibleItems((prev) => [...prev, index]);
        }, index * ANIMATIONS.DELAYS.STAGGER);
      });
    }
  }, [isVisible, sertifikatList]);

  // Carousel navigation
  const maxSlides = Math.max(1, sertifikatList.length - itemsPerView + 1);
  const isCarousel = sertifikatList.length > 3;

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % maxSlides);
  }, [maxSlides]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + maxSlides) % maxSlides);
  }, [maxSlides]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Prepare media for modal
  const modalImages = useMemo(
    () =>
      sertifikatList.map((cert, index) => ({
        src:
          cert.localPath ||
          `/placeholder.svg?height=600&width=400&text=Sertifikat ${index + 1}`,
        alt: cert.nama,
        title: cert.nama,
        description: `Sertifikat resmi ${content.biodata.namaBrand}`,
        type: "image" as const,
      })),
    [sertifikatList],
  );

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  // Animation classes
  const getAnimationClasses = (index: number, variant = "scale") => {
    const isItemVisible = visibleItems.includes(index);
    const variants = {
      scale: "opacity-0 scale-95 rotate-1",
      fadeUp: "opacity-0 translate-y-12 scale-95",
      fadeLeft: "opacity-0 -translate-x-8 scale-95",
      fadeRight: "opacity-0 translate-x-8 scale-95",
    };

    return `transition-all duration-${ANIMATIONS.DURATION.SLOW} ${ANIMATIONS.EASING} ${
      isItemVisible ? VISIBLE_STATE : variants[variant as keyof typeof variants]
    }`;
  };

  // If no certificates, show empty state
  if (!adaSertifikat || sertifikatList.length === 0) {
    return (
      <section className="sertifikat bg-gray-50 py-20">
        <div className="container mx-auto w-[90%]">
          <div className="py-16 text-center">
            <IconCertificate className="mx-auto mb-4 h-16 w-16 text-gray-400" />
            <p className="text-lg text-gray-600">
              Sertifikat sedang dalam proses
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section
        ref={ref}
        className="sertifikat bg-bg-trans relative overflow-hidden py-20"
        id="sertifikat"
        aria-labelledby="sertifikat-heading"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="bg-brand-prim animate-gentle-pulse absolute top-20 left-20 h-40 w-40 rounded-full"></div>
          <div
            className="bg-brand-sec animate-gentle-pulse absolute right-10 bottom-10 h-32 w-32 rounded-full"
            style={{ animationDelay: "1.5s" }}
          ></div>
          <div
            className="bg-text-section animate-gentle-pulse absolute top-1/2 left-1/4 h-24 w-24 rounded-full"
            style={{ animationDelay: "3s" }}
          ></div>
        </div>

        <div className="relative z-10 container mx-auto w-[90%]">
          {/* Enhanced Section Header */}
          <div
            className={`mb-16 text-center transition-all duration-${ANIMATIONS.DURATION.EXTRA_SLOW} ${ANIMATIONS.EASING} ${
              isVisible ? VISIBLE_STATE : "-translate-y-8 opacity-0"
            }`}
          >
            <div className="relative inline-block">
              <span className="text-sub-heading-sec text-text-section mb-2 block">
                SERTIFIKAT & LEGALITAS
              </span>
            </div>

            <h2 className="text-sub-heading text-text-prim mb-8">
              Terpercaya & Tersertifikasi
            </h2>

            <div
              className={`bg-brand-sec mx-auto h-1 transition-all duration-${ANIMATIONS.DURATION.EXTRA_SLOW} ${ANIMATIONS.EASING} delay-300 ${
                isVisible ? "w-24" : "w-0"
              }`}
            ></div>
          </div>

          {/* Certificates Container */}
          <div
            className={`relative mx-auto max-w-7xl transition-all duration-${ANIMATIONS.DURATION.EXTRA_SLOW} ${ANIMATIONS.EASING} delay-500 ${
              isVisible ? VISIBLE_STATE : "translate-y-8 opacity-0"
            }`}
          >
            {isCarousel ? (
              // Carousel Layout (for more than 3 certificates)
              <>
                <div className="overflow-hidden rounded-2xl">
                  <div
                    className="flex transition-transform duration-700 ease-out"
                    style={{
                      transform: `translateX(-${
                        currentIndex * (100 / itemsPerView)
                      }%)`,
                    }}
                  >
                    {sertifikatList.map((cert, index) => (
                      <div
                        key={`${cert.nama}-${index}`}
                        className={`flex-shrink-0 px-4 ${getAnimationClasses(index, "fadeUp")}`}
                        style={{
                          width: `${100 / itemsPerView}%`,
                          transitionDelay: `${
                            index * ANIMATIONS.DELAYS.STAGGER + 600
                          }ms`,
                        }}
                      >
                        <CertificateCard
                          cert={cert}
                          index={index}
                          onImageClick={handleImageClick}
                          visibleItems={visibleItems}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation Controls */}
                {maxSlides > 1 && (
                  <>
                    <button
                      onClick={goToPrev}
                      className={`absolute top-1/2 left-0 z-10 -translate-x-2 -translate-y-1/2 cursor-pointer rounded-full bg-white p-2 shadow-lg transition-all duration-500 hover:scale-110 hover:shadow-xl md:-translate-x-4 md:p-3 ${
                        isVisible
                          ? "translate-x-0 opacity-100"
                          : "-translate-x-8 opacity-0"
                      }`}
                      style={{ transitionDelay: "800ms" }}
                      aria-label="Sertifikat sebelumnya"
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
                      aria-label="Sertifikat selanjutnya"
                    >
                      <IconChevronRight className="h-5 w-5 text-gray-600 md:h-6 md:w-6" />
                    </button>
                  </>
                )}

                {/* Dots Indicator */}
                {maxSlides > 1 && (
                  <div
                    className={`mt-8 flex justify-center gap-3 transition-all duration-500 md:mt-10 ${
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
                            ? "bg-brand-sec scale-125 shadow-lg"
                            : "bg-gray-300 hover:scale-110 hover:bg-gray-400"
                        }`}
                        aria-label={`Ke sertifikat slide ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              // Grid Layout (for 3 or fewer certificates)
              <div
                className={`grid gap-8 ${
                  sertifikatList.length === 1
                    ? "mx-auto max-w-md grid-cols-1"
                    : sertifikatList.length === 2
                      ? "mx-auto max-w-4xl grid-cols-1 md:grid-cols-2"
                      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                }`}
              >
                {sertifikatList.map((cert, index) => (
                  <div
                    key={`${cert.nama}-${index}`}
                    className={getAnimationClasses(index, "fadeUp")}
                    style={{
                      transitionDelay: `${
                        index * ANIMATIONS.DELAYS.STAGGER + 600
                      }ms`,
                    }}
                  >
                    <CertificateCard
                      cert={cert}
                      index={index}
                      onImageClick={handleImageClick}
                      visibleItems={visibleItems}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Media Modal */}
      <MediaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        media={modalImages}
        initialIndex={selectedImageIndex}
      />
    </>
  );
};

// Certificate Card Component
const CertificateCard = ({
  cert,
  index,
  onImageClick,
}: CertificateCardProps) => {
  return (
    <div className="group h-full">
      <div className="hover:shadow-brand-sec/20 relative h-full overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
        {/* Certificate Badge */}
        <div className="absolute top-4 right-4 z-10">
          <div className="from-brand-prim to-brand-sec flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br shadow-lg">
            <IconCertificate className="h-5 w-5 text-white" />
          </div>
        </div>

        {/* Certificate Image */}
        <div className="relative mb-6 overflow-hidden rounded-xl bg-gray-100">
          <button
            onClick={() => onImageClick(index)}
            className="group/image relative block w-full transition-all duration-300 hover:scale-105"
            title={`Lihat ${cert.nama} dalam ukuran penuh`}
          >
            <Image
              src={
                cert.localPath ||
                `/placeholder.svg?height=400&width=300&text=${encodeURIComponent(
                  cert.nama,
                )}`
              }
              alt={cert.nama}
              width={300}
              height={400}
              className="h-64 w-full object-cover transition-all duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </button>
        </div>

        {/* Certificate Info */}
        <div className="text-center">
          <h3 className="group-hover:text-brand-prim mb-4 text-lg font-bold text-gray-900 transition-colors duration-300">
            {cert.nama.toUpperCase()}
          </h3>

          {/* View Button */}
          <button
            onClick={() => onImageClick(index)}
            className="from-brand-prim to-brand-sec inline-flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r px-6 py-2 text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <IconEye className="h-4 w-4" />
            Lihat Sertifikat
          </button>
        </div>

        {/* Decorative elements */}
        <div className="from-brand-prim to-brand-sec absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r transition-all duration-500 group-hover:w-full"></div>
      </div>
    </div>
  );
};

export default Sertifikat;

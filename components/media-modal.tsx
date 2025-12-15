"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  IconX,
  IconChevronLeft,
  IconChevronRight,
  IconDownload,
} from "@tabler/icons-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ANIMATIONS, VISIBLE_STATE } from "@/constants/animations";

interface MediaItem {
  src: string;
  alt: string;
  title?: string;
  description?: string;
  type?: "image" | "video";
}

interface MediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  media: MediaItem[];
  initialIndex?: number;
}

const MediaModal = ({
  isOpen,
  onClose,
  media,
  initialIndex = 0,
}: MediaModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleItems, setVisibleItems] = useState<string[]>([]);

  const currentMedia = media[currentIndex];

  // Scroll animation for modal content
  const { ref } = useScrollAnimation({
    threshold: 0.1,
  });

  // Reset states when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setVisibleItems([]);
      document.body.style.overflow = "hidden";

      // Staggered animation for modal elements
      const items = ["backdrop", "container", "image", "controls"];
      items.forEach((item, index) => {
        setTimeout(() => {
          setVisibleItems((prev) => [...prev, item]);
        }, index * ANIMATIONS.DELAYS.STAGGER);
      });
    } else {
      document.body.style.overflow = "unset";
      setVisibleItems([]);
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, initialIndex]);

  // Navigation handlers
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % media.length);
    setIsLoading(true);
  }, [media.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
    setIsLoading(true);
  }, [media.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          goToPrev();
          break;
        case "ArrowRight":
          goToNext();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, goToNext, goToPrev]);

  // Animation classes
  const getAnimationClasses = (itemKey: string, variant = "scale") => {
    const isItemVisible = visibleItems.includes(itemKey);
    const variants = {
      scale: "opacity-0 scale-95",
      fadeUp: "opacity-0 translate-y-8",
      fadeDown: "opacity-0 -translate-y-8",
      fadeLeft: "opacity-0 -translate-x-8",
      fadeRight: "opacity-0 translate-x-8",
    };

    return `transition-all duration-${ANIMATIONS.DURATION.SLOW} ${ANIMATIONS.EASING} ${
      isItemVisible ? VISIBLE_STATE : variants[variant as keyof typeof variants]
    }`;
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(currentMedia.src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = currentMedia.title || `certificate-${currentIndex + 1}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={ref}
      className={`fixed inset-0 z-50 flex items-center justify-center ${getAnimationClasses("backdrop", "scale")}`}
      style={{ transitionDelay: `${ANIMATIONS.DELAYS.ELEMENT}ms` }}
    >
      {/* Light Backdrop */}
      <div
        className="absolute inset-0 bg-white/95 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Container - Always Fullscreen */}
      <div
        className={`relative z-10 flex h-screen w-screen flex-col ${getAnimationClasses("container", "scale")}`}
        style={{ transitionDelay: `${ANIMATIONS.DELAYS.STAGGER * 2}ms` }}
      >
        {/* Header Controls */}
        <div
          className={`absolute top-4 right-4 z-20 flex gap-2 ${getAnimationClasses("controls", "fadeDown")}`}
          style={{ transitionDelay: `${ANIMATIONS.DELAYS.STAGGER * 4}ms` }}
        >
          <button
            onClick={handleDownload}
            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white/90 text-gray-700 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-green-500 hover:text-white"
            title="Download sertifikat"
          >
            <IconDownload className="h-6 w-6" />
          </button>

          <button
            onClick={onClose}
            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white/90 text-gray-700 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-red-500 hover:text-white"
            title="Tutup"
          >
            <IconX className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation Arrows */}
        {media.length > 1 && (
          <>
            <button
              onClick={goToPrev}
              className={`absolute top-1/2 left-4 z-20 -translate-y-1/2 cursor-pointer rounded-full border border-gray-200 bg-white/90 p-3 text-gray-700 shadow-lg backdrop-blur-sm transition-all duration-300 md:p-4 ${getAnimationClasses("controls", "fadeLeft")}`}
              style={{ transitionDelay: `${ANIMATIONS.DELAYS.STAGGER * 4}ms` }}
              title="Sertifikat sebelumnya"
            >
              <IconChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
            </button>

            <button
              onClick={goToNext}
              className={`absolute top-1/2 right-4 z-20 -translate-y-1/2 cursor-pointer rounded-full border border-gray-200 bg-white/90 p-3 text-gray-700 shadow-lg backdrop-blur-sm transition-all duration-300 md:p-4 ${getAnimationClasses("controls", "fadeRight")}`}
              style={{ transitionDelay: `${ANIMATIONS.DELAYS.STAGGER * 4}ms` }}
              title="Sertifikat selanjutnya"
            >
              <IconChevronRight className="h-5 w-5 md:h-6 md:w-6" />
            </button>
          </>
        )}

        {/* Main Certificate Image - Centered and Large */}
        <div className="flex flex-1 items-center justify-center p-8 md:p-16">
          <div
            className={`relative max-h-full w-full max-w-4xl ${getAnimationClasses("image", "scale")}`}
            style={{ transitionDelay: `${ANIMATIONS.DELAYS.STAGGER * 3}ms` }}
          >
            {isLoading && (
              <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-white/80">
                <div className="flex flex-col items-center gap-4">
                  <div className="border-brand-prim h-12 w-12 animate-spin rounded-full border-4 border-t-transparent"></div>
                  <p className="text-sm text-gray-600">Memuat sertifikat...</p>
                </div>
              </div>
            )}

            <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
              <Image
                src={currentMedia.src || "/placeholder.svg"}
                alt={currentMedia.alt}
                width={1200}
                height={1600}
                className={`h-auto w-full object-contain transition-opacity duration-500 ${
                  isLoading ? "opacity-0" : "opacity-100"
                }`}
                onLoad={() => setIsLoading(false)}
                priority
                sizes="(max-width: 768px) 100vw, 80vw"
                style={{ maxHeight: "calc(100vh - 8rem)" }}
              />
            </div>
          </div>
        </div>

        {/* Certificate Counter */}
        {media.length > 1 && (
          <div
            className={`absolute top-4 left-4 rounded-full border border-gray-200 bg-white/90 px-3 py-1 text-sm font-medium text-gray-700 shadow-lg backdrop-blur-sm ${getAnimationClasses("controls", "fadeDown")}`}
            style={{ transitionDelay: `${ANIMATIONS.DELAYS.STAGGER * 5}ms` }}
          >
            {currentIndex + 1}/{media.length}
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaModal;

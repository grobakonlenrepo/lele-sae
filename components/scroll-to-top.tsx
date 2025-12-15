"use client";

import { useState, useEffect } from "react";
import { IconChevronUp } from "@tabler/icons-react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Function to check if watermark is visible
    const checkWatermarkVisibility = () => {
      const watermarkElement = document.querySelector(".watermark");
      if (watermarkElement) {
        const rect = watermarkElement.getBoundingClientRect();
        const isWatermarkVisible =
          rect.top < window.innerHeight && rect.bottom > 0;
        setIsVisible(isWatermarkVisible);
      }
    };

    // Initial check
    checkWatermarkVisibility();

    // Add scroll listener
    const handleScroll = () => {
      checkWatermarkVisibility();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`group fixed bottom-4 left-4 z-50 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-yellow-500 text-white shadow-lg transition-all duration-300 hover:bg-yellow-600 hover:shadow-xl ${
        isVisible
          ? "translate-y-0 scale-100 opacity-100"
          : "pointer-events-none translate-y-4 scale-95 opacity-0"
      }`}
      aria-label="Scroll to top"
      title="Kembali ke atas"
    >
      <IconChevronUp className="h-6 w-6 transition-transform duration-300 group-hover:-translate-y-0.5" />

      {/* Ripple effect on hover */}
      <div className="absolute inset-0 rounded-full bg-yellow-400 opacity-0 transition-all duration-300 group-hover:scale-110 group-hover:opacity-20"></div>
    </button>
  );
};

export default ScrollToTop;

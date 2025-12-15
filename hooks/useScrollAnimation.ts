"use client";

import { useState, useEffect, useRef } from "react";

interface AnimationConfig {
  threshold?: number;
  rootMargin?: string;
}

export const useScrollAnimation = (config: AnimationConfig = {}) => {
  const { threshold = 0.1, rootMargin = "0px 0px -50px 0px" } = config;

  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<any>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold, rootMargin },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, isVisible };
};

import type { ReactNode } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation"; // Use the simple version
import {
  ANIMATIONS,
  ANIMATION_VARIANTS,
  VISIBLE_STATE,
} from "@/constants/animations";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  variant?: keyof typeof ANIMATION_VARIANTS;
  duration?: keyof typeof ANIMATIONS.DURATION;
  delay?: number;
}

export const AnimatedSection = ({
  children,
  className = "",
  variant = "fadeUp",
  duration = "NORMAL",
  delay = 0,
}: AnimatedSectionProps) => {
  // ✅ Fix: Use isVisible instead of isElementVisible
  const { ref, isVisible } = useScrollAnimation();

  const animationClass = `transition-all duration-${ANIMATIONS.DURATION[duration]} ${ANIMATIONS.EASING}`;
  const stateClass = isVisible ? VISIBLE_STATE : ANIMATION_VARIANTS[variant];

  return (
    <div
      ref={ref}
      className={`${animationClass} ${stateClass} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

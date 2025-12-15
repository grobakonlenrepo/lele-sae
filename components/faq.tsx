"use client";

import { useState, useEffect } from "react";
import { content } from "@/data/content";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ANIMATIONS, VISIBLE_STATE } from "@/constants/animations";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  // Scroll animation
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  });

  // Fancy staggered animation for individual FAQ items
  useEffect(() => {
    if (isVisible) {
      // Staggered reveal for FAQ items
      content.faq.forEach((_, index) => {
        setTimeout(() => {
          setVisibleItems((prev) => [...prev, index]);
        }, index * ANIMATIONS.DELAYS.STAGGER);
      });
    }
  }, [isVisible]);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Animation classes - reusable
  const getAnimationClasses = (index: number, baseDelay = 0) => {
    const isItemVisible = visibleItems.includes(index);
    return {
      container: `transition-all duration-${ANIMATIONS.DURATION.SLOW} ${ANIMATIONS.EASING} ${
        isItemVisible ? VISIBLE_STATE : "opacity-0 translate-y-8 scale-95"
      }`,
      button: `transition-all duration-${ANIMATIONS.DURATION.NORMAL} ${
        isItemVisible ? "translate-x-0" : "-translate-x-4"
      }`,
      title: `transition-all duration-${ANIMATIONS.DURATION.NORMAL} ${
        isItemVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`,
      icon: `transition-all duration-${ANIMATIONS.DURATION.NORMAL} ${
        isItemVisible
          ? "opacity-100 scale-100 rotate-0"
          : "opacity-0 scale-75 rotate-90"
      }`,
      style: {
        transitionDelay: `${baseDelay + index * ANIMATIONS.DELAYS.STAGGER}ms`,
      },
    };
  };

  return (
    <section
      ref={ref}
      className="faq bg-bg-trans py-20"
      id="faq"
      aria-labelledby="faq-heading"
    >
      <div className="container mx-auto w-[90%]">
        {/* Section Header with fancy entrance */}
        <div
          className={`mb-16 text-center transition-all duration-${ANIMATIONS.DURATION.EXTRA_SLOW} ${ANIMATIONS.EASING} ${
            isVisible ? VISIBLE_STATE : "-translate-y-8 opacity-0"
          }`}
        >
          <span
            className="text-sub-heading-sec text-text-section mb-2 block"
            role="text"
          >
            FAQ
          </span>
          <h2 id="faq-heading" className="text-sub-heading text-text-prim mb-8">
            pertanyaan yang sering ditanyakan
          </h2>
          <div
            className={`bg-brand-sec mx-auto h-1 transition-all duration-${ANIMATIONS.DURATION.EXTRA_SLOW} ${ANIMATIONS.EASING} delay-300 ${
              isVisible ? "w-24" : "w-0"
            }`}
          ></div>
        </div>

        {/* FAQ Items with individual animations */}
        <div className="mx-auto">
          {content.faq.map((item, index) => {
            const animations = getAnimationClasses(index);

            return (
              <div
                key={index}
                className={`mb-4 rounded-2xl bg-white shadow-sm transition-all duration-300 hover:shadow-md ${animations.container}`}
                style={animations.style}
              >
                {/* Question Button with individual animation */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className={`focus:ring-opacity-50 focus:ring-brand-sec flex w-full items-center justify-between rounded-2xl px-8 py-6 text-left transition-all duration-100 hover:bg-stone-50 focus:ring-2 focus:outline-none ${animations.button}`}
                  style={{
                    transitionDelay: `${index * ANIMATIONS.DELAYS.STAGGER + 100}ms`,
                  }}
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <h3
                    className={`font-schibsted-grotesk text-text-prim pr-4 text-lg font-semibold ${animations.title}`}
                    style={{
                      transitionDelay: `${index * ANIMATIONS.DELAYS.STAGGER + 200}ms`,
                    }}
                  >
                    {item.tanya}
                  </h3>
                  <div
                    className={`flex-shrink-0 cursor-pointer ${animations.icon}`}
                    style={{
                      transitionDelay: `${index * ANIMATIONS.DELAYS.STAGGER + 300}ms`,
                    }}
                  >
                    {openIndex === index ? (
                      <IconChevronUp className="h-6 w-6 text-yellow-600" />
                    ) : (
                      <IconChevronDown className="text-text-sec h-6 w-6" />
                    )}
                  </div>
                </button>

                {/* Answer with smooth expand/collapse */}
                <div
                  id={`faq-answer-${index}`}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-8 pb-6">
                    <div className="border-t border-stone-200 pt-4">
                      <p className="leading-relaxed text-stone-600">
                        {item.jawab}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;

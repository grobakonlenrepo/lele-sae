"use client";

import { useState, useEffect } from "react";
import { IconBrandWhatsapp, IconX } from "@tabler/icons-react";
import Link from "next/link";
import { content } from "@/data/content";
import { ANIMATIONS, VISIBLE_STATE } from "@/constants/animations";

const presetMessages = [
  "Masih buka kak?",
  "Apa aja yang masih ready?",
  "Bisa DO sekarang?",
];

const whatsappNumber = `${content.navbar.noWaUsaha}`;

export default function WhatsappButton() {
  const [open, setOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);

  // Initial load animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000); // Delay untuk memberikan waktu halaman load
    return () => clearTimeout(timer);
  }, []);

  // Staggered animation untuk preset messages
  useEffect(() => {
    if (open) {
      setVisibleMessages([]);
      presetMessages.forEach((_, index) => {
        setTimeout(
          () => {
            setVisibleMessages((prev) => [...prev, index]);
          },
          index * ANIMATIONS.DELAYS.ELEMENT + 200,
        ); // 200ms delay setelah panel terbuka
      });
    } else {
      setVisibleMessages([]);
    }
  }, [open]);

  return (
    <div className="fixed right-4 bottom-4 z-50">
      {/* Floating button dengan enhanced animations */}
      <button
        onClick={() => setOpen(!open)}
        className={`group relative cursor-pointer rounded-full bg-green-500 p-3 text-white shadow-2xl transition-all duration-${ANIMATIONS.DURATION.NORMAL} hover:scale-110 hover:bg-green-600 active:scale-95 ${
          isLoaded ? VISIBLE_STATE : "translate-y-8 scale-75 opacity-0"
        }`}
        style={{
          transitionDelay: isLoaded ? "0ms" : "0ms",
        }}
      >
        {/* Multiple pulse rings untuk efek lebih menarik */}
        <div className="animation-delay-0 absolute -inset-1 animate-ping rounded-full bg-green-400 opacity-20"></div>
        <div className="animation-delay-300 absolute -inset-2 animate-ping rounded-full bg-green-300 opacity-10"></div>
        <div className="animation-delay-600 absolute -inset-3 animate-ping rounded-full bg-green-200 opacity-5"></div>

        {/* Breathing effect saat tidak dibuka */}
        {!open && (
          <div className="absolute -inset-0.5 animate-pulse rounded-full bg-green-400 opacity-30"></div>
        )}

        {/* Button content dengan smooth rotation */}
        <div className="relative">
          <div
            className={`transition-all duration-${ANIMATIONS.DURATION.FAST} ${
              open ? "scale-110 rotate-180" : "scale-100 rotate-0"
            }`}
          >
            {open ? (
              <IconX className="h-7 w-7 transition-transform duration-200" />
            ) : (
              <IconBrandWhatsapp className="h-7 w-7 transition-transform duration-200" />
            )}
          </div>
        </div>

        {/* Hover glow effect */}
        <div className="absolute inset-0 rounded-full bg-green-400 opacity-0 transition-all duration-300 group-hover:scale-125 group-hover:opacity-20"></div>
      </button>

      {/* Chat preview panel dengan enhanced animations */}
      {open && (
        <div
          className={`absolute right-0 bottom-full mb-4 w-72 rounded-2xl border border-gray-200 bg-white p-5 shadow-2xl transition-all duration-${ANIMATIONS.DURATION.NORMAL} ${ANIMATIONS.EASING} ${
            open
              ? "translate-y-0 scale-100 opacity-100"
              : "translate-y-4 scale-95 opacity-0"
          }`}
          style={{
            transformOrigin: "bottom right",
          }}
        >
          {/* Header dengan slide-in animation */}
          <div
            className={`mb-4 flex items-center gap-3 transition-all duration-${ANIMATIONS.DURATION.NORMAL} ${ANIMATIONS.EASING} ${
              open ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
            }`}
            style={{
              transitionDelay: "100ms",
            }}
          >
            <div className="rounded-full bg-green-100 p-2 transition-transform duration-300 hover:scale-110">
              <IconBrandWhatsapp className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold uppercase text-gray-800">Chat WA</h3>
              <p className="text-xs text-gray-500">Pilih pesan cepat:</p>
            </div>
          </div>

          {/* Message options dengan staggered animation */}
          <ul className="font-schibsted-grotesk space-y-3">
            {presetMessages.map((msg, idx) => (
              <li
                key={idx}
                className={`transition-all duration-${ANIMATIONS.DURATION.NORMAL} ${ANIMATIONS.EASING} ${
                  visibleMessages.includes(idx)
                    ? "translate-x-0 opacity-100"
                    : "translate-x-4 opacity-0"
                }`}
                style={{
                  transitionDelay: `${200 + idx * ANIMATIONS.DELAYS.ELEMENT}ms`,
                }}
              >
                <Link
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`}
                  target="_blank"
                  className="group block rounded-lg bg-gray-50 px-4 py-3 text-sm text-gray-700 transition-all duration-200 hover:scale-[1.02] hover:bg-green-50 hover:text-green-700 hover:shadow-md active:scale-[0.98]"
                  onClick={() => setOpen(false)}
                >
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-400 transition-all duration-200 group-hover:scale-125 group-hover:bg-green-500"></div>
                    <span className="transition-all duration-200 group-hover:translate-x-1">
                      {msg}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          {/* Custom message option dengan delayed entrance */}
          <div
            className={`font-schibsted-grotesk mt-4 border-t border-gray-100 pt-3 transition-all duration-${ANIMATIONS.DURATION.NORMAL} ${ANIMATIONS.EASING} ${
              open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{
              transitionDelay: `${200 + presetMessages.length * ANIMATIONS.DELAYS.ELEMENT + 100}ms`,
            }}
          >
            <Link
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              className="group block w-full rounded-lg bg-green-500 px-4 py-3 text-center text-sm font-medium text-white transition-all duration-200 hover:scale-[1.02] hover:bg-green-600 hover:shadow-lg active:scale-[0.98]"
              onClick={() => setOpen(false)}
            >
              <span className="inline-flex items-center gap-2 transition-all duration-200 group-hover:scale-105">
                <span className="transition-transform duration-200 group-hover:rotate-12">
                  💬
                </span>
                Tulis pesan sendiri
              </span>
            </Link>
          </div>

          {/* Subtle background pattern */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-green-50/50 to-transparent"></div>
        </div>
      )}
    </div>
  );
}

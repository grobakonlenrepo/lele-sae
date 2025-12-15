"use client";
import React, { useEffect, useId, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { IconX } from "@tabler/icons-react";
import Image from "next/image";

interface IMediaModal {
  imgSrc?: string;
  videoSrc?: string;
  className?: string;
}
const transition = {
  type: "spring" as const,
  duration: 0.4,
};
export function MediaModal({ imgSrc }: IMediaModal) {
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const uniqueId = useId();

  useEffect(() => {
    if (isMediaModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMediaModalOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMediaModalOpen]);
  return (
    <>
      <MotionConfig transition={transition}>
        <>
          <motion.div
            className="relative flex h-full w-full cursor-pointer"
            layoutId={`dialog-${uniqueId}`}
            onClick={() => {
              setIsMediaModalOpen(true);
            }}
          >
            {imgSrc && (
              <motion.div
                layoutId={`dialog-img-${uniqueId}`}
                className="h-full w-full"
              >
                <Image width={100} height={100} src={imgSrc} alt="sertifikat" className="w-full h-full object-cover rounded-3xl" />
              </motion.div>
            )}
          </motion.div>
        </>
        <AnimatePresence initial={false} mode="sync">
          {isMediaModalOpen && (
            <>
              <motion.div
                key={`backdrop-${uniqueId}`}
                className="fixed inset-0 h-full w-full bg-white/95 backdrop-blur-sm dark:bg-black/25"
                variants={{ open: { opacity: 0.5 }, closed: { opacity: 0 } }}
                initial="closed"
                animate="open"
                exit="closed"
                onClick={() => {
                  setIsMediaModalOpen(false);
                }}
              />
              <motion.div
                key="dialog"
                className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center"
              >
                <motion.div
                  className="pointer-events-auto relative flex flex-col overflow-hidden px-6"
                  layoutId={`dialog-${uniqueId}`}
                  tabIndex={-1}
                >
                  {imgSrc && (
                    <motion.div
                      layoutId={`dialog-img-${uniqueId}`}
                      className="h-full w-full"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={imgSrc} alt="" className="" />
                    </motion.div>
                  )}

                  <button
                    onClick={() => setIsMediaModalOpen(false)}
                    className="absolute top-2 right-8 cursor-pointer rounded-full p-1 text-gray-500 bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700"
                    type="button"
                    aria-label="Close dialog"
                  >
                    <IconX size={24} />
                  </button>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </MotionConfig>
    </>
  );
}

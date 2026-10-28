"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import { Check, Heart } from "lucide-react";
import { AllahName } from "@/data/names";

interface Flashcard3DProps {
  name: AllahName;
  isFlipped: boolean;
  onFlip: () => void;
  isMemorized: boolean;
  isFavorite: boolean;
  onToggleMemorized: () => void;
  onToggleFavorite: () => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  cardIndex: number;
  totalCards: number;
  lang?: "en" | "dv";
}

export const Flashcard3D: React.FC<Flashcard3DProps> = ({
  name,
  isFlipped,
  onFlip,
  isMemorized,
  isFavorite,
  onToggleMemorized,
  onToggleFavorite,
  onSwipeLeft,
  onSwipeRight,
  lang = "en",
}) => {
  // Mobile touch swipe handling
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const [swipeOffset, setSwipeOffset] = useState<number>(0);

  // Magnetic cursor-tracking & tilt
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rotateX = useSpring(rawRotateX, { stiffness: 300, damping: 25 });
  const rotateY = useSpring(rawRotateY, { stiffness: 300, damping: 25 });

  // Antique brass border reveal gradient
  const borderGlow = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, rgba(201, 168, 106, 0.35), rgba(201, 168, 106, 0.05) 50%, transparent 80%)`;

  // Surface spotlight overlay (soft warm antique gold)
  const surfaceSpotlight = useMotionTemplate`radial-gradient(480px circle at ${mouseX}px ${mouseY}px, rgba(201, 168, 106, 0.08), transparent 45%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);

    // Magnetic 3D tilt capped at ±6 degrees
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = -((y - centerY) / centerY) * 6;
    const tiltY = ((x - centerX) / centerX) * 6;
    rawRotateX.set(Math.max(-6, Math.min(6, tiltX)));
    rawRotateY.set(Math.max(-6, Math.min(6, tiltY)));
  };

  const handleMouseLeave = () => {
    mouseX.set(-1000);
    mouseY.set(-1000);
    rawRotateX.set(0);
    rawRotateY.set(0);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.touches[0].clientX - touchStartX.current;
    const deltaY = e.touches[0].clientY - touchStartY.current;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
      setSwipeOffset(deltaX * 0.35);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) {
      setSwipeOffset(0);
      return;
    }
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    touchStartX.current = null;
    touchStartY.current = null;
    setSwipeOffset(0);

    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
      if (deltaX < 0) {
        onSwipeLeft?.();
      } else {
        onSwipeRight?.();
      }
    }
  };

  const meaningLines = name.dhivehiMeaning.split("\n").filter((l) => l.trim().length > 0);
  const formattedId = String(name.id).padStart(2, "0");

  return (
    <div
      className="relative w-full max-w-[580px] h-[440px] mx-auto select-none focus:outline-none focus-visible:outline-none outline-none"
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      {/* 3D Scene Viewport with cursor tracking, rigid 440px height, and zero focus outline */}
      <div
        className="perspective-1200 relative w-full h-[440px] cursor-pointer group focus:outline-none focus-visible:outline-none outline-none"
        onClick={onFlip}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        role="button"
        tabIndex={0}
        aria-label={`Flashcard: ${name.arabic}. Click to flip.`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onFlip();
          }
        }}
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        {/* Tilt Wrapper (Magnetic Cursor Tracking) */}
        <motion.div
          className="w-full h-[440px] preserve-3d"
          style={{
            rotateX,
            rotateY,
          }}
        >
          {/* Flip Container (Spring-Physics 180° Flip + Mobile Swipe) */}
          <motion.div
            className="relative w-full h-[440px] preserve-3d"
            animate={{
              rotateY: isFlipped ? 180 : 0,
              x: swipeOffset,
            }}
            transition={{
              rotateY: { type: "spring", stiffness: 240, damping: 24 },
              x: { type: "spring", stiffness: 300, damping: 25 },
            }}
            style={{
              transformStyle: "preserve-3d",
              WebkitTransformStyle: "preserve-3d",
            }}
          >
            {/* ============================================================== */}
            {/* FRONT FACE: Illuminated Manuscript Card */}
            {/* ============================================================== */}
            <div
              className="absolute inset-0 w-full h-full backface-hidden rounded-2xl p-[1px] bg-[#C9A86A]/20 shadow-[0_24px_60px_rgba(0,0,0,0.65)]"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(0deg) translateZ(1px)",
                WebkitTransform: "rotateY(0deg) translateZ(1px)",
                opacity: isFlipped ? 0 : 1,
                visibility: isFlipped ? "hidden" : "visible",
                pointerEvents: isFlipped ? "none" : "auto",
                transition: "opacity 0.15s ease 0.1s, visibility 0.15s ease 0.1s",
              }}
            >
              {/* Glowing Border Reveal on Hover */}
              <motion.div
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: borderGlow }}
              />

              {/* Card Surface: Warm Obsidian & Antique Brass */}
              <div
                className={`relative w-full h-full rounded-[calc(1rem-1px)] p-7 sm:p-8 flex flex-col justify-between overflow-hidden
                  bg-gradient-to-b from-[#171410] to-[#110F0C]
                  shadow-[inset_0_1px_1px_0_rgba(201,168,106,0.15)]
                  ${isMemorized ? "ring-1 ring-[#C9A86A]/40" : ""}`}
              >
                {/* Surface Spotlight Overlay */}
                <motion.div
                  className="pointer-events-none absolute -inset-px rounded-[calc(1rem-1px)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: surfaceSpotlight }}
                />

                {/* Delicate Inner Manuscript Frame with Geometric Corner Accents */}
                <div className="absolute inset-3 border border-[#C9A86A]/10 rounded-xl pointer-events-none">
                  {/* Top-Left Corner Accent */}
                  <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-[#C9A86A]/35" />
                  {/* Top-Right Corner Accent */}
                  <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-[#C9A86A]/35" />
                  {/* Bottom-Left Corner Accent */}
                  <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-[#C9A86A]/35" />
                  {/* Bottom-Right Corner Accent */}
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-[#C9A86A]/35" />
                </div>

                {/* Header Row: Clean, Borderless Typography & Sleek Action Icons */}
                <div className="relative z-10 flex items-center justify-between w-full">
                  {/* Clean Borderless Number */}
                  <div className="flex items-center">
                    <span className="text-sm font-medium tracking-widest text-[#C9A86A]/80 font-mono">
                      #{formattedId}
                    </span>
                  </div>

                  {/* Header Actions: Minimal Icon Buttons */}
                  <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                    {/* Favorite Button */}
                    <button
                      type="button"
                      onClick={onToggleFavorite}
                      className={`p-2 rounded-lg transition-all active:scale-95 ${
                        isFavorite
                          ? "text-rose-400 fill-rose-400 bg-rose-500/10"
                          : "text-[#9A9183] hover:text-[#E2C792] hover:bg-white/[0.04]"
                      }`}
                      aria-label="Toggle Favorite"
                      title={isFavorite ? "Favorited" : "Favorite"}
                    >
                      <Heart className={`w-4 h-4 ${isFavorite ? "fill-rose-400" : ""}`} />
                    </button>

                    {/* Memorized Toggle Button */}
                    <button
                      type="button"
                      onClick={onToggleMemorized}
                      className={`p-2 rounded-lg transition-all active:scale-95 ${
                        isMemorized
                          ? "text-[#E2C792] bg-[#C9A86A]/15 border border-[#C9A86A]/30"
                          : "text-[#9A9183] hover:text-[#E2C792] hover:bg-white/[0.04]"
                      }`}
                      aria-label="Toggle Memorized"
                      title={isMemorized ? (lang === "dv" ? "ހިތުދަސްވެފައި" : "Memorized") : (lang === "dv" ? "ހިތުދަސްކުރަން" : "Mark as Memorized")}
                    >
                      <Check className={`w-4 h-4 ${isMemorized ? "stroke-[2.5]" : ""}`} />
                    </button>
                  </div>
                </div>

                {/* Center Calligraphy: Warm Ivory (#F5EFE6) with Soft Antique Gold Glow */}
                <div className="relative z-10 flex-1 flex flex-col items-center justify-center overflow-visible">
                  <div className="relative overflow-visible text-center px-4 w-full">
                    <h2
                      lang="ar"
                      dir="rtl"
                      className="font-arabic font-['Amiri',_'Noto_Naskh_Arabic',_serif] text-6xl sm:text-7xl md:text-8xl font-bold leading-[1.9] text-[#F5EFE6] drop-shadow-[0_4px_28px_rgba(201,168,106,0.16)] select-text overflow-visible"
                      style={{ letterSpacing: "normal", fontFeatureSettings: '"kern" 1, "liga" 1, "calt" 1' }}
                    >
                      {name.arabic}
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            {/* ============================================================== */}
            {/* BACK FACE: Illuminated Manuscript Meaning Card */}
            {/* ============================================================== */}
            <div
              className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl p-[1px] bg-[#C9A86A]/20 shadow-[0_24px_60px_rgba(0,0,0,0.65)]"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(180deg) translateZ(1px)",
                WebkitTransform: "rotateY(180deg) translateZ(1px)",
                opacity: isFlipped ? 1 : 0,
                visibility: isFlipped ? "visible" : "hidden",
                pointerEvents: isFlipped ? "auto" : "none",
                transition: "opacity 0.15s ease 0.1s, visibility 0.15s ease 0.1s",
              }}
            >
              {/* Glowing Border Reveal on Hover */}
              <motion.div
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: borderGlow }}
              />

              {/* Card Surface */}
              <div
                className={`relative w-full h-full rounded-[calc(1rem-1px)] p-7 sm:p-8 flex flex-col justify-between overflow-hidden
                  bg-gradient-to-b from-[#171410] to-[#110F0C]
                  shadow-[inset_0_1px_1px_0_rgba(201,168,106,0.15)]
                  ${isMemorized ? "ring-1 ring-[#C9A86A]/40" : ""}`}
              >
                {/* Surface Spotlight Overlay */}
                <motion.div
                  className="pointer-events-none absolute -inset-px rounded-[calc(1rem-1px)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: surfaceSpotlight }}
                />

                {/* Delicate Inner Manuscript Frame */}
                <div className="absolute inset-3 border border-[#C9A86A]/10 rounded-xl pointer-events-none">
                  <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-[#C9A86A]/35" />
                  <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-[#C9A86A]/35" />
                  <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-[#C9A86A]/35" />
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-[#C9A86A]/35" />
                </div>

                {/* Back Header: Number & Sleek Actions */}
                <div className="relative z-10 flex items-center justify-between w-full">
                  <span className="text-sm font-medium tracking-widest text-[#C9A86A]/80 font-mono">
                    #{formattedId}
                  </span>

                  <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={onToggleFavorite}
                      className={`p-2 rounded-lg transition-all active:scale-95 ${
                        isFavorite
                          ? "text-rose-400 fill-rose-400 bg-rose-500/10"
                          : "text-[#9A9183] hover:text-[#E2C792] hover:bg-white/[0.04]"
                      }`}
                      aria-label="Toggle Favorite"
                    >
                      <Heart className={`w-4 h-4 ${isFavorite ? "fill-rose-400" : ""}`} />
                    </button>
                    <button
                      type="button"
                      onClick={onToggleMemorized}
                      className={`p-2 rounded-lg transition-all active:scale-95 ${
                        isMemorized
                          ? "text-[#E2C792] bg-[#C9A86A]/15 border border-[#C9A86A]/30"
                          : "text-[#9A9183] hover:text-[#E2C792] hover:bg-white/[0.04]"
                      }`}
                      aria-label="Toggle Memorized"
                    >
                      <Check className={`w-4 h-4 ${isMemorized ? "stroke-[2.5]" : ""}`} />
                    </button>
                  </div>
                </div>

                {/* Back Center: Centered Arabic Calligraphy with Tapered Gold Divider & Centered Dhivehi Typography */}
                <div className="relative z-10 flex-1 flex flex-col items-center justify-center my-auto overflow-y-auto px-2">
                  {/* Centered Arabic Name at Top of Meaning */}
                  <div className="text-center overflow-visible mb-1">
                    <span
                      lang="ar"
                      dir="rtl"
                      className="font-arabic font-['Amiri',_'Noto_Naskh_Arabic',_serif] text-2xl sm:text-3xl font-bold text-[#C9A86A] leading-[1.8] drop-shadow-sm overflow-visible"
                      style={{ letterSpacing: "normal" }}
                    >
                      {name.arabic}
                    </span>
                    {name.transliteration && (
                      <div
                        lang="dv"
                        dir="rtl"
                        className="text-xs sm:text-sm font-medium text-[#E2C792]/80 mt-0.5 tracking-wide"
                      >
                        {name.transliteration}
                      </div>
                    )}
                    {/* Tapered Gold Divider Line */}
                    <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[#C9A86A]/35 to-transparent mt-2 mb-3" />
                  </div>

                  {/* Centered RTL Dhivehi Meaning */}
                  <div
                    className="text-center font-dhivehi text-2xl sm:text-[26px] leading-[2.15] text-[#F5EFE6] px-4 max-w-lg mx-auto space-y-3"
                    lang="dv"
                    dir="rtl"
                  >
                    {meaningLines.map((line, idx) => (
                      <p key={idx} className="select-text">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  ChevronLeft,
  ChevronRight,
  RotateCw,
  Shuffle,
  BookOpen,
} from "lucide-react";
import { AllahName, ALLAH_NAMES } from "@/data/names";
import { Flashcard3D } from "./Flashcard3D";

type DeckFilter = "all" | "learning" | "memorized" | "favorites";

interface FlashcardDeckProps {
  memorized: Set<number>;
  favorites: Set<number>;
  onToggleMemorized: (id: number) => void;
  onToggleFavorite: (id: number) => void;
  initialNameId?: number;
  lang?: "en" | "dv";
}

export const FlashcardDeck: React.FC<FlashcardDeckProps> = ({
  memorized,
  favorites,
  onToggleMemorized,
  onToggleFavorite,
  initialNameId,
  lang = "en",
}) => {
  const [filter, setFilter] = useState<DeckFilter>("all");
  const [isShuffled, setIsShuffled] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [slideDirection, setSlideDirection] = useState<number>(1);

  // Filter names based on active tab
  const filteredNames = useMemo(() => {
    let list: AllahName[];
    switch (filter) {
      case "learning":
        list = ALLAH_NAMES.filter((n) => !memorized.has(n.id));
        break;
      case "memorized":
        list = ALLAH_NAMES.filter((n) => memorized.has(n.id));
        break;
      case "favorites":
        list = ALLAH_NAMES.filter((n) => favorites.has(n.id));
        break;
      case "all":
      default:
        list = [...ALLAH_NAMES];
        break;
    }

    if (isShuffled) {
      const copy = [...list];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    }

    return list;
  }, [filter, isShuffled, memorized, favorites]);

  // Jump to specific card if requested from browse grid
  useEffect(() => {
    if (initialNameId) {
      const idx = filteredNames.findIndex((n) => n.id === initialNameId);
      if (idx !== -1) {
        setSlideDirection(idx > currentIndex ? 1 : -1);
        setCurrentIndex(idx);
        setIsFlipped(false);
      } else {
        setFilter("all");
        const allIdx = ALLAH_NAMES.findIndex((n) => n.id === initialNameId);
        if (allIdx !== -1) {
          setSlideDirection(allIdx > currentIndex ? 1 : -1);
          setCurrentIndex(allIdx);
          setIsFlipped(false);
        }
      }
    }
  }, [initialNameId]);

  // Keep index within bounds
  useEffect(() => {
    if (currentIndex >= filteredNames.length) {
      setCurrentIndex(Math.max(0, filteredNames.length - 1));
      setIsFlipped(false);
    }
  }, [filteredNames.length, currentIndex]);

  const currentCard = filteredNames[currentIndex];

  const handleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  const handleNext = useCallback(() => {
    if (filteredNames.length === 0) return;
    setSlideDirection(1);
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % filteredNames.length);
  }, [filteredNames.length]);

  const handlePrev = useCallback(() => {
    if (filteredNames.length === 0) return;
    setSlideDirection(-1);
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + filteredNames.length) % filteredNames.length);
  }, [filteredNames.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      switch (e.key) {
        case "ArrowRight":
          e.preventDefault();
          handleNext();
          break;
        case "ArrowLeft":
          e.preventDefault();
          handlePrev();
          break;
        case " ":
        case "Enter":
          e.preventDefault();
          handleFlip();
          break;
        case "m":
        case "M":
          if (currentCard) {
            e.preventDefault();
            onToggleMemorized(currentCard.id);
          }
          break;
        case "f":
        case "F":
          if (currentCard) {
            e.preventDefault();
            onToggleFavorite(currentCard.id);
          }
          break;
        case "s":
        case "S":
          e.preventDefault();
          setIsShuffled((prev) => !prev);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev, handleFlip, currentCard, onToggleMemorized, onToggleFavorite]);

  // Confetti on 99 memorized (Antique gold & ivory palette)
  useEffect(() => {
    if (memorized.size === 99) {
      try {
        confetti({
          particleCount: 140,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#F5EFE6", "#C9A86A", "#E2C792", "#9A9183"],
        });
      } catch (err) {
        // Ignore
      }
    }
  }, [memorized.size]);

  const progressPercent =
    filteredNames.length > 0
      ? Math.round(((currentIndex + 1) / filteredNames.length) * 100)
      : 0;

  const totalMemorizedPercent = Math.round((memorized.size / 99) * 100);

  return (
    <div className="w-full flex flex-col items-center">
      {/* ================= Segmented Filter Track & Shuffle (Optimized for 375px screens) ================= */}
      <div className="w-full max-w-[580px] mb-4 sm:mb-5 flex items-center justify-between gap-1 sm:gap-2 px-0.5 sm:px-1" dir="ltr">
        {/* Clean segmented track with compact mobile padding so 4 tabs fit 100% */}
        <div className="inline-flex p-1 rounded-xl bg-[#14120E] border border-white/[0.06] shadow-sm flex-shrink-0">
          <button
            type="button"
            onClick={() => {
              setFilter("all");
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`font-faruma px-2 sm:px-3.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium whitespace-nowrap flex-shrink-0 transition-all ${
              filter === "all"
                ? "bg-[#C9A86A]/15 text-[#E2C792] border border-[#C9A86A]/30 shadow-sm"
                : "text-[#9A9183] hover:text-[#F5EFE6]"
            }`}
          >
            {lang === "dv" ? `ހުރިހާ (${ALLAH_NAMES.length})` : `All (${ALLAH_NAMES.length})`}
          </button>
          <button
            type="button"
            onClick={() => {
              setFilter("learning");
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`font-faruma px-2 sm:px-3.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium whitespace-nowrap flex-shrink-0 transition-all ${
              filter === "learning"
                ? "bg-[#C9A86A]/15 text-[#E2C792] border border-[#C9A86A]/30 shadow-sm"
                : "text-[#9A9183] hover:text-[#F5EFE6]"
            }`}
          >
            {lang === "dv" ? `ދަސްކުރަން (${ALLAH_NAMES.length - memorized.size})` : `Learning (${ALLAH_NAMES.length - memorized.size})`}
          </button>
          <button
            type="button"
            onClick={() => {
              setFilter("memorized");
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`font-faruma px-2 sm:px-3.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium whitespace-nowrap flex-shrink-0 transition-all ${
              filter === "memorized"
                ? "bg-[#C9A86A]/15 text-[#E2C792] border border-[#C9A86A]/30 shadow-sm"
                : "text-[#9A9183] hover:text-[#F5EFE6]"
            }`}
          >
            {lang === "dv" ? `ހިތުދަސް (${memorized.size})` : `Memorized (${memorized.size})`}
          </button>
          <button
            type="button"
            onClick={() => {
              setFilter("favorites");
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`font-faruma px-2 sm:px-3.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium whitespace-nowrap flex-shrink-0 transition-all ${
              filter === "favorites"
                ? "bg-rose-500/15 text-rose-300 border border-rose-400/25 shadow-sm"
                : "text-[#9A9183] hover:text-[#F5EFE6]"
            }`}
          >
            {lang === "dv" ? `ފޭވަރިޓް (${favorites.size})` : `Favorites (${favorites.size})`}
          </button>
        </div>

        {/* Compact Shuffle Button */}
        <button
          type="button"
          onClick={() => {
            setIsShuffled((prev) => !prev);
            setCurrentIndex(0);
            setIsFlipped(false);
          }}
          className={`font-faruma flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-medium flex-shrink-0 transition-all ${
            isShuffled
              ? "bg-[#C9A86A]/15 border border-[#C9A86A]/35 text-[#E2C792]"
              : "bg-[#14120E] border border-white/[0.06] text-[#9A9183] hover:text-[#F5EFE6]"
          }`}
          title="Toggle Shuffle (Shortcut: S)"
        >
          <Shuffle className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">
            {lang === "dv" ? "އޮޅުވާލާ" : "Shuffle"}
          </span>
        </button>
      </div>

      {/* ================= Progress Bar with Complete Dhivehi Localization ================= */}
      <div className="w-full max-w-[580px] mb-4 sm:mb-5 px-1" dir="ltr">
        <div className="flex items-center justify-between text-xs text-[#9A9183] mb-2">
          <span className="font-sans tabular-nums text-xs">
            {lang === "dv"
              ? `${filteredNames.length > 0 ? currentIndex + 1 : 0} / ${filteredNames.length}`
              : `${filteredNames.length > 0 ? currentIndex + 1 : 0} of ${filteredNames.length}`}
          </span>
          <span className="font-sans text-[#E2C792] font-medium tracking-tight">
            {lang === "dv"
              ? `ހިތުދަސްވެފައި ${totalMemorizedPercent}% (${memorized.size}/99)`
              : `${totalMemorizedPercent}% Memorized (${memorized.size}/99)`}
          </span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-[#1A1713] overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#C9A86A] to-[#E2C792] transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* ================= Active Flashcard Container with Rigid 440px Height ================= */}
      <div className="relative w-full max-w-[580px] h-[440px] mx-auto">
        {filteredNames.length > 0 && currentCard ? (
          <AnimatePresence mode="wait" custom={slideDirection}>
            <motion.div
              key={currentCard.id}
              custom={slideDirection}
              variants={{
                enter: (dir: number) => ({
                  x: dir > 0 ? 40 : -40,
                  opacity: 0,
                  scale: 0.98,
                }),
                center: {
                  x: 0,
                  opacity: 1,
                  scale: 1,
                  transition: {
                    x: { type: "spring", stiffness: 320, damping: 28 },
                    opacity: { duration: 0.2 },
                  },
                },
                exit: (dir: number) => ({
                  x: dir > 0 ? -40 : 40,
                  opacity: 0,
                  scale: 0.98,
                  transition: {
                    x: { type: "spring", stiffness: 320, damping: 28 },
                    opacity: { duration: 0.15 },
                  },
                }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full h-[440px]"
            >
              <Flashcard3D
                name={currentCard}
                isFlipped={isFlipped}
                onFlip={handleFlip}
                isMemorized={memorized.has(currentCard.id)}
                isFavorite={favorites.has(currentCard.id)}
                onToggleMemorized={() => onToggleMemorized(currentCard.id)}
                onToggleFavorite={() => onToggleFavorite(currentCard.id)}
                onSwipeLeft={handleNext}
                onSwipeRight={handlePrev}
                cardIndex={currentIndex}
                totalCards={filteredNames.length}
                lang={lang}
              />
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="w-full h-[440px] rounded-2xl border border-[#C9A86A]/20 bg-[#13110E] flex flex-col items-center justify-center p-8 text-center text-[#9A9183]">
            <BookOpen className="w-10 h-10 text-[#635C50] mb-3" />
            <h3 className="font-faruma text-base font-semibold text-[#F5EFE6] mb-1">
              {lang === "dv" ? "މި ލިސްޓުގައި އެއްވެސް އިސްމުފުޅެއް ނެތް" : "No names in this list"}
            </h3>
            <button
              type="button"
              onClick={() => setFilter("all")}
              className="font-faruma mt-4 px-4 py-2 rounded-xl bg-[#1C1914] hover:bg-[#25211B] border border-[#C9A86A]/25 text-[#E2C792] text-xs font-medium transition"
            >
              {lang === "dv" ? "ހުރިހާ ނަންފުޅެއް ދައްކާ" : "Show All 99 Names"}
            </button>
          </div>
        )}
      </div>

      {/* ================= Mobile Swipe Hint: Cleanly Positioned Between Card & Buttons ================= */}
      <div className="text-center sm:hidden text-xs text-[#9A9183]/70 flex items-center justify-center gap-2 my-3" dir="ltr">
        <span>←</span>
        <span dir={lang === "dv" ? "rtl" : "ltr"}>{lang === "dv" ? "ބަދަލުކުރުމަށް ދަމާލާ" : "Swipe to navigate"}</span>
        <span>→</span>
      </div>

      {/* ================= Deck Navigation Buttons (Refined Antique Brass & Obsidian) ================= */}
      <div className="w-full max-w-[580px] mt-1 sm:mt-6 px-1 flex items-center justify-between gap-3" dir="ltr">
        {/* Previous Button (< Before Text) */}
        <button
          type="button"
          onClick={handlePrev}
          disabled={filteredNames.length <= 1}
          className="flex-1 py-3 px-4 rounded-xl bg-[#14120E] hover:bg-[#1C1914] border border-white/[0.07] hover:border-[#C9A86A]/30 text-[#C8C0B3] hover:text-[#F5EFE6] active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition flex items-center justify-center gap-2 text-xs sm:text-sm font-medium shadow-sm"
          title="Previous Card (Left Arrow)"
        >
          <ChevronLeft className="w-4 h-4 text-[#9A9183] shrink-0" />
          <span dir={lang === "dv" ? "rtl" : "ltr"}>{lang === "dv" ? "ކުރީގެ" : "Previous"}</span>
        </button>

        {/* Flip Button */}
        <button
          type="button"
          onClick={handleFlip}
          disabled={filteredNames.length === 0}
          className="flex-1 py-3 px-4 rounded-xl bg-[#C9A86A]/15 border border-[#C9A86A]/40 text-[#E2C792] hover:bg-[#C9A86A]/25 active:scale-95 font-medium text-xs sm:text-sm transition shadow-sm flex items-center justify-center gap-2"
          title="Flip Card (Space / Enter)"
        >
          <RotateCw className="w-4 h-4 text-[#C9A86A] shrink-0" />
          <span dir={lang === "dv" ? "rtl" : "ltr"}>{lang === "dv" ? "ފުށުންޖަހާ" : "Flip Card"}</span>
        </button>

        {/* Next Button (> After Text) */}
        <button
          type="button"
          onClick={handleNext}
          disabled={filteredNames.length <= 1}
          className="flex-1 py-3 px-4 rounded-xl bg-[#14120E] hover:bg-[#1C1914] border border-white/[0.07] hover:border-[#C9A86A]/30 text-[#C8C0B3] hover:text-[#F5EFE6] active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition flex items-center justify-center gap-2 text-xs sm:text-sm font-medium shadow-sm"
          title="Next Card (Right Arrow)"
        >
          <span dir={lang === "dv" ? "rtl" : "ltr"}>{lang === "dv" ? "ދެންއޮތް" : "Next"}</span>
          <ChevronRight className="w-4 h-4 text-[#9A9183] shrink-0" />
        </button>
      </div>

      {/* ================= Keyboard Shortcuts Row: Quieter & Localized ================= */}
      <div className="hidden md:flex items-center justify-center gap-4 mt-6 text-[11px] text-[#9A9183] opacity-45 hover:opacity-85 transition-opacity">
        <span className="font-faruma">
          <kbd className="px-1.5 py-0.5 rounded bg-[#1C1914] border border-white/10 text-[#C8C0B3] font-mono">Space</kbd>{" "}
          {lang === "dv" ? "ފުށުންޖެހުމަށް" : "Flip"}
        </span>
        <span className="font-faruma">
          <kbd className="px-1.5 py-0.5 rounded bg-[#1C1914] border border-white/10 text-[#C8C0B3] font-mono">←</kbd>{" "}
          <kbd className="px-1.5 py-0.5 rounded bg-[#1C1914] border border-white/10 text-[#C8C0B3] font-mono">→</kbd>{" "}
          {lang === "dv" ? "ބަދަލުކުރުމަށް" : "Navigate"}
        </span>
        <span className="font-faruma">
          <kbd className="px-1.5 py-0.5 rounded bg-[#1C1914] border border-white/10 text-[#C8C0B3] font-mono">M</kbd>{" "}
          {lang === "dv" ? "ހިތުދަސް" : "Memorized"}
        </span>
        <span className="font-faruma">
          <kbd className="px-1.5 py-0.5 rounded bg-[#1C1914] border border-white/10 text-[#C8C0B3] font-mono">F</kbd>{" "}
          {lang === "dv" ? "ފޭވަރިޓް" : "Favorite"}
        </span>
        <span className="font-faruma">
          <kbd className="px-1.5 py-0.5 rounded bg-[#1C1914] border border-white/10 text-[#C8C0B3] font-mono">S</kbd>{" "}
          {lang === "dv" ? "އޮޅުވާލުމަށް" : "Shuffle"}
        </span>
      </div>
    </div>
  );
};

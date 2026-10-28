"use client";

import React, { useState, useMemo } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";
import { Search, Heart, Check, X } from "lucide-react";
import { AllahName, ALLAH_NAMES, normalizeArabic, normalizeThaana } from "@/data/names";

interface NamesGridViewProps {
  memorized: Set<number>;
  favorites: Set<number>;
  onToggleMemorized: (id: number) => void;
  onToggleFavorite: (id: number) => void;
  onSelectName: (id: number) => void;
  lang?: "en" | "dv";
}

type FilterOption = "all" | "memorized" | "unmemorized" | "favorites";

interface GridCardProps {
  name: AllahName;
  isMemorized: boolean;
  isFavorite: boolean;
  onToggleMemorized: () => void;
  onToggleFavorite: () => void;
  onSelect: () => void;
  lang: "en" | "dv";
}

const GridCard: React.FC<GridCardProps> = ({
  name,
  isMemorized,
  isFavorite,
  onToggleMemorized,
  onToggleFavorite,
  onSelect,
  lang,
}) => {
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const borderGlow = useMotionTemplate`radial-gradient(220px circle at ${mouseX}px ${mouseY}px, rgba(201, 168, 106, 0.35), rgba(201, 168, 106, 0.04) 50%, transparent 80%)`;
  const surfaceSpotlight = useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, rgba(201, 168, 106, 0.06), transparent 45%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    mouseX.set(-1000);
    mouseY.set(-1000);
  };

  const meaningLines = name.dhivehiMeaning.split("\n").filter((l) => l.trim().length > 0);
  const formattedId = String(name.id).padStart(2, "0");

  return (
    <div
      onClick={onSelect}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      className="group relative rounded-2xl p-[1px] bg-[#C9A86A]/15 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#C9A86A]/35 cursor-pointer shadow-[0_8px_24px_rgba(0,0,0,0.5)] focus:outline-none focus-visible:outline-none"
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      {/* Cursor-Tracking Glowing Border Reveal */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: borderGlow }}
      />

      {/* Card Content Surface: Warm Obsidian & Antique Brass */}
      <div
        className={`relative w-full h-full rounded-[calc(1rem-1px)] p-5 flex flex-col justify-between overflow-hidden
          bg-gradient-to-b from-[#15120E] to-[#100E0B]
          shadow-[inset_0_1px_1px_0_rgba(201,168,106,0.1)]
          ${isMemorized ? "ring-1 ring-[#C9A86A]/30" : ""}`}
      >
        {/* Surface Spotlight */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-[calc(1rem-1px)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: surfaceSpotlight }}
        />

        {/* Top Header Row: Borderless Number & Minimal Action Icons */}
        <div className="relative z-10 flex items-center justify-between w-full mb-2">
          {/* Left: Quick Actions */}
          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={onToggleFavorite}
              className={`p-1.5 rounded-lg transition-all ${
                isFavorite
                  ? "text-rose-400 fill-rose-400 bg-rose-500/10"
                  : "text-[#9A9183] hover:text-[#E2C792] hover:bg-white/[0.04]"
              }`}
              aria-label="Toggle favorite"
            >
              <Heart className={`w-3.5 h-3.5 ${isFavorite ? "fill-rose-400" : ""}`} />
            </button>

            <button
              type="button"
              onClick={onToggleMemorized}
              className={`p-1.5 rounded-lg transition-all ${
                isMemorized
                  ? "text-[#E2C792] bg-[#C9A86A]/15 border border-[#C9A86A]/30"
                  : "text-[#9A9183] hover:text-[#E2C792] hover:bg-white/[0.04]"
              }`}
              aria-label="Toggle memorized"
            >
              <Check className={`w-3.5 h-3.5 ${isMemorized ? "stroke-[2.5]" : ""}`} />
            </button>
          </div>

          {/* Right: Borderless Number Typography */}
          <div className="flex items-center gap-2">
            {isMemorized && (
              <span className="font-faruma text-[10px] px-2 py-0.5 rounded-full bg-[#C9A86A]/10 border border-[#C9A86A]/20 text-[#E2C792] font-medium">
                {lang === "dv" ? "ހިތުދަސް" : "Memorized"}
              </span>
            )}
            <span className="font-mono text-xs font-medium text-[#C9A86A]/70">
              #{formattedId}
            </span>
          </div>
        </div>

        {/* Center: Arabic Name & Subtle Dhivehi Transliteration */}
        <div className="relative z-10 py-3 text-center overflow-visible">
          <h3
            lang="ar"
            dir="rtl"
            className="font-arabic font-['Amiri',_'Noto_Naskh_Arabic',_serif] text-4xl sm:text-5xl font-bold leading-[1.8] text-[#F5EFE6] drop-shadow-[0_2px_14px_rgba(201,168,106,0.15)] overflow-visible select-text text-center"
            style={{ letterSpacing: "normal", fontFeatureSettings: '"kern" 1, "liga" 1, "calt" 1' }}
          >
            {name.arabic}
          </h3>
          {name.transliteration && (
            <p
              lang="dv"
              dir="rtl"
              className="text-xs sm:text-sm font-medium text-[#C9A86A]/85 mt-1 select-text"
            >
              {name.transliteration}
            </p>
          )}
        </div>

        {/* Soft Tapered Hairline Divider */}
        <div className="relative z-10 h-px w-full bg-gradient-to-r from-transparent via-[#C9A86A]/15 to-transparent my-2" />

        {/* Bottom: Critical RTL Alignment for Dhivehi Meaning (Guaranteed Right-Aligned & Faruma Font) */}
        <div
          className="font-faruma relative z-10 w-full self-stretch text-right text-base leading-[1.95] text-[#E6DEC8] space-y-1.5 select-text"
          lang="dv"
          dir="rtl"
          style={{ textAlign: "right", direction: "rtl" }}
        >
          {meaningLines.map((line, idx) => (
            <p
              key={idx}
              dir="rtl"
              style={{ textAlign: "right", direction: "rtl" }}
              className="font-faruma w-full self-stretch text-right leading-[1.95]"
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export const NamesGridView: React.FC<NamesGridViewProps> = ({
  memorized,
  favorites,
  onToggleMemorized,
  onToggleFavorite,
  onSelectName,
  lang = "en",
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<FilterOption>("all");

  const filteredNames = useMemo(() => {
    const q = searchQuery.trim();
    const isNum = /^\d+$/.test(q);
    const numVal = isNum ? parseInt(q, 10) : null;
    const normArabicQuery = normalizeArabic(q);
    const normThaanaQuery = normalizeThaana(q);

    return ALLAH_NAMES.filter((item) => {
      if (filter === "memorized" && !memorized.has(item.id)) return false;
      if (filter === "unmemorized" && memorized.has(item.id)) return false;
      if (filter === "favorites" && !favorites.has(item.id)) return false;

      if (!q) return true;

      if (numVal !== null && item.id === numVal) return true;

      const normArabicName = normalizeArabic(item.arabic);
      if (normArabicName.includes(normArabicQuery) || item.arabic.includes(q)) return true;

      const normMeaning = normalizeThaana(item.dhivehiMeaning);
      if (normMeaning.includes(normThaanaQuery)) return true;

      const normTranslit = item.transliteration ? normalizeThaana(item.transliteration) : "";
      if (normTranslit.includes(normThaanaQuery)) return true;

      return false;
    });
  }, [searchQuery, filter, memorized, favorites]);

  return (
    <div className="w-full max-w-6xl mx-auto px-2 sm:px-4">
      {/* ================= Search & Filter Bar: Warm Obsidian Palette ================= */}
      <div className="sticky top-16 z-30 mb-6 p-3 sm:p-4 rounded-2xl bg-[#0E0C09]/95 backdrop-blur-xl border border-white/[0.08] shadow-2xl space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
          {/* Search Input with Dynamic Direction & Icon Positioning */}
          <div className="relative flex-1">
            <Search
              className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-[#9A9183] pointer-events-none transition-all ${
                lang === "dv" ? "right-3.5" : "left-3.5"
              }`}
            />
            <input
              type="text"
              dir={lang === "dv" ? "rtl" : "ltr"}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                lang === "dv"
                  ? "ނަންބަރު، ޢަރަބި (الرحمن)، ނުވަތަ ދިވެހިން (ރަޙްމަތް) ހޯއްދަވާ..."
                  : "Search by number, Arabic (الرحمن), or Dhivehi (ރަޙްމަތް)..."
              }
              className={`w-full py-2.5 rounded-xl bg-[#14120E] border border-white/[0.08] text-[#F5EFE6] placeholder:text-[#635C50] text-sm focus:outline-none focus:border-[#C9A86A]/40 focus:ring-1 focus:ring-[#C9A86A]/30 transition ${
                lang === "dv" ? "pr-10 pl-10 text-right" : "pl-10 pr-10 text-left"
              }`}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className={`absolute top-1/2 -translate-y-1/2 p-1 text-[#9A9183] hover:text-[#F5EFE6] ${
                  lang === "dv" ? "left-3" : "right-3"
                }`}
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Clean Segmented Filter Track (Scrollbar-hidden, non-wrapping on mobile, fits 375px) */}
          <div className="flex items-center gap-1 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden p-1 rounded-xl bg-[#14120E] border border-white/[0.06] flex-shrink-0" dir="ltr">
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={`font-faruma px-2 sm:px-3.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium whitespace-nowrap flex-shrink-0 transition-all ${
                filter === "all"
                  ? "bg-[#C9A86A]/15 text-[#E2C792] border border-[#C9A86A]/30 shadow-sm"
                  : "text-[#9A9183] hover:text-[#F5EFE6]"
              }`}
            >
              {lang === "dv" ? "ހުރިހާ (99)" : "All (99)"}
            </button>
            <button
              type="button"
              onClick={() => setFilter("memorized")}
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
              onClick={() => setFilter("unmemorized")}
              className={`font-faruma px-2 sm:px-3.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium whitespace-nowrap flex-shrink-0 transition-all ${
                filter === "unmemorized"
                  ? "bg-[#C9A86A]/15 text-[#E2C792] border border-[#C9A86A]/30 shadow-sm"
                  : "text-[#9A9183] hover:text-[#F5EFE6]"
              }`}
            >
              {lang === "dv" ? `ދަސްކުރަން (${99 - memorized.size})` : `Learning (${99 - memorized.size})`}
            </button>
            <button
              type="button"
              onClick={() => setFilter("favorites")}
              className={`font-faruma px-2 sm:px-3.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium whitespace-nowrap flex-shrink-0 transition-all ${
                filter === "favorites"
                  ? "bg-rose-500/15 text-rose-300 border border-rose-400/25 shadow-sm"
                  : "text-[#9A9183] hover:text-[#F5EFE6]"
              }`}
            >
              {lang === "dv" ? `ފޭވަރިޓް (${favorites.size})` : `Favorites (${favorites.size})`}
            </button>
          </div>
        </div>

        {/* Results Counter: Localized with Faruma font */}
        <div className="flex items-center justify-between text-xs text-[#9A9183] pt-2 border-t border-white/[0.06]">
          <span className="font-faruma">
            {lang === "dv"
              ? `99 އިސްމުފުޅުގެ ތެރެއިން ${filteredNames.length}`
              : `Showing ${filteredNames.length} of 99 names`}
          </span>
          <span className="font-faruma text-[11px] text-[#635C50]">
            {lang === "dv" ? "ކާޑެއްގައި ފިއްތާލުމުން ފްލޭޝްކާޑު ހުޅުވޭނެ" : "Click any card to open in Flashcard view"}
          </span>
        </div>
      </div>

      {/* ================= Names Grid (Strict LTR card flow: #01 left to right) ================= */}
      {filteredNames.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-12" dir="ltr">
          {filteredNames.map((name) => (
            <GridCard
              key={name.id}
              name={name}
              isMemorized={memorized.has(name.id)}
              isFavorite={favorites.has(name.id)}
              onToggleMemorized={() => onToggleMemorized(name.id)}
              onToggleFavorite={() => onToggleFavorite(name.id)}
              onSelect={() => onSelectName(name.id)}
              lang={lang}
            />
          ))}
        </div>
      ) : (
        <div className="w-full py-16 text-center text-[#9A9183]">
          <p className="font-faruma text-base font-medium text-[#F5EFE6] mb-1">
            {lang === "dv" ? "އެއްވެސް އިސްމުފުޅެއް ނުފެނުނު" : "No matching names found"}
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setFilter("all");
            }}
            className="font-faruma mt-4 px-4 py-2 rounded-xl bg-[#14120E] hover:bg-[#1C1914] border border-[#C9A86A]/25 text-[#E2C792] text-xs font-medium transition"
          >
            {lang === "dv" ? "ފިލްޓަރުތައް ފިލުވާލާ" : "Clear Filters"}
          </button>
        </div>
      )}
    </div>
  );
};

"use client";

import React, { useState } from "react";
import { ALLAH_NAMES, AllahName } from "@/data/names";
import {
  Printer,
  Grid,
  Hash,
  Scissors,
  Check,
  Sparkles,
  Info,
} from "lucide-react";

interface PrintableCardsViewProps {
  lang: "en" | "dv";
}

type GridSize = "4" | "6" | "9";
type BorderStyle = "rounded" | "dashed" | "hairline";

export function PrintableCardsView({ lang }: PrintableCardsViewProps) {
  const [gridSize, setGridSize] = useState<GridSize>("6");
  const [showNumbers, setShowNumbers] = useState<boolean>(false);
  const [showBrackets, setShowBrackets] = useState<boolean>(false);
  const [borderStyle, setBorderStyle] = useState<BorderStyle>("rounded");

  const handlePrint = () => {
    window.print();
  };

  // Determine grid columns and card aspect styling based on size selection
  const getGridClasses = () => {
    switch (gridSize) {
      case "4":
        // 2x2 per page (Large)
        return "grid-cols-1 sm:grid-cols-2 print:grid-cols-2 gap-4 print:gap-4";
      case "6":
        // 2x3 per page (Medium)
        return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 print:grid-cols-3 gap-3.5 print:gap-3";
      case "9":
      default:
        // 3x3 per page (Square 9/page)
        return "grid-cols-1 sm:grid-cols-3 print:grid-cols-3 gap-3 print:gap-2.5";
    }
  };

  const getCardBorderClasses = () => {
    switch (borderStyle) {
      case "dashed":
        return "rounded-none border border-dashed border-neutral-400";
      case "hairline":
        return "rounded-lg border border-neutral-200";
      case "rounded":
      default:
        return "rounded-2xl border border-neutral-300 shadow-sm print:shadow-none";
    }
  };

  const getArabicSizeClasses = () => {
    switch (gridSize) {
      case "4":
        return "text-5xl sm:text-6xl print:text-5xl mb-4";
      case "6":
        return "text-4xl sm:text-5xl print:text-4xl mb-3";
      case "9":
      default:
        return "text-3xl sm:text-4xl print:text-3xl mb-2";
    }
  };

  const getTranslitSizeClasses = () => {
    switch (gridSize) {
      case "4":
        return "text-2xl sm:text-3xl print:text-2xl font-bold text-black mb-3";
      case "6":
        return "text-xl sm:text-2xl print:text-xl font-bold text-black mb-2";
      case "9":
      default:
        return "text-lg sm:text-xl print:text-lg font-bold text-black mb-1.5";
    }
  };

  const getMeaningSizeClasses = () => {
    switch (gridSize) {
      case "4":
        return "text-lg sm:text-xl print:text-lg font-medium text-neutral-900 leading-[1.85]";
      case "6":
        return "text-base sm:text-lg print:text-base font-medium text-neutral-900 leading-[1.85]";
      case "9":
      default:
        return "text-sm sm:text-base print:text-sm font-medium text-neutral-900 leading-[1.8]";
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-2 sm:px-4">
      {/* ================= Printable View Controls (Hidden in Print) ================= */}
      <div className="print:hidden mb-8 p-4 sm:p-5 rounded-2xl bg-[#0E0C09]/95 backdrop-blur-xl border border-white/[0.08] shadow-2xl space-y-4">
        {/* Top Header & Print Action Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
          <div>
            <h2 className="text-lg font-semibold text-[#F5EFE6] flex items-center gap-2">
              <Printer className="w-5 h-5 text-[#C9A86A]" />
              <span dir={lang === "dv" ? "rtl" : "ltr"}>
                {lang === "dv" ? "ފްލޭޝްކާޑު ޕްރިންޓްކުރުން (A4 / PDF)" : "Printable Flashcards (A4 / PDF)"}
              </span>
            </h2>
            <p className="text-xs text-[#9A9183] mt-1" dir={lang === "dv" ? "rtl" : "ltr"}>
              {lang === "dv"
                ? "މިނިމަލިސްޓް ހުދު ކާޑުތައް A4 ގަނޑުގައި ޕްރިންޓްކޮށް، ކަފައިގެން ބޭނުންކުރައްވާ"
                : "Minimalist white square cards ready for A4 double/single-sided print & cutting"}
            </p>
          </div>

          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#C9A86A] to-[#E2C792] text-[#0B0A08] font-semibold text-sm hover:brightness-105 active:scale-95 transition-all shadow-[0_4px_20px_rgba(201,168,106,0.35)] flex-shrink-0"
          >
            <Printer className="w-4 h-4 stroke-[2.2]" />
            <span>{lang === "dv" ? "ޕްރިންޓް / ސޭވް PDF" : "Print / Save as PDF"}</span>
          </button>
        </div>

        {/* Control Switches & Layout Configs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* 1. Layout / Cards Per Page */}
          <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-[#14120E] border border-white/[0.06]">
            <span className="text-[#9A9183] font-medium flex items-center gap-1.5">
              <Grid className="w-3.5 h-3.5 text-[#C9A86A]" />
              {lang === "dv" ? "ކާޑުގެ ސައިޒު" : "Cards per Page"}
            </span>
            <div className="flex items-center gap-1 mt-1">
              <button
                type="button"
                onClick={() => setGridSize("4")}
                className={`flex-1 py-1.5 px-2 rounded-lg text-center transition ${
                  gridSize === "4"
                    ? "bg-[#C9A86A]/20 text-[#E2C792] font-semibold border border-[#C9A86A]/40"
                    : "text-[#9A9183] hover:text-[#F5EFE6]"
                }`}
              >
                2×2 (4)
              </button>
              <button
                type="button"
                onClick={() => setGridSize("6")}
                className={`flex-1 py-1.5 px-2 rounded-lg text-center transition ${
                  gridSize === "6"
                    ? "bg-[#C9A86A]/20 text-[#E2C792] font-semibold border border-[#C9A86A]/40"
                    : "text-[#9A9183] hover:text-[#F5EFE6]"
                }`}
              >
                2×3 (6)
              </button>
              <button
                type="button"
                onClick={() => setGridSize("9")}
                className={`flex-1 py-1.5 px-2 rounded-lg text-center transition ${
                  gridSize === "9"
                    ? "bg-[#C9A86A]/20 text-[#E2C792] font-semibold border border-[#C9A86A]/40"
                    : "text-[#9A9183] hover:text-[#F5EFE6]"
                }`}
              >
                3×3 (9)
              </button>
            </div>
          </div>

          {/* 2. Border Style */}
          <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-[#14120E] border border-white/[0.06]">
            <span className="text-[#9A9183] font-medium flex items-center gap-1.5">
              <Scissors className="w-3.5 h-3.5 text-[#C9A86A]" />
              {lang === "dv" ? "ކާޑުގެ ކައިރިފަށު" : "Border Style"}
            </span>
            <div className="flex items-center gap-1 mt-1">
              <button
                type="button"
                onClick={() => setBorderStyle("rounded")}
                className={`flex-1 py-1.5 px-2 rounded-lg text-center transition ${
                  borderStyle === "rounded"
                    ? "bg-[#C9A86A]/20 text-[#E2C792] font-semibold border border-[#C9A86A]/40"
                    : "text-[#9A9183] hover:text-[#F5EFE6]"
                }`}
              >
                {lang === "dv" ? "ބޮޅު" : "Rounded"}
              </button>
              <button
                type="button"
                onClick={() => setBorderStyle("dashed")}
                className={`flex-1 py-1.5 px-2 rounded-lg text-center transition ${
                  borderStyle === "dashed"
                    ? "bg-[#C9A86A]/20 text-[#E2C792] font-semibold border border-[#C9A86A]/40"
                    : "text-[#9A9183] hover:text-[#F5EFE6]"
                }`}
              >
                {lang === "dv" ? "ކަފާ ރޮނގު" : "Dashed"}
              </button>
              <button
                type="button"
                onClick={() => setBorderStyle("hairline")}
                className={`flex-1 py-1.5 px-2 rounded-lg text-center transition ${
                  borderStyle === "hairline"
                    ? "bg-[#C9A86A]/20 text-[#E2C792] font-semibold border border-[#C9A86A]/40"
                    : "text-[#9A9183] hover:text-[#F5EFE6]"
                }`}
              >
                {lang === "dv" ? "ތުނި" : "Hairline"}
              </button>
            </div>
          </div>

          {/* 3. Card Number Toggle */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#14120E] border border-white/[0.06]">
            <div>
              <span className="text-[#F5EFE6] font-medium flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5 text-[#C9A86A]" />
                {lang === "dv" ? "ނަންބަރު ދެއްކުން" : "Card Number (#01)"}
              </span>
              <p className="text-[10px] text-[#9A9183] mt-0.5">
                {lang === "dv" ? "ކާޑުގެ ކަނުގައި ނަންބަރު ޖެހުން" : "Print number on top corner"}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowNumbers((prev) => !prev)}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 ${
                showNumbers ? "bg-[#C9A86A]" : "bg-white/10"
              }`}
              aria-label="Toggle card numbers"
            >
              <span
                className={`w-5 h-5 rounded-full bg-black shadow-md transform transition-transform ${
                  showNumbers ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* 4. Brackets on Transliteration Toggle */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#14120E] border border-white/[0.06]">
            <div>
              <span className="text-[#F5EFE6] font-medium flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C9A86A]" />
                {lang === "dv" ? "ބުރެކެޓް އެޅުވުން" : "Brackets ( ... )"}
              </span>
              <p className="text-[10px] text-[#9A9183] mt-0.5">
                {lang === "dv" ? "(އައް ސަމީޢު) ގޮތަށް ލިޔުން" : "(Name) with brackets"}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowBrackets((prev) => !prev)}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 ${
                showBrackets ? "bg-[#C9A86A]" : "bg-white/10"
              }`}
              aria-label="Toggle brackets on transliteration"
            >
              <span
                className={`w-5 h-5 rounded-full bg-black shadow-md transform transition-transform ${
                  showBrackets ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Print Tip Helper */}
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#C9A86A]/10 border border-[#C9A86A]/20 text-[11px] text-[#E2C792]/90">
          <Info className="w-4 h-4 text-[#C9A86A] flex-shrink-0" />
          <span>
            {lang === "dv"
              ? "ޕްރިންޓް ޑައިލޮގްގައި 'Destination: Save as PDF' ނުވަތަ ޕްރިންޓަރ ޚިޔާރުކުރައްވާށެވެ. މާޖިން 'Default' ނުވަތަ 'None' ބަހައްޓަވާށެވެ."
              : "Tip: In the print dialog, set Destination to 'Save as PDF' or your printer, Margins to 'Default' or 'Minimum', and ensure 'Background graphics' is checked."}
          </span>
        </div>
      </div>

      {/* ================= Printable Sheet: Clean White Cards ================= */}
      <div className={`grid ${getGridClasses()} w-full pb-16 print:pb-0 print:w-full print:max-w-none`}>
        {ALLAH_NAMES.map((name: AllahName) => {
          const formattedId = String(name.id).padStart(2, "0");
          const transliterationDisplay = showBrackets
            ? `(${name.transliteration})`
            : name.transliteration;

          return (
            <div
              key={name.id}
              className={`printable-card bg-white text-neutral-900 ${getCardBorderClasses()} aspect-square flex flex-col justify-between items-center text-center p-4 sm:p-6 print:p-4 relative overflow-hidden select-all`}
              style={{
                breakInside: "avoid",
                pageBreakInside: "avoid",
              }}
            >
              {/* Optional Top Card Number (#01 Only in Top-Left) */}
              <div className="w-full flex items-center justify-start text-neutral-400 font-mono text-xs mb-1 min-h-[16px]">
                {showNumbers ? <span>#{formattedId}</span> : null}
              </div>

              {/* Center Content: Large Black Arabic Calligraphy + Transliteration + Definition */}
              <div className="flex-1 flex flex-col items-center justify-center w-full my-auto">
                {/* 1. Large Bold Black Arabic Calligraphy */}
                <h3
                  lang="ar"
                  dir="rtl"
                  className={`font-arabic ${getArabicSizeClasses()} font-bold text-black drop-shadow-none leading-normal select-text`}
                  style={{ letterSpacing: "normal", fontFeatureSettings: '"kern" 1, "liga" 1, "calt" 1' }}
                >
                  {name.arabic}
                </h3>

                {/* 2. Middle Dhivehi Transliteration (Large & Bold) */}
                <p
                  lang="dv"
                  dir="rtl"
                  className={`font-faruma ${getTranslitSizeClasses()} select-text`}
                >
                  {transliterationDisplay}
                </p>

                {/* Subtle Divider Hairline */}
                <div className="w-14 h-px bg-neutral-200 my-2.5 print:my-1.5" />

                {/* 3. Bottom Dhivehi Definition (Larger & Darker Neutral-900) */}
                <p
                  lang="dv"
                  dir="rtl"
                  className={`font-faruma ${getMeaningSizeClasses()} max-w-[92%] select-text`}
                >
                  {name.dhivehiMeaning}
                </p>
              </div>

              {/* Bottom Spacer to balance top number min-height */}
              <div className="w-full min-h-[16px]" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

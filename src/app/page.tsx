"use client";

import React, { useState, useEffect } from "react";
import {
  Layers,
  LayoutGrid,
  Printer,
  Sparkles,
  HelpCircle,
  X,
  Share2,
  Globe,
} from "lucide-react";
import { useStudyProgress } from "@/hooks/useStudyProgress";
import { FlashcardDeck } from "@/components/FlashcardDeck";
import { NamesGridView } from "@/components/NamesGridView";
import { PrintableCardsView } from "@/components/PrintableCardsView";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"flashcards" | "browse" | "print">("flashcards");
  const [selectedNameId, setSelectedNameId] = useState<number | undefined>(undefined);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [lang, setLang] = useState<"en" | "dv">("en");

  // Keep document html lang in sync with selected language (keep layout LTR)
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = "ltr";
  }, [lang]);

  const {
    isHydrated,
    memorized,
    favorites,
    toggleMemorized,
    toggleFavorite,
    resetAllProgress,
  } = useStudyProgress();

  const handleSelectNameFromGrid = (id: number) => {
    setSelectedNameId(id);
    setActiveTab("flashcards");
  };

  const handleShare = async () => {
    const shareText = "އަސްމާއުލް ޙުސްނާ - މާތް ﷲ ގެ 99 އިސްމުފުޅާއި އޭގެ ދިވެހި މާނަ ދަސްކުރުމަށް ޚާއްޞަ ފްލޭޝްކާޑު އެޕް";
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Asma-ul-Husna | 99 Names of Allah",
          text: shareText,
          url: window.location.href,
        });
      } catch (e) {
        // user cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  return (
    <div
      dir="ltr"
      className="min-h-screen bg-[#0B0A08] text-[#F5EFE6] flex flex-col justify-between selection:bg-[#C9A86A]/25 selection:text-[#E2C792] relative overflow-hidden"
    >
      {/* ================= AMBIENT TOP MANUSCRIPT GLOW ================= */}
      <div
        className="print:hidden pointer-events-none fixed inset-0 z-0 opacity-100"
        style={{
          background: "radial-gradient(ellipse 70% 45% at 50% 25%, rgba(201, 168, 106, 0.06), transparent 70%)",
        }}
      />

      {/* ================= HEADER (Responsive with zero overflow on 375px) ================= */}
      <header className="print:hidden sticky top-0 z-40 w-full bg-[#0B0A08]/90 backdrop-blur-xl border-b border-[#C9A86A]/15 px-3 sm:px-4 py-2.5 sm:py-3">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 sm:gap-4">
          {/* Top Bar: Logo + Title (Left) and Actions (Right) */}
          <div className="flex items-center justify-between w-full sm:w-auto">
            {/* Logo & Single-line Title */}
            <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl border border-[#C9A86A]/30 bg-[#14120E] p-[1px] shadow-sm flex items-center justify-center flex-shrink-0">
                <span className="font-arabic text-[#F5EFE6] font-bold text-base sm:text-lg leading-none select-none" dir="rtl">
                  ﷲ
                </span>
              </div>
              <div className="flex items-center gap-2">
                <h1
                  dir={lang === "dv" ? "rtl" : "ltr"}
                  className="font-faruma text-sm sm:text-base font-semibold tracking-tight text-[#F5EFE6] whitespace-nowrap"
                >
                  {lang === "dv" ? "އަސްމާއުލް ޙުސްނާ" : "Asma-ul-Husna"}
                </h1>
                <span className="hidden sm:inline-flex text-[10px] px-2 py-0.5 rounded-full bg-[#14120E] text-[#C9A86A] border border-[#C9A86A]/25 font-mono">
                  99
                </span>
              </div>
            </div>

            {/* Right Actions for Mobile & Desktop */}
            <div className="flex items-center gap-1.5 sm:hidden">
              {/* Minimal Language Toggle */}
              <button
                type="button"
                onClick={() => setLang(lang === "en" ? "dv" : "en")}
                className="font-faruma px-2 py-1.5 rounded-xl text-xs font-medium border border-[#C9A86A]/20 bg-[#14120E] hover:bg-[#1C1914] text-[#9A9183] transition-all flex items-center gap-1"
                title="Toggle Language"
                aria-label="Toggle Language"
              >
                <Globe className="w-3 h-3 text-[#9A9183]" />
                <span className={lang === "en" ? "text-[#E2C792] font-semibold text-[11px]" : "text-[#9A9183] text-[11px]"}>
                  EN
                </span>
                <span className="text-[#635C50] text-[10px]">/</span>
                <span className={`font-faruma text-[11px] ${lang === "dv" ? "text-[#E2C792] font-semibold" : "text-[#9A9183]"}`}>
                  ދިވެހި
                </span>
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="p-1.5 rounded-xl bg-[#14120E] hover:bg-[#1C1914] border border-white/[0.06] text-[#9A9183] hover:text-[#E2C792] transition"
                title="Share"
                aria-label="Share App"
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setShowHelpModal(true)}
                className="p-1.5 rounded-xl bg-[#14120E] hover:bg-[#1C1914] border border-white/[0.06] text-[#9A9183] hover:text-[#F5EFE6] transition"
                title="Shortcuts & Guide"
                aria-label="Shortcuts"
              >
                <HelpCircle className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Desktop Center Mode Switcher Tabs */}
          <nav className="hidden sm:flex items-center p-1 rounded-xl bg-[#14120E] border border-white/[0.06] shadow-inner backdrop-blur-md">
            <button
              type="button"
              onClick={() => setActiveTab("flashcards")}
              className={`font-faruma flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === "flashcards"
                  ? "bg-[#C9A86A]/15 text-[#E2C792] border border-[#C9A86A]/30 shadow-sm"
                  : "text-[#9A9183] hover:text-[#F5EFE6]"
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-[#C9A86A]" />
              <span>{lang === "dv" ? "ކާޑުތައް" : "Flashcards"}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("browse")}
              className={`font-faruma flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === "browse"
                  ? "bg-[#C9A86A]/15 text-[#E2C792] border border-[#C9A86A]/30 shadow-sm"
                  : "text-[#9A9183] hover:text-[#F5EFE6]"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5 text-[#9A9183]" />
              <span>{lang === "dv" ? "ހުރިހާ" : "Browse All"}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("print")}
              className={`font-faruma flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === "print"
                  ? "bg-[#C9A86A]/15 text-[#E2C792] border border-[#C9A86A]/30 shadow-sm"
                  : "text-[#9A9183] hover:text-[#F5EFE6]"
              }`}
            >
              <Printer className="w-3.5 h-3.5 text-[#C9A86A]" />
              <span>{lang === "dv" ? "ޕްރިންޓް" : "Print Cards"}</span>
            </button>
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden sm:flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => setLang(lang === "en" ? "dv" : "en")}
              className="font-faruma px-2.5 py-1.5 rounded-xl text-xs font-medium border border-[#C9A86A]/20 bg-[#14120E] hover:bg-[#1C1914] text-[#9A9183] transition-all flex items-center gap-1.5"
              title="Toggle Language"
              aria-label="Toggle Language"
            >
              <Globe className="w-3.5 h-3.5 text-[#9A9183]" />
              <span className={lang === "en" ? "text-[#E2C792] font-semibold" : "text-[#9A9183]"}>
                EN
              </span>
              <span className="text-[#635C50]">/</span>
              <span className={`font-faruma text-xs ${lang === "dv" ? "text-[#E2C792] font-semibold" : "text-[#9A9183]"}`}>
                ދިވެހި
              </span>
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="p-2 rounded-xl bg-[#14120E] hover:bg-[#1C1914] border border-white/[0.06] text-[#9A9183] hover:text-[#E2C792] transition"
              title="Share"
              aria-label="Share App"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setShowHelpModal(true)}
              className="p-2 rounded-xl bg-[#14120E] hover:bg-[#1C1914] border border-white/[0.06] text-[#9A9183] hover:text-[#F5EFE6] transition"
              title="Shortcuts & Guide"
              aria-label="Shortcuts"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Second Row: Clean Centered Segmented Switcher */}
          <nav className="sm:hidden flex items-center justify-center w-full p-1 rounded-xl bg-[#14120E] border border-white/[0.06] shadow-inner">
            <button
              type="button"
              onClick={() => setActiveTab("flashcards")}
              className={`font-faruma flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === "flashcards"
                  ? "bg-[#C9A86A]/15 text-[#E2C792] border border-[#C9A86A]/30 shadow-sm"
                  : "text-[#9A9183] hover:text-[#F5EFE6]"
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-[#C9A86A]" />
              <span>{lang === "dv" ? "ކާޑުތައް" : "Flashcards"}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("browse")}
              className={`font-faruma flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === "browse"
                  ? "bg-[#C9A86A]/15 text-[#E2C792] border border-[#C9A86A]/30 shadow-sm"
                  : "text-[#9A9183] hover:text-[#F5EFE6]"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5 text-[#9A9183]" />
              <span>{lang === "dv" ? "ހުރިހާ" : "Browse All"}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("print")}
              className={`font-faruma flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === "print"
                  ? "bg-[#C9A86A]/15 text-[#E2C792] border border-[#C9A86A]/30 shadow-sm"
                  : "text-[#9A9183] hover:text-[#F5EFE6]"
              }`}
            >
              <Printer className="w-3.5 h-3.5 text-[#C9A86A]" />
              <span>{lang === "dv" ? "ޕްރިންޓް" : "Print"}</span>
            </button>
          </nav>
        </div>

        {copiedShare && (
          <div className="font-faruma w-full bg-[#C9A86A]/20 border-b border-[#C9A86A]/30 text-[#E2C792] text-xs text-center py-1 font-medium animate-fadeIn mt-1">
            {lang === "dv" ? "ލިންކު ކޮޕީ ކުރެވިއްޖެ!" : "Link copied to clipboard!"}
          </div>
        )}
      </header>

      {/* ================= MAIN CONTENT ================= */}
      <main className="relative z-10 flex-1 w-full max-w-6xl mx-auto px-3 sm:px-4 py-5 sm:py-10 print:p-0 print:m-0 print:max-w-none">
        {activeTab === "flashcards" ? (
          <FlashcardDeck
            memorized={memorized}
            favorites={favorites}
            onToggleMemorized={toggleMemorized}
            onToggleFavorite={toggleFavorite}
            initialNameId={selectedNameId}
            lang={lang}
          />
        ) : activeTab === "browse" ? (
          <NamesGridView
            memorized={memorized}
            favorites={favorites}
            onToggleMemorized={toggleMemorized}
            onToggleFavorite={toggleFavorite}
            onSelectName={handleSelectNameFromGrid}
            lang={lang}
          />
        ) : (
          <PrintableCardsView lang={lang} />
        )}
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="print:hidden relative z-10 w-full border-t border-[#C9A86A]/10 bg-[#0B0A08]/70 py-6 mt-8 sm:mt-12 text-center text-xs text-[#9A9183]">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p
            className={`text-sm ${lang === "dv" ? "font-faruma text-[#E6DEC8]/90 text-right" : "text-[#E6DEC8]/90 text-left font-normal not-italic"}`}
            dir={lang === "dv" ? "rtl" : "ltr"}
          >
            {lang === "dv"
              ? "«ﷲ އަށް ނުވަދިހަ ނުވަ އިސްމުފުޅު ވެއެވެ. އެ އިސްމުފުޅުތައް ހިތުދަސްކޮށްފި މީހާ ސުވަރުގެ ވަންނާނެއެވެ.» — ޞަޙީޙުލް ބުޚާރީ"
              : "“Allah has ninety-nine names; whoever memorizes and embraces them will enter Paradise.” — Sahih al-Bukhari"}
          </p>
          <div className="flex items-center gap-4 text-[11px] text-[#9A9183]">
            <span className="font-faruma">{lang === "dv" ? "އަމީރީ އަދި ފަރުމާ ފޮންޓު" : "Amiri & Faruma Typography"}</span>
            <span>•</span>
            <button
              type="button"
              onClick={() => {
                const msg = lang === "dv"
                  ? "ހުރިހާ ޕްރޮގްރެސްއެއް ފޮހެލަން ބޭނުންފުޅުތޯ؟"
                  : "Reset all memorized and favorite progress?";
                if (window.confirm(msg)) {
                  resetAllProgress();
                }
              }}
              className="font-faruma text-[#9A9183] hover:text-rose-400 transition underline underline-offset-2"
            >
              {lang === "dv" ? "އަލުން ފަށާ" : "Reset Progress"}
            </button>
          </div>
        </div>
      </footer>

      {/* ================= HELP & SHORTCUTS MODAL: FULLY LOCALIZED ================= */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-md rounded-2xl bg-[#13110E] border border-[#C9A86A]/20 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <h3 className="text-base font-semibold text-[#F5EFE6] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C9A86A]" />
                <span className="font-faruma">{lang === "dv" ? "ބޭނުންކުރާނެ ގޮތް" : "Shortcuts & Guide"}</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowHelpModal(false)}
                className="p-1.5 rounded-lg text-[#9A9183] hover:text-[#F5EFE6] hover:bg-white/[0.04]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-sm text-[#E6DEC8]">
              {/* Localized Guide Bullet Points */}
              {lang === "dv" ? (
                <div className="font-faruma text-right space-y-1.5 leading-relaxed text-sm" dir="rtl">
                  <p>• <strong>ކާޑު ފުށުންޖެހުން:</strong> ކާޑުގެ ކޮންމެ ތަނަކަށް ފިއްތާލުމުން ނުވަތަ Space ފިއްތާލުމުން ދިވެހި މާނަ ފެންނާނެއެވެ.</p>
                  <p>• <strong>ކުރިއަށް / ފަހަތަށް:</strong> ވާތަށް ނުވަތަ ކަނާތަށް ދަމާލުމުން (Swipe) ނުވަތަ Arrow ކީތަކުން ކާޑު ބަދަލުވާނެއެވެ.</p>
                  <p>• <strong>ހިތުދަސްވެފައި:</strong> ފާހަގަ ކޮށްލުމަށް ހެޔޮ ފާހަގަ (Checkmark) ނުވަތަ M އަށް ފިއްތާލާށެވެ.</p>
                </div>
              ) : (
                <div className="text-left space-y-2 leading-relaxed text-sm text-[#E6DEC8]" dir="ltr">
                  <p>• <strong>Flip Card:</strong> Click anywhere on the card or press <kbd className="px-1.5 py-0.5 rounded bg-[#1C1914] text-[#E2C792] font-mono text-xs">Space</kbd> / <kbd className="px-1.5 py-0.5 rounded bg-[#1C1914] text-[#E2C792] font-mono text-xs">Enter</kbd> to reveal the Dhivehi meaning.</p>
                  <p>• <strong>Navigate:</strong> Swipe left/right on mobile or use the <kbd className="px-1.5 py-0.5 rounded bg-[#1C1914] text-[#C9A86A] font-mono text-xs">Arrow</kbd> keys to move between cards.</p>
                  <p>• <strong>Track Progress:</strong> Click the Checkmark icon or press <kbd className="px-1.5 py-0.5 rounded bg-[#1C1914] text-[#E2C792] font-mono text-xs">M</kbd> to mark a name as memorized, and <kbd className="px-1.5 py-0.5 rounded bg-[#1C1914] text-rose-300 font-mono text-xs">F</kbd> to favorite.</p>
                </div>
              )}

              {/* Localized Shortcuts Box */}
              <div className="pt-2 border-t border-white/[0.08]">
                <h4 className="font-faruma text-xs uppercase tracking-wider text-[#9A9183] font-semibold mb-2">
                  {lang === "dv" ? "ކީބޯޑު ޝޯޓްކަޓްތައް" : "Keyboard Shortcuts"}
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center justify-between p-2 rounded-xl bg-[#14120E] border border-white/[0.06]">
                    <span className="font-faruma text-[#9A9183]">{lang === "dv" ? "ފުށުންޖެހުމަށް" : "Flip card"}</span>
                    <kbd className="px-1.5 py-0.5 rounded bg-[#1C1914] text-[#E2C792] font-mono">Space</kbd>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-[#14120E] border border-white/[0.06]">
                    <span className="font-faruma text-[#9A9183]">{lang === "dv" ? "ބަދަލުކުރުމަށް" : "Next / Prev"}</span>
                    <span className="space-x-1">
                      <kbd className="px-1.5 py-0.5 rounded bg-[#1C1914] text-[#C9A86A] font-mono">←</kbd>
                      <kbd className="px-1.5 py-0.5 rounded bg-[#1C1914] text-[#C9A86A] font-mono">→</kbd>
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-[#14120E] border border-white/[0.06]">
                    <span className="font-faruma text-[#9A9183]">{lang === "dv" ? "ހިތުދަސް" : "Memorized"}</span>
                    <kbd className="px-1.5 py-0.5 rounded bg-[#1C1914] text-[#E2C792] font-mono">M</kbd>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-[#14120E] border border-white/[0.06]">
                    <span className="font-faruma text-[#9A9183]">{lang === "dv" ? "ފޭވަރިޓް" : "Favorite"}</span>
                    <kbd className="px-1.5 py-0.5 rounded bg-[#1C1914] text-rose-300 font-mono">F</kbd>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowHelpModal(false)}
              className="font-faruma w-full py-2.5 rounded-xl bg-[#1C1914] hover:bg-[#25211B] border border-[#C9A86A]/25 text-[#E2C792] font-medium text-xs transition"
            >
              {lang === "dv" ? "ލައްޕާލާ" : "Close"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

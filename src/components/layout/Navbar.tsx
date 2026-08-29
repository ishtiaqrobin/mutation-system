"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Printer,
  RotateCcw,
  SlidersHorizontal,
  ArrowLeft,
  Sun,
  Moon,
  Home,
  CheckCircle,
  FileSpreadsheet
} from "lucide-react";
import { useTheme } from "next-themes";

interface NavbarProps {
  onToggleDrawer?: () => void;
  isDrawerOpen?: boolean;
  onReset?: () => void;
  isEditorPage?: boolean;
}

export function Navbar({
  onToggleDrawer,
  isDrawerOpen,
  onReset,
  isEditorPage = false,
}: NavbarProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [currentDateBn, setCurrentDateBn] = useState("");

  useEffect(() => {
    setMounted(true);
    // Format current date in Bengali
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const bnDate = new Date().toLocaleDateString("bn-BD", options);
    setCurrentDateBn(bnDate);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="no-print sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-200 dark:border-slate-800 transition-colors shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left Side: Brand Logo / Nav */}
        <div className="flex items-center gap-3">
          {isEditorPage ? (
            <>
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 transition-colors"
                title="হোম পেজে ফিরে যান"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>হোম</span>
              </Link>

              {onToggleDrawer && (
                <button
                  onClick={onToggleDrawer}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                    isDrawerOpen
                      ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700"
                  }`}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>{isDrawerOpen ? "এডিটর হাইড" : "এডিটর শো"}</span>
                </button>
              )}
            </>
          ) : (
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-xl overflow-hidden bg-white border border-emerald-500/20 p-1 flex items-center justify-center shadow-xs">
                <Image
                  src="/assets/logo/10002.jpg"
                  alt="Gov Logo"
                  width={44}
                  height={44}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight font-solaiman tracking-wide">
                  ভূমি ব্যবস্থাপনা অটোমেশন সিস্টেম
                </span>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                  ভূমি মন্ত্রণালয় | গণপ্রজাতন্ত্রী বাংলাদেশ সরকার
                </span>
              </div>
            </Link>
          )}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {!isEditorPage && currentDateBn && (
            <div className="hidden md:flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-200/80 dark:border-slate-800">
              <span>{currentDateBn}</span>
            </div>
          )}

          {isEditorPage ? (
            <>
              {onReset && (
                <button
                  onClick={onReset}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-xs font-bold hover:bg-amber-100 transition-colors"
                  title="ডিফল্ট ডাটা রিস্টোর করুন"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">রিসেট</span>
                </button>
              )}

              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>প্রিন্ট খতিয়ান (A4)</span>
              </button>
            </>
          ) : (
            <Link
              href="/khatian"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>খতিয়ান এডিটর</span>
            </Link>
          )}

          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              title="থিম পরিবর্তন"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

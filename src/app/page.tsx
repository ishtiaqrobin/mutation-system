"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Download, FileText, Home as HomeIcon, CheckCircle2, ArrowRight } from "lucide-react";
import { INITIAL_KHATIAN_DATA } from "@/data/dummyKhatian";

export default function HomePage() {
  const [currentDateBn, setCurrentDateBn] = useState("");

  useEffect(() => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const bnDate = new Date().toLocaleDateString("bn-BD", options);
    setCurrentDateBn(bnDate);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-siliguri text-slate-900 dark:text-slate-100 transition-colors">
      
      {/* Official Top Bar */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-3 px-4 sm:px-8 shadow-2xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors" title="হোম">
              <Image src="/assets/logo/10001.png" alt="Home" width={22} height={22} className="object-contain" />
            </Link>

            <div className="flex items-center gap-3">
              <Image src="/assets/logo/10002.jpg" alt="Logo" width={180} height={55} className="object-contain h-12 w-auto" />
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold text-slate-600 dark:text-slate-400">
            <span>{currentDateBn || "শুক্রবার, ২৮ আগস্ট ২০২৬"}</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8 flex flex-col gap-6">
        
        {/* Quick Action Navigation Card */}
        <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-900 text-white rounded-2xl p-6 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <span className="bg-white/20 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              ডিজিটাল ভূমিসেবা পোর্টাল
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-solaiman pt-1">
              ই-মিউটেশন খতিয়ান অনলাইন ভেরিফিকেশন ও লাইভ এডিটর
            </h2>
            <p className="text-emerald-100 text-xs sm:text-sm">
              খতিয়ানের তথ্য দেখুন, এডিট করুন এবং ১:১ পিক্সেল-পারফেক্ট A4 Landscape প্রিন্ট নিন।
            </p>
          </div>

          <Link
            href="/khatian"
            className="inline-flex items-center gap-2 bg-white text-emerald-900 hover:bg-emerald-50 px-5 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all shrink-0 active:scale-95 cursor-pointer"
          >
            <FileText className="w-4 h-4 text-emerald-700" />
            <span>খতিয়ান এডিটরে যান</span>
            <ArrowRight className="w-4 h-4 text-emerald-700" />
          </Link>
        </div>

        {/* Official Verification Details Card (Exact Replica of Mutation Land Screenshot) */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs overflow-hidden">
          
          {/* Card Header Notice */}
          <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 text-center bg-slate-50/50 dark:bg-slate-900/50">
            <h1 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 font-solaiman">
              খতিয়ান এর পূর্ণাঙ্গ তথ্য দেখতে হলে &quot;খতিয়ান ডাউনলোড&quot; বাটনে ক্লিক করে খতিয়ান ডাউনলোড করুন
            </h1>
          </div>

          {/* Verification Data Table */}
          <div className="p-4 sm:p-6 overflow-x-auto">
            <table className="w-full border-collapse border border-slate-200 dark:border-slate-800 text-sm">
              <tbody>
                <tr className="border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="p-3 font-semibold text-slate-700 dark:text-slate-300 w-1/3 bg-slate-50/80 dark:bg-slate-950/50 border-r border-slate-200 dark:border-slate-800">
                    ভূমি অফিস এর ঠিকানা
                  </td>
                  <td className="p-3 text-slate-900 dark:text-slate-100 font-medium">
                    {INITIAL_KHATIAN_DATA.mouza} , {INITIAL_KHATIAN_DATA.upazilaCircle} , {INITIAL_KHATIAN_DATA.district}
                  </td>
                </tr>

                <tr className="border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="p-3 font-semibold text-slate-700 dark:text-slate-300 bg-slate-50/80 dark:bg-slate-950/50 border-r border-slate-200 dark:border-slate-800">
                    খতিয়ান নং
                  </td>
                  <td className="p-3 text-slate-900 dark:text-slate-100 font-semibold">
                    {INITIAL_KHATIAN_DATA.khatianNo}
                  </td>
                </tr>

                <tr className="border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="p-3 font-semibold text-slate-700 dark:text-slate-300 bg-slate-50/80 dark:bg-slate-950/50 border-r border-slate-200 dark:border-slate-800">
                    আবেদন নম্বর
                  </td>
                  <td className="p-3 text-slate-900 dark:text-slate-100 font-mono font-medium">
                    {INITIAL_KHATIAN_DATA.applicationNo}
                  </td>
                </tr>

                <tr className="border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="p-3 font-semibold text-slate-700 dark:text-slate-300 bg-slate-50/80 dark:bg-slate-950/50 border-r border-slate-200 dark:border-slate-800">
                    আবেদনের তারিখ
                  </td>
                  <td className="p-3 text-slate-900 dark:text-slate-100 font-medium">
                    {INITIAL_KHATIAN_DATA.applicationDate}
                  </td>
                </tr>

                <tr className="border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="p-3 font-semibold text-slate-700 dark:text-slate-300 bg-slate-50/80 dark:bg-slate-950/50 border-r border-slate-200 dark:border-slate-800">
                    মিউটেশন মামলা নং
                  </td>
                  <td className="p-3 text-slate-900 dark:text-slate-100 font-medium">
                    {INITIAL_KHATIAN_DATA.mutationCaseNo}
                  </td>
                </tr>

                <tr className="border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="p-3 font-semibold text-slate-700 dark:text-slate-300 bg-slate-50/80 dark:bg-slate-950/50 border-r border-slate-200 dark:border-slate-800">
                    ডিসি আর নং
                  </td>
                  <td className="p-3 text-slate-900 dark:text-slate-100 font-mono font-medium">
                    {INITIAL_KHATIAN_DATA.onlineDcrNo.replace("DCR", "")}
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="p-3 font-semibold text-slate-700 dark:text-slate-300 bg-slate-50/80 dark:bg-slate-950/50 border-r border-slate-200 dark:border-slate-800 align-top">
                    মালিক, অকৃষি প্রজা বা ইজারাদারের নাম ও ঠিকানা
                  </td>
                  <td className="p-3 text-slate-900 dark:text-slate-100 font-medium leading-relaxed">
                    ১) {INITIAL_KHATIAN_DATA.ownerName}<br />
                    {INITIAL_KHATIAN_DATA.address}
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Green Download / Editor Button */}
            <div className="mt-6">
              <Link
                href="/khatian"
                className="inline-flex items-center gap-2 bg-[#1b8e4e] hover:bg-[#15753f] active:scale-95 text-white font-bold px-6 py-2.5 rounded-lg shadow-sm transition-all text-sm cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>খতিয়ান ডাউনলোড</span>
              </Link>
            </div>
          </div>
        </div>

      </main>

      {/* Official Green Footer (Exact Replica of Mutation Land Screenshot) */}
      <footer className="bg-[#004d25] text-white mt-12 pt-10 pb-6 px-4 sm:px-8 border-t-4 border-[#00381b]">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-xs leading-relaxed">
            
            {/* Column 1: Implementation logos */}
            <div className="space-y-3">
              <div className="flex flex-col gap-2">
                <Image
                  src="/assets/logo/10003.png"
                  alt="Ministry"
                  width={190}
                  height={50}
                  className="object-contain bg-white/10 p-1.5 rounded"
                />
                <Image
                  src="/assets/logo/10004.png"
                  alt="Land Automation"
                  width={190}
                  height={50}
                  className="object-contain bg-white p-1.5 rounded"
                />
              </div>
            </div>

            {/* Column 2: Mutation Services */}
            <div className="space-y-2">
              <h3 className="font-bold text-amber-300 text-sm mb-3">মিউটেশন সেবা</h3>
              <ul className="space-y-2 text-slate-200">
                <li><a href="#" className="hover:underline">মিউটেশন সংক্রান্ত প্রজ্ঞাপন</a></li>
                <li><a href="#" className="hover:underline">মিউটেশন সংক্রান্ত জিজ্ঞাসা</a></li>
                <li><a href="#" className="hover:underline">পরিসংখ্যান</a></li>
              </ul>
            </div>

            {/* Column 3: Others */}
            <div className="space-y-2">
              <h3 className="font-bold text-amber-300 text-sm mb-3">অন্যান্য</h3>
              <ul className="space-y-2 text-slate-200">
                <li><a href="#" className="hover:underline">শর্তাবলী</a></li>
                <li><a href="#" className="hover:underline">যোগাযোগ</a></li>
                <li><a href="#" className="hover:underline">উত্তরাধিকার ক্যালকুলেটর</a></li>
              </ul>
            </div>

            {/* Column 4: Important Links */}
            <div className="space-y-2">
              <h3 className="font-bold text-amber-300 text-sm mb-3">গুরুত্বপূর্ণ লিঙ্কসমূহ</h3>
              <ul className="space-y-2 text-slate-200">
                <li><a href="https://land.gov.bd" target="_blank" rel="noreferrer" className="hover:underline">ভূমি পোর্টাল</a></li>
              </ul>
            </div>
          </div>

          <hr className="border-emerald-800/80" />

          {/* Footer App Pill & Copyright */}
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="bg-white rounded-full px-4 py-1.5 inline-flex items-center shadow-md">
              <Image
                src="/assets/logo/10005.png"
                alt="Mutation Mobile Apps"
                width={260}
                height={32}
                className="object-contain h-7 w-auto"
              />
            </div>
            
            <p className="text-xs text-slate-200 font-medium">
              মিউটেশন অ্যাপস: মিউটেশনের সকল তথ্য এখন হাতের মুঠোয়!
            </p>

            <div className="mt-2 bg-[#00381b] text-emerald-300 text-xs font-bold px-6 py-1 rounded-full border border-emerald-700/50">
              পরীক্ষামূলক সংস্করণ
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

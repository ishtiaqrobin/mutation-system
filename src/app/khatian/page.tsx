"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { KhatianForm } from "@/components/khatian/KhatianForm";
import { KhatianSheet } from "@/components/khatian/KhatianSheet";
import { INITIAL_KHATIAN_DATA } from "@/data/dummyKhatian";
import { KhatianData } from "@/types/khatian";

export default function KhatianEditorPage() {
  const [khatianData, setKhatianData] = useState<KhatianData>(
    JSON.parse(JSON.stringify(INITIAL_KHATIAN_DATA))
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const handleReset = () => {
    setKhatianData(JSON.parse(JSON.stringify(INITIAL_KHATIAN_DATA)));
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-siliguri print:bg-white print:min-h-0 transition-colors duration-200">
      {/* Top Navbar */}
      <Navbar
        onToggleDrawer={() => setIsDrawerOpen(!isDrawerOpen)}
        isDrawerOpen={isDrawerOpen}
        onReset={handleReset}
        isEditorPage={true}
      />

      {/* Main Workspace Layout */}
      <div className="main-wrapper flex flex-1 relative print:block print:m-0 print:p-0">
        {/* Left Side Form Drawer */}
        <KhatianForm
          data={khatianData}
          onChange={setKhatianData}
          onReset={handleReset}
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        />

        {/* Live Sheet Viewport */}
        <main className="certificate-viewport flex-1 p-8 px-4 flex justify-center items-start overflow-x-auto print:p-0 print:m-0 print:block print:overflow-visible bg-slate-200/80 dark:bg-slate-900/60 shadow-inner">
          <KhatianSheet data={khatianData} />
        </main>
      </div>
    </div>
  );
}

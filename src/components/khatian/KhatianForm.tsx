"use client";

import React, { useState } from "react";
import { KhatianData, DagEntry } from "@/types/khatian";
import {
  FileText,
  User,
  MapPin,
  Layers,
  CheckSquare,
  Plus,
  Trash2,
  X,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Sparkles
} from "lucide-react";

interface KhatianFormProps {
  data: KhatianData;
  onChange: (newData: KhatianData) => void;
  onReset: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export function KhatianForm({
  data,
  onChange,
  onReset,
  isOpen,
  onClose,
}: KhatianFormProps) {
  const [activeTab, setActiveTab] = useState<"general" | "owner" | "dags" | "signatories">("general");

  const handleInputChange = (field: keyof KhatianData, value: any) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  const handleDagChange = (index: number, field: keyof DagEntry, value: string) => {
    const updatedDags = [...data.dagEntries];
    updatedDags[index] = {
      ...updatedDags[index],
      [field]: value,
    };
    onChange({
      ...data,
      dagEntries: updatedDags,
    });
  };

  const handleAddDag = () => {
    const newDag: DagEntry = {
      id: Date.now().toString(),
      dagNo: "১০০০",
      landClassKrishi: "ডাঙ্গা",
      landClassAkrishi: "",
      dagTotalAcre: "০",
      dagTotalSatangsha: "১০০০০০",
      khatianShareInDag: "০.১৬৬৭",
      shareLandAcre: "০",
      shareLandSatangsha: "০১০০০০",
      remarks: "দলিল নং: ...",
    };
    onChange({
      ...data,
      dagEntries: [...data.dagEntries, newDag],
    });
  };

  const handleRemoveDag = (index: number) => {
    if (data.dagEntries.length <= 1) {
      alert("কমপক্ষে ১টি দাগ বহাল রাখতে হবে।");
      return;
    }
    const updatedDags = data.dagEntries.filter((_, i) => i !== index);
    onChange({
      ...data,
      dagEntries: updatedDags,
    });
  };

  if (!isOpen) return null;

  return (
    <aside className="no-print w-full md:w-96 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col h-[calc(100vh-4rem)] sticky top-16 shadow-xl z-30 font-siliguri">
      {/* Drawer Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <h2 className="font-bold text-sm text-slate-900 dark:text-white">
            লাইভ এডিটর (খতিয়ান ফিল্ড)
          </h2>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={onReset}
            className="p-1.5 rounded-lg text-amber-600 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-950/50 text-xs font-semibold flex items-center gap-1 transition-colors"
            title="রিসেট ডাটা"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="text-[11px]">রিসেট</span>
          </button>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="grid grid-cols-4 border-b border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-900 text-xs font-semibold">
        <button
          onClick={() => setActiveTab("general")}
          className={`py-2.5 px-1 border-b-2 text-center transition-colors ${
            activeTab === "general"
              ? "border-emerald-600 text-emerald-600 dark:text-emerald-400 bg-white dark:bg-slate-900"
              : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
          }`}
        >
          সাধারণ
        </button>
        <button
          onClick={() => setActiveTab("owner")}
          className={`py-2.5 px-1 border-b-2 text-center transition-colors ${
            activeTab === "owner"
              ? "border-emerald-600 text-emerald-600 dark:text-emerald-400 bg-white dark:bg-slate-900"
              : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
          }`}
        >
          মালিক
        </button>
        <button
          onClick={() => setActiveTab("dags")}
          className={`py-2.5 px-1 border-b-2 text-center transition-colors ${
            activeTab === "dags"
              ? "border-emerald-600 text-emerald-600 dark:text-emerald-400 bg-white dark:bg-slate-900"
              : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
          }`}
        >
          দাগসমূহ ({data.dagEntries.length})
        </button>
        <button
          onClick={() => setActiveTab("signatories")}
          className={`py-2.5 px-1 border-b-2 text-center transition-colors ${
            activeTab === "signatories"
              ? "border-emerald-600 text-emerald-600 dark:text-emerald-400 bg-white dark:bg-slate-900"
              : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
          }`}
        >
          স্বাক্ষর
        </button>
      </div>

      {/* Form Content Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">

        {/* TAB 1: General Info */}
        {activeTab === "general" && (
          <div className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                খতিয়ান নং
              </label>
              <input
                type="text"
                value={data.khatianNo}
                onChange={(e) => handleInputChange("khatianNo", e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  আবেদন নম্বর
                </label>
                <input
                  type="text"
                  value={data.applicationNo}
                  onChange={(e) => handleInputChange("applicationNo", e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  আবেদনের তারিখ
                </label>
                <input
                  type="text"
                  value={data.applicationDate}
                  onChange={(e) => handleInputChange("applicationDate", e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                মিউটেশন মামলা নং
              </label>
              <input
                type="text"
                value={data.mutationCaseNo}
                onChange={(e) => handleInputChange("mutationCaseNo", e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  অনলাইন ডিসিআর নং
                </label>
                <input
                  type="text"
                  value={data.onlineDcrNo}
                  onChange={(e) => handleInputChange("onlineDcrNo", e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  খতিয়ান পরিচিতি নং
                </label>
                <input
                  type="text"
                  value={data.khatianIdNo}
                  onChange={(e) => handleInputChange("khatianIdNo", e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <hr className="border-slate-200 dark:border-slate-800 my-2" />

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  জেলা
                </label>
                <input
                  type="text"
                  value={data.district}
                  onChange={(e) => handleInputChange("district", e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  উপজেলা / সার্কেল
                </label>
                <input
                  type="text"
                  value={data.upazilaCircle}
                  onChange={(e) => handleInputChange("upazilaCircle", e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  মৌজা
                </label>
                <input
                  type="text"
                  value={data.mouza}
                  onChange={(e) => handleInputChange("mouza", e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  জে.এল নং
                </label>
                <input
                  type="text"
                  value={data.jlNo}
                  onChange={(e) => handleInputChange("jlNo", e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Owner Info */}
        {activeTab === "owner" && (
          <div className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                মালিকের নাম
              </label>
              <input
                type="text"
                value={data.ownerName}
                onChange={(e) => handleInputChange("ownerName", e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                পিতা/স্বামীর নাম
              </label>
              <input
                type="text"
                value={data.fatherHusbandName}
                onChange={(e) => handleInputChange("fatherHusbandName", e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                মাতার নাম
              </label>
              <input
                type="text"
                value={data.motherName}
                onChange={(e) => handleInputChange("motherName", e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                জাতীয় পরিচয়পত্র (NID)
              </label>
              <input
                type="text"
                value={data.nidNo}
                onChange={(e) => handleInputChange("nidNo", e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                ঠিকানা
              </label>
              <textarea
                rows={2}
                value={data.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  মালিকের অংশ
                </label>
                <input
                  type="text"
                  value={data.ownerShare}
                  onChange={(e) => handleInputChange("ownerShare", e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  মোট ভূমি উন্নয়ন কর
                </label>
                <input
                  type="text"
                  value={data.totalLandTax}
                  onChange={(e) => handleInputChange("totalLandTax", e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Dag Entries Manager */}
        {activeTab === "dags" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                মোট দাগ সংখ্যা: {data.dagEntries.length} টি
              </span>
              <button
                onClick={handleAddDag}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>নতুন দাগ যোগ করুন</span>
              </button>
            </div>

            <div className="space-y-3">
              {data.dagEntries.map((dag, idx) => (
                <div
                  key={dag.id}
                  className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2 relative group"
                >
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-1.5">
                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                      দাগ নং #{idx + 1}: {dag.dagNo || "—"}
                    </span>
                    <button
                      onClick={() => handleRemoveDag(idx)}
                      className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-md transition-colors"
                      title="দাগটি মুছে ফেলুন"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400">
                        দাগ/প্লট নং
                      </label>
                      <input
                        type="text"
                        value={dag.dagNo}
                        onChange={(e) => handleDagChange(idx, "dagNo", e.target.value)}
                        className="w-full px-2 py-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded text-xs text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400">
                        শ্রেণী (কৃষি)
                      </label>
                      <input
                        type="text"
                        value={dag.landClassKrishi}
                        onChange={(e) => handleDagChange(idx, "landClassKrishi", e.target.value)}
                        className="w-full px-2 py-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded text-xs text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400">
                        দাগের মোট শতাংশ
                      </label>
                      <input
                        type="text"
                        value={dag.dagTotalSatangsha}
                        onChange={(e) => handleDagChange(idx, "dagTotalSatangsha", e.target.value)}
                        className="w-full px-2 py-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded text-xs text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400">
                        খতিয়ানের অংশ
                      </label>
                      <input
                        type="text"
                        value={dag.khatianShareInDag}
                        onChange={(e) => handleDagChange(idx, "khatianShareInDag", e.target.value)}
                        className="w-full px-2 py-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded text-xs text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400">
                        অংশ অনুযায়ী একর
                      </label>
                      <input
                        type="text"
                        value={dag.shareLandAcre}
                        onChange={(e) => handleDagChange(idx, "shareLandAcre", e.target.value)}
                        className="w-full px-2 py-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded text-xs text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400">
                        অংশ অনুযায়ী শতাংশ
                      </label>
                      <input
                        type="text"
                        value={dag.shareLandSatangsha}
                        onChange={(e) => handleDagChange(idx, "shareLandSatangsha", e.target.value)}
                        className="w-full px-2 py-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded text-xs text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400">
                      দখল/স্বত্ব/দলিল বিষয়ক মন্তব্য
                    </label>
                    <textarea
                      rows={2}
                      value={dag.remarks}
                      onChange={(e) => handleDagChange(idx, "remarks", e.target.value)}
                      className="w-full px-2 py-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded text-xs text-slate-900 dark:text-white resize-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: Signatories & Totals */}
        {activeTab === "signatories" && (
          <div className="space-y-4">
            <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
              <h3 className="text-xs font-bold text-emerald-700 dark:text-emerald-400 border-b border-slate-200 dark:border-slate-800 pb-1">
                মোট জমি ও হোল্ডিং সারসংক্ষেপ
              </h3>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  ধারামতে নোট / পরিবর্তন
                </label>
                <textarea
                  rows={2}
                  value={data.noteChangeSection}
                  onChange={(e) => handleInputChange("noteChangeSection", e.target.value)}
                  className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    হোল্ডিং নং
                  </label>
                  <input
                    type="text"
                    value={data.holdingNo}
                    onChange={(e) => handleInputChange("holdingNo", e.target.value)}
                    className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    মোট জমির অংশ
                  </label>
                  <input
                    type="text"
                    value={data.totalLandShareText}
                    onChange={(e) => handleInputChange("totalLandShareText", e.target.value)}
                    className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  মোট জমি (কথায়)
                </label>
                <input
                  type="text"
                  value={data.totalLandSummary}
                  onChange={(e) => handleInputChange("totalLandSummary", e.target.value)}
                  className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-bold text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* Prepared By (প্রস্তাবিত খতিয়ান) */}
            <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-1">
                প্রস্তাবিত খতিয়ান (বাম পাশের কর্মকর্তা)
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-0.5">তারিখ</label>
                  <input
                    type="text"
                    value={data.preparedDate}
                    onChange={(e) => handleInputChange("preparedDate", e.target.value)}
                    className="w-full px-2 py-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded text-xs text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-0.5">কর্মকর্তার নাম</label>
                  <input
                    type="text"
                    value={data.preparedOfficerName}
                    onChange={(e) => handleInputChange("preparedOfficerName", e.target.value)}
                    className="w-full px-2 py-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-0.5">পদবী</label>
                  <input
                    type="text"
                    value={data.preparedOfficerDesignation}
                    onChange={(e) => handleInputChange("preparedOfficerDesignation", e.target.value)}
                    className="w-full px-2 py-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded text-xs text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-0.5">অফিসের নাম</label>
                  <input
                    type="text"
                    value={data.preparedOffice}
                    onChange={(e) => handleInputChange("preparedOffice", e.target.value)}
                    className="w-full px-2 py-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Approved By (অনুমোদিত খতিয়ান) */}
            <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-1">
                অনুমোদিত খতিয়ান (ডান পাশের কর্মকর্তা)
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-0.5">তারিখ</label>
                  <input
                    type="text"
                    value={data.approvedDate}
                    onChange={(e) => handleInputChange("approvedDate", e.target.value)}
                    className="w-full px-2 py-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded text-xs text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-0.5">কর্মকর্তার নাম</label>
                  <input
                    type="text"
                    value={data.approvedOfficerName}
                    onChange={(e) => handleInputChange("approvedOfficerName", e.target.value)}
                    className="w-full px-2 py-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-0.5">পদবী</label>
                  <input
                    type="text"
                    value={data.approvedOfficerDesignation}
                    onChange={(e) => handleInputChange("approvedOfficerDesignation", e.target.value)}
                    className="w-full px-2 py-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded text-xs text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-0.5">অফিসের নাম</label>
                  <input
                    type="text"
                    value={data.approvedOffice}
                    onChange={(e) => handleInputChange("approvedOffice", e.target.value)}
                    className="w-full px-2 py-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                গোল সীলের নাম
              </label>
              <input
                type="text"
                value={data.officeSealText}
                onChange={(e) => handleInputChange("officeSealText", e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white"
              />
            </div>
          </div>
        )}

      </div>
    </aside>
  );
}

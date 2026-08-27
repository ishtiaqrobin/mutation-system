"use client";

import React from "react";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { KhatianData } from "@/types/khatian";

interface KhatianSheetProps {
  data: KhatianData;
}

export function KhatianSheet({ data }: KhatianSheetProps) {
  // We divide the dagEntries into pages (approx 24 rows per page)
  const ROWS_PER_PAGE = 24;
  const totalPages = Math.ceil(data.dagEntries.length / ROWS_PER_PAGE) || 1;

  const getPageRows = (pageIndex: number) => {
    const start = pageIndex * ROWS_PER_PAGE;
    return data.dagEntries.slice(start, start + ROWS_PER_PAGE);
  };

  const verificationUrl = `https://mutation.land.gov.bd/qr-vk/${data.applicationNo || "14ae016f5"}`;

  return (
    <div className="certificate-viewport w-full flex flex-col items-center gap-8 print:gap-0 print:m-0 print:p-0">
      {Array.from({ length: totalPages }).map((_, pageIdx) => {
        const pageRows = getPageRows(pageIdx);
        const isFirstPage = pageIdx === 0;
        const isLastPage = pageIdx === totalPages - 1;
        const pageNumberStr = `${pageIdx + 1}/${totalPages}`;

        return (
          <div
            key={pageIdx}
            className="khatian-sheet khatian-sheet-landscape relative bg-white text-black font-solaiman shadow-2xl print:shadow-none transition-all overflow-hidden"
            style={{
              width: "297mm",
              minHeight: "210mm",
              padding: "10mm 12mm",
              boxSizing: "border-box",
            }}
          >
            {/* Background Watermark Seal */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.12] z-0">
              <div className="relative w-[480px] h-[480px]">
                <Image
                  src="/assets/watermark/watermark.webp"
                  alt="Watermark Seal"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Foreground Sheet Content */}
            <div className="relative z-10 flex flex-col justify-between h-full min-h-[190mm]">
              
              {/* HEADER SECTION */}
              <div>
                <div className="flex items-start justify-between mb-1">
                  {/* Top Left */}
                  <div className="text-[12px] font-normal pt-2">
                    {data.formNo}
                  </div>

                  {/* Top Center Title */}
                  <div className="text-center pt-1">
                    <h1 className="text-2xl font-black tracking-wide text-black font-solaiman">
                      খতিয়ান নং {data.khatianNo}
                    </h1>
                  </div>

                  {/* Top Right Header Box (QR & Reg details) */}
                  <div className="flex items-start gap-2.5 text-[11px] leading-tight">
                    <div className="p-1 border border-black/80 rounded bg-white">
                      <QRCodeSVG value={verificationUrl} size={64} level="M" />
                    </div>
                    <div className="space-y-0.5 font-normal">
                      <div>আবেদন নম্বর : <span className="font-semibold">{data.applicationNo}</span></div>
                      <div>আবেদনের তারিখ : <span>{data.applicationDate}</span></div>
                      <div>মিউটেশনের মামলা নং: <span>{data.mutationCaseNo}</span></div>
                      <div>অনলাইন ডিসিআর নং: <span className="font-mono text-[10px]">{data.onlineDcrNo}</span></div>
                      <div>খতিয়ান পরিচিতি নম্বর: <span>{data.khatianIdNo}</span></div>
                    </div>
                  </div>
                </div>

                {/* Regional Subheader Row */}
                <div className="flex items-center justify-between text-[13px] font-medium my-1 px-1">
                  <div>জেলা : <span className="font-bold">{data.district}</span></div>
                  <div>উপজেলা /সার্কেল : <span className="font-bold">{data.upazilaCircle}</span></div>
                  <div>মৌজা : <span className="font-bold">{data.mouza}</span></div>
                  <div>জে.এল নং : <span className="font-bold">{data.jlNo}</span></div>
                </div>

                {/* MAIN TABLE */}
                <table className="w-full border-collapse border border-black text-[12px] leading-snug">
                  <thead>
                    {/* Header Row 1 */}
                    <tr className="bg-slate-50/50 text-center font-medium">
                      <th className="border border-black p-1.5 w-[22%] align-middle">
                        মালিক, অকৃষি প্রজা বা<br />ইজারাদারের নাম ও ঠিকানা
                      </th>
                      <th className="border border-black p-1 w-[3%] align-middle">
                        অংশ
                      </th>
                      <th className="border border-black p-1 w-[14%] align-middle">
                        মোট ভূমি উন্নয়ন কর
                      </th>
                      <th className="border border-black p-1 w-[8%] align-middle">
                        দাগ/প্লট নং
                      </th>
                      <th colSpan={2} className="border border-black w-[20%] p-1 align-middle">
                        জমির রেকর্ডীয় শ্রেণী
                      </th>
                      <th colSpan={2} className="border border-black w-[20%] p-1 align-middle">
                        দাগের মোট জমির পরিমাণ
                      </th>
                      <th className="border border-black p-1 w-[7%] align-middle">
                        দাগের মধ্যে অত্র<br />খতিয়ানের অংশ
                      </th>
                      <th colSpan={2} className="border border-black p-1 w-[11.5%] align-middle">
                        অংশানুযায়ী জমির<br />পরিমাণ
                      </th>
                      <th className="border border-black p-1 w-[24%] align-middle">
                        দখল/স্বত্ব বিষয়ক বা অন্যান্য<br />বিষয়ে মন্তব্য
                      </th>
                    </tr>

                    {/* Header Row 2 (Column Numbers & Sub-headers) */}
                    <tr className="bg-slate-50/50 text-center font-medium text-[11px]">
                      <th className="border border-black py-0.5">১</th>
                      <th className="border border-black py-0.5">২</th>
                      <th className="border border-black py-0.5">৩</th>
                      <th className="border border-black py-0.5">৪</th>
                      <th className="border border-black py-0.5 w-[5%]">কৃষি<br />৫ (ক)</th>
                      <th className="border border-black py-0.5 w-[5%]">অকৃষি<br />৫ (খ)</th>
                      <th className="border border-black py-0.5 w-[5%]">একর<br />৬ (ক)</th>
                      <th className="border border-black py-0.5 w-[7%]">শতাংশ<br />৬ (খ)</th>
                      <th className="border border-black py-0.5">৭</th>
                      <th className="border border-black py-0.5 w-[4%]">একর<br />৮ (ক)</th>
                      <th className="border border-black py-0.5 w-[7%]">শতাংশ<br />৮ (খ)</th>
                      <th className="border border-black py-0.5">৯</th>
                    </tr>
                  </thead>

                  <tbody>
                    {pageRows.map((row, rowIdx) => {
                      return (
                        <tr key={row.id || rowIdx} className="text-center align-top">
                          {/* Column 1, 2, 3: Only rendered once with rowSpan on Page 1 */}
                          {rowIdx === 0 && (
                            <>
                              <td
                                rowSpan={pageRows.length}
                                className="border-r border-black p-1.5 text-left align-top leading-tight"
                              >
                                {isFirstPage ? (
                                  <div className="space-y-0.5">
                                    <div className="font-bold text-[13px]">{data.ownerName}</div>
                                    <div>পিতা/স্বামী: {data.fatherHusbandName}</div>
                                    <div>মাতা: {data.motherName}</div>
                                    <div>জাতীয় পরিচয়পত্র: {data.nidNo}</div>
                                    <div className="mt-1 leading-snug">
                                      {data.address}
                                    </div>
                                  </div>
                                ) : (
                                  <div></div>
                                )}
                              </td>
                              <td
                                rowSpan={pageRows.length}
                                className="border-r border-black p-1 align-top"
                              >
                                {isFirstPage ? data.ownerShare : ""}
                              </td>
                              <td
                                rowSpan={pageRows.length}
                                className="border-r border-black p-1 align-top"
                              >
                                {isFirstPage ? data.totalLandTax : ""}
                              </td>
                            </>
                          )}

                          {/* Column 4: Dag No */}
                          <td className="border-r border-black p-0.5 font-medium">{row.dagNo}</td>

                          {/* Column 5: Land Class */}
                          <td className="border-r border-black p-0.5">{row.landClassKrishi}</td>
                          <td className="border-r border-black p-0.5">{row.landClassAkrishi}</td>

                          {/* Column 6: Dag Total Area */}
                          <td className="border-r border-black p-0.5">{row.dagTotalAcre}</td>
                          <td className="border-r border-black p-0.5">{row.dagTotalSatangsha}</td>

                          {/* Column 7: Share in Dag */}
                          <td className="border-r border-black p-0.5">{row.khatianShareInDag}</td>

                          {/* Column 8: Share Land Area */}
                          <td className="border-r border-black p-0.5">{row.shareLandAcre}</td>
                          <td className="border-r border-black p-0.5">{row.shareLandSatangsha}</td>

                          {/* Column 9: Remarks */}
                          <td className="p-0.5 text-left text-[11px] leading-tight px-1.5">
                            {row.remarks}
                          </td>
                        </tr>
                      );
                    })}

                    {/* LAST PAGE SUMMARY ROWS */}
                    {isLastPage && (
                      <tr className="text-center font-medium bg-slate-50/30 border-t border-black">
                        <td className="border-r border-black p-1 text-left text-[11px]" colSpan={1}>
                          {data.noteChangeSection}
                        </td>
                        <td className="border-r border-black p-1">{data.totalLandShareText}</td>
                        <td className="border-r border-black p-1 text-left text-[11px]" colSpan={4}>
                          হোন্ডিং নং : {data.holdingNo}
                        </td>
                        <td className="border-r border-black p-1 font-bold text-right pr-2" colSpan={2}>
                          মোট জমি
                        </td>
                        <td className="border-r border-black p-1 font-bold">১</td>
                        <td className="border-r border-black p-1 font-bold" colSpan={2}>
                          ৩৬২৩০০
                        </td>
                        <td className="p-1 text-left text-[11px] font-bold">
                          কথায়: {data.totalLandSummary}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* FOOTER & SIGNATURE SECTION (Rendered on Last Page) */}
              {isLastPage ? (
                <div className="mt-4 pt-2">
                  {/* Signature Blocks Row */}
                  <div className="grid grid-cols-3 items-end text-center text-[12px] mb-4">
                    {/* Left Signatory */}
                    <div className="flex flex-col items-center">
                      <div className="font-bold text-[13px] mb-1">প্রস্তাবিত খতিয়ান</div>
                      {/* Signature graphic SVG placeholder */}
                      <div className="h-7 flex items-center justify-center">
                        <span className="font-serif italic text-emerald-800 text-sm font-semibold opacity-90">
                          {data.preparedOfficerName}
                        </span>
                      </div>
                      <div className="font-bold text-emerald-900 border-t border-black/40 pt-0.5 px-4 inline-block">
                        {data.preparedDate}
                      </div>
                      <div className="font-bold">({data.preparedOfficerName})</div>
                      <div>{data.preparedOfficerDesignation}</div>
                      <div>{data.preparedOffice}</div>
                    </div>

                    {/* Center Circular Official Seal */}
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-28 h-28 rounded-full border-2 border-emerald-800/80 flex flex-col items-center justify-center text-[10px] text-emerald-900 font-bold p-1 text-center bg-emerald-50/20 relative shadow-xs">
                        <div className="w-8 h-8 relative mb-0.5">
                          <Image
                            src="/assets/logo/logo.webp"
                            alt="Gov Seal"
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div className="leading-tight">
                          {data.officeSealText || "উপজেলা ভূমি অফিস, হরিপুর, ঠাকুরগাঁও"}
                        </div>
                      </div>
                    </div>

                    {/* Right Signatory */}
                    <div className="flex flex-col items-center">
                      <div className="font-bold text-[13px] mb-1">অনুমোদিত খতিয়ান</div>
                      <div className="h-7 flex items-center justify-center">
                        <span className="font-serif italic text-emerald-800 text-sm font-semibold opacity-90">
                          {data.approvedOfficerName}
                        </span>
                      </div>
                      <div className="font-bold text-emerald-900 border-t border-black/40 pt-0.5 px-4 inline-block">
                        {data.approvedDate}
                      </div>
                      <div className="font-bold">({data.approvedOfficerName})</div>
                      <div>{data.approvedOfficerDesignation}</div>
                      <div>{data.approvedOffice}</div>
                    </div>
                  </div>

                  {/* Special Notes (বিশেষ দ্রষ্টব্য) */}
                  <div className="text-[11px] leading-tight space-y-0.5 border-t border-black/30 pt-1.5 font-normal text-slate-800">
                    <div className="font-bold mb-0.5">বিশেষ দ্রষ্টব্য:</div>
                    {data.specialNotes.map((note, idx) => (
                      <div key={idx}>{note}</div>
                    ))}
                  </div>
                </div>
              ) : (
                /* Next Page Footer Notice on Non-Final Pages */
                <div className="flex items-center justify-between text-[12px] font-bold border-t border-black/30 pt-1 mt-2">
                  <div>পরবর্তী পৃষ্ঠায় দ্রষ্টব্য</div>
                </div>
              )}

              {/* Bottom Page Counter */}
              <div className="text-right text-[12px] font-bold text-black pt-1">
                {pageNumberStr}
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
}

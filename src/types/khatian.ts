export interface DagEntry {
  id: string;
  dagNo: string;
  landClassKrishi: string;
  landClassAkrishi: string;
  dagTotalAcre: string;
  dagTotalSatangsha: string;
  khatianShareInDag: string;
  shareLandAcre: string;
  shareLandSatangsha: string;
  remarks: string;
}

export interface KhatianData {
  formNo: string;
  khatianNo: string;
  applicationNo: string;
  applicationDate: string;
  mutationCaseNo: string;
  onlineDcrNo: string;
  khatianIdNo: string;
  district: string;
  upazilaCircle: string;
  mouza: string;
  jlNo: string;

  // Owner details
  ownerName: string;
  fatherHusbandName: string;
  motherName: string;
  nidNo: string;
  address: string;
  ownerShare: string;
  totalLandTax: string;

  // Dag entries
  dagEntries: DagEntry[];

  // Bottom totals & notes
  noteChangeSection: string;
  holdingNo: string;
  totalLandShareText: string;
  totalLandSummary: string;
  totalLandNumeric: string;

  // Signatories
  preparedDate: string;
  preparedOfficerName: string;
  preparedOfficerDesignation: string;
  preparedOffice: string;

  approvedDate: string;
  approvedOfficerName: string;
  approvedOfficerDesignation: string;
  approvedOffice: string;

  officeSealText: string;
  specialNotes: string[];
}

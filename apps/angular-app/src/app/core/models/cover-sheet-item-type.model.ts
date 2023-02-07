export enum CoverSheetItemType {
  court = 'court',
  claimNumber = 'claimNumber',
  caseParties = 'caseParties',
  narrative = 'narrative',
  ratesApplied = 'ratesApplied',
  solicitorDetails = 'solicitorDetails',
  spacer = 'spacer',
  text = 'text',
  vatDetails = 'vatDetails',
}

export const COVER_SHEET_ITEM_TYPE_NAMES_MAP: {
  [key in CoverSheetItemType]: string;
} = {
  [CoverSheetItemType.court]: 'Court',
  [CoverSheetItemType.claimNumber]: 'Claim number',
  [CoverSheetItemType.caseParties]: 'Case parties',
  [CoverSheetItemType.narrative]: 'Narrative',
  [CoverSheetItemType.ratesApplied]: 'Rates applied',
  [CoverSheetItemType.solicitorDetails]: 'Solicitor details',
  [CoverSheetItemType.spacer]: 'Spacer',
  [CoverSheetItemType.text]: 'Text',
  [CoverSheetItemType.vatDetails]: 'VAT details',
};

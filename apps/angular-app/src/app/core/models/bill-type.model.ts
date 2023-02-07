export enum BillType {
  threeColumn = 'threeColumn',
  sixColumn = 'sixColumn',
}

export const BILL_TYPE_NAMES_MAP: { [key in BillType]: string } = {
  [BillType.threeColumn]: 'Three column',
  [BillType.sixColumn]: 'Six column',
};

export const BILL_TYPE_WORD_DOCUMENT_MAP: { [key in BillType]: string } = {
  [BillType.threeColumn]: 'bill-3-column-lined',
  [BillType.sixColumn]: 'bill-6-column-lined',
};

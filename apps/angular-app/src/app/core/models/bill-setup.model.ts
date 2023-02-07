import { BillType } from './bill-type.model';

export interface BillSetup {
  title: string;
  billType: BillType;
  autoNumberParts: boolean;
  includeNotesInBill: boolean;
  includePartSummaries: boolean;
}

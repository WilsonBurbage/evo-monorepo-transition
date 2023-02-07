import { TextReplacement } from '../models/text-replacement.model';
import { DefaultsService } from '../services/defaults.service';

export const DEFAULT_TEXT_REPLACEMENTS = (): TextReplacement[] => [
  DefaultsService.createDefaultTextReplacement({
    input: 'taw',
    output: `travel and waiting`,
  }),
  DefaultsService.createDefaultTextReplacement({
    input: 'fntad',
    output: `Drafting file note following telephone attendance with Defendant`,
  }),
  DefaultsService.createDefaultTextReplacement({
    input: 'fntac',
    output: `Drafting file note following telephone attendance with Claimant`,
  }),
  DefaultsService.createDefaultTextReplacement({
    input: 'fnta',
    output: `Drafting file note following telephone attendance`,
  }),
  DefaultsService.createDefaultTextReplacement({
    input: 'crucert',
    output: `Considering CRU certificate`,
  }),
  DefaultsService.createDefaultTextReplacement({
    input: 'tii',
    output: `Taking initial instructions`,
  }),
  DefaultsService.createDefaultTextReplacement({
    input: 'boc',
    output: `Considering and perusing bill of costs and dealing with legal formalities - Engaged`,
  }),
  DefaultsService.createDefaultTextReplacement({
    input: 'ipcls',
    output: `CLAIMANT'S BILL OF COSTS FOR DETAILED ASSESSMENT ON THE STANDARD BASIS AND PAYABLE BY THE DEFENDANT AND AGAINST THE COMMUNITY LEGAL SERVICE FUND IN ACCORDANCE WITH REGULATION 107(A) OF THE CIVIL LEGAL AID (GENERAL) REGULATIONS 1989 (AS AMENDED) PURSUANT TO THE ORDER OF   DATED `,
  }),
  DefaultsService.createDefaultTextReplacement({
    input: 'ipdesc',
    output: `CLAIMANT'S BILL OF COSTS FOR DETAILED ASSESSMENT ON THE STANDARD BASIS AND PAYABLE BY THE DEFENDANT PURSUANT TO THE ORDER OF   DATED`,
  }),
  DefaultsService.createDefaultTextReplacement({
    input: 'ipalt',
    output: `CLAIMANT'S BILL OF COSTS TO BE ASSESSED PURSUANT TO THE ORDER DATED`,
  }),
  DefaultsService.createDefaultTextReplacement({
    input: 'clsdesc',
    output: `THE CLAIMANT'S BILL OF COSTS FOR DETAILED ASSESSMENT ON THE STANDARD BASIS AGAINST THE COMMUNITY LEGAL SERVICE FUND IN ACCORDANCE WITH REGULATION 107(A) OF THE CIVIL LEGAL AID (GENERAL) REGULATIONS 1989 (AS AMENDED) PURSUANT TO THE ORDER DATED`,
  }),
  DefaultsService.createDefaultTextReplacement({
    input: 'clsalt',
    output: `CLAIMANT'S BILL OF COSTS TO BE ASSESSED PURSUANT TO THE ORDER DATED AND IN ACCORDANCE WITH REGULATION 107A OF THE CIVIL LEGAL AID (GENERAL) REGULATIONS 1989`,
  }),
];

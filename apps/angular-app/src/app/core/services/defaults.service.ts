import { GuidService } from '@evo-monorepo/shared';
import {
  DEFAULT_BASE_DATE,
  DEFAULT_BASE_TIME,
} from '../constants/defaults.constants';
import { DEFAULT_TEXT_REPLACEMENTS } from '../constants/evo-settings.constants';
import { Alignment } from '../models/alignment.model';
import { Attendance } from '../models/attendance.model';
import { Attitude } from '../models/attitude.model';
import { BillSetup } from '../models/bill-setup.model';
import { BillType } from '../models/bill-type.model';
import { CaseParty } from '../models/case-party.model';
import { ChronologyStep } from '../models/chronology-step.model';
import { CorrespondenceCounter } from '../models/correspondence-counter.model';
import { Counsel } from '../models/counsel.model';
import { CoverSheetDetails } from '../models/cover-sheet-details.model';
import { CoverSheetItemType } from '../models/cover-sheet-item-type.model';
import { CoverSheetItem } from '../models/cover-sheet-item.model';
import { CoverSheetType } from '../models/cover-sheet-type.model';
import { Disbursement } from '../models/disbursement.model';
import { DocumentsItem } from '../models/documents-item.model';
import { Enhancement } from '../models/enhancement.model';
import { EvoFile } from '../models/evo-file.model';
import { EvoSettings } from '../models/evo-settings.model';
import { FeeEarner } from '../models/fee-earner.model';
import { JumpToLink } from '../models/jump-to-link.model';
import { Narrative } from '../models/narrative.model';
import { Part } from '../models/part.model';
import { Party } from '../models/party.model';
import { RateGroup } from '../models/rate-group.model';
import { Rate } from '../models/rate.model';
import { Solicitor } from '../models/solicitor.model';
import { SuccessFee } from '../models/success-fee.model';
import { TextReplacement } from '../models/text-replacement.model';
import { ToastMessage } from '../models/toast-message.model';

export class DefaultsService {
  static createDefaultAttendance(
    predefinitions: Partial<Attendance> = {}
  ): Attendance {
    return {
      id: GuidService.getGuid('attendance'),

      feeEarnerId: '',
      date: DEFAULT_BASE_DATE,
      description: '',
      time: DEFAULT_BASE_TIME,
      advocacy: false,
      counsel: false,
      estimated: false,
      other: false,
      partClaimed: false,
      timedLetterOut: false,
      timedTelephoneAttendance: false,
      travelAndWaiting: false,
      billFee: false,
      enhancementId: '',
      notes: '',

      ...predefinitions,
    };
  }

  static createDefaultBillSetup(
    predefinitions: Partial<BillSetup> = {}
  ): BillSetup {
    return {
      title: '',
      billType: BillType.threeColumn,
      autoNumberParts: false,
      includeNotesInBill: false,
      includePartSummaries: false,

      ...predefinitions,
    };
  }

  static createDefaultCaseParty(
    predefinitions: Partial<CaseParty> = {}
  ): CaseParty {
    return {
      id: GuidService.getGuid('case-party'),

      name: '',
      category: '',

      ...predefinitions,
    };
  }

  static createDefaultChronologyStep(
    predefinitions: Partial<ChronologyStep> = {}
  ): ChronologyStep {
    return {
      id: GuidService.getGuid('chronology-step'),

      partId: '',
      date: DEFAULT_BASE_DATE,
      description: '',

      ...predefinitions,
    };
  }

  static createDefaultCorrespondenceCounter(
    predefinitions: Partial<CorrespondenceCounter> = {}
  ): CorrespondenceCounter {
    return {
      id: GuidService.getGuid('correspondence-counter'),

      feeEarnerId: '',
      partyId: '',
      calls: 0,
      lettersIn: 0,
      lettersOut: 0,

      ...predefinitions,
    };
  }

  static createDefaultCounsel(predefinitions: Partial<Counsel> = {}): Counsel {
    return {
      id: GuidService.getGuid('counsel'),

      name: '',
      hasSuccessFee: false,
      successFeePercentage: 0,
      attractsVat: false,

      ...predefinitions,
    };
  }

  static createDefaultCoverSheetDetails(
    predefinitions: Partial<CoverSheetDetails> = {}
  ): CoverSheetDetails {
    return {
      court: '',
      claimNumber: '',

      ...predefinitions,
    };
  }

  static createDefaultCoverSheetItem(
    predefinitions: Partial<CoverSheetItem> = {}
  ): CoverSheetItem {
    return {
      id: GuidService.getGuid('cover-sheet-item'),

      coverSheetType: CoverSheetType.frontSheet,
      coverSheetItemType: CoverSheetItemType.text,
      text: '',
      alignment: Alignment.left,
      bold: false,
      underline: false,
      italic: false,

      ...predefinitions,
    };
  }

  static createDefaultDisbursement(
    predefinitions: Partial<Disbursement> = {}
  ): Disbursement {
    return {
      id: GuidService.getGuid('disbursement'),

      description: '',
      amount: 0,
      vat: 0,
      counselId: '',
      hasCounselSuccessFee: false,
      overrideCounselSuccessFeeVatPercentage: false,
      counselSuccessFeeVatPercentageOverride: 0,
      travelAndWaiting: false,
      additionalLiability: false,
      cls: false,
      notes: '',

      ...predefinitions,
    };
  }

  static createDefaultDocumentsItem(
    predefinitions: Partial<DocumentsItem> = {}
  ): DocumentsItem {
    return {
      id: GuidService.getGuid('disbursement'),

      partId: '',
      feeEarnerId: '',
      date: DEFAULT_BASE_DATE,
      description: '',
      time: DEFAULT_BASE_TIME,
      estimated: false,
      partClaimed: false,
      notOtherwiseClaimed: false,
      enhancementId: '',
      notes: '',

      ...predefinitions,
    };
  }

  static createDefaultEnhancement(
    predefinitions: Partial<Enhancement> = {}
  ): Enhancement {
    return {
      id: GuidService.getGuid('enhancement'),

      partId: '',
      name: '',
      percentage: 0,

      ...predefinitions,
    };
  }

  static createDefaultEvoFile(predefinitions: Partial<EvoFile> = {}): EvoFile {
    const billSetup = this.createDefaultBillSetup({
      title: 'New bill',
    });

    const coverSheetDetails = this.createDefaultCoverSheetDetails();

    const narrative = this.createDefaultNarrative();

    const part = this.createDefaultPart({
      description: 'Part 1',
      hasVat: true,
      vatPercentage: 20,
    });

    const rateGroup = this.createDefaultRateGroup({
      reference: 'FE1',
      name: 'Fee earner 1',
    });

    const feeEarner = this.createDefaultFeeEarner({
      reference: 'FE1',
      rateGroupId: rateGroup.id,
    });

    const rate = this.createDefaultRate({
      rateGroupId: rateGroup.id,
      partId: part.id,
    });

    const solicitor = this.createDefaultSolicitor({
      partId: part.id,
    });

    return {
      attendances: [],
      billSetup,
      caseParties: [],
      chronologySteps: [],
      correspondenceCounters: [],
      counsels: [],
      coverSheetDetails,
      coverSheetItems: [],
      disbursements: [],
      documentsItems: [],
      enhancements: [],
      feeEarners: [feeEarner],
      narrative,
      parties: [],
      parts: [part],
      rateGroups: [rateGroup],
      rates: [rate],
      solicitors: [solicitor],
      successFees: [],
      version: window.bridge.constants.frameworkDetails.evo.version,

      ...predefinitions,
    };
  }

  static createDefaultEvoSettings(
    predefinitions: Partial<EvoSettings> = {}
  ): EvoSettings {
    return {
      textReplacements: DEFAULT_TEXT_REPLACEMENTS(),
      version: window.bridge.constants.frameworkDetails.evo.version,

      ...predefinitions,
    };
  }

  static createDefaultFeeEarner(
    predefinitions: Partial<FeeEarner> = {}
  ): FeeEarner {
    return {
      id: GuidService.getGuid('fee-earner'),

      reference: '',
      rateGroupId: '',

      ...predefinitions,
    };
  }

  static createDefaultJumpToLink(
    predefinitions: Partial<JumpToLink> = {}
  ): JumpToLink {
    return {
      id: GuidService.getGuid('jump-to-link'),

      title: '',
      level: 0,

      ...predefinitions,
    };
  }

  static createDefaultNarrative(
    predefinitions: Partial<Narrative> = {}
  ): Narrative {
    return {
      narrative: '',

      ...predefinitions,
    };
  }

  static createDefaultParty(predefinitions: Partial<Party> = {}): Party {
    return {
      id: GuidService.getGuid('party'),

      partId: '',
      name: '',

      ...predefinitions,
    };
  }

  static createDefaultPart(predefinitions: Partial<Part> = {}): Part {
    return {
      id: GuidService.getGuid('part'),

      description: '',
      hasVat: false,
      vatPercentage: 0,
      hasSuccessFee: false,
      successFeePercentage: 0,
      hasCareAndConduct: false,
      careAndConductPercentage: 0,
      applyCareAndConductToTravelAndWaiting: false,
      solicitorReference: '',

      ...predefinitions,
    };
  }

  static createDefaultRateGroup(
    predefinitions: Partial<RateGroup> = {}
  ): RateGroup {
    return {
      id: GuidService.getGuid('rate-group'),

      reference: '',
      name: '',
      cls: false,

      ...predefinitions,
    };
  }

  static createDefaultRate(predefinitions: Partial<Rate> = {}): Rate {
    return {
      id: GuidService.getGuid('rate'),

      rateGroupId: '',
      partId: '',
      hourly: 0,
      calls: 0,
      lettersIn: 0,
      lettersOut: 0,
      advocacy: 0,
      counsel: 0,
      travelAndWaiting: 0,

      ...predefinitions,
    };
  }

  static createDefaultSolicitor(
    predefinitions: Partial<Solicitor> = {}
  ): Solicitor {
    return {
      id: GuidService.getGuid('solicitor'),

      partId: '',
      name: '',
      address1: '',
      address2: '',
      town: '',
      county: '',
      postCode: '',
      telephone: '',
      fax: '',
      dx: '',
      vatNumber: '',

      ...predefinitions,
    };
  }

  static createDefaultSuccessFee(
    predefinitions: Partial<SuccessFee> = {}
  ): SuccessFee {
    return {
      id: GuidService.getGuid('success-fee'),

      chronologyStepId: '',
      description: '',
      baseCosts: 0,

      ...predefinitions,
    };
  }

  static createDefaultTextReplacement(
    predefinitions: Partial<TextReplacement> = {}
  ): TextReplacement {
    return {
      id: GuidService.getGuid('text-replacement'),

      input: '',
      output: '',

      ...predefinitions,
    };
  }

  static createDefaultToastMessage(
    predefinitions: Partial<ToastMessage> = {}
  ): ToastMessage {
    return {
      id: GuidService.getGuid('toast-message'),

      text: '',
      attitude: Attitude.none,

      ...predefinitions,
    };
  }
}

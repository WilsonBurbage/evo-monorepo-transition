import { LoremIpsum } from 'lorem-ipsum';
import { Alignment } from '../models/alignment.model';
import { BillSetup } from '../models/bill-setup.model';
import { BillType } from '../models/bill-type.model';
import { CoverSheetItemType } from '../models/cover-sheet-item-type.model';
import { CoverSheetType } from '../models/cover-sheet-type.model';
import { Disbursement } from '../models/disbursement.model';
import { Narrative } from '../models/narrative.model';
import { PartSpecificAttendanceType } from '../models/part-specific-attendance-type.model';
import { DefaultsService } from '../services/defaults.service';

const exampleBillSetup: BillSetup = {
  title: 'Precedent (A) - 3 column',
  billType: BillType.threeColumn,

  autoNumberParts: true,
  includeNotesInBill: false,
  includePartSummaries: true,
};

const exampleCoverSheetDetails = DefaultsService.createDefaultCoverSheetDetails(
  {
    court: 'IN THE RANDOM COURT',
    claimNumber: 'abc-123-4567-1',
  },
);

const exampleCaseParties = [
  DefaultsService.createDefaultCaseParty({ name: 'AB', category: 'Claimant' }),
  DefaultsService.createDefaultCaseParty({ name: 'CD', category: 'Defendant' }),
];

const exampleFrontSheetItems = [
  DefaultsService.createDefaultCoverSheetItem({
    coverSheetType: CoverSheetType.frontSheet,
    coverSheetItemType: CoverSheetItemType.court,
  }),
  DefaultsService.createDefaultCoverSheetItem({
    coverSheetType: CoverSheetType.frontSheet,
    coverSheetItemType: CoverSheetItemType.claimNumber,
  }),
  DefaultsService.createDefaultCoverSheetItem({
    coverSheetType: CoverSheetType.frontSheet,
    coverSheetItemType: CoverSheetItemType.caseParties,
  }),
  DefaultsService.createDefaultCoverSheetItem({
    coverSheetType: CoverSheetType.frontSheet,
    coverSheetItemType: CoverSheetItemType.vatDetails,
  }),
  DefaultsService.createDefaultCoverSheetItem({
    coverSheetType: CoverSheetType.frontSheet,
    coverSheetItemType: CoverSheetItemType.solicitorDetails,
  }),
  DefaultsService.createDefaultCoverSheetItem({
    coverSheetType: CoverSheetType.frontSheet,
    coverSheetItemType: CoverSheetItemType.spacer,
  }),
  DefaultsService.createDefaultCoverSheetItem({
    coverSheetType: CoverSheetType.frontSheet,
    coverSheetItemType: CoverSheetItemType.text,

    text: new LoremIpsum().generateSentences(2),
    bold: true,
    italic: true,
    underline: true,
    alignment: Alignment.centre,
  }),
  DefaultsService.createDefaultCoverSheetItem({
    coverSheetType: CoverSheetType.frontSheet,
    coverSheetItemType: CoverSheetItemType.narrative,
  }),
  DefaultsService.createDefaultCoverSheetItem({
    coverSheetType: CoverSheetType.frontSheet,
    coverSheetItemType: CoverSheetItemType.ratesApplied,
  }),
];

const exampleBackSheetItems = [
  DefaultsService.createDefaultCoverSheetItem({
    coverSheetType: CoverSheetType.backSheet,
    coverSheetItemType: CoverSheetItemType.caseParties,
  }),
  DefaultsService.createDefaultCoverSheetItem({
    coverSheetType: CoverSheetType.backSheet,
    coverSheetItemType: CoverSheetItemType.vatDetails,
  }),
  DefaultsService.createDefaultCoverSheetItem({
    coverSheetType: CoverSheetType.backSheet,
    coverSheetItemType: CoverSheetItemType.solicitorDetails,
  }),
  DefaultsService.createDefaultCoverSheetItem({
    coverSheetType: CoverSheetType.backSheet,
    coverSheetItemType: CoverSheetItemType.spacer,
  }),
  DefaultsService.createDefaultCoverSheetItem({
    coverSheetType: CoverSheetType.backSheet,
    coverSheetItemType: CoverSheetItemType.text,
    text: new LoremIpsum().generateSentences(2),
    alignment: Alignment.right,
  }),
];

const exampleNarrative: Narrative = {
  narrative: new LoremIpsum().generateParagraphs(5),
};

const exampleRateGroups = [
  DefaultsService.createDefaultRateGroup({
    reference: 'Partner',
    name: 'Partner',
  }),
  DefaultsService.createDefaultRateGroup({
    reference: 'EF',
    name: 'EF',
  }),
  DefaultsService.createDefaultRateGroup({
    reference: 'T',
    name: 'T',
  }),
];

const exampleFeeEarners = exampleRateGroups.map((rateGroup) =>
  DefaultsService.createDefaultFeeEarner({
    reference: rateGroup.reference,
    rateGroupId: rateGroup.id,
  }),
);

const exampleParts = [
  DefaultsService.createDefaultPart({
    description: 'Costs of E F & Co',
    hasVat: true,
    vatPercentage: 17.5,
    hasSuccessFee: true,
    successFeePercentage: 40,
    hasCareAndConduct: true,
    careAndConductPercentage: 50,
  }),
];

const exampleSolicitors = [
  DefaultsService.createDefaultSolicitor({
    partId: exampleParts[0].id,
    name: 'E F & Co',
    address1: '1 Brighton Street',
    address2: 'Some district',
    town: 'Brighton',
    county: 'Brighton and Hove',
    postCode: 'BT1 2JH',
    telephone: '01234 567890',
    fax: '01234 567899',
    dx: 'BT123',
    vatNumber: '33 4404 90',
  }),
];

const exampleRates = [
  DefaultsService.createDefaultRate({
    rateGroupId: exampleRateGroups[0].id,
    partId: exampleParts[0].id,
    hourly: 180,
    calls: 18,
    lettersIn: 9,
    lettersOut: 18,
    advocacy: 180,
    counsel: 180,
    travelAndWaiting: 180,
  }),
  DefaultsService.createDefaultRate({
    rateGroupId: exampleRateGroups[1].id,
    partId: exampleParts[0].id,
    hourly: 140,
    calls: 14,
    lettersIn: 7,
    lettersOut: 14,
    advocacy: 140,
    counsel: 140,
    travelAndWaiting: 140,
  }),
  DefaultsService.createDefaultRate({
    rateGroupId: exampleRateGroups[2].id,
    partId: exampleParts[0].id,
    hourly: 85,
    calls: 8.5,
    lettersIn: 4.25,
    lettersOut: 8.5,
    advocacy: 85,
    counsel: 85,
    travelAndWaiting: 85,
  }),
];

const exampleCounsels = [
  DefaultsService.createDefaultCounsel({
    name: 'Miss GH',
    hasSuccessFee: true,
    successFeePercentage: 75,
    attractsVat: true,
  }),
];

const exampleEnhancements = [
  DefaultsService.createDefaultEnhancement({
    partId: exampleParts[0].id,
    name: '***',
    percentage: 50,
  }),
];

const exampleChronologySteps = [
  DefaultsService.createDefaultChronologyStep({
    partId: exampleParts[0].id,
    date: '2000-07-08',
    description: 'E F & Co instructed',
  }),
  DefaultsService.createDefaultChronologyStep({
    partId: exampleParts[0].id,
    date: '2000-07-22',
    description: 'AEI with Eastbird Legal Protection Ltd',
  }),
  DefaultsService.createDefaultChronologyStep({
    partId: exampleParts[0].id,
    date: '2000-10-07',
    description: 'Claim issued',
  }),
  DefaultsService.createDefaultChronologyStep({
    partId: exampleParts[0].id,
    date: '2000-10-21',
    description: 'Particulars of claim served',
  }),
  DefaultsService.createDefaultChronologyStep({
    partId: exampleParts[0].id,
    date: '2000-11-25',
    description:
      'Time for service of defence extended by agreement to 14th January 2001',
  }),
  DefaultsService.createDefaultChronologyStep({
    partId: exampleParts[0].id,
    date: '2001-01-20',
    description: 'Case allocated to multi-track',
  }),
  DefaultsService.createDefaultChronologyStep({
    partId: exampleParts[0].id,
    date: '2001-02-09',
    description:
      'Case management conference at which costs were awarded to the claimant and the base costs were summarily assessed at £400 (paid on 24th February 2001)',
  }),
  DefaultsService.createDefaultChronologyStep({
    partId: exampleParts[0].id,
    date: '2001-02-23',
    description: 'Claimants list of documents',
  }),
  DefaultsService.createDefaultChronologyStep({
    partId: exampleParts[0].id,
    date: '2001-04-12',
    description: 'Payment into court of £25,126.33',
  }),
  DefaultsService.createDefaultChronologyStep({
    partId: exampleParts[0].id,
    date: '2001-04-13',
    description: 'Filing pre-trial checklist',
  }),
  DefaultsService.createDefaultChronologyStep({
    partId: exampleParts[0].id,
    date: '2001-06-28',
    description: 'Pre-trial review: costs in case',
  }),
  DefaultsService.createDefaultChronologyStep({
    partId: exampleParts[0].id,
    date: '2001-07-25',
    description: 'Attending first day of trial: adjourned part heard',
  }),
  DefaultsService.createDefaultChronologyStep({
    partId: exampleParts[0].id,
    date: '2001-07-26',
    description:
      'Attending second day of trial when judgment was given for the claimant in the sum of £78,256.83 plus £1,207.16 interest plus costs',
  }),
];

const exampleChronologyStepAttendances = [
  DefaultsService.createDefaultAttendance({
    feeEarnerId: exampleFeeEarners[1].id,
    chronologyStepId: exampleChronologySteps[10].id,
    description: 'Engaged in court',
    time: '1:30',
    enhancementId: exampleEnhancements[0].id,
  }),
  DefaultsService.createDefaultAttendance({
    feeEarnerId: exampleFeeEarners[1].id,
    chronologyStepId: exampleChronologySteps[10].id,
    description: 'Travel and waiting',
    time: '2:00',
    travelAndWaiting: true,
  }),
  DefaultsService.createDefaultAttendance({
    feeEarnerId: exampleFeeEarners[1].id,
    chronologyStepId: exampleChronologySteps[11].id,
    description: 'Engaged in court',
    time: '5:00',
    counsel: true,
  }),
  DefaultsService.createDefaultAttendance({
    feeEarnerId: exampleFeeEarners[1].id,
    chronologyStepId: exampleChronologySteps[11].id,
    description: 'Engaged in conference',
    time: '0:45',
    counsel: true,
  }),
  DefaultsService.createDefaultAttendance({
    feeEarnerId: exampleFeeEarners[1].id,
    chronologyStepId: exampleChronologySteps[11].id,
    description: 'Travel and waiting',
    time: '1:30',
    travelAndWaiting: true,
  }),
  DefaultsService.createDefaultAttendance({
    feeEarnerId: exampleFeeEarners[1].id,
    chronologyStepId: exampleChronologySteps[12].id,
    description: 'Engaged in court',
    time: '3:00',
    counsel: true,
  }),
  DefaultsService.createDefaultAttendance({
    feeEarnerId: exampleFeeEarners[1].id,
    chronologyStepId: exampleChronologySteps[12].id,
    description: 'Engaged in conference',
    time: '1:30',
    counsel: true,
  }),
  DefaultsService.createDefaultAttendance({
    feeEarnerId: exampleFeeEarners[1].id,
    chronologyStepId: exampleChronologySteps[12].id,
    description: 'Travel and waiting',
    time: '1:30',
    travelAndWaiting: true,
  }),
];

const exampleChronologyStepSuccessFees = [
  DefaultsService.createDefaultSuccessFee({
    chronologyStepId: exampleChronologySteps[6].id,
    description: `Success fee on solicitor's base fee on interim orders which were summarily assessed`,
    baseCosts: 400,
  }),
];

const exampleChronologyStepDisbursements = [
  DefaultsService.createDefaultDisbursement({
    chronologyStepId: exampleChronologySteps[1].id,
    description: 'Premium for policy',
    amount: 120,
    notes: new LoremIpsum().generateWords(20),
  }),
  DefaultsService.createDefaultDisbursement({
    chronologyStepId: exampleChronologySteps[2].id,
    description: 'Issue fee',
    amount: 400,
  }),
  DefaultsService.createDefaultDisbursement({
    chronologyStepId: exampleChronologySteps[4].id,
    description: 'Fee on allocation',
    amount: 80,
  }),
  DefaultsService.createDefaultDisbursement({
    chronologyStepId: exampleChronologySteps[9].id,
    description: 'Fee on listing',
    amount: 400,
  }),
  DefaultsService.createDefaultDisbursement({
    chronologyStepId: exampleChronologySteps[10].id,
    description: 'Counsels base fee for pre-trial review',
    amount: 600,
    vat: 105,
    counselId: exampleCounsels[0].id,
    hasCounselSuccessFee: true,
  }),
  DefaultsService.createDefaultDisbursement({
    chronologyStepId: exampleChronologySteps[11].id,
    description: 'Counsels base fee for trial',
    amount: 2000,
    vat: 350,
    counselId: exampleCounsels[0].id,
    hasCounselSuccessFee: true,
  }),
  DefaultsService.createDefaultDisbursement({
    chronologyStepId: exampleChronologySteps[11].id,
    description: 'Fee of expert witness (Dr. IJ)',
    amount: 850,
  }),
  DefaultsService.createDefaultDisbursement({
    chronologyStepId: exampleChronologySteps[11].id,
    description: 'Expenses of witnesses of fact',
    amount: 84,
  }),
  DefaultsService.createDefaultDisbursement({
    chronologyStepId: exampleChronologySteps[12].id,
    description: 'Counsels base fee for second day',
    amount: 650,
    vat: 113.75,
    counselId: exampleCounsels[0].id,
    hasCounselSuccessFee: true,
  }),
];

const exampleParties = [
  DefaultsService.createDefaultParty({
    partId: exampleParts[0].id,
    name: 'Claimant',
  }),
  DefaultsService.createDefaultParty({
    partId: exampleParts[0].id,
    name: 'Witness of Fact',
  }),
  DefaultsService.createDefaultParty({
    partId: exampleParts[0].id,
    name: 'Medical expert (Dr IJ)',
  }),
  DefaultsService.createDefaultParty({
    partId: exampleParts[0].id,
    name: 'Defendant and his solicitor',
  }),
  DefaultsService.createDefaultParty({
    partId: exampleParts[0].id,
    name: 'Communications with the court',
  }),
  DefaultsService.createDefaultParty({
    partId: exampleParts[0].id,
    name: 'Communications with Counsel',
  }),
  DefaultsService.createDefaultParty({
    partId: exampleParts[0].id,
    name: 'Work done on negotiations',
  }),
];

const examplePartyAttendances = [
  DefaultsService.createDefaultAttendance({
    feeEarnerId: exampleFeeEarners[1].id,
    partyId: exampleParties[0].id,
    date: '2000-07-08',
    description: 'First instructions',
    time: '7:30',
    other: true,
    enhancementId: exampleEnhancements[0].id,
  }),
  DefaultsService.createDefaultAttendance({
    feeEarnerId: exampleFeeEarners[0].id,
    partyId: exampleParties[0].id,
    date: '2000-07-08',
    description: 'First instructions',
    time: '0:45',
    other: true,
  }),
  DefaultsService.createDefaultAttendance({
    feeEarnerId: exampleFeeEarners[1].id,
    partyId: exampleParties[1].id,
    date: '2000-01-01',
    description: 'Engaged with party',
    time: '5:12',
    other: true,
  }),
  DefaultsService.createDefaultAttendance({
    feeEarnerId: exampleFeeEarners[1].id,
    partyId: exampleParties[2].id,
    date: '2000-09-11',
    description: 'long letter out',
    time: '0:20',
    other: true,
  }),
  DefaultsService.createDefaultAttendance({
    feeEarnerId: exampleFeeEarners[1].id,
    partyId: exampleParties[2].id,
    date: '2001-01-30',
    description: 'long letter out',
    time: '0:15',
    other: true,
  }),
  DefaultsService.createDefaultAttendance({
    feeEarnerId: exampleFeeEarners[1].id,
    partyId: exampleParties[2].id,
    date: '2001-05-23',
    description: 'telephone call',
    time: '0:12',
    timedTelephoneAttendance: true,
  }),
  DefaultsService.createDefaultAttendance({
    feeEarnerId: exampleFeeEarners[1].id,
    partyId: exampleParties[3].id,
    date: '2001-07-08',
    description: 'timed letter sent',
    time: '0:30',
    other: true,
  }),
  DefaultsService.createDefaultAttendance({
    feeEarnerId: exampleFeeEarners[1].id,
    partyId: exampleParties[3].id,
    date: '2001-02-19',
    description: 'telephone call',
    time: '0:15',
    timedTelephoneAttendance: true,
  }),
  DefaultsService.createDefaultAttendance({
    feeEarnerId: exampleFeeEarners[1].id,
    partyId: exampleParties[6].id,
    date: '2001-03-23',
    description: 'Meeting at offices of Solicitors for the Defendant - Engaged',
    time: '1:30',
  }),
  DefaultsService.createDefaultAttendance({
    feeEarnerId: exampleFeeEarners[1].id,
    partyId: exampleParties[6].id,
    date: '2001-03-23',
    description: 'Travel and waiting',
    time: '1:15',
    travelAndWaiting: true,
  }),
];

const examplePartyDisbursements = [
  DefaultsService.createDefaultDisbursement({
    partyId: exampleParties[1].id,
    description: 'Paid travelling on 9th October 2000',
    amount: 22.96,
    vat: 4.02,
  }),
  DefaultsService.createDefaultDisbursement({
    partyId: exampleParties[2].id,
    description: 'Dr IJs fee for report',
    amount: 350,
  }),
];

const exampleCorrespondenceCounters = [
  DefaultsService.createDefaultCorrespondenceCounter({
    partyId: exampleParties[0].id,
    feeEarnerId: exampleFeeEarners[1].id,
    calls: 12,
    lettersIn: 0,
    lettersOut: 17,
  }),
  DefaultsService.createDefaultCorrespondenceCounter({
    partyId: exampleParties[1].id,
    feeEarnerId: exampleFeeEarners[1].id,
    calls: 2,
    lettersIn: 0,
    lettersOut: 6,
  }),
  DefaultsService.createDefaultCorrespondenceCounter({
    partyId: exampleParties[2].id,
    feeEarnerId: exampleFeeEarners[1].id,
    calls: 4,
    lettersIn: 0,
    lettersOut: 6,
  }),
  DefaultsService.createDefaultCorrespondenceCounter({
    partyId: exampleParties[3].id,
    feeEarnerId: exampleFeeEarners[1].id,
    calls: 6,
    lettersIn: 0,
    lettersOut: 18,
  }),
  DefaultsService.createDefaultCorrespondenceCounter({
    partyId: exampleParties[4].id,
    feeEarnerId: exampleFeeEarners[1].id,
    calls: 1,
    lettersIn: 0,
    lettersOut: 8,
  }),
  DefaultsService.createDefaultCorrespondenceCounter({
    partyId: exampleParties[5].id,
    feeEarnerId: exampleFeeEarners[1].id,
    calls: 8,
    lettersIn: 0,
    lettersOut: 11,
  }),
];

const exampleDocumentsItems = [
  DefaultsService.createDefaultDocumentsItem({
    partId: exampleParts[0].id,
    feeEarnerId: exampleFeeEarners[0].id,
    date: '2000-01-01',
    description: 'Engaged with documents 1',
    time: '0:45',
    estimated: false,
    partClaimed: false,
    notOtherwiseClaimed: false,
    enhancementId: exampleEnhancements[0].id,
  }),
  DefaultsService.createDefaultDocumentsItem({
    partId: exampleParts[0].id,
    feeEarnerId: exampleFeeEarners[1].id,
    date: '2000-01-01',
    description: 'Engaged with documents 2',
    time: '44:30',
    estimated: false,
    partClaimed: false,
    notOtherwiseClaimed: false,
  }),
  DefaultsService.createDefaultDocumentsItem({
    partId: exampleParts[0].id,
    feeEarnerId: exampleFeeEarners[2].id,
    date: '2000-01-01',
    description: 'Engaged with documents 3',
    time: '12:00',
    estimated: false,
    partClaimed: false,
    notOtherwiseClaimed: false,
  }),
];

const exampleOtherDisbursements: Disbursement[] = [];

const exampleOtherWorkAttendances = [
  DefaultsService.createDefaultAttendance({
    feeEarnerId: exampleFeeEarners[1].id,
    partId: exampleParts[0].id,
    partSpecificAttendanceType: PartSpecificAttendanceType.otherWork,
    description: 'Preparing and checking bill - Engaged',
    time: '1:00',
  }),
  DefaultsService.createDefaultAttendance({
    feeEarnerId: exampleFeeEarners[2].id,
    partId: exampleParts[0].id,
    partSpecificAttendanceType: PartSpecificAttendanceType.otherWork,
    description: 'Engaged Costs Draftsman',
    time: '4:00',
  }),
];

const exampleOtherWorkDisbursements: Disbursement[] = [];

export const EXAMPLE_3_COLUMN_BILL = DefaultsService.createDefaultEvoFile({
  attendances: [
    ...exampleChronologyStepAttendances,
    ...examplePartyAttendances,
    ...exampleOtherWorkAttendances,
  ],
  billSetup: exampleBillSetup,
  caseParties: exampleCaseParties,
  chronologySteps: exampleChronologySteps,
  correspondenceCounters: exampleCorrespondenceCounters,
  counsels: exampleCounsels,
  coverSheetDetails: exampleCoverSheetDetails,
  coverSheetItems: [...exampleFrontSheetItems, ...exampleBackSheetItems],
  disbursements: [
    ...exampleChronologyStepDisbursements,
    ...examplePartyDisbursements,
    ...exampleOtherDisbursements,
    ...exampleOtherWorkDisbursements,
  ],
  documentsItems: exampleDocumentsItems,
  enhancements: exampleEnhancements,
  feeEarners: exampleFeeEarners,
  narrative: exampleNarrative,
  parties: exampleParties,
  parts: exampleParts,
  rateGroups: exampleRateGroups,
  rates: exampleRates,
  solicitors: exampleSolicitors,
  successFees: exampleChronologyStepSuccessFees,
});

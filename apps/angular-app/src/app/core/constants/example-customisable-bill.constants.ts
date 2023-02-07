import { LoremIpsum } from 'lorem-ipsum';
import { Alignment } from '../models/alignment.model';
import { BillSetup } from '../models/bill-setup.model';
import { BillType } from '../models/bill-type.model';
import { CoverSheetItemType } from '../models/cover-sheet-item-type.model';
import { CoverSheetType } from '../models/cover-sheet-type.model';
import { FeeEarner } from '../models/fee-earner.model';
import { Narrative } from '../models/narrative.model';
import { Part } from '../models/part.model';
import { RateGroup } from '../models/rate-group.model';
import { Rate } from '../models/rate.model';
import { DatesService } from '../services/dates.service';
import { DefaultsService } from '../services/defaults.service';

const rateGroupsToCreate = 10;
const feeEarnersPerRateGroup = 2;
const partsToCreate = 2;
const chronologyStepsPerFeeEarnerPerPart = 2;
const partiesPerPart = 5;
const documentsItemsPerFeeEarnerPerPart = 2;

const exampleBillSetup: BillSetup = {
  title: 'Customisable bill',
  billType: BillType.threeColumn,

  autoNumberParts: true,
  includeNotesInBill: false,
  includePartSummaries: true,
};

const exampleCaseParties = [
  DefaultsService.createDefaultCaseParty({ name: 'AB', category: 'Claimant' }),
  DefaultsService.createDefaultCaseParty({ name: 'CD', category: 'Defendant' }),
];

const exampleCoverSheetItems = [
  DefaultsService.createDefaultCoverSheetItem({
    coverSheetType: CoverSheetType.frontSheet,
    coverSheetItemType: CoverSheetItemType.text,

    text: 'This is some text. It should be bold, italic and underline and centered',
    bold: true,
    italic: true,
    underline: true,
    alignment: Alignment.centre,
  }),
];

const exampleNarrative: Narrative = { narrative: 'This is the narrative...' };

const exampleRateGroups: RateGroup[] = Array.from({
  length: rateGroupsToCreate,
}).map((_value, index) =>
  DefaultsService.createDefaultRateGroup({
    reference: `RG${index + 1}`,
    name: `Rate Group ${index + 1}`,
  }),
);

const exampleParts: Part[] = Array.from({ length: partsToCreate }).map(
  (_value, index) => ({
    ...DefaultsService.createDefaultPart({
      description: `Example Part ${index + 1}`,
    }),
  }),
);

const exampleSolicitors = exampleParts.map((part) =>
  DefaultsService.createDefaultSolicitor({
    partId: part.id,
    name: `${part.description} solicitor`,
  }),
);

const exampleFeeEarners: FeeEarner[] = Array.from({
  length: rateGroupsToCreate * feeEarnersPerRateGroup,
}).map((_value, index) =>
  DefaultsService.createDefaultFeeEarner({
    reference: `FE${index + 1}`,
    rateGroupId:
      exampleRateGroups[Math.floor(index / feeEarnersPerRateGroup)].id,
  }),
);

const exampleRates = exampleRateGroups
  .map((rateGroup) => {
    return exampleParts.map(
      (part): Rate =>
        DefaultsService.createDefaultRate({
          rateGroupId: rateGroup.id,
          partId: part.id,
          hourly: 150,
          calls: 15,
          lettersIn: 7.5,
          lettersOut: 15,
          advocacy: 150,
          counsel: 150,
          travelAndWaiting: 150,
        }),
    );
  })
  .flat();

const exampleCounsels = [
  DefaultsService.createDefaultCounsel({
    name: `Counsel ${new LoremIpsum().generateWords(2)}`,
    hasSuccessFee: true,
    successFeePercentage: 40,
    attractsVat: true,
  }),
];

const exampleEnhancements = exampleParts.map((part) =>
  DefaultsService.createDefaultEnhancement({
    partId: part.id,
    name: '***',
    percentage: 50,
  }),
);

const exampleChronologySteps = exampleParts
  .map((part) =>
    Array.from({ length: chronologyStepsPerFeeEarnerPerPart }).map(() =>
      DefaultsService.createDefaultChronologyStep({
        partId: part.id,
        date: DatesService.generateRandomDateString(),
        description: new LoremIpsum().generateSentences(2),
      }),
    ),
  )
  .flat();

const exampleChronologyStepAttendances = exampleChronologySteps
  .map((chronologyStep) =>
    exampleFeeEarners.map((feeEarner) =>
      DefaultsService.createDefaultAttendance({
        feeEarnerId: feeEarner.id,
        chronologyStepId: chronologyStep.id,
        description: new LoremIpsum().generateWords(4),
        time: DatesService.generateRandomTime(),
      }),
    ),
  )
  .flat();

const exampleChronologyStepDisbursements = exampleChronologySteps.map(
  (chronologyStep) =>
    DefaultsService.createDefaultDisbursement({
      chronologyStepId: chronologyStep.id,
      description: new LoremIpsum().generateWords(5),
      amount: Math.random() * 500,
      vat: Math.random() * 100,
    }),
);

const exampleChronologyStepSuccessFees = exampleChronologySteps.map(
  (chronologyStep) =>
    DefaultsService.createDefaultSuccessFee({
      chronologyStepId: chronologyStep.id,
      description: new LoremIpsum().generateWords(4),
      baseCosts: Math.random() * 500,
    }),
);

const exampleParties = exampleParts
  .map((part) =>
    Array.from({ length: partiesPerPart }).map(() =>
      DefaultsService.createDefaultParty({
        partId: part.id,
        name: `Party ${new LoremIpsum().generateWords(2)}`,
      }),
    ),
  )
  .flat();

const examplePartyAttendances = exampleParties
  .map((party) =>
    exampleFeeEarners.map((feeEarner) =>
      DefaultsService.createDefaultAttendance({
        feeEarnerId: feeEarner.id,
        partyId: party.id,
        date: DatesService.generateRandomDateString(),
        description: new LoremIpsum().generateWords(4),
        time: DatesService.generateRandomTime(),
      }),
    ),
  )
  .flat();

const examplePartyDisbursements = exampleParties.map((party) =>
  DefaultsService.createDefaultDisbursement({
    partyId: party.id,
    description: new LoremIpsum().generateWords(5),
    amount: Math.random() * 500,
    vat: Math.random() * 100,
  }),
);

const exampleCorrespondenceCounters = exampleParties
  .map((party) =>
    exampleFeeEarners.map((feeEarner) =>
      DefaultsService.createDefaultCorrespondenceCounter({
        feeEarnerId: feeEarner.id,
        partyId: party.id,
        calls: Math.floor(Math.random() * 50),
        lettersIn: Math.floor(Math.random() * 50),
        lettersOut: Math.floor(Math.random() * 50),
      }),
    ),
  )
  .flat();

const exampleDocumentItems = exampleParts
  .map((part) =>
    exampleFeeEarners.map((feeEarner) =>
      Array.from({ length: documentsItemsPerFeeEarnerPerPart }).map(() =>
        DefaultsService.createDefaultDocumentsItem({
          partId: part.id,
          feeEarnerId: feeEarner.id,
          description: new LoremIpsum().generateSentences(2),
          date: DatesService.generateRandomDateString(),
          time: DatesService.generateRandomTime(),
        }),
      ),
    ),
  )
  .flat(2);

export const EXAMPLE_CUSTOMISABLE_BILL = DefaultsService.createDefaultEvoFile({
  attendances: [
    ...exampleChronologyStepAttendances,
    ...examplePartyAttendances,
  ],
  billSetup: exampleBillSetup,
  caseParties: exampleCaseParties,
  chronologySteps: exampleChronologySteps,
  correspondenceCounters: exampleCorrespondenceCounters,
  counsels: exampleCounsels,
  coverSheetItems: exampleCoverSheetItems,
  disbursements: [
    ...exampleChronologyStepDisbursements,
    ...examplePartyDisbursements,
  ],
  documentsItems: exampleDocumentItems,
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

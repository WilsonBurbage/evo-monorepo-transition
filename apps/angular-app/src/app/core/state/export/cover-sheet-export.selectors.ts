import { createSelector } from '@ngrx/store';
import { EMPTY_EXPORT_ROW } from '../../constants/export.constants';
import { Alignment } from '../../models/alignment.model';
import { ExportColumnType } from '../../models/export-column-type.model';
import { ExportColumn } from '../../models/export-column.model';
import { ExportRow } from '../../models/export-row.model';
import { CurrencyService } from '../../services/currency.service';
import { DefaultsService } from '../../services/defaults.service';
import { ExportCoverSheetsService } from '../../services/export-cover-sheets.service';
import { ExportPartsService } from '../../services/export-parts.service';
import { SolicitorsService } from '../../services/solicitors.service';
import * as billSetupSelectors from './../bill-setup/bill-setup.selectors';
import * as casePartiesSelectors from './../case-parties/case-parties.selectors';
import * as coverSheetDetailsSelectors from './../cover-sheet-details/cover-sheet-details.selectors';
import * as coverSheetItemsSelectors from './../cover-sheet-items/cover-sheet-items.selectors';
import * as narrativeSelectors from './../narrative/narrative.selectors';
import * as partsSelectors from './../parts/parts.selectors';
import * as rateGroupsSelectors from './../rate-groups/rate-groups.selectors';
import * as ratesSelectors from './../rates/rates.selectors';
import * as solicitorsSelectors from './../solicitors/solicitors.selectors';
import * as uiSelectors from './../ui/ui.selectors';

export const getExportColumnsForFrontSheet = createSelector(
  uiSelectors.getBillSelectorsEnabled,

  (billSelectorsEnabled): ExportColumn[] => {
    if (!billSelectorsEnabled) {
      return [];
    }

    return [{ type: ExportColumnType.default, width: 100 }];
  },
);

export const getExportColumnsForBackSheet = createSelector(
  uiSelectors.getBillSelectorsEnabled,

  (billSelectorsEnabled): ExportColumn[] => {
    if (!billSelectorsEnabled) {
      return [];
    }

    return [
      { type: ExportColumnType.empty, width: 50 },
      { type: ExportColumnType.default, width: 50 },
    ];
  },
);

export const getExportRowsForCaseParties = createSelector(
  uiSelectors.getBillSelectorsEnabled,
  casePartiesSelectors.entitySelectors.selectAll,

  (billSelectorsEnabled, caseParties): ExportRow[] => {
    if (!billSelectorsEnabled) {
      return [];
    }

    const casePartiesTitleRow: ExportRow = {
      cells: {
        [ExportColumnType.default]: {
          text: 'B E T W E E N',
          bold: true,
        },
      },
      jumpToLink: DefaultsService.createDefaultJumpToLink({
        title: 'Case parties',
        level: 0,
      }),
    };

    const casePartiesRows = caseParties
      .map((caseParty, index): ExportRow[] => {
        return [
          {
            cells: {
              [ExportColumnType.default]: {
                text: caseParty.name,
                bold: true,
                alignment: Alignment.centre,
              },
            },
            unspaced: true,
          },
          {
            cells: {
              [ExportColumnType.default]: {
                text: caseParty.category,
                bold: true,
                underline: true,
                alignment: Alignment.right,
              },
            },
            unspaced: true,
          },
          ...(index < caseParties.length - 1
            ? [
                {
                  cells: {
                    [ExportColumnType.default]: {
                      text: 'and',
                      alignment: Alignment.centre,
                    },
                  },
                },
              ]
            : []),
        ];
      })
      .flat();

    return [casePartiesTitleRow, ...casePartiesRows, EMPTY_EXPORT_ROW];
  },
);

export const getReadoutForCaseParties = createSelector(
  uiSelectors.getBillSelectorsEnabled,
  casePartiesSelectors.entitySelectors.selectAll,

  (billSelectorsEnabled, caseParties): string => {
    if (!billSelectorsEnabled) {
      return '';
    }

    const readoutForCaseParties = [
      'BETWEEN',
      caseParties
        .map((caseParty) => `${caseParty.name} (${caseParty.category})`)
        .join(' and '),
    ].join(' ');

    return readoutForCaseParties;
  },
);

export const getExportRowsForNarrative = createSelector(
  uiSelectors.getBillSelectorsEnabled,

  narrativeSelectors.getNarrative,

  (billSelectorsEnabled, narrative): ExportRow[] => {
    if (!billSelectorsEnabled) {
      return [];
    }

    const narrativeRows: ExportRow[] = [
      {
        cells: { [ExportColumnType.default]: { text: narrative!.narrative } },
        jumpToLink: DefaultsService.createDefaultJumpToLink({
          title: 'Narrative',
          level: 0,
        }),
      },
    ];

    return narrativeRows;
  },
);

export const getReadoutForNarrative = createSelector(
  uiSelectors.getBillSelectorsEnabled,

  narrativeSelectors.getNarrative,

  (billSelectorsEnabled, narrative): string => {
    if (!billSelectorsEnabled) {
      return '';
    }

    const readoutForNarrative = narrative!.narrative;

    return readoutForNarrative;
  },
);

export const getExportRowsForRatesApplied = createSelector(
  uiSelectors.getBillSelectorsEnabled,
  billSetupSelectors.getBillSetup,

  rateGroupsSelectors.entitySelectors.selectAll,
  partsSelectors.entitySelectors.selectAll,
  ratesSelectors.entitySelectors.selectAll,

  (billSelectorsEnabled, billSetup, rateGroups, parts, rates): ExportRow[] => {
    if (!billSelectorsEnabled) {
      return [];
    }

    const ratesAppliedTitleRow: ExportRow = {
      cells: {
        [ExportColumnType.default]: {
          text: 'Rates Applied:',
          bold: true,
        },
      },
      jumpToLink: DefaultsService.createDefaultJumpToLink({
        title: 'Rates applied',
        level: 0,
      }),
    };

    const ratesAppliedRows: ExportRow[] = parts
      .map((part) => {
        const partTitleRow: ExportRow = {
          cells: {
            [ExportColumnType.default]: {
              text: ExportPartsService.getFullPartName(part, parts, billSetup!),
              underline: true,
            },
          },
        };

        const rateGroupRows: ExportRow[] = rateGroups
          .map((rateGroup) => {
            const rateGroupTitleRow: ExportRow = {
              cells: {
                [ExportColumnType.default]: {
                  text: `${rateGroup.name} (${rateGroup.reference})`,
                  underline: true,
                },
              },
              unspaced: true,
            };

            const rate = rates.find(
              (rate) =>
                rate.rateGroupId === rateGroup.id && rate.partId === part.id,
            );

            if (!rate) {
              return [];
            }

            const rateRows: ExportRow[] = [
              ...(rate.hourly
                ? [
                    {
                      cells: {
                        [ExportColumnType.default]: {
                          text: `Hourly: ${CurrencyService.numberToCurrency(
                            rate.hourly,
                          )}`,
                        },
                      },
                      unspaced: true,
                    } as ExportRow,
                  ]
                : []),

              ...(rate.lettersIn
                ? [
                    {
                      cells: {
                        [ExportColumnType.default]: {
                          text: `Letters In: ${CurrencyService.numberToCurrency(
                            rate.lettersIn,
                          )}`,
                        },
                      },
                      unspaced: true,
                    } as ExportRow,
                  ]
                : []),

              ...(rate.lettersOut
                ? [
                    {
                      cells: {
                        [ExportColumnType.default]: {
                          text: `Letters Out: ${CurrencyService.numberToCurrency(
                            rate.lettersOut,
                          )}`,
                        },
                      },
                      unspaced: true,
                    } as ExportRow,
                  ]
                : []),

              ...(rate.calls
                ? [
                    {
                      cells: {
                        [ExportColumnType.default]: {
                          text: `Telephone Calls: ${CurrencyService.numberToCurrency(
                            rate.calls,
                          )}`,
                        },
                      },
                      unspaced: true,
                    } as ExportRow,
                  ]
                : []),

              ...(rate.advocacy
                ? [
                    {
                      cells: {
                        [ExportColumnType.default]: {
                          text: `Advocacy: ${CurrencyService.numberToCurrency(
                            rate.advocacy,
                          )}`,
                        },
                      },
                      unspaced: true,
                    } as ExportRow,
                  ]
                : []),

              ...(rate.counsel
                ? [
                    {
                      cells: {
                        [ExportColumnType.default]: {
                          text: `Counsel: ${CurrencyService.numberToCurrency(
                            rate.counsel,
                          )}`,
                        },
                      },
                      unspaced: true,
                    } as ExportRow,
                  ]
                : []),

              ...(rate.travelAndWaiting
                ? [
                    {
                      cells: {
                        [ExportColumnType.default]: {
                          text: `Travel & Waiting: ${CurrencyService.numberToCurrency(
                            rate.travelAndWaiting,
                          )}`,
                        },
                      },
                      unspaced: true,
                    } as ExportRow,
                  ]
                : []),
            ];

            return [rateGroupTitleRow, ...rateRows, EMPTY_EXPORT_ROW];
          })
          .flat();

        return [partTitleRow, ...rateGroupRows];
      })
      .flat();

    return [ratesAppliedTitleRow, ...ratesAppliedRows];
  },
);

export const getReadoutForRatesApplied = createSelector(
  uiSelectors.getBillSelectorsEnabled,

  rateGroupsSelectors.entitySelectors.selectAll,
  ratesSelectors.entitySelectors.selectAll,

  (billSelectorsEnabled, rateGroups, rates): string => {
    if (!billSelectorsEnabled) {
      return '';
    }

    const readoutForRatesApplied = rateGroups
      .map((rateGroup) => {
        return `${rateGroup.name} (${
          rateGroup.reference
        }): ${CurrencyService.numberToCurrency(
          rates.find((rate) => rate.rateGroupId === rateGroup.id)?.hourly || 0,
        )}`;
      })
      .join('\n');

    return readoutForRatesApplied;
  },
);

export const getExportRowsForSolicitorDetails = createSelector(
  uiSelectors.getBillSelectorsEnabled,

  solicitorsSelectors.entitySelectors.selectAll,
  partsSelectors.entitySelectors.selectAll,

  (billSelectorsEnabled, solicitors, parts): ExportRow[] => {
    if (!billSelectorsEnabled) {
      return [];
    }

    if (!parts.length) {
      return [];
    }

    const lastPart = [...parts].reverse()[0];

    const solicitor = solicitors.find(
      (solicitor) => solicitor.partId === lastPart.id,
    )!;

    const completedValues = [
      ...SolicitorsService.getCompletedValues(solicitor),
      ...(lastPart.solicitorReference
        ? [`Ref: ${lastPart.solicitorReference}`]
        : []),
    ];

    const solicitorDetailsRows: ExportRow[] = completedValues.map(
      (completedValue, index) => ({
        cells: {
          [ExportColumnType.default]: {
            text: completedValue,
            alignment: Alignment.right,
          },
        },
        ...(index === 0
          ? {
              jumpToLink: DefaultsService.createDefaultJumpToLink({
                title: 'Solicitor details',
                level: 0,
              }),
            }
          : {}),
        unspaced: true,
      }),
    );

    return [...solicitorDetailsRows, EMPTY_EXPORT_ROW];
  },
);

export const getReadoutForSolicitorDetails = createSelector(
  uiSelectors.getBillSelectorsEnabled,

  solicitorsSelectors.entitySelectors.selectAll,
  partsSelectors.entitySelectors.selectAll,

  (billSelectorsEnabled, solicitors, parts): string => {
    if (!billSelectorsEnabled) {
      return '';
    }

    const lastPart = [...parts.reverse()][0];

    const solicitor = solicitors.find(
      (solicitor) => solicitor.partId === lastPart.id,
    )!;

    const completedValues = [
      ...SolicitorsService.getCompletedValues(solicitor),
      ...(lastPart.solicitorReference
        ? [`Ref: ${lastPart.solicitorReference}`]
        : []),
    ];

    const readoutForSolicitorDetails = completedValues.join(', ');

    return readoutForSolicitorDetails;
  },
);

export const getExportRowsForVatDetails = createSelector(
  uiSelectors.getBillSelectorsEnabled,

  solicitorsSelectors.entitySelectors.selectAll,
  partsSelectors.entitySelectors.selectAll,

  (billSelectorsEnabled, solicitors, parts): ExportRow[] => {
    if (!billSelectorsEnabled) {
      return [];
    }

    const populatedSolicitors = parts
      .map(
        (part) => solicitors.find((solicitor) => solicitor.partId === part.id)!,
      )
      .filter(
        (solicitor) => Boolean(solicitor.name) && Boolean(solicitor.vatNumber),
      );

    if (!populatedSolicitors.length) {
      return [];
    }

    const vatDetailsRows: ExportRow[] =
      populatedSolicitors.length === 1
        ? [
            {
              cells: {
                [ExportColumnType.default]: {
                  text: `VAT Registration No: ${populatedSolicitors[0].vatNumber}`,
                  bold: true,
                },
              },
              jumpToLink: DefaultsService.createDefaultJumpToLink({
                title: 'VAT details',
                level: 0,
              }),
            },
          ]
        : [
            {
              cells: {
                [ExportColumnType.default]: {
                  text: `VAT Registration Nos:`,
                  bold: true,
                },
              },
              jumpToLink: DefaultsService.createDefaultJumpToLink({
                title: 'VAT details',
                level: 0,
              }),
              unspaced: true,
            },
            ...populatedSolicitors.map(
              (solicitor): ExportRow => ({
                cells: {
                  [ExportColumnType.default]: {
                    text: `${solicitor.name} - ${solicitor.vatNumber}`,
                    bold: true,
                  },
                },
                unspaced: true,
              }),
            ),
            EMPTY_EXPORT_ROW,
          ];

    return [...vatDetailsRows];
  },
);

export const getReadoutForVatDetails = createSelector(
  uiSelectors.getBillSelectorsEnabled,

  solicitorsSelectors.entitySelectors.selectAll,
  partsSelectors.entitySelectors.selectAll,

  (billSelectorsEnabled, solicitors, parts): string => {
    if (!billSelectorsEnabled) {
      return '';
    }

    const populatedSolicitors = parts
      .map(
        (part) => solicitors.find((solicitor) => solicitor.partId === part.id)!,
      )
      .filter(
        (solicitor) => Boolean(solicitor.name) && Boolean(solicitor.vatNumber),
      );

    const readoutForVatDetails = populatedSolicitors
      .map((solicitor) => `${solicitor.name} - ${solicitor.vatNumber}`)
      .join(', ');

    return readoutForVatDetails;
  },
);

export const getExportRowsForFrontSheet = createSelector(
  uiSelectors.getBillSelectorsEnabled,

  coverSheetItemsSelectors.getFrontSheetItems,
  coverSheetDetailsSelectors.getCoverSheetDetails,

  getExportRowsForCaseParties,
  getExportRowsForNarrative,
  getExportRowsForRatesApplied,
  getExportRowsForSolicitorDetails,
  getExportRowsForVatDetails,

  (
    billSelectorsEnabled,

    frontSheetItems,
    coverSheetDetails,

    exportRowsForCaseParties,
    exportRowsForNarrative,
    exportRowsForRatesApplied,
    exportRowsForSolicitorDetails,
    exportRowsForVatDetails,
  ): ExportRow[] => {
    if (!billSelectorsEnabled) {
      return [];
    }

    const frontSheetRows: ExportRow[] =
      ExportCoverSheetsService.createCoverSheetRows(
        frontSheetItems,
        coverSheetDetails!,
        exportRowsForCaseParties,
        exportRowsForNarrative,
        exportRowsForRatesApplied,
        exportRowsForSolicitorDetails,
        exportRowsForVatDetails,
      );

    return frontSheetRows;
  },
);

export const getExportRowsForBackSheet = createSelector(
  uiSelectors.getBillSelectorsEnabled,

  coverSheetItemsSelectors.getBackSheetItems,
  coverSheetDetailsSelectors.getCoverSheetDetails,

  getExportRowsForCaseParties,
  getExportRowsForNarrative,
  getExportRowsForRatesApplied,
  getExportRowsForSolicitorDetails,
  getExportRowsForVatDetails,

  (
    billSelectorsEnabled,

    backSheetItems,
    coverSheetDetails,

    exportRowsForCaseParties,
    exportRowsForNarrative,
    exportRowsForRatesApplied,
    exportRowsForSolicitorDetails,
    exportRowsForVatDetails,
  ): ExportRow[] => {
    if (!billSelectorsEnabled) {
      return [];
    }

    const backSheetRows: ExportRow[] =
      ExportCoverSheetsService.createCoverSheetRows(
        backSheetItems,
        coverSheetDetails!,
        exportRowsForCaseParties,
        exportRowsForNarrative,
        exportRowsForRatesApplied,
        exportRowsForSolicitorDetails,
        exportRowsForVatDetails,
      );

    return backSheetRows;
  },
);

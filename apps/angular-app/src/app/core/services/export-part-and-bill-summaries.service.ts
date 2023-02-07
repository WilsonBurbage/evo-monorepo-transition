import { Counsel } from '../models/counsel.model';
import { ExportColumnType } from '../models/export-column-type.model';
import { ExportRowMetaDataSummaryType } from '../models/export-row-meta-data-summary-type.model';
import { ExportRow } from '../models/export-row.model';
import { Part } from '../models/part.model';
import { CurrencyService } from './currency.service';
import { ExportClsService } from './export-cls.service';
import { ExportPartsService } from './export-parts.service';
import { ExportService } from './export.service';
import { NumbersService } from './numbers.service';

export class ExportPartAndBillSummariesService {
  static createPartSummaryRows(
    rows: ExportRow[],
    part: Part,
    counsels: Counsel[],
  ): ExportRow[] {
    const allClsAndInterPartesPartSummaryRows = [false, true]
      .map((cls) => {
        const totalProfitCosts = rows
          .filter((row) => Boolean(row.metaData?.cls) === cls)
          .reduce(
            (accumulator, row) =>
              accumulator + (row.metaData?.profitCostsAmount || 0),
            0,
          );

        const totalProfitCostsRow: ExportRow = {
          cells: {
            [ExportColumnType.description]: { text: 'Profit Costs:' },
            [ExportColumnType.subtotal]: {
              text: CurrencyService.numberToCurrency(totalProfitCosts),
            },
          },
          metaData: {
            cls,
            summaryType: ExportRowMetaDataSummaryType.partProfitCosts,
            summaryAmount: totalProfitCosts,
          },
        };

        const totalProfitCostsVat = NumbersService.applyPercentage(
          totalProfitCosts,
          ExportPartsService.getPartWorkingVatPercentage(part),
          true,
        );

        const totalProfitCostsVatRow: ExportRow = {
          cells: {
            [ExportColumnType.description]: { text: 'VAT Thereon:' },
            [ExportColumnType.subtotal]: {
              text: CurrencyService.numberToCurrency(totalProfitCostsVat),
            },
          },
          metaData: {
            cls,
            summaryType: ExportRowMetaDataSummaryType.partProfitCostsVat,
            summaryAmount: totalProfitCostsVat,
          },
        };

        const totalSolicitorsSuccessFee = rows
          .filter((row) => Boolean(row.metaData?.cls) === cls)
          .reduce(
            (accumulator, row) =>
              accumulator + (row.metaData?.solicitorsSuccessFeeAmount || 0),
            0,
          );

        const totalSolicitorsSuccessFeeRow: ExportRow = {
          cells: {
            [ExportColumnType.description]: {
              text: `Solicitor's Success Fee:`,
            },
            [ExportColumnType.subtotal]: {
              text: CurrencyService.numberToCurrency(totalSolicitorsSuccessFee),
            },
          },
          metaData: {
            cls,
            summaryType: ExportRowMetaDataSummaryType.partSolicitorsSuccessFee,
            summaryAmount: totalSolicitorsSuccessFee,
          },
        };

        const totalSolicitorsSuccessFeeVat = NumbersService.applyPercentage(
          totalSolicitorsSuccessFee,
          ExportPartsService.getPartWorkingVatPercentage(part),
          true,
        );

        const totalSolicitorsSuccessFeeVatRow: ExportRow = {
          cells: {
            [ExportColumnType.description]: { text: 'VAT Thereon:' },
            [ExportColumnType.subtotal]: {
              text: CurrencyService.numberToCurrency(
                totalSolicitorsSuccessFeeVat,
              ),
            },
          },
          metaData: {
            cls,
            summaryType:
              ExportRowMetaDataSummaryType.partSolicitorsSuccessFeeVat,
            summaryAmount: totalSolicitorsSuccessFeeVat,
          },
        };

        const totalCounselsFeeRows: ExportRow[] = counsels
          .map((counsel) => {
            const totalCounselsFee = rows
              .filter((row) => Boolean(row.metaData?.cls) === cls)
              .filter((row) => row.metaData?.counselId === counsel.id)
              .reduce(
                (accumulator, row) =>
                  accumulator + (row.metaData?.counselsFeeAmount || 0),
                0,
              );

            const totalCounselsFeeRow: ExportRow = {
              cells: {
                [ExportColumnType.description]: {
                  text: `Counsel's Fee (${counsel.name}):`,
                },
                [ExportColumnType.subtotal]: {
                  text: CurrencyService.numberToCurrency(totalCounselsFee),
                },
              },
              metaData: {
                cls,
                counselId: counsel.id,
                summaryType: ExportRowMetaDataSummaryType.partCounselsFee,
                summaryAmount: totalCounselsFee,
              },
            };

            const totalCounselsFeeVat = rows
              .filter((row) => Boolean(row.metaData?.cls) === cls)
              .filter((row) => row.metaData?.counselId === counsel.id)
              .reduce(
                (accumulator, row) =>
                  accumulator + (row.metaData?.counselsFeeVatAmount || 0),
                0,
              );

            const totalCounselsFeeVatRow: ExportRow = {
              cells: {
                [ExportColumnType.description]: {
                  text: `VAT Thereon (${counsel.name}):`,
                },
                [ExportColumnType.subtotal]: {
                  text: CurrencyService.numberToCurrency(totalCounselsFeeVat),
                },
              },
              metaData: {
                cls,
                counselId: counsel.id,
                summaryType: ExportRowMetaDataSummaryType.partCounselsFeeVat,
                summaryAmount: totalCounselsFeeVat,
              },
            };

            const totalCounselsSuccessFee = rows
              .filter((row) => Boolean(row.metaData?.cls) === cls)
              .filter((row) => row.metaData?.counselId === counsel.id)
              .reduce(
                (accumulator, row) =>
                  accumulator + (row.metaData?.counselsSuccessFeeAmount || 0),
                0,
              );

            const totalCounselsSuccessFeeRow: ExportRow = {
              cells: {
                [ExportColumnType.description]: {
                  text: `Counsel's Success Fee (${counsel.name}):`,
                },
                [ExportColumnType.subtotal]: {
                  text: CurrencyService.numberToCurrency(
                    totalCounselsSuccessFee,
                  ),
                },
              },
              metaData: {
                cls,
                counselId: counsel.id,
                summaryType:
                  ExportRowMetaDataSummaryType.partCounselsSuccessFee,
                summaryAmount: totalCounselsSuccessFee,
              },
            };

            const totalCounselsSuccessFeeVat = rows
              .filter((row) => Boolean(row.metaData?.cls) === cls)
              .filter((row) => row.metaData?.counselId === counsel.id)
              .reduce(
                (accumulator, row) =>
                  accumulator +
                  (row.metaData?.counselsSuccessFeeVatAmount || 0),
                0,
              );

            const totalCounselsSuccessFeeVatRow: ExportRow = {
              cells: {
                [ExportColumnType.description]: {
                  text: `VAT Thereon (${counsel.name}):`,
                },
                [ExportColumnType.subtotal]: {
                  text: CurrencyService.numberToCurrency(
                    totalCounselsSuccessFeeVat,
                  ),
                },
              },
              metaData: {
                cls,
                counselId: counsel.id,
                summaryType:
                  ExportRowMetaDataSummaryType.partCounselsSuccessFeeVat,
                summaryAmount: totalCounselsSuccessFeeVat,
              },
            };

            return [
              totalCounselsFeeRow,
              totalCounselsFeeVatRow,
              totalCounselsSuccessFeeRow,
              totalCounselsSuccessFeeVatRow,
            ];
          })
          .flat();

        const totalDisbursements = rows
          .filter((row) => Boolean(row.metaData?.cls) === cls)
          .reduce(
            (accumulator, row) =>
              accumulator + (row.metaData?.disbursementsAmount || 0),
            0,
          );

        const totalDisbursementsRow: ExportRow = {
          cells: {
            [ExportColumnType.description]: { text: 'Disbursements:' },
            [ExportColumnType.subtotal]: {
              text: CurrencyService.numberToCurrency(totalDisbursements),
            },
          },
          metaData: {
            cls,
            summaryType: ExportRowMetaDataSummaryType.partDisbursements,
            summaryAmount: totalDisbursements,
          },
        };

        const totalDisbursementsVat = rows
          .filter((row) => Boolean(row.metaData?.cls) === cls)
          .reduce(
            (accumulator, row) =>
              accumulator + (row.metaData?.disbursementsVatAmount || 0),
            0,
          );

        const totalDisbursementsVatRow: ExportRow = {
          cells: {
            [ExportColumnType.description]: { text: 'VAT Thereon:' },
            [ExportColumnType.subtotal]: {
              text: CurrencyService.numberToCurrency(totalDisbursementsVat),
            },
          },
          metaData: {
            cls,
            summaryType: ExportRowMetaDataSummaryType.partDisbursementsVat,
            summaryAmount: totalDisbursementsVat,
          },
        };

        const partSummaryRows: ExportRow[] = [
          totalProfitCostsRow,
          totalProfitCostsVatRow,
          totalSolicitorsSuccessFeeRow,
          totalSolicitorsSuccessFeeVatRow,
          ...totalCounselsFeeRows,
          totalDisbursementsRow,
          totalDisbursementsVatRow,
        ];

        const partTotal = partSummaryRows.reduce(
          (accumulator, row) => accumulator + row.metaData!.summaryAmount!,
          0,
        );

        const partTotalRow: ExportRow = {
          cells: {
            [ExportColumnType.description]: {
              text: 'Total:',
              bold: true,
              underline: true,
            },
            [ExportColumnType.subtotal]: {
              text: CurrencyService.numberToCurrency(partTotal),
            },
          },
          metaData: {
            cls,
            summaryType: ExportRowMetaDataSummaryType.partTotal,
            summaryAmount: partTotal,
          },
        };

        return [...partSummaryRows, partTotalRow];
      })
      .flat();

    const emptyRowsRemovedRows = this.removeEmptySummaryRows(
      allClsAndInterPartesPartSummaryRows,
    );

    const clsInterPartesSeparatedRows =
      ExportClsService.applyClsInterpartiesBlockSeparation(
        emptyRowsRemovedRows,
      );

    const partSummaryTitleRows = [
      ...(clsInterPartesSeparatedRows.length
        ? [ExportService.createTitleRow('Part Summary:', true, 1)]
        : []),
    ];

    return [...partSummaryTitleRows, ...clsInterPartesSeparatedRows];
  }

  static createBillSummaryRows(
    rows: ExportRow[],
    counsels: Counsel[],
  ): ExportRow[] {
    const allClsAndInterPartesBillSummaryRows = [false, true]
      .map((cls) => {
        const totalProfitCosts = rows
          .filter((row) => Boolean(row.metaData?.cls) === cls)
          .filter(
            (row) =>
              row.metaData?.summaryType ===
              ExportRowMetaDataSummaryType.partProfitCosts,
          )
          .reduce(
            (accumulator, row) => accumulator + row.metaData!.summaryAmount!,
            0,
          );

        const totalProfitCostsRow: ExportRow = {
          cells: {
            [ExportColumnType.description]: { text: 'Profit Costs:' },
            [ExportColumnType.subtotal]: {
              text: CurrencyService.numberToCurrency(totalProfitCosts),
            },
          },
          metaData: {
            cls,
            summaryType: ExportRowMetaDataSummaryType.billProfitCosts,
            summaryAmount: totalProfitCosts,
          },
        };

        const totalProfitCostsVat = rows
          .filter((row) => Boolean(row.metaData?.cls) === cls)
          .filter(
            (row) =>
              row.metaData?.summaryType ===
              ExportRowMetaDataSummaryType.partProfitCostsVat,
          )
          .reduce(
            (accumulator, row) => accumulator + row.metaData!.summaryAmount!,
            0,
          );

        const totalProfitCostsVatRow: ExportRow = {
          cells: {
            [ExportColumnType.description]: { text: 'VAT Thereon:' },
            [ExportColumnType.subtotal]: {
              text: CurrencyService.numberToCurrency(totalProfitCostsVat),
            },
          },
          metaData: {
            cls,
            summaryType: ExportRowMetaDataSummaryType.billProfitCostsVat,
            summaryAmount: totalProfitCostsVat,
          },
        };

        const totalSolicitorsSuccessFee = rows
          .filter((row) => Boolean(row.metaData?.cls) === cls)
          .filter(
            (row) =>
              row.metaData?.summaryType ===
              ExportRowMetaDataSummaryType.partSolicitorsSuccessFee,
          )
          .reduce(
            (accumulator, row) => accumulator + row.metaData!.summaryAmount!,
            0,
          );

        const totalSolicitorsSuccessFeeRow: ExportRow = {
          cells: {
            [ExportColumnType.description]: {
              text: `Solicitor's Success Fee:`,
            },
            [ExportColumnType.subtotal]: {
              text: CurrencyService.numberToCurrency(totalSolicitorsSuccessFee),
            },
          },
          metaData: {
            cls,
            summaryType: ExportRowMetaDataSummaryType.billSolicitorsSuccessFee,
            summaryAmount: totalSolicitorsSuccessFee,
          },
        };

        const totalSolicitorsSuccessFeeVat = rows
          .filter((row) => Boolean(row.metaData?.cls) === cls)
          .filter(
            (row) =>
              row.metaData?.summaryType ===
              ExportRowMetaDataSummaryType.partSolicitorsSuccessFeeVat,
          )
          .reduce(
            (accumulator, row) => accumulator + row.metaData!.summaryAmount!,
            0,
          );

        const totalSolicitorsSuccessFeeVatRow: ExportRow = {
          cells: {
            [ExportColumnType.description]: { text: 'VAT Thereon:' },
            [ExportColumnType.subtotal]: {
              text: CurrencyService.numberToCurrency(
                totalSolicitorsSuccessFeeVat,
              ),
            },
          },
          metaData: {
            cls,
            summaryType:
              ExportRowMetaDataSummaryType.billSolicitorsSuccessFeeVat,
            summaryAmount: totalSolicitorsSuccessFeeVat,
          },
        };

        const totalCounselsFeeRows: ExportRow[] = counsels
          .map((counsel) => {
            const totalCounselsFee = rows
              .filter((row) => Boolean(row.metaData?.cls) === cls)
              .filter(
                (row) =>
                  row.metaData?.summaryType ===
                    ExportRowMetaDataSummaryType.partCounselsFee &&
                  row.metaData?.counselId === counsel.id,
              )
              .reduce(
                (accumulator, row) =>
                  accumulator + row.metaData!.summaryAmount!,
                0,
              );

            const totalCounselsFeeRow: ExportRow = {
              cells: {
                [ExportColumnType.description]: {
                  text: `Counsel's Fee (${counsel.name}):`,
                },
                [ExportColumnType.subtotal]: {
                  text: CurrencyService.numberToCurrency(totalCounselsFee),
                },
              },
              metaData: {
                cls,
                counselId: counsel.id,
                summaryType: ExportRowMetaDataSummaryType.billCounselsFee,
                summaryAmount: totalCounselsFee,
              },
            };

            const totalCounselsFeeVat = rows
              .filter((row) => Boolean(row.metaData?.cls) === cls)
              .filter(
                (row) =>
                  row.metaData?.summaryType ===
                    ExportRowMetaDataSummaryType.partCounselsFeeVat &&
                  row.metaData?.counselId === counsel.id,
              )
              .reduce(
                (accumulator, row) =>
                  accumulator + row.metaData!.summaryAmount!,
                0,
              );

            const totalCounselsFeeVatRow: ExportRow = {
              cells: {
                [ExportColumnType.description]: {
                  text: `VAT Thereon (${counsel.name}):`,
                },
                [ExportColumnType.subtotal]: {
                  text: CurrencyService.numberToCurrency(totalCounselsFeeVat),
                },
              },
              metaData: {
                cls,
                counselId: counsel.id,
                summaryType: ExportRowMetaDataSummaryType.billCounselsFeeVat,
                summaryAmount: totalCounselsFeeVat,
              },
            };

            const totalCounselsSuccessFee = rows
              .filter((row) => Boolean(row.metaData?.cls) === cls)
              .filter(
                (row) =>
                  row.metaData?.summaryType ===
                    ExportRowMetaDataSummaryType.partCounselsSuccessFee &&
                  row.metaData?.counselId === counsel.id,
              )
              .reduce(
                (accumulator, row) =>
                  accumulator + row.metaData!.summaryAmount!,
                0,
              );

            const totalCounselsSuccessFeeRow: ExportRow = {
              cells: {
                [ExportColumnType.description]: {
                  text: `Counsel's Success Fee (${counsel.name}):`,
                },
                [ExportColumnType.subtotal]: {
                  text: CurrencyService.numberToCurrency(
                    totalCounselsSuccessFee,
                  ),
                },
              },
              metaData: {
                cls,
                counselId: counsel.id,
                summaryType:
                  ExportRowMetaDataSummaryType.billCounselsSuccessFee,
                summaryAmount: totalCounselsSuccessFee,
              },
            };

            const totalCounselsSuccessFeeVat = rows
              .filter((row) => Boolean(row.metaData?.cls) === cls)
              .filter(
                (row) =>
                  row.metaData?.summaryType ===
                    ExportRowMetaDataSummaryType.partCounselsSuccessFeeVat &&
                  row.metaData?.counselId === counsel.id,
              )
              .reduce(
                (accumulator, row) =>
                  accumulator + row.metaData!.summaryAmount!,
                0,
              );

            const totalCounselsSuccessFeeVatRow: ExportRow = {
              cells: {
                [ExportColumnType.description]: {
                  text: `VAT Thereon (${counsel.name}):`,
                },
                [ExportColumnType.subtotal]: {
                  text: CurrencyService.numberToCurrency(
                    totalCounselsSuccessFeeVat,
                  ),
                },
              },
              metaData: {
                cls,
                counselId: counsel.id,
                summaryType:
                  ExportRowMetaDataSummaryType.billCounselsSuccessFeeVat,
                summaryAmount: totalCounselsSuccessFeeVat,
              },
            };

            return [
              totalCounselsFeeRow,
              totalCounselsFeeVatRow,
              totalCounselsSuccessFeeRow,
              totalCounselsSuccessFeeVatRow,
            ];
          })
          .flat();

        const totalDisbursements = rows
          .filter((row) => Boolean(row.metaData?.cls) === cls)
          .filter(
            (row) =>
              row.metaData?.summaryType ===
              ExportRowMetaDataSummaryType.partDisbursements,
          )
          .reduce(
            (accumulator, row) => accumulator + row.metaData!.summaryAmount!,
            0,
          );

        const totalDisbursementsRow: ExportRow = {
          cells: {
            [ExportColumnType.description]: { text: 'Disbursements:' },
            [ExportColumnType.subtotal]: {
              text: CurrencyService.numberToCurrency(totalDisbursements),
            },
          },
          metaData: {
            cls,
            summaryType: ExportRowMetaDataSummaryType.billDisbursements,
            summaryAmount: totalDisbursements,
          },
        };

        const totalDisbursementsVat = rows
          .filter((row) => Boolean(row.metaData?.cls) === cls)
          .filter(
            (row) =>
              row.metaData?.summaryType ===
              ExportRowMetaDataSummaryType.partDisbursementsVat,
          )
          .reduce(
            (accumulator, row) => accumulator + row.metaData!.summaryAmount!,
            0,
          );

        const totalDisbursementsVatRow: ExportRow = {
          cells: {
            [ExportColumnType.description]: { text: 'VAT Thereon:' },
            [ExportColumnType.subtotal]: {
              text: CurrencyService.numberToCurrency(totalDisbursementsVat),
            },
          },
          metaData: {
            cls,
            summaryType: ExportRowMetaDataSummaryType.billDisbursementsVat,
            summaryAmount: totalDisbursementsVat,
          },
        };

        const billSummaryRows: ExportRow[] = [
          totalProfitCostsRow,
          totalProfitCostsVatRow,
          totalSolicitorsSuccessFeeRow,
          totalSolicitorsSuccessFeeVatRow,
          ...totalCounselsFeeRows,
          totalDisbursementsRow,
          totalDisbursementsVatRow,
        ];

        const billTotal = billSummaryRows.reduce(
          (accumulator, row) => accumulator + row.metaData!.summaryAmount!,
          0,
        );

        const billTotalRow: ExportRow = {
          cells: {
            [ExportColumnType.description]: {
              text: 'Total:',
              bold: true,
              underline: true,
            },
            [ExportColumnType.subtotal]: {
              text: CurrencyService.numberToCurrency(billTotal),
            },
          },
          metaData: {
            cls,
            summaryType: ExportRowMetaDataSummaryType.billTotal,
            summaryAmount: billTotal,
          },
        };

        return [...billSummaryRows, billTotalRow];
      })
      .flat();

    const emptyRowsRemovedRows = this.removeEmptySummaryRows(
      allClsAndInterPartesBillSummaryRows,
    );

    const clsInterPartesSeparatedRows =
      ExportClsService.applyClsInterpartiesBlockSeparation(
        emptyRowsRemovedRows,
      );

    const billSummaryTitleRows = [
      ...(clsInterPartesSeparatedRows.length
        ? [ExportService.createTitleRow('Bill Summary:', true, 1)]
        : []),
    ];

    return [...billSummaryTitleRows, ...clsInterPartesSeparatedRows];
  }

  static removeEmptySummaryRows(sourceRows: ExportRow[]): ExportRow[] {
    return sourceRows.filter((row) => row.metaData?.summaryAmount);
  }
}

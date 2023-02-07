import { BillType } from '../models/bill-type.model';
import { ExportColumnType } from '../models/export-column-type.model';
import { ExportRow } from '../models/export-row.model';
import { ExportService } from './export.service';

export class ExportClsService {
  static applyClsInterPartesColumnSeparation(
    billType: BillType,
    sourceRows: ExportRow[],
  ): ExportRow[] {
    if (billType === BillType.threeColumn) {
      return sourceRows;
    }

    return sourceRows.map((row) => {
      const cells = row.cells;

      const newCells = {
        ...cells,
        [ExportColumnType.clsVat]: row.metaData?.cls ? cells.vat : undefined,
        [ExportColumnType.clsDibs]: row.metaData?.cls ? cells.dibs : undefined,
        [ExportColumnType.clsProfitCosts]: row.metaData?.cls
          ? cells.profitCosts
          : undefined,
        [ExportColumnType.iPVat]: !row.metaData?.cls ? cells.vat : undefined,
        [ExportColumnType.iPDibs]: !row.metaData?.cls ? cells.dibs : undefined,
        [ExportColumnType.iPProfitCosts]: !row.metaData?.cls
          ? cells.profitCosts
          : undefined,
        [ExportColumnType.vat]: undefined,
        [ExportColumnType.dibs]: undefined,
        [ExportColumnType.profitCosts]: undefined,
      };

      return { ...row, cells: newCells };
    });
  }

  static applyClsInterpartiesBlockSeparation(
    sourceRows: ExportRow[],
  ): ExportRow[] {
    // Must check specifically for true or false, because title rows etc return undefined, which looks like inter partes
    const rowsContainBothClsAndInterPartes =
      sourceRows.some((row) => row.metaData?.cls === true) &&
      sourceRows.some((row) => row.metaData?.cls === false);

    if (!rowsContainBothClsAndInterPartes) {
      return sourceRows;
    }

    const clsBlockTitle = ExportService.createTitleRow(
      'Payable by L.C.S only',
      false,
      0,
      { metaData: { cls: true } },
    );
    const interPartesBlockTitle = ExportService.createTitleRow(
      'Payable Inter Partes',
      false,
      0,
      { metaData: { cls: false } },
    );

    const allRows = [clsBlockTitle, interPartesBlockTitle, ...sourceRows];

    const allInterPartesRows = allRows.filter((row) => !row.metaData?.cls);
    const allClsRows = allRows.filter((row) => row.metaData?.cls);

    return [...allInterPartesRows, ...allClsRows];
  }
}

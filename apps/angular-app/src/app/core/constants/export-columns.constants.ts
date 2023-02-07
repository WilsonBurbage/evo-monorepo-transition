import { Alignment } from '../models/alignment.model';
import { BillType } from '../models/bill-type.model';
import { ExportColumnType } from '../models/export-column-type.model';
import { ExportColumn } from '../models/export-column.model';

const EXPORT_COLUMNS_THREE_COLUMN: ExportColumn[] = [
  {
    type: ExportColumnType.no,
    width: 7,
    title: 'Item no.',
    alignment: Alignment.centre,
  },
  {
    type: ExportColumnType.description,
    width: 63,
    title: 'Description of work done',
  },
  {
    type: ExportColumnType.subtotal,
    width: 10,
    alignment: Alignment.right,
    inset: true,
  },
  {
    type: ExportColumnType.vat,
    width: 10,
    title: 'VAT',
    alignment: Alignment.right,
  },
  {
    type: ExportColumnType.dibs,
    width: 10,
    title: 'Dibs',
    alignment: Alignment.right,
  },
  {
    type: ExportColumnType.profitCosts,
    width: 10,
    title: 'Profit costs',
    alignment: Alignment.right,
  },
];

const EXPORT_COLUMNS_SIX_COLUMN: ExportColumn[] = [
  {
    type: ExportColumnType.no,
    width: 7,
    title: 'Item no.',
    alignment: Alignment.centre,
  },
  {
    type: ExportColumnType.description,
    width: 33,
    title: 'Description of work done',
  },
  {
    type: ExportColumnType.subtotal,
    width: 10,
    alignment: Alignment.right,
    inset: true,
  },
  {
    type: ExportColumnType.clsVat,
    width: 10,
    title: 'VAT',
    alignment: Alignment.right,
  },
  {
    type: ExportColumnType.clsDibs,
    width: 10,
    title: 'Dibs',
    alignment: Alignment.right,
  },
  {
    type: ExportColumnType.clsProfitCosts,
    width: 10,
    title: 'Profit costs',
    alignment: Alignment.right,
  },
  {
    type: ExportColumnType.iPVat,
    width: 10,
    title: 'VAT',
    alignment: Alignment.right,
  },
  {
    type: ExportColumnType.iPDibs,
    width: 10,
    title: 'Dibs',
    alignment: Alignment.right,
  },
  {
    type: ExportColumnType.iPProfitCosts,
    width: 10,
    title: 'Profit costs',
    alignment: Alignment.right,
  },
];

export const BILL_TYPE_COLUMN_SETS_MAP: { [key in BillType]: ExportColumn[] } =
  {
    [BillType.threeColumn]: EXPORT_COLUMNS_THREE_COLUMN,
    [BillType.sixColumn]: EXPORT_COLUMNS_SIX_COLUMN,
  };

import { Alignment } from './alignment.model';
import { ExportColumnType } from './export-column-type.model';

export interface ExportColumn {
  type: ExportColumnType;
  width: number;
  title?: string;
  alignment?: Alignment;
  inset?: boolean;
}

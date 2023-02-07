import { ExportColumnType } from './export-column-type.model';
import { StylableText } from './stylable-text.model';

export type ExportCells = { [key in ExportColumnType]?: StylableText };

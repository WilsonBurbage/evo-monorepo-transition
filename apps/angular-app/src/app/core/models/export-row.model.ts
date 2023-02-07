import { ExportCells } from './export-cells.model';
import { ExportRowMetaData } from './export-row-meta-data.model';
import { JumpToLink } from './jump-to-link.model';
import { StackWidgetConfig } from './stack-widget-config.model';
import { StackWidgetReference } from './stack-widget-reference.model';

export interface ExportRow {
  cells: ExportCells;
  metaData?: Partial<ExportRowMetaData>;
  unspaced?: boolean;
  stackWidgetReference?: StackWidgetReference;
  stackWidgetConfig?: StackWidgetConfig;
  jumpToLink?: JumpToLink;
  notes?: string;
}

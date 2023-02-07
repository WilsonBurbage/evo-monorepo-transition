import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ExportColumnType } from '../../../../core/models/export-column-type.model';
import { ExportColumn } from '../../../../core/models/export-column.model';
import {
  ExportDocumentType,
  EXPORT_DOCUMENT_TYPE_PREVIEW_SETUPS_MAP,
} from '../../../../core/models/export-document-type.model';
import { ExportRow } from '../../../../core/models/export-row.model';
import { JumpToLink } from '../../../../core/models/jump-to-link.model';
import { PreviewSetup } from '../../../../core/models/preview-setup.model';
import { StylableText } from '../../../../core/models/stylable-text.model';
import { BaseComponentClass } from './../../../../core/classes/base-component.class';

@Component({
  selector: 'app-preview-dumb',
  templateUrl: './preview-dumb.component.html',
  styleUrls: ['./preview-dumb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreviewDumbComponent extends BaseComponentClass {
  @Input() activePreviewExportDocumentType!: ExportDocumentType;
  @Input() columns!: ExportColumn[];
  @Input() rows!: ExportRow[];
  @Input() jumpToLinks!: JumpToLink[];

  @Output() exportRowDoubleClicked = new EventEmitter<ExportRow>();

  previewSetupForActivePreviewExportDocumentType(): PreviewSetup {
    return EXPORT_DOCUMENT_TYPE_PREVIEW_SETUPS_MAP[
      this.activePreviewExportDocumentType
    ];
  }

  previewHasAnyVisibleColumnTitles(): boolean {
    return this.columns.some((column) => column.title);
  }

  exportRowCellsAsArray(exportRowCells: {
    [key in ExportColumnType]: StylableText;
  }): StylableText[] {
    const result = this.columns.map((column) => {
      const baseExportRowCell = exportRowCells[column.type];

      if (!baseExportRowCell) {
        return { text: '' };
      }

      return {
        ...baseExportRowCell,
        alignment: baseExportRowCell.alignment || column.alignment,
      };
    });

    return result;
  }

  onExportRowDoubleClicked(exportRow: ExportRow): void {
    this.exportRowDoubleClicked.emit(exportRow);
  }

  onJumpToLinkClicked(jumpToLink: JumpToLink): void {
    const rowElement = document.querySelectorAll(
      `[jump-to-id="${jumpToLink.id}"]`,
    )[0];

    rowElement.scrollIntoView({ block: 'center' });
  }
}

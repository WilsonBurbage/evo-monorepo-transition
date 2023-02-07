import { Component, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { ExportColumn } from '../../../../core/models/export-column.model';
import { ExportDocumentType } from '../../../../core/models/export-document-type.model';
import { ExportRow } from '../../../../core/models/export-row.model';
import { JumpToLink } from '../../../../core/models/jump-to-link.model';
import { BaseComponentClass } from './../../../../core/classes/base-component.class';
import * as exportSelectors from './../../../../core/state/export/export.selectors';
import * as uiActions from './../../../../core/state/ui/ui.actions';
import * as uiSelectors from './../../../../core/state/ui/ui.selectors';

@Component({
  selector: 'app-preview-smart',
  templateUrl: './preview-smart.component.html',
  styleUrls: ['./preview-smart.component.scss'],
})
export class PreviewSmartComponent extends BaseComponentClass {
  activePreviewExportDocumentType$: Observable<ExportDocumentType | undefined>;
  columns$: Observable<ExportColumn[] | undefined>;
  rows$: Observable<ExportRow[] | undefined>;
  jumpToLinks$: Observable<JumpToLink[] | undefined>;

  constructor(injector: Injector) {
    super(injector);

    this.activePreviewExportDocumentType$ = this.store$.select(
      uiSelectors.getActivePreviewExportDocumentType,
    );
    this.columns$ = this.store$.select(exportSelectors.getExportColumns());
    this.rows$ = this.store$.select(exportSelectors.getExportRows());
    this.jumpToLinks$ = this.store$.select(
      exportSelectors.getExportJumpToLinks,
    );
  }

  onExportRowDoubleClicked(exportRow: ExportRow): void {
    if (exportRow.stackWidgetReference) {
      this.store$.dispatch(
        uiActions.pushStackWidget({
          stackWidgetReference: exportRow.stackWidgetReference,
          config: exportRow.stackWidgetConfig,
        }),
      );
    }
  }
}

import { Component } from '@angular/core';
import { StackWidgetSmartComponentClass } from '../../../../core/classes/stack-widget-smart-component.class';
import { LOCAL_STORAGE_KEY_EXPORT_TARGET_PATH } from '../../../../core/constants/local-storage.constants';
import { DocumentExportConfig } from '../../../../core/models/document-export-config.model';
import { LocalStorageService } from '../../../../core/services/local-storage.service';
import * as wordFileActions from '../../../../core/state/word-file/word-file.actions';

@Component({
  selector: 'app-export-smart',
  templateUrl: './export-smart.component.html',
  styleUrls: ['./export-smart.component.scss'],
})
export class ExportSmartComponent extends StackWidgetSmartComponentClass {
  onExportClicked(documentExportConfig: DocumentExportConfig): void {
    LocalStorageService.setLocalStorage(
      LOCAL_STORAGE_KEY_EXPORT_TARGET_PATH,
      documentExportConfig.targetFolderPath,
    );

    this.store$.dispatch(
      wordFileActions.exportDocumentsToWord({ documentExportConfig }),
    );

    this.pop();
  }
}

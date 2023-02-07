import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { StackWidgetDumbComponentClass } from '../../../../core/classes/stack-widget-dumb-component.class';
import { LOCAL_STORAGE_KEY_EXPORT_TARGET_PATH } from '../../../../core/constants/local-storage.constants';
import { DocumentExportConfig } from '../../../../core/models/document-export-config.model';
import { FormSchemaItemType } from '../../../../core/models/form-schema-item-type.model';
import { FormSchemaItem } from '../../../../core/models/form-schema-item.model';
import { FormSchema } from '../../../../core/models/form-schema.model';
import { LocalStorageService } from '../../../../core/services/local-storage.service';

@Component({
  selector: 'app-export-dumb',
  templateUrl: './export-dumb.component.html',
  styleUrls: ['./export-dumb.component.scss'],
})
export class ExportDumbComponent
  extends StackWidgetDumbComponentClass<DocumentExportConfig>
  implements OnInit
{
  @Output() export = new EventEmitter<DocumentExportConfig>();

  exportSchema!: FormSchema;

  form!: FormGroup;

  ngOnInit(): void {
    this.exportSchema = {
      formSchemaSections: [
        {
          formSchemaItems: [
            {
              controlName: 'targetFolderPath',
              label: 'Target folder',
              type: FormSchemaItemType.text,
              validators: [Validators.required],
            },
            {
              controlName: 'selectFolder',
              type: FormSchemaItemType.button,
              buttonConfig: { buttonLabel: 'Select folder...' },
            },
          ],
        },
        {
          formSchemaItems: [
            {
              controlName: 'frontSheet',
              label: 'Front sheet',
              type: FormSchemaItemType.checkbox,
            },

            {
              controlName: 'bill',
              label: 'Bill',
              type: FormSchemaItemType.checkbox,
            },
            {
              controlName: 'backSheet',
              label: 'Back sheet',
              type: FormSchemaItemType.checkbox,
            },
          ],
        },
      ],
    };
  }

  onFormGroupGenerated(form: FormGroup): void {
    this.form = form;

    this.form.patchValue({
      targetFolderPath: LocalStorageService.getLocalStorage(
        LOCAL_STORAGE_KEY_EXPORT_TARGET_PATH,
      ),
    });
  }

  onSchemaButtonClicked(formSchemaItem: FormSchemaItem): void {
    if (formSchemaItem.controlName === 'selectFolder') {
      window.bridge.commands.selectFolder().then((targetFolderPath) => {
        if (targetFolderPath) {
          this.form.patchValue({ targetFolderPath });
        }
      });
    }
  }

  onExportClicked(): void {
    this.export.emit(this.form.value);
  }
}

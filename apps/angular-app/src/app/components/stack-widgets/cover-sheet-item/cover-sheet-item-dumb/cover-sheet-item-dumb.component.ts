import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { StackWidgetDumbComponentClass } from '../../../../core/classes/stack-widget-dumb-component.class';
import {
  CoverSheetItemType,
  COVER_SHEET_ITEM_TYPE_NAMES_MAP,
} from '../../../../core/models/cover-sheet-item-type.model';
import { CoverSheetItem } from '../../../../core/models/cover-sheet-item.model';
import { FormSchemaItemType } from '../../../../core/models/form-schema-item-type.model';
import { FormSchema } from '../../../../core/models/form-schema.model';
import { FormsService } from '../../../../core/services/forms.service';

@Component({
  selector: 'app-cover-sheet-item-dumb',
  templateUrl: './cover-sheet-item-dumb.component.html',
  styleUrls: ['./cover-sheet-item-dumb.component.scss'],
})
export class CoverSheetItemDumbComponent
  extends StackWidgetDumbComponentClass<CoverSheetItem>
  implements OnInit
{
  @Input() coverSheetItem!: CoverSheetItem;

  coverSheetItemSchema!: FormSchema;

  form!: FormGroup;

  ngOnInit(): void {
    this.coverSheetItemSchema = {
      formSchemaSections: [
        {
          formSchemaItems: [
            {
              controlName: 'coverSheetItemType',
              label: 'Type',
              type: FormSchemaItemType.select,
              optionsConfig: {
                options: FormsService.createSelectOptionsFromEnum(
                  CoverSheetItemType,
                  COVER_SHEET_ITEM_TYPE_NAMES_MAP,
                ),
              },
            },
          ],
        },
        {
          formSchemaItems: [
            {
              controlName: 'text',
              label: 'Text',
              type: FormSchemaItemType.textArea,
            },
          ],
          showIfMethod: () =>
            this.form.value.coverSheetItemType === CoverSheetItemType.text,
        },
        {
          formSchemaItems: [
            {
              controlName: 'bold',
              label: 'Bold',
              type: FormSchemaItemType.checkbox,
            },
            {
              controlName: 'italic',
              label: 'Italic',
              type: FormSchemaItemType.checkbox,
            },
            {
              controlName: 'underline',
              label: 'Underline',
              type: FormSchemaItemType.checkbox,
            },
          ],
          showIfMethod: () =>
            this.form.value.coverSheetItemType === CoverSheetItemType.text,
        },
      ],
    };
  }

  onFormGroupGenerated(form: FormGroup): void {
    this.form = form;

    FormsService.patchItemIntoFormValue(
      this.coverSheetItem,
      form,
      this.coverSheetItemSchema,
    );
  }

  onSaveClicked(): void {
    this.saved.emit(
      FormsService.patchFormValueIntoItem(
        this.coverSheetItem,
        this.form,
        this.coverSheetItemSchema,
      ),
    );
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { StackWidgetDumbComponentClass } from '../../../../core/classes/stack-widget-dumb-component.class';
import { DocumentsItem } from '../../../../core/models/documents-item.model';
import { FeeEarner } from '../../../../core/models/fee-earner.model';
import { FormSchemaItemType } from '../../../../core/models/form-schema-item-type.model';
import { FormSchema } from '../../../../core/models/form-schema.model';
import { FormsService } from '../../../../core/services/forms.service';

@Component({
  selector: 'app-documents-item-dumb',
  templateUrl: './documents-item-dumb.component.html',
  styleUrls: ['./documents-item-dumb.component.scss'],
})
export class DocumentsItemDumbComponent
  extends StackWidgetDumbComponentClass<DocumentsItem>
  implements OnInit
{
  @Input() documentsItem!: DocumentsItem;
  @Input() feeEarners!: FeeEarner[];

  documentsItemSchema!: FormSchema;

  form!: FormGroup;

  ngOnInit(): void {
    this.documentsItemSchema = {
      formSchemaSections: [
        {
          formSchemaItems: [
            {
              controlName: 'feeEarnerId',
              label: 'Fee earner',
              type: FormSchemaItemType.select,
              validators: [Validators.required],
              optionsConfig: {
                options: this.feeEarners.map((feeEarner) => ({
                  value: feeEarner.id,
                  text: feeEarner.reference,
                })),
              },
            },
          ],
        },
        {
          formSchemaItems: [
            {
              controlName: 'date',
              label: 'Date',
              type: FormSchemaItemType.date,
              validators: [Validators.required],
            },
            {
              controlName: 'description',
              label: 'Description',
              type: FormSchemaItemType.textArea,
              validators: [Validators.required],
            },
            {
              controlName: 'time',
              label: 'Time',
              type: FormSchemaItemType.time,
              validators: [Validators.required],
            },
          ],
        },
        {
          formSchemaItems: [
            {
              controlName: 'estimated',
              label: 'Estimated',
              type: FormSchemaItemType.checkbox,
            },
            {
              controlName: 'partClaimed',
              label: 'Part claimed',
              type: FormSchemaItemType.checkbox,
            },
            {
              controlName: 'notOtherwiseClaimed',
              label: 'Not otherwise claimed',
              type: FormSchemaItemType.checkbox,
            },
          ],
        },
        {
          formSchemaItems: [
            {
              controlName: 'notes',
              label: 'Notes',
              type: FormSchemaItemType.textArea,
            },
          ],
        },
      ],
    };
  }

  onFormGroupGenerated(form: FormGroup): void {
    this.form = form;

    FormsService.patchItemIntoFormValue(
      this.documentsItem,
      form,
      this.documentsItemSchema,
    );
  }

  onSaveClicked(): void {
    this.saved.emit(
      FormsService.patchFormValueIntoItem(
        this.documentsItem,
        this.form,
        this.documentsItemSchema,
      ),
    );
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { StackWidgetDumbComponentClass } from '../../../../core/classes/stack-widget-dumb-component.class';
import { BillSetup } from '../../../../core/models/bill-setup.model';
import {
  BillType,
  BILL_TYPE_NAMES_MAP,
} from '../../../../core/models/bill-type.model';
import { FormSchemaItemType } from '../../../../core/models/form-schema-item-type.model';
import { FormSchema } from '../../../../core/models/form-schema.model';
import { FormsService } from '../../../../core/services/forms.service';

@Component({
  selector: 'app-bill-setup-dumb',
  templateUrl: './bill-setup-dumb.component.html',
  styleUrls: ['./bill-setup-dumb.component.scss'],
})
export class BillSetupDumbComponent
  extends StackWidgetDumbComponentClass<BillSetup>
  implements OnInit
{
  @Input() billSetup!: BillSetup;

  billSetupSchema!: FormSchema;

  form!: FormGroup;

  ngOnInit(): void {
    this.billSetupSchema = {
      formSchemaSections: [
        {
          formSchemaItems: [
            {
              controlName: 'title',
              label: 'Title',
              type: FormSchemaItemType.text,
              validators: [Validators.required],
            },
            {
              controlName: 'billType',
              label: 'Bill type',
              type: FormSchemaItemType.select,
              validators: [Validators.required],
              optionsConfig: {
                options: FormsService.createSelectOptionsFromEnum(
                  BillType,
                  BILL_TYPE_NAMES_MAP,
                ),
              },
            },
          ],
        },
        {
          formSchemaItems: [
            {
              controlName: 'autoNumberParts',
              label: 'Auto-number parts',
              type: FormSchemaItemType.checkbox,
            },
            {
              controlName: 'includeNotesInBill',
              label: 'Include notes in bill',
              type: FormSchemaItemType.checkbox,
            },
            {
              controlName: 'includePartSummaries',
              label: 'Include part summaries',
              type: FormSchemaItemType.checkbox,
            },
          ],
        },
      ],
    };
  }

  onFormGroupGenerated(form: FormGroup): void {
    this.form = form;

    FormsService.patchItemIntoFormValue(
      this.billSetup,
      form,
      this.billSetupSchema,
    );
  }

  onSaveClicked(): void {
    this.saved.emit(
      FormsService.patchFormValueIntoItem(
        this.billSetup,
        this.form,
        this.billSetupSchema,
      ),
    );
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { StackWidgetDumbComponentClass } from '../../../../core/classes/stack-widget-dumb-component.class';
import { Counsel } from '../../../../core/models/counsel.model';
import { Disbursement } from '../../../../core/models/disbursement.model';
import { FormSchemaItemType } from '../../../../core/models/form-schema-item-type.model';
import { FormSchema } from '../../../../core/models/form-schema.model';
import { FormsService } from '../../../../core/services/forms.service';

@Component({
  selector: 'app-disbursement-dumb',
  templateUrl: './disbursement-dumb.component.html',
  styleUrls: ['./disbursement-dumb.component.scss'],
})
export class DisbursementDumbComponent
  extends StackWidgetDumbComponentClass<Disbursement>
  implements OnInit
{
  @Input() disbursement!: Disbursement;
  @Input() counsels!: Counsel[];

  disbursementSchema!: FormSchema;

  form!: FormGroup;

  ngOnInit(): void {
    this.disbursementSchema = {
      formSchemaSections: [
        {
          formSchemaItems: [
            {
              controlName: 'description',
              label: 'Description',
              type: FormSchemaItemType.textArea,
              validators: [Validators.required],
            },
          ],
        },
        {
          formSchemaItems: [
            {
              controlName: 'amount',
              label: 'Amount',
              type: FormSchemaItemType.currency,
              validators: [Validators.required],
            },
            {
              controlName: 'vat',
              label: 'VAT',
              type: FormSchemaItemType.currency,
              validators: [Validators.required],
            },
          ],
        },
        {
          formSchemaItems: [
            {
              controlName: 'counselId',
              label: 'Counsel',
              type: FormSchemaItemType.select,
              optionsConfig: {
                options: this.counsels.map((counsel) => ({
                  value: counsel.id,
                  text: counsel.name,
                })),
                includeNoneOption: true,
              },
            },
            {
              controlName: 'hasCounselSuccessFee',
              label: 'Has counsel success fee',
              type: FormSchemaItemType.checkbox,
              separateEnablerControlName: 'counselId',
            },
            {
              controlName: 'counselSuccessFeeVatPercentageOverride',
              label: 'VAT % override',
              type: FormSchemaItemType.number,
              validators: [Validators.required],
              enablerControlName: 'overrideCounselSuccessFeeVatPercentage',
              separateEnablerControlName: 'hasCounselSuccessFee',
            },
          ],
        },
        {
          formSchemaItems: [
            {
              controlName: 'travelAndWaiting',
              label: 'Travel and waiting',
              type: FormSchemaItemType.checkbox,
            },
            {
              controlName: 'additionalLiability',
              label: 'Additional liability',
              type: FormSchemaItemType.checkbox,
            },
            {
              controlName: 'cls',
              label: 'CLS',
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
      this.disbursement,
      form,
      this.disbursementSchema,
    );
  }

  onSaveClicked(): void {
    this.saved.emit(
      FormsService.patchFormValueIntoItem(
        this.disbursement,
        this.form,
        this.disbursementSchema,
      ),
    );
  }
}

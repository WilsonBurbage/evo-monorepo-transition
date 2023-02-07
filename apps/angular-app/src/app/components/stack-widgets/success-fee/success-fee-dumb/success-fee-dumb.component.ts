import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { StackWidgetDumbComponentClass } from '../../../../core/classes/stack-widget-dumb-component.class';
import { FormSchemaItemType } from '../../../../core/models/form-schema-item-type.model';
import { FormSchema } from '../../../../core/models/form-schema.model';
import { SuccessFee } from '../../../../core/models/success-fee.model';
import { FormsService } from '../../../../core/services/forms.service';

@Component({
  selector: 'app-success-fee-dumb',
  templateUrl: './success-fee-dumb.component.html',
  styleUrls: ['./success-fee-dumb.component.scss'],
})
export class SuccessFeeDumbComponent
  extends StackWidgetDumbComponentClass<SuccessFee>
  implements OnInit
{
  @Input() successFee!: SuccessFee;

  successFeeSchema!: FormSchema;

  form!: FormGroup;

  ngOnInit(): void {
    this.successFeeSchema = {
      formSchemaSections: [
        {
          formSchemaItems: [
            {
              controlName: 'description',
              label: 'Description',
              type: FormSchemaItemType.textArea,
              validators: [Validators.required],
            },
            {
              controlName: 'baseCosts',
              label: 'Base costs',
              type: FormSchemaItemType.currency,
              validators: [Validators.required],
            },
          ],
        },
      ],
    };
  }

  onFormGroupGenerated(form: FormGroup): void {
    this.form = form;

    FormsService.patchItemIntoFormValue(
      this.successFee,
      form,
      this.successFeeSchema,
    );
  }

  onSaveClicked(): void {
    this.saved.emit(
      FormsService.patchFormValueIntoItem(
        this.successFee,
        this.form,
        this.successFeeSchema,
      ),
    );
  }
}

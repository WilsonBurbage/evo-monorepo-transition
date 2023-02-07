import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { StackWidgetDumbComponentClass } from '../../../../core/classes/stack-widget-dumb-component.class';
import { FeeEarner } from '../../../../core/models/fee-earner.model';
import { FormSchemaItemType } from '../../../../core/models/form-schema-item-type.model';
import { FormSchema } from '../../../../core/models/form-schema.model';
import { RateGroup } from '../../../../core/models/rate-group.model';
import { FormsService } from '../../../../core/services/forms.service';

@Component({
  selector: 'app-fee-earner-dumb',
  templateUrl: './fee-earner-dumb.component.html',
  styleUrls: ['./fee-earner-dumb.component.scss'],
})
export class FeeEarnerDumbComponent
  extends StackWidgetDumbComponentClass<FeeEarner>
  implements OnInit
{
  @Input() feeEarner!: FeeEarner;
  @Input() rateGroups!: RateGroup[];

  feeEarnerSchema!: FormSchema;

  form!: FormGroup;

  ngOnInit(): void {
    this.feeEarnerSchema = {
      formSchemaSections: [
        {
          formSchemaItems: [
            {
              controlName: 'reference',
              label: 'Reference',
              type: FormSchemaItemType.text,
              validators: [Validators.required],
            },
            {
              controlName: 'rateGroupId',
              label: 'Rate group',
              type: FormSchemaItemType.select,
              validators: [Validators.required],
              optionsConfig: {
                options: this.rateGroups.map((rateGroup) => ({
                  value: rateGroup.id,
                  text: rateGroup.reference,
                })),
              },
            },
          ],
        },
      ],
    };
  }

  onFormGroupGenerated(form: FormGroup): void {
    this.form = form;

    FormsService.patchItemIntoFormValue(
      this.feeEarner,
      form,
      this.feeEarnerSchema,
    );
  }

  onSaveClicked(): void {
    this.saved.emit(
      FormsService.patchFormValueIntoItem(
        this.feeEarner,
        this.form,
        this.feeEarnerSchema,
      ),
    );
  }
}

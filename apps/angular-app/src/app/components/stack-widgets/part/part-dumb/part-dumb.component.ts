import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { StackWidgetDumbComponentClass } from '../../../../core/classes/stack-widget-dumb-component.class';
import { FormSchemaItemType } from '../../../../core/models/form-schema-item-type.model';
import { FormSchema } from '../../../../core/models/form-schema.model';
import { Part } from '../../../../core/models/part.model';
import { FormsService } from '../../../../core/services/forms.service';

@Component({
  selector: 'app-part-dumb',
  templateUrl: './part-dumb.component.html',
  styleUrls: ['./part-dumb.component.scss'],
})
export class PartDumbComponent
  extends StackWidgetDumbComponentClass<Part>
  implements OnInit
{
  @Input() part!: Part;

  partSchema!: FormSchema;

  form!: FormGroup;

  ngOnInit(): void {
    this.partSchema = {
      formSchemaSections: [
        {
          formSchemaItems: [
            {
              controlName: 'description',
              label: 'Description',
              type: FormSchemaItemType.text,
              validators: [Validators.required],
            },
            {
              controlName: 'solicitorReference',
              label: 'Solicitor reference',
              type: FormSchemaItemType.text,
            },
          ],
        },
        {
          formSchemaItems: [
            {
              controlName: 'vatPercentage',
              label: 'VAT %',
              type: FormSchemaItemType.number,
              validators: [Validators.required],
              enablerControlName: 'hasVat',
            },
            {
              controlName: 'successFeePercentage',
              label: 'Success fee %',
              type: FormSchemaItemType.number,
              validators: [Validators.required],
              enablerControlName: 'hasSuccessFee',
            },
          ],
        },
        {
          formSchemaItems: [
            {
              controlName: 'careAndConductPercentage',
              label: 'Care and conduct %',
              type: FormSchemaItemType.number,
              validators: [Validators.required],
              enablerControlName: 'hasCareAndConduct',
            },
            {
              controlName: 'applyCareAndConductToTravelAndWaiting',
              label: 'Apply care and conduct to travel and waiting',
              type: FormSchemaItemType.checkbox,
              separateEnablerControlName: 'hasCareAndConduct',
            },
          ],
        },
      ],
    };
  }

  onFormGroupGenerated(form: FormGroup): void {
    this.form = form;

    FormsService.patchItemIntoFormValue(this.part, form, this.partSchema);
  }

  onSaveClicked(): void {
    this.saved.emit(
      FormsService.patchFormValueIntoItem(
        this.part,
        this.form,
        this.partSchema,
      ),
    );
  }
}

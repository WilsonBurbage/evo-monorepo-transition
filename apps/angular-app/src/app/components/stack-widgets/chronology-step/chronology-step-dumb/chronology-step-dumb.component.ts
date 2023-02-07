import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { StackWidgetDumbComponentClass } from '../../../../core/classes/stack-widget-dumb-component.class';
import { ChronologyStep } from '../../../../core/models/chronology-step.model';
import { FormSchemaColumnSetup } from '../../../../core/models/form-schema-column-setup.model';
import { FormSchemaItemType } from '../../../../core/models/form-schema-item-type.model';
import { FormSchema } from '../../../../core/models/form-schema.model';
import { FormsService } from '../../../../core/services/forms.service';

@Component({
  selector: 'app-chronology-step-dumb',
  templateUrl: './chronology-step-dumb.component.html',
  styleUrls: ['./chronology-step-dumb.component.scss'],
})
export class ChronologyStepDumbComponent
  extends StackWidgetDumbComponentClass<ChronologyStep>
  implements OnInit
{
  @Input() chronologyStep!: ChronologyStep;

  chronologyStepSchema!: FormSchema;

  form!: FormGroup;

  ngOnInit(): void {
    this.chronologyStepSchema = {
      formSchemaSections: [
        {
          columnSetup: FormSchemaColumnSetup.matchNextSection,
          formSchemaItems: [
            {
              controlName: 'date',
              label: 'Date',
              type: FormSchemaItemType.date,
              validators: [Validators.required],
            },
          ],
        },
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
      ],
    };
  }

  onFormGroupGenerated(form: FormGroup): void {
    this.form = form;

    FormsService.patchItemIntoFormValue(
      this.chronologyStep,
      form,
      this.chronologyStepSchema,
    );
  }

  onSaveClicked(): void {
    this.saved.emit(
      FormsService.patchFormValueIntoItem(
        this.chronologyStep,
        this.form,
        this.chronologyStepSchema,
      ),
    );
  }
}

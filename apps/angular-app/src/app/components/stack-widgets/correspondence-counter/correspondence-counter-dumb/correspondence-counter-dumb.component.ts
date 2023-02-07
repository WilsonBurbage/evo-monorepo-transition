import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { StackWidgetDumbComponentClass } from '../../../../core/classes/stack-widget-dumb-component.class';
import { CorrespondenceCounter } from '../../../../core/models/correspondence-counter.model';
import { FormSchemaItemType } from '../../../../core/models/form-schema-item-type.model';
import { FormSchema } from '../../../../core/models/form-schema.model';
import { FormsService } from '../../../../core/services/forms.service';

@Component({
  selector: 'app-correspondence-counter-dumb',
  templateUrl: './correspondence-counter-dumb.component.html',
  styleUrls: ['./correspondence-counter-dumb.component.scss'],
})
export class CorrespondenceCounterDumbComponent
  extends StackWidgetDumbComponentClass<CorrespondenceCounter>
  implements OnInit
{
  @Input() correspondenceCounter!: CorrespondenceCounter;

  correspondenceCounterSchema!: FormSchema;

  form!: FormGroup;

  ngOnInit(): void {
    this.correspondenceCounterSchema = {
      formSchemaSections: [
        {
          formSchemaItems: [
            {
              controlName: 'calls',
              label: 'Calls',
              type: FormSchemaItemType.number,
              validators: [Validators.required],
            },
            {
              controlName: 'lettersIn',
              label: 'Letters in',
              type: FormSchemaItemType.number,
              validators: [Validators.required],
            },
            {
              controlName: 'lettersOut',
              label: 'Letters out',
              type: FormSchemaItemType.number,
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
      this.correspondenceCounter,
      form,
      this.correspondenceCounterSchema,
    );
  }

  onSaveClicked(): void {
    this.saved.emit(
      FormsService.patchFormValueIntoItem(
        this.correspondenceCounter,
        this.form,
        this.correspondenceCounterSchema,
      ),
    );
  }
}

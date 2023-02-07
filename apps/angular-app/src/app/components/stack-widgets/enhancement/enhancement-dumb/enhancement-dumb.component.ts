import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { StackWidgetDumbComponentClass } from '../../../../core/classes/stack-widget-dumb-component.class';
import { Enhancement } from '../../../../core/models/enhancement.model';
import { FormSchemaItemType } from '../../../../core/models/form-schema-item-type.model';
import { FormSchema } from '../../../../core/models/form-schema.model';
import { FormsService } from '../../../../core/services/forms.service';

@Component({
  selector: 'app-enhancement-dumb',
  templateUrl: './enhancement-dumb.component.html',
  styleUrls: ['./enhancement-dumb.component.scss'],
})
export class EnhancementDumbComponent
  extends StackWidgetDumbComponentClass<Enhancement>
  implements OnInit
{
  @Input() enhancement!: Enhancement;

  enhancementSchema!: FormSchema;

  form!: FormGroup;

  ngOnInit(): void {
    this.enhancementSchema = {
      formSchemaSections: [
        {
          formSchemaItems: [
            {
              controlName: 'name',
              label: 'Name',
              type: FormSchemaItemType.text,
              validators: [Validators.required],
            },
            {
              controlName: 'percentage',
              label: '%',
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
      this.enhancement,
      form,
      this.enhancementSchema,
    );
  }

  onSaveClicked(): void {
    this.saved.emit(
      FormsService.patchFormValueIntoItem(
        this.enhancement,
        this.form,
        this.enhancementSchema,
      ),
    );
  }
}

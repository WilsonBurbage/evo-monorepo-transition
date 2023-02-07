import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { StackWidgetDumbComponentClass } from '../../../../core/classes/stack-widget-dumb-component.class';
import { FormSchemaItemType } from '../../../../core/models/form-schema-item-type.model';
import { FormSchema } from '../../../../core/models/form-schema.model';
import { TextReplacement } from '../../../../core/models/text-replacement.model';
import { FormsService } from '../../../../core/services/forms.service';

@Component({
  selector: 'app-text-replacement-dumb',
  templateUrl: './text-replacement-dumb.component.html',
  styleUrls: ['./text-replacement-dumb.component.scss'],
})
export class TextReplacementDumbComponent
  extends StackWidgetDumbComponentClass<TextReplacement>
  implements OnInit
{
  @Input() textReplacement!: TextReplacement;

  textReplacementSchema!: FormSchema;

  form!: FormGroup;

  ngOnInit(): void {
    this.textReplacementSchema = {
      formSchemaSections: [
        {
          formSchemaItems: [
            {
              controlName: 'input',
              label: 'Input',
              type: FormSchemaItemType.text,
              validators: [Validators.required],
              textInputConfig: { textReplacementsDisabled: true },
            },
          ],
        },
        {
          formSchemaItems: [
            {
              controlName: 'output',
              label: 'Output',
              type: FormSchemaItemType.textArea,
              validators: [Validators.required],
              textInputConfig: { textReplacementsDisabled: true },
            },
          ],
        },
      ],
    };
  }

  onFormGroupGenerated(form: FormGroup): void {
    this.form = form;

    FormsService.patchItemIntoFormValue(
      this.textReplacement,
      form,
      this.textReplacementSchema,
    );
  }

  onSaveClicked(): void {
    this.saved.emit(
      FormsService.patchFormValueIntoItem(
        this.textReplacement,
        this.form,
        this.textReplacementSchema,
      ),
    );
  }
}

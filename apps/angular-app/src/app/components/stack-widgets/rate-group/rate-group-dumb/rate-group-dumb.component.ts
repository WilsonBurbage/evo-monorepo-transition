import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { StackWidgetDumbComponentClass } from '../../../../core/classes/stack-widget-dumb-component.class';
import { FormSchemaItemType } from '../../../../core/models/form-schema-item-type.model';
import { FormSchema } from '../../../../core/models/form-schema.model';
import { RateGroup } from '../../../../core/models/rate-group.model';
import { FormsService } from '../../../../core/services/forms.service';

@Component({
  selector: 'app-rate-group-dumb',
  templateUrl: './rate-group-dumb.component.html',
  styleUrls: ['./rate-group-dumb.component.scss'],
})
export class RateGroupDumbComponent
  extends StackWidgetDumbComponentClass<RateGroup>
  implements OnInit
{
  @Input() rateGroup!: RateGroup;

  rateGroupSchema!: FormSchema;

  form!: FormGroup;

  ngOnInit(): void {
    this.rateGroupSchema = {
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
              controlName: 'name',
              label: 'Name',
              type: FormSchemaItemType.text,
              validators: [Validators.required],
            },
          ],
        },
        {
          formSchemaItems: [
            {
              controlName: 'cls',
              label: 'CLS',
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
      this.rateGroup,
      form,
      this.rateGroupSchema,
    );
  }

  onSaveClicked(): void {
    this.saved.emit(
      FormsService.patchFormValueIntoItem(
        this.rateGroup,
        this.form,
        this.rateGroupSchema,
      ),
    );
  }
}

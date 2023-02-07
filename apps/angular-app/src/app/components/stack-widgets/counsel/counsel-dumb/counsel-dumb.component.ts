import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { StackWidgetDumbComponentClass } from '../../../../core/classes/stack-widget-dumb-component.class';
import { Counsel } from '../../../../core/models/counsel.model';
import { FormSchemaColumnSetup } from '../../../../core/models/form-schema-column-setup.model';
import { FormSchemaItemType } from '../../../../core/models/form-schema-item-type.model';
import { FormSchema } from '../../../../core/models/form-schema.model';
import { FormsService } from '../../../../core/services/forms.service';

@Component({
  selector: 'app-counsel-dumb',
  templateUrl: './counsel-dumb.component.html',
  styleUrls: ['./counsel-dumb.component.scss'],
})
export class CounselDumbComponent
  extends StackWidgetDumbComponentClass<Counsel>
  implements OnInit
{
  @Input() counsel!: Counsel;

  counselSchema!: FormSchema;

  form!: FormGroup;

  ngOnInit(): void {
    this.counselSchema = {
      formSchemaSections: [
        {
          columnSetup: FormSchemaColumnSetup.matchNextSection,
          formSchemaItems: [
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
              controlName: 'attractsVat',
              label: 'Attracts VAT',
              type: FormSchemaItemType.checkbox,
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
      ],
    };
  }

  onFormGroupGenerated(form: FormGroup): void {
    this.form = form;

    FormsService.patchItemIntoFormValue(this.counsel, form, this.counselSchema);
  }

  onSaveClicked(): void {
    this.saved.emit(
      FormsService.patchFormValueIntoItem(
        this.counsel,
        this.form,
        this.counselSchema,
      ),
    );
  }
}

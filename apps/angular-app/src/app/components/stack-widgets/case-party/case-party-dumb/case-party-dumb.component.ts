import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { StackWidgetDumbComponentClass } from '../../../../core/classes/stack-widget-dumb-component.class';
import { CaseParty } from '../../../../core/models/case-party.model';
import { FormSchemaItemType } from '../../../../core/models/form-schema-item-type.model';
import { FormSchema } from '../../../../core/models/form-schema.model';
import { FormsService } from '../../../../core/services/forms.service';

@Component({
  selector: 'app-case-party-dumb',
  templateUrl: './case-party-dumb.component.html',
  styleUrls: ['./case-party-dumb.component.scss'],
})
export class CasePartyDumbComponent
  extends StackWidgetDumbComponentClass<CaseParty>
  implements OnInit
{
  @Input() caseParty!: CaseParty;

  casePartySchema!: FormSchema;

  form!: FormGroup;

  ngOnInit(): void {
    this.casePartySchema = {
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
              controlName: 'category',
              label: 'Category',
              type: FormSchemaItemType.text,
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
      this.caseParty,
      form,
      this.casePartySchema,
    );
  }

  onSaveClicked(): void {
    this.saved.emit(
      FormsService.patchFormValueIntoItem(
        this.caseParty,
        this.form,
        this.casePartySchema,
      ),
    );
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { StackWidgetDumbComponentClass } from '../../../../core/classes/stack-widget-dumb-component.class';
import { FormSchemaItemType } from '../../../../core/models/form-schema-item-type.model';
import { FormSchema } from '../../../../core/models/form-schema.model';
import { Party } from '../../../../core/models/party.model';
import { RateGroup } from '../../../../core/models/rate-group.model';
import { FormsService } from '../../../../core/services/forms.service';

@Component({
  selector: 'app-party-dumb',
  templateUrl: './party-dumb.component.html',
  styleUrls: ['./party-dumb.component.scss'],
})
export class PartyDumbComponent
  extends StackWidgetDumbComponentClass<Party>
  implements OnInit
{
  @Input() party!: Party;
  @Input() rateGroups!: RateGroup[];

  partySchema!: FormSchema;

  form!: FormGroup;

  ngOnInit(): void {
    this.partySchema = {
      formSchemaSections: [
        {
          formSchemaItems: [
            {
              controlName: 'name',
              label: 'Name',
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

    FormsService.patchItemIntoFormValue(this.party, form, this.partySchema);
  }

  onSaveClicked(): void {
    this.saved.emit(
      FormsService.patchFormValueIntoItem(
        this.party,
        this.form,
        this.partySchema,
      ),
    );
  }
}

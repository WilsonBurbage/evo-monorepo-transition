import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { StackWidgetDumbComponentClass } from '../../../../core/classes/stack-widget-dumb-component.class';
import { FormSchemaItemType } from '../../../../core/models/form-schema-item-type.model';
import { FormSchema } from '../../../../core/models/form-schema.model';
import { Narrative } from '../../../../core/models/narrative.model';
import { FormsService } from '../../../../core/services/forms.service';

@Component({
  selector: 'app-narrative-dumb',
  templateUrl: './narrative-dumb.component.html',
  styleUrls: ['./narrative-dumb.component.scss'],
})
export class NarrativeDumbComponent
  extends StackWidgetDumbComponentClass<Narrative>
  implements OnInit
{
  @Input() narrative!: Narrative;

  narrativeSchema!: FormSchema;

  form!: FormGroup;

  ngOnInit(): void {
    this.narrativeSchema = {
      formSchemaSections: [
        {
          formSchemaItems: [
            {
              controlName: 'narrative',
              label: 'Narrative',
              type: FormSchemaItemType.textArea,
            },
          ],
        },
      ],
    };
  }

  onFormGroupGenerated(form: FormGroup): void {
    this.form = form;

    FormsService.patchItemIntoFormValue(
      this.narrative,
      form,
      this.narrativeSchema,
    );
  }

  onSaveClicked(): void {
    this.saved.emit(
      FormsService.patchFormValueIntoItem(
        this.narrative,
        this.form,
        this.narrativeSchema,
      ),
    );
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { StackWidgetDumbComponentClass } from '../../../../core/classes/stack-widget-dumb-component.class';
import { CoverSheetDetails } from '../../../../core/models/cover-sheet-details.model';
import { FormSchemaItemType } from '../../../../core/models/form-schema-item-type.model';
import { FormSchema } from '../../../../core/models/form-schema.model';
import { FormsService } from '../../../../core/services/forms.service';

@Component({
  selector: 'app-cover-sheet-details-dumb',
  templateUrl: './cover-sheet-details-dumb.component.html',
  styleUrls: ['./cover-sheet-details-dumb.component.scss'],
})
export class CoverSheetDetailsDumbComponent
  extends StackWidgetDumbComponentClass<CoverSheetDetails>
  implements OnInit
{
  @Input() coverSheetDetails!: CoverSheetDetails;

  coverSheetDetailsSchema!: FormSchema;

  form!: FormGroup;

  ngOnInit(): void {
    this.coverSheetDetailsSchema = {
      formSchemaSections: [
        {
          formSchemaItems: [
            {
              controlName: 'court',
              label: 'Court',
              type: FormSchemaItemType.textArea,
            },
            {
              controlName: 'claimNumber',
              label: 'Claim number',
              type: FormSchemaItemType.text,
            },
          ],
        },
      ],
    };
  }

  onFormGroupGenerated(form: FormGroup): void {
    this.form = form;

    FormsService.patchItemIntoFormValue(
      this.coverSheetDetails,
      form,
      this.coverSheetDetailsSchema,
    );
  }

  onSaveClicked(): void {
    this.saved.emit(
      FormsService.patchFormValueIntoItem(
        this.coverSheetDetails,
        this.form,
        this.coverSheetDetailsSchema,
      ),
    );
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { StackWidgetDumbComponentClass } from '../../../../core/classes/stack-widget-dumb-component.class';
import { Attendance } from '../../../../core/models/attendance.model';
import { Enhancement } from '../../../../core/models/enhancement.model';
import { FeeEarner } from '../../../../core/models/fee-earner.model';
import { FormSchemaColumnSetup } from '../../../../core/models/form-schema-column-setup.model';
import { FormSchemaItemType } from '../../../../core/models/form-schema-item-type.model';
import { FormSchema } from '../../../../core/models/form-schema.model';
import { FormsService } from '../../../../core/services/forms.service';

@Component({
  selector: 'app-attendance-dumb',
  templateUrl: './attendance-dumb.component.html',
  styleUrls: ['./attendance-dumb.component.scss'],
})
export class AttendanceDumbComponent
  extends StackWidgetDumbComponentClass<Attendance>
  implements OnInit
{
  @Input() attendance!: Attendance;
  @Input() feeEarners!: FeeEarner[];
  @Input() enhancements!: Enhancement[];

  attendanceSchema!: FormSchema;

  form!: FormGroup;

  ngOnInit(): void {
    this.attendanceSchema = {
      formSchemaSections: [
        {
          columnSetup: FormSchemaColumnSetup.matchNextSection,
          formSchemaItems: [
            {
              controlName: 'feeEarnerId',
              label: 'Fee earner',
              type: FormSchemaItemType.select,
              validators: [Validators.required],
              optionsConfig: {
                options: this.feeEarners.map((feeEarner) => ({
                  value: feeEarner.id,
                  text: feeEarner.reference,
                })),
              },
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
            {
              controlName: 'time',
              label: 'Time',
              type: FormSchemaItemType.time,
              validators: [Validators.required],
            },
          ],
        },
        {
          formSchemaItems: [
            {
              controlName: 'travelAndWaiting',
              label: 'Travel and waiting',
              type: FormSchemaItemType.checkbox,
            },
            {
              controlName: 'counsel',
              label: 'Counsel',
              type: FormSchemaItemType.checkbox,
            },
            {
              controlName: 'advocacy',
              label: 'Advocacy',
              type: FormSchemaItemType.checkbox,
            },
            {
              controlName: 'estimated',
              label: 'Estimated',
              type: FormSchemaItemType.checkbox,
            },
            {
              controlName: 'partClaimed',
              label: 'Part claimed',
              type: FormSchemaItemType.checkbox,
            },
          ],
        },
        {
          formSchemaItems: [
            {
              controlName: 'enhancementId',
              label: 'Enhancement',
              type: FormSchemaItemType.select,
              optionsConfig: {
                options: this.enhancements.map((enhancement) => ({
                  value: enhancement.id,
                  text: enhancement.name,
                })),
                includeNoneOption: true,
              },
            },
          ],
        },
        {
          formSchemaItems: [
            {
              controlName: 'notes',
              label: 'Notes',
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
      this.attendance,
      form,
      this.attendanceSchema,
    );
  }

  onSaveClicked(): void {
    this.saved.emit(
      FormsService.patchFormValueIntoItem(
        this.attendance,
        this.form,
        this.attendanceSchema,
      ),
    );
  }
}

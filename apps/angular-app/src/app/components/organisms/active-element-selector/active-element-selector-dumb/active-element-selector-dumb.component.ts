import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { reduceAnimation } from '../../../../core/animations/reduce.animation';
import { slideVerticalAnimation } from '../../../../core/animations/slide-vertical.animation';
import {
  ACTIVE_FEE_EARNER_PROPERTY_NAME,
  ACTIVE_PART_PROPERTY_NAME,
} from '../../../../core/constants/active-element.constants';
import { FeeEarner } from '../../../../core/models/fee-earner.model';
import { FormSchemaItemType } from '../../../../core/models/form-schema-item-type.model';
import { FormSchemaItem } from '../../../../core/models/form-schema-item.model';
import { FormSchema } from '../../../../core/models/form-schema.model';
import { Part } from '../../../../core/models/part.model';
import { BaseComponentClass } from './../../../../core/classes/base-component.class';

@Component({
  selector: 'app-active-element-selector-dumb',
  templateUrl: './active-element-selector-dumb.component.html',
  styleUrls: ['./active-element-selector-dumb.component.scss'],

  animations: [slideVerticalAnimation, reduceAnimation],
})
export class ActiveElementSelectorDumbComponent
  extends BaseComponentClass
  implements OnChanges
{
  @Input() partSelectorRequired!: boolean;
  @Input() feeEarnerSelectorRequired!: boolean;
  @Input() parts!: Part[];
  @Input() feeEarners!: FeeEarner[];

  @Output() formGroupGenerated = new EventEmitter<FormGroup>();

  activeElementSchema!: FormSchema;

  form!: FormGroup;

  ngOnChanges(): void {
    if (this.parts && this.feeEarners) {
      this.recreateForm();
    }
  }

  recreateForm(): void {
    this.activeElementSchema = {
      formSchemaSections: [
        {
          formSchemaItems: [
            ...(this.partSelectorRequired
              ? [
                  {
                    controlName: ACTIVE_PART_PROPERTY_NAME,
                    label: 'Part',
                    labelledToSide: true,
                    type: FormSchemaItemType.select,
                    optionsConfig: {
                      options: this.parts.map((part) => ({
                        value: part.id,
                        text: part.description,
                      })),
                    },
                  } as FormSchemaItem,
                ]
              : []),
            ...(this.feeEarnerSelectorRequired
              ? [
                  {
                    controlName: ACTIVE_FEE_EARNER_PROPERTY_NAME,
                    label: 'Fee earner',
                    labelledToSide: true,
                    type: FormSchemaItemType.select,
                    optionsConfig: {
                      options: this.feeEarners.map((feeEarner) => ({
                        value: feeEarner.id,
                        text: feeEarner.reference,
                      })),
                    },
                  } as FormSchemaItem,
                ]
              : []),
          ],
        },
      ],
    };
  }

  onFormGroupGenerated(form: FormGroup): void {
    this.form = form;

    this.form.patchValue({
      activePartId: this.activePartId(),
      activeFeeEarnerId: this.activeFeeEarnerId(),
    });

    this.formGroupGenerated.emit(form);
  }
}

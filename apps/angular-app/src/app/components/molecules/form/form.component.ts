import {
  Component,
  EventEmitter,
  Injector,
  Input,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs';
import { slideHorizontalAnimation } from '../../../core/animations/slide-horizontal.animation';
import { slideVerticalAnimation } from '../../../core/animations/slide-vertical.animation';
import { FormSchemaColumnSetup } from '../../../core/models/form-schema-column-setup.model';
import { FormSchemaItemType } from '../../../core/models/form-schema-item-type.model';
import { FormSchemaItem } from '../../../core/models/form-schema-item.model';
import { FormSchemaSection } from '../../../core/models/form-schema-section.model';
import { FormSchema } from '../../../core/models/form-schema.model';
import { FormsService } from '../../../core/services/forms.service';
import { BaseComponentClass } from './../../../core/classes/base-component.class';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  animations: [slideVerticalAnimation, slideHorizontalAnimation],
})
export class FormComponent extends BaseComponentClass {
  @Input() set schema(formSchema: FormSchema) {
    this.formSchema = formSchema;
    this.compileForm(this.formSchema);
  }

  @Input() submitText = 'Save';
  @Input() callOutText = '';
  @Input() submitting = false;

  @Output() formGroupGenerated = new EventEmitter<FormGroup>();
  @Output() schemaButtonClicked = new EventEmitter<FormSchemaItem>();
  @Output() submitClicked = new EventEmitter();
  @Output() cancelClicked = new EventEmitter();

  form!: FormGroup;
  formSchema!: FormSchema;

  submitAttempted = false;

  constructor(injector: Injector, private fb: FormBuilder) {
    super(injector);
  }

  compileForm(formSchema: FormSchema): void {
    const flattenedFormSchemaItems =
      FormsService.flattenedFormSchemaItems(formSchema);

    this.form = this.fb.group(
      flattenedFormSchemaItems.reduce(
        (accumulator, formSchemaItem) => ({
          ...accumulator,
          [formSchemaItem.controlName]: [
            undefined,
            formSchemaItem.validators || [],
          ],
          ...(formSchemaItem.enablerControlName
            ? { [formSchemaItem.enablerControlName!]: undefined }
            : {}),
        }),
        {},
      ),
    );

    this.form.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe(() => {
      this.formSchema?.formSchemaSections.forEach((formSchemaSection) => {
        formSchemaSection.formSchemaItems
          .filter(
            (formSchemaItem) =>
              formSchemaItem.type !== FormSchemaItemType.button,
          )
          .forEach((formSchemaItem) => {
            const enablerControlValue = formSchemaItem.enablerControlName
              ? Boolean(this.form.value[formSchemaItem.enablerControlName])
              : true;

            const separateEnablerControlValue =
              formSchemaItem.separateEnablerControlName
                ? Boolean(
                    this.form.value[formSchemaItem.separateEnablerControlName],
                  )
                : true;

            const formControlShouldBeEnabled =
              enablerControlValue && separateEnablerControlValue;
            const enablerControlShouldBeEnabled = separateEnablerControlValue;

            const formControl = this.form.controls[formSchemaItem.controlName];
            if (formControl.enabled !== formControlShouldBeEnabled) {
              if (formControlShouldBeEnabled) {
                formControl.enable();
              } else {
                formControl.disable();
              }
            }

            if (formSchemaItem.enablerControlName) {
              const enablerFormControl =
                this.form.controls[formSchemaItem.enablerControlName];
              if (
                enablerFormControl.enabled !== enablerControlShouldBeEnabled
              ) {
                if (enablerControlShouldBeEnabled) {
                  enablerFormControl.enable();
                } else {
                  enablerFormControl.disable();
                }
              }
            }
          });
      });
    });

    this.formGroupGenerated.emit(this.form);
  }

  getCssClassForSection(section: FormSchemaSection): string {
    if (section.columnSetup === FormSchemaColumnSetup.matchPreviousSection) {
      const previousSection =
        this.formSchema.formSchemaSections[
          this.formSchema.formSchemaSections.indexOf(section) - 1
        ];
      return this.getCssClassForSection(previousSection);
    }

    if (section.columnSetup === FormSchemaColumnSetup.matchNextSection) {
      const nextSection =
        this.formSchema.formSchemaSections[
          this.formSchema.formSchemaSections.indexOf(section) + 1
        ];
      return this.getCssClassForSection(nextSection);
    }

    return {
      1: 'one',
      2: 'two',
      3: 'three',
      4: 'four',
      5: 'five',
    }[section.formSchemaItems.length]!;
  }

  onSchemaButtonClicked(formSchemaItem: FormSchemaItem): void {
    this.schemaButtonClicked.emit(formSchemaItem);
  }

  onSubmitClicked(): void {
    if (this.form.valid) {
      this.submitAttempted = false;
      this.submitClicked.emit();
    }

    this.submitAttempted = true;
  }

  onCancelClicked(): void {
    this.cancelClicked.emit();
  }
}

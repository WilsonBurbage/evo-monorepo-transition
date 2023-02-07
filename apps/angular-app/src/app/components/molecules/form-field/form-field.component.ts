import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { slideVerticalAnimation } from '../../../core/animations/slide-vertical.animation';
import { BaseComponentClass } from './../../../core/classes/base-component.class';
import { FormSchemaItem } from './../../../core/models/form-schema-item.model';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],

  animations: [slideVerticalAnimation],
})
export class FormFieldComponent extends BaseComponentClass {
  @Input() form!: FormGroup;
  @Input() formSchemaItem!: FormSchemaItem;
  @HostBinding('class.submit-attempted') @Input() submitAttempted!: boolean;

  @Output() schemaButtonClicked = new EventEmitter<FormSchemaItem>();

  firstValidationError(): string {
    return Object.keys(
      this.form.controls[this.formSchemaItem.controlName]?.errors || {},
    )[0];
  }

  isRequired(): boolean {
    return Boolean(
      this.formSchemaItem.validators?.includes(Validators.required),
    );
  }

  onSchemaButtonClicked(): void {
    this.schemaButtonClicked.emit(this.formSchemaItem);
  }
}

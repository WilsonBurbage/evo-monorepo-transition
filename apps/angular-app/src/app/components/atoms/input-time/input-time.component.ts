import { Component } from '@angular/core';
import { DatesService } from '../../../core/services/dates.service';
import { BaseInputClass } from './../../../core/classes/base-input.class';

@Component({
  selector: 'app-input-time',
  templateUrl: './input-time.component.html',
  styleUrls: ['./input-time.component.scss'],
})
export class InputTimeComponent extends BaseInputClass {
  onBlur(event: FocusEvent): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    const parsedValue = DatesService.parseTime(value);

    this.form.patchValue({ [this.formSchemaItem.controlName]: parsedValue });
  }
}

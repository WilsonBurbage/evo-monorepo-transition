import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { StackWidgetDumbComponentClass } from '../../../../core/classes/stack-widget-dumb-component.class';
import { FormSchemaColumnSetup } from '../../../../core/models/form-schema-column-setup.model';
import { FormSchemaItemType } from '../../../../core/models/form-schema-item-type.model';
import { FormSchemaItem } from '../../../../core/models/form-schema-item.model';
import { FormSchema } from '../../../../core/models/form-schema.model';
import { Rate } from '../../../../core/models/rate.model';
import { CurrencyService } from '../../../../core/services/currency.service';
import { FormsService } from '../../../../core/services/forms.service';

@Component({
  selector: 'app-rate-dumb',
  templateUrl: './rate-dumb.component.html',
  styleUrls: ['./rate-dumb.component.scss'],
})
export class RateDumbComponent
  extends StackWidgetDumbComponentClass<Rate>
  implements OnInit
{
  @Input() rate!: Rate;

  rateSchema!: FormSchema;

  form!: FormGroup;

  ngOnInit(): void {
    this.rateSchema = {
      formSchemaSections: [
        {
          columnSetup: FormSchemaColumnSetup.matchNextSection,
          formSchemaItems: [
            {
              controlName: 'hourly',
              label: 'Hourly',
              type: FormSchemaItemType.currency,
              validators: [Validators.required],
            },
            {
              controlName: 'calculate',
              type: FormSchemaItemType.button,
              buttonConfig: { buttonLabel: 'Calculate' },
            },
          ],
        },
        {
          formSchemaItems: [
            {
              controlName: 'calls',
              label: 'Calls',
              type: FormSchemaItemType.currency,
              validators: [Validators.required],
            },
            {
              controlName: 'lettersIn',
              label: 'Letters in',
              type: FormSchemaItemType.currency,
              validators: [Validators.required],
            },
            {
              controlName: 'lettersOut',
              label: 'Letters out',
              type: FormSchemaItemType.currency,
              validators: [Validators.required],
            },
          ],
        },
        {
          formSchemaItems: [
            {
              controlName: 'advocacy',
              label: 'Advocacy',
              type: FormSchemaItemType.currency,
              validators: [Validators.required],
            },
            {
              controlName: 'counsel',
              label: 'Counsel',
              type: FormSchemaItemType.currency,
              validators: [Validators.required],
            },
            {
              controlName: 'travelAndWaiting',
              label: 'Travel and waiting',
              type: FormSchemaItemType.currency,
              validators: [Validators.required],
            },
          ],
        },
      ],
    };
  }

  onFormGroupGenerated(form: FormGroup): void {
    this.form = form;

    FormsService.patchItemIntoFormValue(this.rate, form, this.rateSchema);
  }

  onSchemaButtonClicked(formSchemaItem: FormSchemaItem): void {
    if (formSchemaItem.controlName === 'calculate') {
      const hourly = CurrencyService.numberToMaximumTwoDecimalPlaces(
        this.form.value.hourly,
      );

      const calls = CurrencyService.numberToMaximumTwoDecimalPlaces(
        hourly * 0.1,
      );
      const lettersIn = CurrencyService.numberToMaximumTwoDecimalPlaces(
        hourly * 0.05,
      );
      const lettersOut = CurrencyService.numberToMaximumTwoDecimalPlaces(
        hourly * 0.1,
      );
      const advocacy = CurrencyService.numberToMaximumTwoDecimalPlaces(hourly);
      const counsel = CurrencyService.numberToMaximumTwoDecimalPlaces(hourly);
      const travelAndWaiting =
        CurrencyService.numberToMaximumTwoDecimalPlaces(hourly);

      FormsService.patchItemIntoFormValue(
        {
          calls,
          lettersIn,
          lettersOut,
          advocacy,
          counsel,
          travelAndWaiting,
        },
        this.form,
        this.rateSchema,
      );
    }
  }

  onSaveClicked(): void {
    this.saved.emit(
      FormsService.patchFormValueIntoItem(
        this.rate,
        this.form,
        this.rateSchema,
      ),
    );
  }
}

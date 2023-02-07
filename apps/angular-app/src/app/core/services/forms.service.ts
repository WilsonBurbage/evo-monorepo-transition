import { FormGroup } from '@angular/forms';
import { FormSchemaItemType } from '../models/form-schema-item-type.model';
import { FormSchemaItem } from '../models/form-schema-item.model';
import { FormSchemaOption } from '../models/form-schema-option.model';
import { FormSchema } from '../models/form-schema.model';
import { CurrencyService } from './currency.service';

export class FormsService {
  static patchItemIntoFormValue(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    item: any,
    form: FormGroup,
    formSchema: FormSchema,
  ): void {
    if (!item) {
      return;
    }

    const flattenedFormSchemaItems = this.flattenedFormSchemaItems(formSchema);

    const compiledItem = Object.keys(form.controls).reduce(
      (accumulator, key) => {
        if (!Object.prototype.hasOwnProperty.call(item, key)) {
          return accumulator;
        }

        const formSchemaItem = flattenedFormSchemaItems.find(
          (formSchemaItem) => formSchemaItem.controlName === key,
        );

        const valueToUse =
          formSchemaItem?.type === FormSchemaItemType.currency
            ? CurrencyService.numberToCurrency(item[key], false)
            : item[key];

        return {
          ...accumulator,
          [key]: valueToUse,
        };
      },
      {},
    );

    form.patchValue(compiledItem);
  }

  static patchFormValueIntoItem<T>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    item: any,
    form: FormGroup,
    formSchema: FormSchema,
  ): T {
    const flattenedFormSchemaItems = this.flattenedFormSchemaItems(formSchema);

    const compiledItem = Object.keys(form.controls).reduce(
      (accumulator, key) => {
        const formSchemaItem = flattenedFormSchemaItems.find(
          (formSchemaItem) => formSchemaItem.controlName === key,
        );

        const valueToUse =
          formSchemaItem?.type === FormSchemaItemType.currency
            ? CurrencyService.numberToMaximumTwoDecimalPlaces(
                Number(form.value[key]),
              )
            : form.value[key];

        return {
          ...accumulator,
          [key]: valueToUse,
        };
      },
      {},
    );

    return { ...(item || {}), ...compiledItem };
  }

  static flattenedFormSchemaItems(formSchema: FormSchema): FormSchemaItem[] {
    return formSchema.formSchemaSections
      .map((section) => section.formSchemaItems)
      .flat()
      .filter((item) => item.type !== FormSchemaItemType.button);
  }

  static createSelectOptionsFromEnum<T extends object>(
    enumerator: T,
    textMapper: { [key: string]: string },
  ): FormSchemaOption[] {
    return Object.keys(enumerator).map(
      (key): FormSchemaOption => ({ text: textMapper[key], value: key }),
    );
  }
}

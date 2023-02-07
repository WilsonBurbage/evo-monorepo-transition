import { AbstractControl, ValidationErrors } from '@angular/forms';
import { FormSchemaItemButtonConfig } from './form-schema-item-button-config.model';
import { FormSchemaItemOptionsConfig } from './form-schema-item-options-config.model';
import { FormSchemaItemTextInputConfig } from './form-schema-item-text-input-config.model';
import { FormSchemaItemType } from './form-schema-item-type.model';

export interface FormSchemaItem {
  controlName: string;
  label?: string;
  labelledToSide?: boolean;
  type: FormSchemaItemType;
  validators?: ((control: AbstractControl) => ValidationErrors | null)[];
  enablerControlName?: string;
  separateEnablerControlName?: string;
  buttonConfig?: FormSchemaItemButtonConfig;
  optionsConfig?: FormSchemaItemOptionsConfig;
  textInputConfig?: FormSchemaItemTextInputConfig;
}

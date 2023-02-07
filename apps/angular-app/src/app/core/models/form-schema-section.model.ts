import { FormSchemaColumnSetup } from './form-schema-column-setup.model';
import { FormSchemaItem } from './form-schema-item.model';

export interface FormSchemaSection {
  columnSetup?: FormSchemaColumnSetup;
  formSchemaItems: FormSchemaItem[];
  showIfMethod?: () => boolean;
}

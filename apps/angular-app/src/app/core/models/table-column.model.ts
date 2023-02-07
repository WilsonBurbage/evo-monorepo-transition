import { Alignment } from './alignment.model';
import { ButtonColumnId } from './button-column-id.model';
import { Primitive } from './primitive.model';
import { TableDataFormatter } from './table-data-formatter.model';

export interface TableColumn<T> {
  id?: string;
  title?: string;
  alignment?: Alignment;
  fixedWidth?: string;
  dataFormatter?: TableDataFormatter;
  valuePropertyPath?: keyof T;
  valueMethod?: (item: T, index: number) => Primitive | Primitive[];
  buttonColumnId?: ButtonColumnId;
}

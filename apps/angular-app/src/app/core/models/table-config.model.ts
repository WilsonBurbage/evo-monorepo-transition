import { TableColumn } from './table-column.model';

export interface TableConfig<T> {
  columns: TableColumn<T>[];
  deleteable?: boolean;
}

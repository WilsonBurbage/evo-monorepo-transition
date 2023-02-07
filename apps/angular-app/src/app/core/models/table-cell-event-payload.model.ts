import { TableColumn } from './table-column.model';

export interface TableCellEventPayload<T> {
  event: Event;
  column: TableColumn<T>;
  tableItem: T;
}

import { TableColumn } from './table-column.model';

export interface TableButtonEventPayload<T> {
  event: Event;
  column: TableColumn<T>;
  tableItem: T;
}

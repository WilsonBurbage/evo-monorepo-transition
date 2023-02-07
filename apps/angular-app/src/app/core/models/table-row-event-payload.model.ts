export interface TableRowEventPayload<T> {
  event: Event;
  rowIndex: number;
  tableItem: T;
}

export interface PropertyPair<T> {
  propertyName: keyof T;
  propertyValue: string | undefined;
  filterByActivePart?: boolean;
}

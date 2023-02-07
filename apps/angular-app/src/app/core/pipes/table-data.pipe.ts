import { Pipe, PipeTransform } from '@angular/core';
import { TableConfig } from '../models/table-config.model';
import { TableDataFormatter } from '../models/table-data-formatter.model';
import { TableRow } from '../models/table-row.model';
import { CurrencyService } from '../services/currency.service';
import { DateFormatPipe } from './date-format.pipe';

@Pipe({
  name: 'tableData',
})
export class TableDataPipe<T> implements PipeTransform {
  transform(tableConfig: TableConfig<T>, tableItems: T[]): TableRow[] {
    return tableItems.map((item, index) => {
      return {
        columnValues: tableConfig.columns.map((column) => {
          if (column.valuePropertyPath) {
            const value = item[column.valuePropertyPath];

            switch (column.dataFormatter) {
              case TableDataFormatter.boolean:
                return value ? 'Yes' : 'No';

              case TableDataFormatter.currency:
                return CurrencyService.numberToCurrency(value as number);

              case TableDataFormatter.date:
                return new DateFormatPipe().transform(value as string);

              default:
                return String(value);
            }
          }

          if (column.valueMethod) {
            const value = column.valueMethod(item, index);

            const formattedValue = Array.isArray(value)
              ? value.map((childValue) => String(childValue))
              : String(value);

            return formattedValue;
          }

          return '';
        }),
      };
    });
  }
}

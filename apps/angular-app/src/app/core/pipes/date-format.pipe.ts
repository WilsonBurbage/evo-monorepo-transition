import { Pipe, PipeTransform } from '@angular/core';
import { DatesService } from '../services/dates.service';

@Pipe({
  name: 'dateFormat',
})
export class DateFormatPipe implements PipeTransform {
  transform(dateString: string): string {
    return DatesService.formatDateFromDateString(dateString);
  }
}

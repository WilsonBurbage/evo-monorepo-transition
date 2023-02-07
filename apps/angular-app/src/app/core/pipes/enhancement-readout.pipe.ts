import { Pipe, PipeTransform } from '@angular/core';
import { Enhancement } from '../models/enhancement.model';

@Pipe({
  name: 'enhancementReadout',
})
export class EnhancementReadoutPipe implements PipeTransform {
  transform(enhancement: Enhancement): string {
    return `${enhancement.name} (${enhancement.percentage}%)`;
  }
}

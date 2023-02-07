import { Pipe, PipeTransform } from '@angular/core';
import { Disbursement } from '../models/disbursement.model';
import { CurrencyService } from '../services/currency.service';

@Pipe({
  name: 'disbursementReadout',
})
export class DisbursementReadoutPipe implements PipeTransform {
  transform(disbursement: Disbursement): string {
    return `${disbursement.description}: ${CurrencyService.numberToCurrency(
      disbursement.amount,
    )} (${CurrencyService.numberToCurrency(disbursement.vat)})`;
  }
}

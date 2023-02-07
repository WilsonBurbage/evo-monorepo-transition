import { Pipe, PipeTransform } from '@angular/core';
import { SuccessFee } from '../models/success-fee.model';
import { CurrencyService } from '../services/currency.service';

@Pipe({
  name: 'successFeeReadout',
})
export class SuccessFeeReadoutPipe implements PipeTransform {
  transform(successFee: SuccessFee): string {
    return `${successFee.description}: ${CurrencyService.numberToCurrency(
      successFee.baseCosts,
    )} base costs`;
  }
}

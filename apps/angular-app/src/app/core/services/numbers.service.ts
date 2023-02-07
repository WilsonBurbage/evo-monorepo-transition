import { CurrencyService } from './currency.service';

export class NumbersService {
  static addLeadingZeros(value: string | number, length = 2): string {
    return `${'0'.repeat(length)}${value}`.slice(-length);
  }

  static applyPercentage(
    source: number,
    percentage: number,
    asCurrency: boolean,
  ): number {
    const result = (source / 100) * percentage;

    return asCurrency
      ? CurrencyService.numberToMaximumTwoDecimalPlaces(result)
      : result;
  }
}

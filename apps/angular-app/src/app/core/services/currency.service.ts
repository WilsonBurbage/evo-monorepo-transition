export class CurrencyService {
  static numberToMaximumTwoDecimalPlaces(number: number): number {
    return Math.round(number * 100) / 100;
  }

  static numberToCurrency(number: number, includeSymbols = true): string {
    const valueToUse = this.numberToMaximumTwoDecimalPlaces(number);

    const result = [
      ...(includeSymbols ? ['£'] : []),
      ...(includeSymbols
        ? [valueToUse.toLocaleString('en-GB', { minimumFractionDigits: 2 })]
        : [valueToUse.toFixed(2)]),
    ].join('');

    return result;
  }
}

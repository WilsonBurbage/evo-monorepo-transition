import * as dayjs from 'dayjs';
import { Dayjs } from 'dayjs';
import { CurrencyService } from './currency.service';
import { NumbersService } from './numbers.service';

export class DatesService {
  static createDateObjectFromString(dateString: string): Dayjs {
    return dayjs(dateString);
  }

  static createDateStringFromDate(date: Date | string): string {
    return dayjs(date).format('YYYY-MM-DD');
  }

  static formatDateFromDateString(dateString: string): string {
    return this.createDateObjectFromString(dateString).format('DD/MM/YYYY');
  }

  static generateRandomDateString(): string {
    const year = Math.floor(Math.random() * 10 + 2000);
    const month = Math.floor(Math.random() * 12 + 1);
    const day = Math.floor(Math.random() * 28 + 1);

    return this.createDateStringFromDate(new Date(year, month, day));
  }

  static getMillisecondsBetweenDateStrings(
    dateString1: string,
    dateString2: string,
  ): number {
    return dayjs(dateString1).diff(dateString2, 'milliseconds');
  }

  static generateRandomTime(): string {
    const hours = Math.floor(Math.random() * 10);
    const minutes = Math.floor(Math.random() * 60);

    return this.formatTime(hours, minutes);
  }

  static parseTime(time: string): string {
    const numberRegex = /^[0-9]+$/;
    const colonRegex = /[0-9]*:[0-9]+/;
    const dotRegex = /[0-9]*\.[0-9]*/;

    if (time.match(numberRegex)?.length) {
      return this.formatTime(Number(time), 0);
    }

    if (time.match(colonRegex)?.length) {
      return this.parseMinutesIntoTime(this.parseTimeIntoMinutes(time));
    }

    if (time.match(dotRegex)?.length) {
      return this.parseMinutesIntoTime(this.parseTimeFractionIntoMinutes(time));
    }

    return '';
  }

  static parseTimeIntoMinutes(time: string): number {
    const split = time.split(':').map((value) => Number(value));
    const [hours, minutes] = split;

    return hours * 60 + minutes;
  }

  static parseTimeFractionIntoMinutes(time: string): number {
    const split = time.split('.');
    const [hours, fraction] = split;

    return Number(hours || 0) * 60 + Number(`0.${fraction}`) * 60;
  }

  static parseMinutesIntoTime(totalMinutes: number): string {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes - hours * 60;

    return this.formatTime(hours, minutes);
  }

  static formatTime(hours: number, minutes: number): string {
    return `${hours}:${NumbersService.addLeadingZeros(minutes)}`;
  }

  static formatTimeToWords(time: string): string {
    const [hours, minutes] = time.split(':').map((number) => Number(number));

    const elements: string[] = [
      ...(hours ? [`${hours} hrs`] : []),
      ...(minutes ? [`${minutes} mins`] : []),
    ];

    return elements.join(' ');
  }

  static timeMultipliedByHourlyRate(time: string, hourlyRate: number): number {
    const minutes = this.parseTimeIntoMinutes(time);
    const hours = minutes / 60;
    return CurrencyService.numberToMaximumTwoDecimalPlaces(hours * hourlyRate);
  }
}

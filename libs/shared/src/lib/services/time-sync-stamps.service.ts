import * as hash from 'hash.js';

export class TimeSyncStampsServices {
  static generateTimeSyncStamps(): string[] {
    const timeAllowanceInSeconds = 180;
    const timesToGenerate = Array.from({
      length: timeAllowanceInSeconds * 2,
    }).map((_value, index) => {
      return this.generateTimeSyncStamp(-timeAllowanceInSeconds + index);
    });

    return timesToGenerate;
  }

  static generateTimeSyncStamp(offsetSeconds: number): string {
    const date = new Date();
    date.setHours(date.getHours());
    date.setMinutes(date.getMinutes());
    date.setSeconds(date.getSeconds() + offsetSeconds);

    const stringToHash = `${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;

    const hashedString = hash.sha256().update(stringToHash).digest('hex');

    return hashedString;
  }

  static validateTimeSyncStamp(timeSyncStamp: string): boolean {
    const timeSyncStamps = this.generateTimeSyncStamps();
    const timeSyncStampIsValid = timeSyncStamps.includes(timeSyncStamp);

    return timeSyncStampIsValid;
  }
}

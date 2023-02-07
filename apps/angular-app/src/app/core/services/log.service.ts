export class LogService {
  static cache: { [key: string]: Date } = {};

  static startTimer(key: string): void {
    this.cache = { ...this.cache, [key]: new Date() };
  }

  static endTimer(key: string): void {
    const milliseconds = Number(new Date()) - Number(this.cache[key]);
    console.log(key, `${milliseconds}ms`);
  }
}

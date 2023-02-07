export class ApiService {
  static baseUrl = 'http://localhost:3000';

  static compileUrl(suffix: string): string {
    return `${this.baseUrl}${suffix}`;
  }
}

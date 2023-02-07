export class LocalStorageService {
  static setLocalStorage(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  static getLocalStorage(key: string): string {
    return localStorage.getItem(key) || '';
  }

  static removeLocalStorage(key: string): void {
    return localStorage.removeItem(key);
  }
}

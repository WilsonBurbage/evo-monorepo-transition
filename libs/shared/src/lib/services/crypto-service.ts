import { sha256 } from 'js-sha256';

export class CryptoService {
  static hash(value: string, salt = ''): string {
    const hash = sha256.create();
    hash.update(`${value}${salt}`);

    return hash.hex();
  }
}

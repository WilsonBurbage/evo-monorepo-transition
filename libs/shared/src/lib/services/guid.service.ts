import { v4 } from 'uuid';

export class GuidService {
  static getGuid(prefix: string): string {
    return `${prefix}-${v4()}`;
  }
}

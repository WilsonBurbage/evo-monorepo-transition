export class TextService {
  static trimToLength(
    value: string,
    length: number,
    addEllipsis: boolean,
  ): string {
    if (value.length <= length) {
      return value;
    }

    return `${value.substring(0, length)}${addEllipsis ? '...' : ''}`;
  }
}

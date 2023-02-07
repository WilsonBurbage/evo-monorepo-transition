export class ActionsService {
  static compileActionName(prefix: string, name: string): string {
    return `[${prefix}] ${name}`;
  }
}

import { BehaviorSubject } from 'rxjs';

export class ContextMenuService {
  static contextMenuStates$ = new BehaviorSubject<Record<string, boolean>>({});

  static show(id: string): void {
    this.contextMenuStates$.next({
      ...this.contextMenuStates$.value,
      [id]: true,
    });
  }

  static hide(): void {
    this.contextMenuStates$.next(
      Object.keys(this.contextMenuStates$.value).reduce(
        (accumulator, key) => ({ ...accumulator, [key]: false }),
        {},
      ),
    );
  }
}

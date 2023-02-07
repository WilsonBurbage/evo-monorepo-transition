import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[trapFocus]',
})
export class TrapFocusDirective implements AfterViewInit {
  constructor(private element: ElementRef) {}

  ngAfterViewInit(): void {
    // Timeout allows the ng-content tag to be filled before we apply the trap
    setTimeout(() => {
      this.trapFocus(this.element.nativeElement);
    });
  }

  trapFocus(element: HTMLElement): void {
    const focusableElements = Array.from(
      element.querySelectorAll('a[href], button, input, textarea, select'),
    )
      .map((element: Element) => {
        switch (element.tagName) {
          case 'A':
            return element as HTMLAnchorElement;

          default:
            return element as HTMLInputElement;
        }
      })
      .filter((element) => !(element as HTMLInputElement).disabled);

    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement =
      focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', (event: KeyboardEvent) => {
      const isTabPressed = event.key === 'Tab';

      if (!isTabPressed) {
        return;
      }

      if (event.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus();
          event.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement.focus();
          event.preventDefault();
        }
      }
    });
  }
}

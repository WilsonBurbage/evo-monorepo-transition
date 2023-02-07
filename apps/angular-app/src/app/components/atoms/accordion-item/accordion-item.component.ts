import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';
import { slideVerticalAnimation } from '../../../core/animations/slide-vertical.animation';
import { BaseComponentClass } from './../../../core/classes/base-component.class';

@Component({
  selector: 'app-accordion-item',
  templateUrl: './accordion-item.component.html',
  styleUrls: ['./accordion-item.component.scss'],
  animations: [slideVerticalAnimation],
})
export class AccordionItemComponent extends BaseComponentClass {
  @Input() title = '';

  @HostBinding('class.open') @Input() open = false;

  @Output() opened = new EventEmitter();

  onTitleBarClicked(): void {
    this.open = !this.open;

    if (this.open) {
      this.opened.emit();
    }
  }
}

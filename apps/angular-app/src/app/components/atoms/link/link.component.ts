import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';
import { BaseComponentClass } from './../../../core/classes/base-component.class';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
})
export class LinkComponent extends BaseComponentClass {
  @HostBinding('class.alternative') @Input() alternative = false;
  @HostBinding('class.stretch') @Input() stretch = false;

  @Output() clicked = new EventEmitter();

  onClicked(event: Event): void {
    event.stopPropagation();
    this.clicked.emit();
  }
}

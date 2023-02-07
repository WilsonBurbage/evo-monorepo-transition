import { Component, HostBinding, Injector, Input } from '@angular/core';
import { BaseComponentClass } from './../../../core/classes/base-component.class';

@Component({
  selector: 'app-labelled-text',
  templateUrl: './labelled-text.component.html',
  styleUrls: ['./labelled-text.component.scss'],
})
export class LabelledTextComponent extends BaseComponentClass {
  @Input() label = '';

  @HostBinding('class.loading') @Input() loading = false;
  @HostBinding('class.error') @Input() error = false;

  random = 0;

  constructor(injector: Injector) {
    super(injector);

    this.random = Math.floor(Math.random() * 30) + 1;
  }
}

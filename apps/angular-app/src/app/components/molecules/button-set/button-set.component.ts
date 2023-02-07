import { Component, HostBinding, Input } from '@angular/core';
import { BaseComponentClass } from './../../../core/classes/base-component.class';

@Component({
  selector: 'app-button-set',
  templateUrl: './button-set.component.html',
  styleUrls: ['./button-set.component.scss'],
})
export class ButtonSetComponent extends BaseComponentClass {
  @HostBinding('class.reversed') @Input() reversed = false;
  @HostBinding('class.stretch-contents') @Input() stretchContents = false;
}

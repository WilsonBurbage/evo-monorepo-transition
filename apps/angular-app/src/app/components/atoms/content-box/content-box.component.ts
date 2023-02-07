import { Component, HostBinding, Input } from '@angular/core';
import { BaseComponentClass } from './../../../core/classes/base-component.class';

@Component({
  selector: 'app-content-box',
  templateUrl: './content-box.component.html',
  styleUrls: ['./content-box.component.scss'],
})
export class ContentBoxComponent extends BaseComponentClass {
  @HostBinding('class.has-box-title') @Input() boxTitle = '';

  @HostBinding('class.inset') @Input() inset = false;
}

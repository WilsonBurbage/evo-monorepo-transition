import { Component, Input } from '@angular/core';
import { BaseComponentClass } from './../../../../core/classes/base-component.class';

@Component({
  selector: 'app-main-frame-dumb',
  templateUrl: './main-frame-dumb.component.html',
  styleUrls: ['./main-frame-dumb.component.scss'],
})
export class MainFrameDumbComponent extends BaseComponentClass {
  @Input() authenticated!: boolean;
  @Input() checkingAuthenticationKey!: boolean;
}

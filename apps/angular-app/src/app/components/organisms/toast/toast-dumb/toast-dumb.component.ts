import { Component, Input } from '@angular/core';
import { slideVerticalAnimation } from '../../../../core/animations/slide-vertical.animation';
import { ToastMessage } from '../../../../core/models/toast-message.model';
import { BaseComponentClass } from './../../../../core/classes/base-component.class';

@Component({
  selector: 'app-toast-dumb',
  templateUrl: './toast-dumb.component.html',
  styleUrls: ['./toast-dumb.component.scss'],

  animations: [slideVerticalAnimation],
})
export class ToastDumbComponent extends BaseComponentClass {
  @Input() toastMessages!: ToastMessage[];
}

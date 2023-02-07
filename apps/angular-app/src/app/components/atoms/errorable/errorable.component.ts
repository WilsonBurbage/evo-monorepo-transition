import { Component, Input } from '@angular/core';
import { DEFAULT_ASYNC_ERROR_MESSAGE } from '../../../core/constants/messaging.constants';
import { BaseComponentClass } from './../../../core/classes/base-component.class';

@Component({
  selector: 'app-errorable',
  templateUrl: './errorable.component.html',
  styleUrls: ['./errorable.component.scss'],
})
export class ErrorableComponent extends BaseComponentClass {
  @Input() error = false;
  @Input() message = DEFAULT_ASYNC_ERROR_MESSAGE;
}

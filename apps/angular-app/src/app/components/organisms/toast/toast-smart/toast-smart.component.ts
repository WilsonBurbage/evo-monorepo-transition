import { Component, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastMessage } from '../../../../core/models/toast-message.model';
import * as toastMessagesSelectors from '../../../../core/state/toast-messages/toast-messages.selectors';
import { BaseComponentClass } from './../../../../core/classes/base-component.class';

@Component({
  selector: 'app-toast-smart',
  templateUrl: './toast-smart.component.html',
  styleUrls: ['./toast-smart.component.scss'],
})
export class ToastSmartComponent extends BaseComponentClass {
  toastMessages$: Observable<ToastMessage[] | undefined>;

  constructor(injector: Injector) {
    super(injector);

    this.toastMessages$ = this.store$.select(
      toastMessagesSelectors.entitySelectors.selectAll,
    );
  }
}

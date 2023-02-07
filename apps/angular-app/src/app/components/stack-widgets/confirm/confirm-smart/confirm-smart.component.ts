import { Component } from '@angular/core';
import { StackWidgetSmartComponentClass } from '../../../../core/classes/stack-widget-smart-component.class';

@Component({
  selector: 'app-confirm-smart',
  templateUrl: './confirm-smart.component.html',
  styleUrls: ['./confirm-smart.component.scss'],
})
export class ConfirmSmartComponent extends StackWidgetSmartComponentClass {
  onConfirmClicked(): void {
    this.config.confirmActions?.forEach((action) =>
      this.store$.dispatch(action),
    );

    this.pop();
  }
}

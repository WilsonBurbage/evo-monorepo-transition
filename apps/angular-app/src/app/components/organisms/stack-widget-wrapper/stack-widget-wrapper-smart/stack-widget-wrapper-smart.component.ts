import { Component, Input } from '@angular/core';
import { StackWidgetSmartComponentClass } from '../../../../core/classes/stack-widget-smart-component.class';

@Component({
  selector: 'app-stack-widget-wrapper-smart',
  templateUrl: './stack-widget-wrapper-smart.component.html',
  styleUrls: ['./stack-widget-wrapper-smart.component.scss'],
})
export class StackWidgetWrapperSmartComponent extends StackWidgetSmartComponentClass {
  @Input() closeable = true;
}

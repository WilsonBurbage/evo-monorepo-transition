import { Component, Input } from '@angular/core';
import { StackWidgetDumbComponentClass } from '../../../../core/classes/stack-widget-dumb-component.class';

@Component({
  selector: 'app-stack-widget-wrapper-dumb',
  templateUrl: './stack-widget-wrapper-dumb.component.html',
  styleUrls: ['./stack-widget-wrapper-dumb.component.scss'],
})
export class StackWidgetWrapperDumbComponent extends StackWidgetDumbComponentClass {
  @Input() closeable = true;
}

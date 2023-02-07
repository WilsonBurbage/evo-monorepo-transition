import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StackWidgetDumbComponentClass } from '../../../../core/classes/stack-widget-dumb-component.class';

@Component({
  selector: 'app-confirm-dumb',
  templateUrl: './confirm-dumb.component.html',
  styleUrls: ['./confirm-dumb.component.scss'],
})
export class ConfirmDumbComponent extends StackWidgetDumbComponentClass {
  @Input() confirmMessage!: string;

  @Output() confirmed = new EventEmitter();

  onConfirmClicked(): void {
    this.confirmed.emit();
  }
}

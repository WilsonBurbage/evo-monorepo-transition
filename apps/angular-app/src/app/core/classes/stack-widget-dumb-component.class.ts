import { Component, EventEmitter, OnChanges, Output } from '@angular/core';
import { BaseComponentClass } from './base-component.class';

@Component({ template: '' })
export abstract class StackWidgetDumbComponentClass<T = void>
  extends BaseComponentClass
  implements OnChanges
{
  @Output() saved = new EventEmitter<T>();
  @Output() cancelled = new EventEmitter();

  inputsChanged(): void {
    return;
  }

  ngOnChanges(): void {
    this.inputsChanged();
  }

  onCancelClicked(): void {
    this.cancelled.emit();
  }
}

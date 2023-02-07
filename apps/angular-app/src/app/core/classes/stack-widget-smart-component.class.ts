import { Component, Input, OnChanges } from '@angular/core';
import { Observable, take } from 'rxjs';
import { StackWidgetConfig } from '../models/stack-widget-config.model';
import * as uiActions from '../state/ui/ui.actions';
import { BaseComponentClass } from './base-component.class';

@Component({ template: '' })
export abstract class StackWidgetSmartComponentClass
  extends BaseComponentClass
  implements OnChanges
{
  @Input() config!: StackWidgetConfig;

  initialiseWithConfigMethod?: () => void;

  latestFromObservable<T>(observable: Observable<T>): T {
    let result: T = {} as T;
    observable.pipe(take(1)).subscribe((value) => (result = value));
    return result;
  }

  ngOnChanges(): void {
    if (this.initialiseWithConfigMethod) {
      this.initialiseWithConfigMethod();
    }
  }

  onCancelClicked(): void {
    this.pop();
  }

  pop(): void {
    this.store$.dispatch(uiActions.popStackWidget());
  }
}

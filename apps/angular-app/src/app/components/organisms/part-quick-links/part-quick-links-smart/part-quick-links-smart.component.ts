import { Component, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { StackWidgetReference } from '../../../../core/models/stack-widget-reference.model';
import { StackWidget } from '../../../../core/models/stack.widget.model';
import { BaseComponentClass } from './../../../../core/classes/base-component.class';
import * as uiActions from './../../../../core/state/ui/ui.actions';
import * as uiSelectors from './../../../../core/state/ui/ui.selectors';

@Component({
  selector: 'app-part-quick-links-smart',
  templateUrl: './part-quick-links-smart.component.html',
  styleUrls: ['./part-quick-links-smart.component.scss'],
})
export class PartQuickLinksSmartComponent extends BaseComponentClass {
  stackWidgets$: Observable<StackWidget[]>;

  constructor(injector: Injector) {
    super(injector);

    this.stackWidgets$ = this.store$.select(uiSelectors.getStackItems);
  }

  onQuickLinkClicked(stackWidgetReference: StackWidgetReference): void {
    this.store$.dispatch(uiActions.popStackWidget());
    this.store$.dispatch(uiActions.pushStackWidget({ stackWidgetReference }));
  }
}

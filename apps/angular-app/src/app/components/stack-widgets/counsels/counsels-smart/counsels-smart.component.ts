import { Component, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { StackWidgetSmartComponentClass } from '../../../../core/classes/stack-widget-smart-component.class';
import { Counsel } from '../../../../core/models/counsel.model';
import { EntityChunkName } from '../../../../core/models/entity-chunk-name.model';
import { StackWidgetReference } from '../../../../core/models/stack-widget-reference.model';
import { TableRowEventPayload } from '../../../../core/models/table-row-event-payload.model';
import * as counselsSelectors from '../../../../core/state/counsels/counsels.selectors';
import * as removingActions from '../../../../core/state/global/removing.actions';
import * as uiActions from '../../../../core/state/ui/ui.actions';

@Component({
  selector: 'app-counsels-smart',
  templateUrl: './counsels-smart.component.html',
  styleUrls: ['./counsels-smart.component.scss'],
})
export class CounselsSmartComponent extends StackWidgetSmartComponentClass {
  counsels$: Observable<Counsel[] | undefined>;

  constructor(injector: Injector) {
    super(injector);

    this.counsels$ = this.store$.select(
      counselsSelectors.entitySelectors.selectAll,
    );
  }

  onNewCounselClicked(): void {
    this.store$.dispatch(
      uiActions.pushStackWidget({
        stackWidgetReference: StackWidgetReference.counsel,
      }),
    );
  }

  onEditCounselClicked(eventPayload: TableRowEventPayload<Counsel>): void {
    this.store$.dispatch(
      uiActions.pushStackWidget({
        stackWidgetReference: StackWidgetReference.counsel,
        config: { id: eventPayload.tableItem.id },
      }),
    );
  }

  onDeleteCounselClicked(counsel: Counsel): void {
    this.store$.dispatch(
      removingActions.askToConfirmEntityRemoval({
        entityId: counsel.id,
        entityChunkName: EntityChunkName.counsels,
      }),
    );
  }
}

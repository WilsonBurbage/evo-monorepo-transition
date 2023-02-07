import { Component, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { StackWidgetSmartComponentClass } from '../../../../core/classes/stack-widget-smart-component.class';
import { EMPTY_ARRAY_OBSERVABLE } from '../../../../core/constants/state.constants';
import { Enhancement } from '../../../../core/models/enhancement.model';
import { EntityChunkName } from '../../../../core/models/entity-chunk-name.model';
import { StackWidgetReference } from '../../../../core/models/stack-widget-reference.model';
import { TableRowEventPayload } from '../../../../core/models/table-row-event-payload.model';
import * as enhancementsSelectors from '../../../../core/state/enhancements/enhancements.selectors';
import * as removingActions from '../../../../core/state/global/removing.actions';
import * as uiActions from '../../../../core/state/ui/ui.actions';

@Component({
  selector: 'app-enhancements-smart',
  templateUrl: './enhancements-smart.component.html',
  styleUrls: ['./enhancements-smart.component.scss'],
})
export class EnhancementsSmartComponent extends StackWidgetSmartComponentClass {
  enhancements$: Observable<Enhancement[] | undefined> = EMPTY_ARRAY_OBSERVABLE;

  constructor(injector: Injector) {
    super(injector);

    this.initialiseWithConfigMethod = (): void => {
      this.enhancements$ = this.store$.select(
        enhancementsSelectors.getEnhancementsForSpecificPart(
          this.config.partId!,
        ),
      );
    };
  }

  onNewEnhancementClicked(): void {
    this.store$.dispatch(
      uiActions.pushStackWidget({
        stackWidgetReference: StackWidgetReference.enhancement,
        config: this.config,
      }),
    );
  }

  onEditEnhancementClicked(
    eventPayload: TableRowEventPayload<Enhancement>,
  ): void {
    this.store$.dispatch(
      uiActions.pushStackWidget({
        stackWidgetReference: StackWidgetReference.enhancement,
        config: { id: eventPayload.tableItem.id },
      }),
    );
  }

  onDeleteEnhancementClicked(enhancement: Enhancement): void {
    this.store$.dispatch(
      removingActions.askToConfirmEntityRemoval({
        entityId: enhancement.id,
        entityChunkName: EntityChunkName.enhancements,
      }),
    );
  }
}

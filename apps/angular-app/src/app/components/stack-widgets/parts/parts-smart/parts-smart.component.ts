import { Component, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { StackWidgetSmartComponentClass } from '../../../../core/classes/stack-widget-smart-component.class';
import { Enhancement } from '../../../../core/models/enhancement.model';
import { EntityChunkName } from '../../../../core/models/entity-chunk-name.model';
import { Part } from '../../../../core/models/part.model';
import { PartsColumnID } from '../../../../core/models/parts-column-id.model';
import { Solicitor } from '../../../../core/models/solicitor.model';
import { StackWidgetReference } from '../../../../core/models/stack-widget-reference.model';
import { TableCellEventPayload } from '../../../../core/models/table-cell-event-payload.model';
import * as enhancementsSelectors from '../../../../core/state/enhancements/enhancements.selectors';
import * as removingActions from '../../../../core/state/global/removing.actions';
import * as partsSelectors from '../../../../core/state/parts/parts.selectors';
import * as solicitorsSelectors from '../../../../core/state/solicitors/solicitors.selectors';
import * as uiActions from '../../../../core/state/ui/ui.actions';

@Component({
  selector: 'app-parts-smart',
  templateUrl: './parts-smart.component.html',
  styleUrls: ['./parts-smart.component.scss'],
})
export class PartsSmartComponent extends StackWidgetSmartComponentClass {
  parts$: Observable<Part[] | undefined>;
  solicitors$: Observable<Solicitor[] | undefined>;
  enhancements$: Observable<Enhancement[] | undefined>;

  constructor(injector: Injector) {
    super(injector);

    this.parts$ = this.store$.select(partsSelectors.entitySelectors.selectAll);

    this.solicitors$ = this.store$.select(
      solicitorsSelectors.entitySelectors.selectAll,
    );

    this.enhancements$ = this.store$.select(
      enhancementsSelectors.entitySelectors.selectAll,
    );
  }

  onNewPartClicked(): void {
    this.store$.dispatch(
      uiActions.pushStackWidget({
        stackWidgetReference: StackWidgetReference.part,
      }),
    );
  }

  onEditPartClicked(eventPayload: TableCellEventPayload<Part>): void {
    switch (eventPayload.column.id) {
      case PartsColumnID.part:
        this.store$.dispatch(
          uiActions.pushStackWidget({
            stackWidgetReference: StackWidgetReference.part,
            config: { id: eventPayload.tableItem.id },
          }),
        );
        break;

      case PartsColumnID.solicitor:
        this.store$.dispatch(
          uiActions.pushStackWidget({
            stackWidgetReference: StackWidgetReference.solicitor,
            config: {
              id: this.latestFromObservable(this.solicitors$)!.find(
                (solicitor) => solicitor.partId === eventPayload.tableItem.id,
              )?.id,
            },
          }),
        );
        break;

      case PartsColumnID.enhancements:
        this.store$.dispatch(
          uiActions.pushStackWidget({
            stackWidgetReference: StackWidgetReference.enhancements,
            config: {
              partId: eventPayload.tableItem.id,
            },
          }),
        );
        break;
    }
  }

  onDeletePartClicked(part: Part): void {
    this.store$.dispatch(
      removingActions.askToConfirmEntityRemoval({
        entityId: part.id,
        entityChunkName: EntityChunkName.parts,
      }),
    );
  }
}

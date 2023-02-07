import { Component, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { StackWidgetSmartComponentClass } from '../../../../core/classes/stack-widget-smart-component.class';
import { Attendance } from '../../../../core/models/attendance.model';
import { CorrespondenceCounter } from '../../../../core/models/correspondence-counter.model';
import { Disbursement } from '../../../../core/models/disbursement.model';
import { EntityChunkName } from '../../../../core/models/entity-chunk-name.model';
import { PartiesColumnID } from '../../../../core/models/parties-column-id.model';
import { Party } from '../../../../core/models/party.model';
import { StackWidgetReference } from '../../../../core/models/stack-widget-reference.model';
import { TableCellEventPayload } from '../../../../core/models/table-cell-event-payload.model';
import * as attendancesSelectors from '../../../../core/state/attendances/attendances.selectors';
import * as correspondenceCountersActions from '../../../../core/state/correspondence-counters/correspondence-counters.actions';
import * as correspondenceCountersSelectors from '../../../../core/state/correspondence-counters/correspondence-counters.selectors';
import * as disbursementsSelectors from '../../../../core/state/disbursements/disbursements.selectors';
import * as removingActions from '../../../../core/state/global/removing.actions';
import * as partiesSelectors from '../../../../core/state/parties/parties.selectors';
import * as uiActions from '../../../../core/state/ui/ui.actions';

@Component({
  selector: 'app-parties-smart',
  templateUrl: './parties-smart.component.html',
  styleUrls: ['./parties-smart.component.scss'],
})
export class PartiesSmartComponent extends StackWidgetSmartComponentClass {
  parties$: Observable<Party[] | undefined>;
  attendances$: Observable<Attendance[] | undefined>;
  correspondenceCounters$: Observable<CorrespondenceCounter[] | undefined>;
  disbursements$: Observable<Disbursement[] | undefined>;

  constructor(injector: Injector) {
    super(injector);

    this.parties$ = this.store$.select(
      partiesSelectors.getPartiesForActivePart,
    );

    this.attendances$ = this.store$.select(
      attendancesSelectors.entitySelectors.selectAll,
    );

    this.correspondenceCounters$ = this.store$.select(
      correspondenceCountersSelectors.entitySelectors.selectAll,
    );

    this.disbursements$ = this.store$.select(
      disbursementsSelectors.entitySelectors.selectAll,
    );
  }

  onNewPartyClicked(): void {
    this.store$.dispatch(
      uiActions.pushStackWidget({
        stackWidgetReference: StackWidgetReference.party,
      }),
    );
  }

  onEditPartyClicked(eventPayload: TableCellEventPayload<Party>): void {
    switch (eventPayload.column.id) {
      case PartiesColumnID.party:
        this.store$.dispatch(
          uiActions.pushStackWidget({
            stackWidgetReference: StackWidgetReference.party,
            config: { id: eventPayload.tableItem.id },
          }),
        );
        break;

      case PartiesColumnID.attendances:
        this.store$.dispatch(
          uiActions.pushStackWidget({
            stackWidgetReference: StackWidgetReference.attendances,
            config: {
              partyId: eventPayload.tableItem.id,
            },
          }),
        );
        break;

      case PartiesColumnID.correspondences:
        this.store$.dispatch(
          uiActions.pushStackWidget({
            stackWidgetReference: StackWidgetReference.correspondenceCounter,
            config: {
              partyId: eventPayload.tableItem.id,
              feeEarnerId: this.activeFeeEarnerId(),
            },
          }),
        );
        break;

      case PartiesColumnID.disbursements:
        this.store$.dispatch(
          uiActions.pushStackWidget({
            stackWidgetReference: StackWidgetReference.disbursements,
            config: {
              partyId: eventPayload.tableItem.id,
            },
          }),
        );
        break;

      default:
        break;
    }
  }

  onDeletePartyClicked(party: Party): void {
    this.store$.dispatch(
      removingActions.askToConfirmEntityRemoval({
        entityId: party.id,
        entityChunkName: EntityChunkName.parties,
      }),
    );
  }

  onCorrespondenceCounterChanged(
    correspondenceCounter: CorrespondenceCounter,
  ): void {
    this.store$.dispatch(
      correspondenceCountersActions.upsertCorrespondenceCounter({
        correspondenceCounter,
      }),
    );
  }
}

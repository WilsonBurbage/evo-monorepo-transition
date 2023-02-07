import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { StackWidgetSmartComponentClass } from '../../../../core/classes/stack-widget-smart-component.class';
import { Counsel } from '../../../../core/models/counsel.model';
import { Disbursement } from '../../../../core/models/disbursement.model';
import { DefaultsService } from '../../../../core/services/defaults.service';
import * as counselsSelectors from '../../../../core/state/counsels/counsels.selectors';
import * as disbursementsActions from '../../../../core/state/disbursements/disbursements.actions';
import * as disbursementsSelectors from '../../../../core/state/disbursements/disbursements.selectors';

@Component({
  selector: 'app-disbursement-smart',
  templateUrl: './disbursement-smart.component.html',
  styleUrls: ['./disbursement-smart.component.scss'],
})
export class DisbursementSmartComponent
  extends StackWidgetSmartComponentClass
  implements OnInit
{
  disbursement$!: Observable<Disbursement | undefined>;
  counsels$!: Observable<Counsel[] | undefined>;

  ngOnInit(): void {
    this.disbursement$ = this.config?.id
      ? this.store$.select(
          disbursementsSelectors.entitySelectors.selectEntity({
            id: String(this.config.id),
          }),
        )
      : of(
          DefaultsService.createDefaultDisbursement({
            chronologyStepId: this.config.chronologyStepId,
            partyId: this.config.partyId,
            partId: this.activePartId(),
            partSpecificDisbursementType:
              this.config.partSpecificDisbursementType,
          }),
        );

    this.counsels$ = this.store$.select(
      counselsSelectors.entitySelectors.selectAll,
    );
  }

  onSaveClicked(amendedDisbursement: Disbursement): void {
    this.store$.dispatch(
      disbursementsActions.upsertDisbursement({
        disbursement: amendedDisbursement,
      }),
    );
    this.pop();
  }
}

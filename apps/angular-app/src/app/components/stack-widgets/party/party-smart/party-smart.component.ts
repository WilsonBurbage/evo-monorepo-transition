import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { StackWidgetSmartComponentClass } from '../../../../core/classes/stack-widget-smart-component.class';
import { Party } from '../../../../core/models/party.model';
import { DefaultsService } from '../../../../core/services/defaults.service';
import * as partiesActions from '../../../../core/state/parties/parties.actions';
import * as partiesSelectors from '../../../../core/state/parties/parties.selectors';

@Component({
  selector: 'app-party-smart',
  templateUrl: './party-smart.component.html',
  styleUrls: ['./party-smart.component.scss'],
})
export class PartySmartComponent
  extends StackWidgetSmartComponentClass
  implements OnInit
{
  party$!: Observable<Party | undefined>;

  ngOnInit(): void {
    this.party$ = this.config?.id
      ? this.store$.select(
          partiesSelectors.entitySelectors.selectEntity({
            id: String(this.config.id),
          }),
        )
      : of(
          DefaultsService.createDefaultParty({
            partId: this.activePartId(),
          }),
        );
  }

  onSaveClicked(amendedParty: Party): void {
    this.store$.dispatch(
      partiesActions.upsertParty({
        party: amendedParty,
      }),
    );
    this.pop();
  }
}

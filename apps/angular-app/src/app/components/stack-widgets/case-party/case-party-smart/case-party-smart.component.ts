import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { StackWidgetSmartComponentClass } from '../../../../core/classes/stack-widget-smart-component.class';
import { CaseParty } from '../../../../core/models/case-party.model';
import { DefaultsService } from '../../../../core/services/defaults.service';
import * as casePartiesActions from '../../../../core/state/case-parties/case-parties.actions';
import * as casePartiesSelectors from '../../../../core/state/case-parties/case-parties.selectors';

@Component({
  selector: 'app-case-party-smart',
  templateUrl: './case-party-smart.component.html',
  styleUrls: ['./case-party-smart.component.scss'],
})
export class CasePartySmartComponent
  extends StackWidgetSmartComponentClass
  implements OnInit
{
  caseParty$!: Observable<CaseParty | undefined>;

  ngOnInit(): void {
    this.caseParty$ = this.config?.id
      ? this.store$.select(
          casePartiesSelectors.entitySelectors.selectEntity({
            id: String(this.config.id),
          }),
        )
      : of(DefaultsService.createDefaultCaseParty());
  }

  onSaveClicked(amendedCaseParty: CaseParty): void {
    this.store$.dispatch(
      casePartiesActions.upsertCaseParty({ caseParty: amendedCaseParty }),
    );
    this.pop();
  }
}

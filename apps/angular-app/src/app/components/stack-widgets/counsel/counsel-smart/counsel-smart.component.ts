import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { StackWidgetSmartComponentClass } from '../../../../core/classes/stack-widget-smart-component.class';
import { Counsel } from '../../../../core/models/counsel.model';
import { DefaultsService } from '../../../../core/services/defaults.service';
import * as counselsActions from '../../../../core/state/counsels/counsels.actions';
import * as counselsSelectors from '../../../../core/state/counsels/counsels.selectors';

@Component({
  selector: 'app-counsel-smart',
  templateUrl: './counsel-smart.component.html',
  styleUrls: ['./counsel-smart.component.scss'],
})
export class CounselSmartComponent
  extends StackWidgetSmartComponentClass
  implements OnInit
{
  counsel$!: Observable<Counsel | undefined>;

  ngOnInit(): void {
    this.counsel$ = this.config?.id
      ? this.store$.select(
          counselsSelectors.entitySelectors.selectEntity({
            id: String(this.config.id),
          }),
        )
      : of(DefaultsService.createDefaultCounsel());
  }

  onSaveClicked(amendedCounsel: Counsel): void {
    this.store$.dispatch(
      counselsActions.upsertCounsel({ counsel: amendedCounsel }),
    );
    this.pop();
  }
}

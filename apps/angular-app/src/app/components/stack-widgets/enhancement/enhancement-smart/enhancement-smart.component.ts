import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { StackWidgetSmartComponentClass } from '../../../../core/classes/stack-widget-smart-component.class';
import { Enhancement } from '../../../../core/models/enhancement.model';
import { DefaultsService } from '../../../../core/services/defaults.service';
import * as enhancementsActions from '../../../../core/state/enhancements/enhancements.actions';
import * as enhancementsSelectors from '../../../../core/state/enhancements/enhancements.selectors';

@Component({
  selector: 'app-enhancement-smart',
  templateUrl: './enhancement-smart.component.html',
  styleUrls: ['./enhancement-smart.component.scss'],
})
export class EnhancementSmartComponent
  extends StackWidgetSmartComponentClass
  implements OnInit
{
  enhancement$!: Observable<Enhancement | undefined>;

  ngOnInit(): void {
    this.enhancement$ = this.config?.id
      ? this.store$.select(
          enhancementsSelectors.entitySelectors.selectEntity({
            id: String(this.config.id),
          }),
        )
      : of(
          DefaultsService.createDefaultEnhancement({
            partId: this.config.partId,
          }),
        );
  }

  onSaveClicked(amendedEnhancement: Enhancement): void {
    this.store$.dispatch(
      enhancementsActions.upsertEnhancement({
        enhancement: amendedEnhancement,
      }),
    );
    this.pop();
  }
}

import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { StackWidgetSmartComponentClass } from '../../../../core/classes/stack-widget-smart-component.class';
import { ChronologyStep } from '../../../../core/models/chronology-step.model';
import { DefaultsService } from '../../../../core/services/defaults.service';
import * as chronologyStepsActions from '../../../../core/state/chronology-steps/chronology-steps.actions';
import * as chronologyStepsSelectors from '../../../../core/state/chronology-steps/chronology-steps.selectors';

@Component({
  selector: 'app-chronology-step-smart',
  templateUrl: './chronology-step-smart.component.html',
  styleUrls: ['./chronology-step-smart.component.scss'],
})
export class ChronologyStepSmartComponent
  extends StackWidgetSmartComponentClass
  implements OnInit
{
  chronologyStep$!: Observable<ChronologyStep | undefined>;

  ngOnInit(): void {
    this.chronologyStep$ = this.config?.id
      ? this.store$.select(
          chronologyStepsSelectors.entitySelectors.selectEntity({
            id: String(this.config.id),
          }),
        )
      : of(
          DefaultsService.createDefaultChronologyStep({
            partId: this.activePartId(),
          }),
        );
  }

  onSaveClicked(amendedChronologyStep: ChronologyStep): void {
    this.store$.dispatch(
      chronologyStepsActions.upsertChronologyStep({
        chronologyStep: amendedChronologyStep,
      }),
    );
    this.pop();
  }
}

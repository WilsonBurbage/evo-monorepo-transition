import { Component, Injector, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, takeUntil } from 'rxjs';
import {
  ACTIVE_FEE_EARNER_PROPERTY_NAME,
  ACTIVE_PART_PROPERTY_NAME,
} from '../../../../core/constants/active-element.constants';
import { FeeEarner } from '../../../../core/models/fee-earner.model';
import { Part } from '../../../../core/models/part.model';
import { BaseComponentClass } from './../../../../core/classes/base-component.class';
import * as feeEarnersSelectors from './../../../../core/state/fee-earners/fee-earners.selectors';
import * as partsSelectors from './../../../../core/state/parts/parts.selectors';
import * as uiActions from './../../../../core/state/ui/ui.actions';

@Component({
  selector: 'app-active-element-selector-smart',
  templateUrl: './active-element-selector-smart.component.html',
  styleUrls: ['./active-element-selector-smart.component.scss'],
})
export class ActiveElementSelectorSmartComponent extends BaseComponentClass {
  @Input() partSelectorRequired!: boolean;
  @Input() feeEarnerSelectorRequired!: boolean;

  parts$: Observable<Part[] | undefined>;
  feeEarners$: Observable<FeeEarner[] | undefined>;

  form!: FormGroup;

  constructor(injector: Injector) {
    super(injector);

    this.parts$ = this.store$.select(partsSelectors.entitySelectors.selectAll);
    this.feeEarners$ = this.store$.select(
      feeEarnersSelectors.entitySelectors.selectAll,
    );
  }

  onFormGroupGenerated(form: FormGroup): void {
    this.form = form;

    if (this.partSelectorRequired) {
      this.form.controls[ACTIVE_PART_PROPERTY_NAME].valueChanges
        .pipe(takeUntil(this.destroyed$))
        .subscribe((value) =>
          this.store$.dispatch(
            uiActions.setActivePartId({
              partId: value,
            }),
          ),
        );
    }

    if (this.feeEarnerSelectorRequired) {
      this.form.controls[ACTIVE_FEE_EARNER_PROPERTY_NAME].valueChanges
        .pipe(takeUntil(this.destroyed$))
        .subscribe((value) =>
          this.store$.dispatch(
            uiActions.setActiveFeeEarnerId({
              feeEarnerId: value,
            }),
          ),
        );
    }
  }
}

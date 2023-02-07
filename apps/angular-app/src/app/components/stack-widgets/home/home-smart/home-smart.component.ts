import { Component } from '@angular/core';
import { StackWidgetSmartComponentClass } from '../../../../core/classes/stack-widget-smart-component.class';
import { PartSpecificDisbursementType } from '../../../../core/models/part-specific-disbursement-type.model';
import { StackWidgetReference } from '../../../../core/models/stack-widget-reference.model';
import * as uiActions from '../../../../core/state/ui/ui.actions';

@Component({
  selector: 'app-home-smart',
  templateUrl: './home-smart.component.html',
  styleUrls: ['./home-smart.component.scss'],
})
export class HomeSmartComponent extends StackWidgetSmartComponentClass {
  onBillSetupClicked(): void {
    this.store$.dispatch(
      uiActions.pushStackWidget({
        stackWidgetReference: StackWidgetReference.billSetup,
      }),
    );
  }

  onCoverSheetsClicked(): void {
    this.store$.dispatch(
      uiActions.pushStackWidget({
        stackWidgetReference: StackWidgetReference.coverSheets,
      }),
    );
  }

  onNarrativeClicked(): void {
    this.store$.dispatch(
      uiActions.pushStackWidget({
        stackWidgetReference: StackWidgetReference.narrative,
      }),
    );
  }

  onRatesClicked(): void {
    this.store$.dispatch(
      uiActions.pushStackWidget({
        stackWidgetReference: StackWidgetReference.rates,
      }),
    );
  }

  onPartsClicked(): void {
    this.store$.dispatch(
      uiActions.pushStackWidget({
        stackWidgetReference: StackWidgetReference.parts,
      }),
    );
  }

  onCounselsClicked(): void {
    this.store$.dispatch(
      uiActions.pushStackWidget({
        stackWidgetReference: StackWidgetReference.counsels,
      }),
    );
  }

  onChronologyClicked(): void {
    this.store$.dispatch(
      uiActions.pushStackWidget({
        stackWidgetReference: StackWidgetReference.chronology,
      }),
    );
  }

  onPartiesClicked(): void {
    this.store$.dispatch(
      uiActions.pushStackWidget({
        stackWidgetReference: StackWidgetReference.parties,
      }),
    );
  }

  onDocumentsClicked(): void {
    this.store$.dispatch(
      uiActions.pushStackWidget({
        stackWidgetReference: StackWidgetReference.documents,
      }),
    );
  }

  onOtherDisbursementsClicked(): void {
    this.store$.dispatch(
      uiActions.pushStackWidget({
        stackWidgetReference: StackWidgetReference.otherDisbursements,
        config: {
          partId: this.activePartId(),
          partSpecificDisbursementType:
            PartSpecificDisbursementType.otherDisbursements,
        },
      }),
    );
  }

  onOtherWorkClicked(): void {
    this.store$.dispatch(
      uiActions.pushStackWidget({
        stackWidgetReference: StackWidgetReference.otherWork,
      }),
    );
  }
}

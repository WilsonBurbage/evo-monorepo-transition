import { Component, Injector } from '@angular/core';
import { debounceTime, Observable, takeUntil } from 'rxjs';
import { BillSetup } from '../../../../core/models/bill-setup.model';
import { StackWidgetReference } from '../../../../core/models/stack-widget-reference.model';
import { StackWidget } from '../../../../core/models/stack.widget.model';
import { RecoveryFileService } from '../../../../core/services/recovery-file.service';
import * as billSetupSelectors from '../../../../core/state/bill-setup/bill-setup.selectors';
import * as evoFileActions from '../../../../core/state/evo-file/evo-file.actions';
import * as evoFileSelectors from '../../../../core/state/evo-file/evo-file.selectors';
import * as uiActions from '../../../../core/state/ui/ui.actions';
import * as uiSelectors from '../../../../core/state/ui/ui.selectors';
import { BaseComponentClass } from './../../../../core/classes/base-component.class';

@Component({
  selector: 'app-bill-editor-smart',
  templateUrl: './bill-editor-smart.component.html',
  styleUrls: ['./bill-editor-smart.component.scss'],
})
export class BillEditorSmartComponent extends BaseComponentClass {
  filePath$: Observable<string | undefined>;
  evoFileHasChangedSinceSave$: Observable<boolean | undefined>;

  billSetup$: Observable<BillSetup | undefined>;

  stackWidgets$: Observable<StackWidget[]>;

  constructor(injector: Injector) {
    super(injector);

    this.filePath$ = this.store$.select(evoFileSelectors.getFilePath);

    this.evoFileHasChangedSinceSave$ = this.store$.select(
      evoFileSelectors.getEvoFileHasChangedSinceSave,
    );

    this.billSetup$ = this.store$.select(billSetupSelectors.getBillSetup);

    this.stackWidgets$ = this.store$.select(uiSelectors.getStackItems);

    this.store$
      .select(evoFileSelectors.getCompiledEvoFile)
      .pipe(takeUntil(this.destroyed$), debounceTime(1000))
      .subscribe((evoFile) => RecoveryFileService.saveRecoveryFile(evoFile));

    this.store$.dispatch(evoFileActions.newEvoFile());
  }

  onSettingsClicked(): void {
    this.store$.dispatch(
      uiActions.pushStackWidget({
        stackWidgetReference: StackWidgetReference.settings,
      }),
    );
  }
}

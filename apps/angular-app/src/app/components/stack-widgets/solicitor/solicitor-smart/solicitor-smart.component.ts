import { Component, Injector, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { StackWidgetSmartComponentClass } from '../../../../core/classes/stack-widget-smart-component.class';
import { Solicitor } from '../../../../core/models/solicitor.model';
import { StackWidgetReference } from '../../../../core/models/stack-widget-reference.model';
import { DefaultsService } from '../../../../core/services/defaults.service';
import * as solicitorsActions from '../../../../core/state/solicitors/solicitors.actions';
import * as solicitorsSelectors from '../../../../core/state/solicitors/solicitors.selectors';
import * as uiActions from '../../../../core/state/ui/ui.actions';

@Component({
  selector: 'app-solicitor-smart',
  templateUrl: './solicitor-smart.component.html',
  styleUrls: ['./solicitor-smart.component.scss'],
})
export class SolicitorSmartComponent
  extends StackWidgetSmartComponentClass
  implements OnInit
{
  solicitor$!: Observable<Solicitor | undefined>;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.solicitor$ = this.config?.id
      ? this.store$.select(
          solicitorsSelectors.entitySelectors.selectEntity({
            id: String(this.config.id),
          }),
        )
      : of(DefaultsService.createDefaultSolicitor());
  }

  onSearchClicked(): void {
    this.store$.dispatch(
      uiActions.pushStackWidget({
        stackWidgetReference: StackWidgetReference.solicitorLookup,
        config: this.config,
      }),
    );
  }

  onSaveClicked(amendedSolicitor: Solicitor): void {
    this.store$.dispatch(
      solicitorsActions.upsertSolicitor({ solicitor: amendedSolicitor }),
    );
    this.pop();
  }
}

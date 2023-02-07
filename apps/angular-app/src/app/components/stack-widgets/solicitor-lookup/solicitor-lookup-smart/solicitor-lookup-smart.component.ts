import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StackWidgetSmartComponentClass } from '../../../../core/classes/stack-widget-smart-component.class';
import { Solicitor } from '../../../../core/models/solicitor.model';
import { StackWidgetReference } from '../../../../core/models/stack-widget-reference.model';
import * as solicitorLookupActions from '../../../../core/state/solicitor-lookup/solicitor-lookup.actions';
import * as solicitorLookupSelectors from '../../../../core/state/solicitor-lookup/solicitor-lookup.selectors';
import * as solicitorsActions from '../../../../core/state/solicitors/solicitors.actions';
import * as uiActions from '../../../../core/state/ui/ui.actions';

@Component({
  selector: 'app-solicitor-lookup-smart',
  templateUrl: './solicitor-lookup-smart.component.html',
  styleUrls: ['./solicitor-lookup-smart.component.scss'],
})
export class SolicitorLookupSmartComponent
  extends StackWidgetSmartComponentClass
  implements OnInit
{
  solicitors$!: Observable<Solicitor[] | undefined>;
  searching$!: Observable<boolean | undefined>;

  ngOnInit(): void {
    this.solicitors$ = this.store$.select(
      solicitorLookupSelectors.entitySelectors.selectAll,
    );

    this.searching$ = this.store$.select(
      solicitorLookupSelectors.getLookupStatuses.inProgressSelector,
    );
  }

  onSearchClicked(searchString: string): void {
    this.store$.dispatch(solicitorLookupActions.lookup({ searchString }));
  }

  onSelectSolicitorClicked(solicitor: Solicitor): void {
    this.store$.dispatch(
      uiActions.pushStackWidget({
        stackWidgetReference: StackWidgetReference.confirm,
        config: {
          confirmMessage: 'Any existing solicitor details will be replaced.',
          confirmActions: [
            solicitorsActions.upsertSolicitor({
              solicitor: {
                ...solicitor,
                id: this.config.id!,
              },
            }),
            uiActions.popStackWidget(),
          ],
        },
      }),
    );
  }
}

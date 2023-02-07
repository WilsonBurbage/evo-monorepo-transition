import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StackWidgetSmartComponentClass } from '../../../../core/classes/stack-widget-smart-component.class';
import { CoverSheetDetails } from '../../../../core/models/cover-sheet-details.model';
import * as coverSheetDetailsActions from '../../../../core/state/cover-sheet-details/cover-sheet-details.actions';
import * as coverSheetDetailsSelectors from '../../../../core/state/cover-sheet-details/cover-sheet-details.selectors';

@Component({
  selector: 'app-cover-sheet-details-smart',
  templateUrl: './cover-sheet-details-smart.component.html',
  styleUrls: ['./cover-sheet-details-smart.component.scss'],
})
export class CoverSheetDetailsSmartComponent
  extends StackWidgetSmartComponentClass
  implements OnInit
{
  coverSheetDetails$!: Observable<CoverSheetDetails | undefined>;

  ngOnInit(): void {
    this.coverSheetDetails$ = this.store$.select(
      coverSheetDetailsSelectors.getCoverSheetDetails,
    );
  }

  onSaveClicked(amendedCoverSheetDetails: CoverSheetDetails): void {
    this.store$.dispatch(
      coverSheetDetailsActions.setCoverSheetDetails({
        coverSheetDetails: amendedCoverSheetDetails,
      }),
    );
    this.pop();
  }
}

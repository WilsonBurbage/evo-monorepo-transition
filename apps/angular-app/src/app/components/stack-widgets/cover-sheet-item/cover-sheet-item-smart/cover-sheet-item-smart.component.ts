import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { StackWidgetSmartComponentClass } from '../../../../core/classes/stack-widget-smart-component.class';
import { CoverSheetItem } from '../../../../core/models/cover-sheet-item.model';
import { DefaultsService } from '../../../../core/services/defaults.service';
import * as coverSheetItemsActions from '../../../../core/state/cover-sheet-items/cover-sheet-items.actions';
import * as coverSheetItemsSelectors from '../../../../core/state/cover-sheet-items/cover-sheet-items.selectors';

@Component({
  selector: 'app-cover-sheet-item-smart',
  templateUrl: './cover-sheet-item-smart.component.html',
  styleUrls: ['./cover-sheet-item-smart.component.scss'],
})
export class CoverSheetItemSmartComponent
  extends StackWidgetSmartComponentClass
  implements OnInit
{
  coverSheetItem$!: Observable<CoverSheetItem | undefined>;

  ngOnInit(): void {
    this.coverSheetItem$ = this.config?.id
      ? this.store$.select(
          coverSheetItemsSelectors.entitySelectors.selectEntity({
            id: String(this.config.id),
          }),
        )
      : of(
          DefaultsService.createDefaultCoverSheetItem({
            coverSheetType: this.config.coverSheetType,
          }),
        );
  }

  onSaveClicked(amendedCoverSheetItem: CoverSheetItem): void {
    this.store$.dispatch(
      coverSheetItemsActions.upsertCoverSheetItem({
        coverSheetItem: amendedCoverSheetItem,
      }),
    );
    this.pop();
  }
}

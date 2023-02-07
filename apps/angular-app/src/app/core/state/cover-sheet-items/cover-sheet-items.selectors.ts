import { createSelector } from '@ngrx/store';
import { CoverSheetItem } from '../../models/cover-sheet-item.model';
import { CoverSheetType } from '../../models/cover-sheet-type.model';
import { SelectorsService } from '../../services/selectors.service';
import { adapter, chunkName } from './cover-sheet-items.reducer';

export const entitySelectors =
  SelectorsService.generateEntitySelectors<CoverSheetItem>(adapter, chunkName);

export const getFrontSheetItems = createSelector(
  entitySelectors.selectAll,
  (coverSheetItems) =>
    coverSheetItems.filter(
      (coverSheetItem) =>
        coverSheetItem.coverSheetType === CoverSheetType.frontSheet,
    ),
);

export const getBackSheetItems = createSelector(
  entitySelectors.selectAll,
  (coverSheetItems) =>
    coverSheetItems.filter(
      (coverSheetItem) =>
        coverSheetItem.coverSheetType === CoverSheetType.backSheet,
    ),
);

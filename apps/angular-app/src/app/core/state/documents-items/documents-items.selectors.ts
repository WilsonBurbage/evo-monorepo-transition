import { createSelector } from '@ngrx/store';
import { DocumentsItem } from '../../models/documents-item.model';
import { SelectorsService } from '../../services/selectors.service';
import * as uiSelectors from './../ui/ui.selectors';
import { adapter, chunkName } from './documents-items.reducer';

export const entitySelectors =
  SelectorsService.generateEntitySelectors<DocumentsItem>(adapter, chunkName);

export const getDocumentsItemsForActivePart = createSelector(
  uiSelectors.getActivePartId,
  entitySelectors.selectAll,
  (activePartId, documentsItems) =>
    documentsItems.filter(
      (documentsItem) => documentsItem.partId === activePartId,
    ),
);

import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { DocumentsItem } from '../../models/documents-item.model';
import { EntityChunkName } from '../../models/entity-chunk-name.model';
import { DatesService } from '../../services/dates.service';
import { setEntireStateReducer } from '../developer/developer.reducer';
import { applyEntitySortingReducer } from '../global/sorting.reducer';
import * as documentsItemsActions from './documents-items.actions';

export const chunkName = EntityChunkName.documentsItems;

export type State = EntityState<DocumentsItem>;

export const adapter: EntityAdapter<DocumentsItem> =
  createEntityAdapter<DocumentsItem>({
    sortComparer: (a, b) =>
      DatesService.getMillisecondsBetweenDateStrings(a.date, b.date),
  });

export const initialState = adapter.getInitialState();

const documentsItemsReducer = createReducer(
  initialState,

  setEntireStateReducer(chunkName),

  applyEntitySortingReducer(chunkName, adapter),

  on(documentsItemsActions.setDocumentsItems, (state, { documentsItems }) => {
    return adapter.setAll(documentsItems, state);
  }),

  on(documentsItemsActions.upsertDocumentsItem, (state, { documentsItem }) => {
    return adapter.upsertOne(documentsItem, state);
  }),

  on(
    documentsItemsActions.removeDocumentsItem,
    (state, { documentsItemId }) => {
      return adapter.removeOne(documentsItemId, state);
    },
  ),
);

export function reducer(state: State | undefined, action: Action): State {
  return documentsItemsReducer(state, action);
}

import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { CoverSheetItem } from '../../models/cover-sheet-item.model';
import { EntityChunkName } from '../../models/entity-chunk-name.model';
import { setEntireStateReducer } from '../developer/developer.reducer';
import { applyEntitySortingReducer } from '../global/sorting.reducer';
import * as coverSheetItemsActions from './cover-sheet-items.actions';

export const chunkName = EntityChunkName.coverSheetItems;

export type State = EntityState<CoverSheetItem>;

export const adapter: EntityAdapter<CoverSheetItem> =
  createEntityAdapter<CoverSheetItem>();

export const initialState = adapter.getInitialState();

const coverSheetItemsReducer = createReducer(
  initialState,

  setEntireStateReducer(chunkName),

  applyEntitySortingReducer(chunkName, adapter),

  on(
    coverSheetItemsActions.setCoverSheetItems,
    (state, { coverSheetItems }) => {
      return adapter.setAll(coverSheetItems, state);
    },
  ),

  on(
    coverSheetItemsActions.upsertCoverSheetItem,
    (state, { coverSheetItem }) => {
      return adapter.upsertOne(coverSheetItem, state);
    },
  ),

  on(
    coverSheetItemsActions.removeCoverSheetItem,
    (state, { coverSheetItemId }) => {
      return adapter.removeOne(coverSheetItemId, state);
    },
  ),
);

export function reducer(state: State | undefined, action: Action): State {
  return coverSheetItemsReducer(state, action);
}

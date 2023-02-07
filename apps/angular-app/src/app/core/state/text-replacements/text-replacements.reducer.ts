import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { EntityChunkName } from '../../models/entity-chunk-name.model';
import { TextReplacement } from '../../models/text-replacement.model';
import { setEntireStateReducer } from '../developer/developer.reducer';
import { applyEntitySortingReducer } from '../global/sorting.reducer';
import * as textReplacementsActions from './text-replacements.actions';

export const chunkName = EntityChunkName.textReplacements;

export type State = EntityState<TextReplacement>;

export const adapter: EntityAdapter<TextReplacement> =
  createEntityAdapter<TextReplacement>({
    sortComparer: (a, b) => a.input.localeCompare(b.input),
  });

export const initialState = adapter.getInitialState();

const textReplacementsReducer = createReducer(
  initialState,

  setEntireStateReducer(chunkName),

  applyEntitySortingReducer(chunkName, adapter),

  on(
    textReplacementsActions.setTextReplacements,
    (state, { textReplacements }) => {
      return adapter.setAll(textReplacements, state);
    },
  ),

  on(
    textReplacementsActions.upsertTextReplacement,
    (state, { textReplacement }) => {
      return adapter.upsertOne(textReplacement, state);
    },
  ),

  on(
    textReplacementsActions.removeTextReplacement,
    (state, { textReplacementId }) => {
      return adapter.removeOne(textReplacementId, state);
    },
  ),
);

export function reducer(state: State | undefined, action: Action): State {
  return textReplacementsReducer(state, action);
}

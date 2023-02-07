import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { EntityChunkName } from '../../models/entity-chunk-name.model';
import { ToastMessage } from '../../models/toast-message.model';
import { setEntireStateReducer } from '../developer/developer.reducer';
import { applyEntitySortingReducer } from '../global/sorting.reducer';
import * as toastMessagesActions from './toast-messages.actions';

export const chunkName = EntityChunkName.toastMessages;

export type State = EntityState<ToastMessage>;

export const adapter: EntityAdapter<ToastMessage> =
  createEntityAdapter<ToastMessage>();

export const initialState = adapter.getInitialState();

const toastMessagesReducer = createReducer(
  initialState,

  setEntireStateReducer(chunkName),

  applyEntitySortingReducer(chunkName, adapter),

  on(toastMessagesActions.upsertToastMessage, (state, { toastMessage }) => {
    return adapter.upsertOne(toastMessage, state);
  }),

  on(toastMessagesActions.removeToastMessage, (state, { toastMessageId }) => {
    return adapter.removeOne(toastMessageId, state);
  }),
);

export function reducer(state: State | undefined, action: Action): State {
  return toastMessagesReducer(state, action);
}

import { Action, createReducer, on } from '@ngrx/store';
import { BillSetup } from '../../models/bill-setup.model';
import { EntityChunkName } from '../../models/entity-chunk-name.model';
import { setEntireStateReducer } from '../developer/developer.reducer';
import * as billSetupActions from './bill-setup.actions';

export const chunkName = EntityChunkName.billSetup;

export interface State {
  billSetup?: BillSetup;
}

export const initialState: State = {};

const reducerSetup = createReducer(
  initialState,

  setEntireStateReducer(chunkName),

  on(
    billSetupActions.setBillSetup,
    (state, props): State => ({
      ...state,
      billSetup: props.billSetup,
    }),
  ),
);

export function reducer(state: State | undefined, action: Action): State {
  return reducerSetup(state, action);
}

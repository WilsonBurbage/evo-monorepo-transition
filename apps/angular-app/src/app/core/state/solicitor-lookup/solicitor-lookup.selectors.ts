import { createSelector } from '@ngrx/store';
import { Solicitor } from '../../models/solicitor.model';
import { SelectorsService } from '../../services/selectors.service';
import { generateAsyncStatusSelectors } from './../async-state/async-state.selectors';
import { GlobalState } from './../reducers';
import * as solicitorLookupReducer from './solicitor-lookup.reducer';
import { adapter, chunkName } from './solicitor-lookup.reducer';

export const entitySelectors =
  SelectorsService.generateEntitySelectors<Solicitor>(adapter, chunkName);

export const getState = (state: GlobalState): solicitorLookupReducer.State =>
  state[solicitorLookupReducer.chunkName];

export const getLookup = createSelector(
  getState,
  (state) => state.lookupAsyncState!,
);

export const getLookupStatuses = generateAsyncStatusSelectors(getLookup);

import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { ChronologyStep } from '../../models/chronology-step.model';
import { EntityChunkName } from '../../models/entity-chunk-name.model';
import { DatesService } from '../../services/dates.service';
import { setEntireStateReducer } from '../developer/developer.reducer';
import { applyEntitySortingReducer } from '../global/sorting.reducer';
import * as chronologyStepsActions from './chronology-steps.actions';

export const chunkName = EntityChunkName.chronologySteps;

export type State = EntityState<ChronologyStep>;

export const adapter: EntityAdapter<ChronologyStep> =
  createEntityAdapter<ChronologyStep>({
    sortComparer: (a, b) =>
      DatesService.getMillisecondsBetweenDateStrings(a.date, b.date),
  });

export const initialState = adapter.getInitialState();

const chronologyStepsReducer = createReducer(
  initialState,

  setEntireStateReducer(chunkName),

  applyEntitySortingReducer(chunkName, adapter),

  on(
    chronologyStepsActions.setChronologySteps,
    (state, { chronologySteps }) => {
      return adapter.setAll(chronologySteps, state);
    },
  ),

  on(
    chronologyStepsActions.upsertChronologyStep,
    (state, { chronologyStep }) => {
      return adapter.upsertOne(chronologyStep, state);
    },
  ),

  on(
    chronologyStepsActions.removeChronologyStep,
    (state, { chronologyStepId }) => {
      return adapter.removeOne(chronologyStepId, state);
    },
  ),
);

export function reducer(state: State | undefined, action: Action): State {
  return chronologyStepsReducer(state, action);
}

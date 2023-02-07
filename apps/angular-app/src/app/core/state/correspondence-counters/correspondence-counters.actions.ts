import { createAction, props } from '@ngrx/store';
import { CorrespondenceCounter } from '../../models/correspondence-counter.model';
import { ActionsService } from '../../services/actions.service';

export const prefix = 'Correspondence Counters';

export enum ActionNames {
  setCorrespondenceCounters = 'Set Correspondence Counters',
  upsertCorrespondenceCounter = 'Upsert Correspondence Counter',
  upsertCorrespondenceCounters = 'Upsert Correspondence Counters',
  removeCorrespondenceCounter = 'Remove Correspondence Counter',
}

export const setCorrespondenceCounters = createAction(
  ActionsService.compileActionName(
    prefix,
    ActionNames.setCorrespondenceCounters,
  ),
  props<{ correspondenceCounters: CorrespondenceCounter[] }>(),
);

export const upsertCorrespondenceCounter = createAction(
  ActionsService.compileActionName(
    prefix,
    ActionNames.upsertCorrespondenceCounter,
  ),
  props<{ correspondenceCounter: CorrespondenceCounter }>(),
);

export const upsertCorrespondenceCounters = createAction(
  ActionsService.compileActionName(
    prefix,
    ActionNames.upsertCorrespondenceCounters,
  ),
  props<{ correspondenceCounters: CorrespondenceCounter[] }>(),
);

export const removeCorrespondenceCounter = createAction(
  ActionsService.compileActionName(
    prefix,
    ActionNames.removeCorrespondenceCounter,
  ),
  props<{ correspondenceCounterId: string }>(),
);

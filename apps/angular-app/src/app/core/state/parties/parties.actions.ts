import { createAction, props } from '@ngrx/store';
import { Party } from '../../models/party.model';
import { ActionsService } from '../../services/actions.service';

export const prefix = 'Parties';

export enum ActionNames {
  setParties = 'Set Parties',
  upsertParty = 'Upsert Party',
  removeParty = 'Remove Party',
}

export const setParties = createAction(
  ActionsService.compileActionName(prefix, ActionNames.setParties),
  props<{ parties: Party[] }>(),
);

export const upsertParty = createAction(
  ActionsService.compileActionName(prefix, ActionNames.upsertParty),
  props<{ party: Party }>(),
);

export const removeParty = createAction(
  ActionsService.compileActionName(prefix, ActionNames.removeParty),
  props<{ partyId: string }>(),
);

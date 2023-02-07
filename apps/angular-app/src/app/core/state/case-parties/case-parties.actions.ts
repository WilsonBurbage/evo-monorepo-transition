import { createAction, props } from '@ngrx/store';
import { CaseParty } from '../../models/case-party.model';
import { ActionsService } from '../../services/actions.service';

export const prefix = 'Case Parties';

export enum ActionNames {
  setCaseParties = 'Set Case Parties',
  upsertCaseParty = 'Upsert Case Party',
  removeCaseParty = 'Remove Case Party',
}

export const setCaseParties = createAction(
  ActionsService.compileActionName(prefix, ActionNames.setCaseParties),
  props<{ caseParties: CaseParty[] }>(),
);

export const upsertCaseParty = createAction(
  ActionsService.compileActionName(prefix, ActionNames.upsertCaseParty),
  props<{ caseParty: CaseParty }>(),
);

export const removeCaseParty = createAction(
  ActionsService.compileActionName(prefix, ActionNames.removeCaseParty),
  props<{ casePartyId: string }>(),
);

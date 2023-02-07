import { createAction, props } from '@ngrx/store';
import { TextReplacement } from '../../models/text-replacement.model';
import { ActionsService } from '../../services/actions.service';

export const prefix = 'Text Replacements';

export enum ActionNames {
  setTextReplacements = 'Set Text Replacements',
  upsertTextReplacement = 'Upsert Text Replacement',
  removeTextReplacement = 'Remove Text Replacement',
}

export const setTextReplacements = createAction(
  ActionsService.compileActionName(prefix, ActionNames.setTextReplacements),
  props<{ textReplacements: TextReplacement[] }>(),
);

export const upsertTextReplacement = createAction(
  ActionsService.compileActionName(prefix, ActionNames.upsertTextReplacement),
  props<{ textReplacement: TextReplacement }>(),
);

export const removeTextReplacement = createAction(
  ActionsService.compileActionName(prefix, ActionNames.removeTextReplacement),
  props<{ textReplacementId: string }>(),
);

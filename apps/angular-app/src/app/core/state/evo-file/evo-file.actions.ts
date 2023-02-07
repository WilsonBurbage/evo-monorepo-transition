import { FileData } from '@evo-monorepo/shared';
import { createAction, props } from '@ngrx/store';
import { EvoFile } from './../../models/evo-file.model';
import { ActionsService } from './../../services/actions.service';

export const prefix = 'Evo File';

export enum ActionNames {
  newEvoFile = 'New Evo File',

  openEvoFile = 'Open Evo File',
  openEvoFileSuccess = 'Open Evo File Success',
  openEvoFileFailure = 'Open Evo File Failure',

  upgradeEvoFile = 'Upgrade Evo File',

  saveEvoFile = 'Save Evo File',
  saveEvoFileSuccess = 'Save Evo File Success',
  saveEvoFileFailure = 'Save Evo File Failure',
}

export const newEvoFile = createAction(
  ActionsService.compileActionName(prefix, ActionNames.newEvoFile)
);

export const openEvoFile = createAction(
  ActionsService.compileActionName(prefix, ActionNames.openEvoFile)
);

export const openEvoFileSuccess = createAction(
  ActionsService.compileActionName(prefix, ActionNames.openEvoFileSuccess),
  props<{ fileData: FileData<EvoFile>; hash: string }>()
);

export const openEvoFileFailure = createAction(
  ActionsService.compileActionName(prefix, ActionNames.openEvoFileFailure)
);

export const upgradeEvoFile = createAction(
  ActionsService.compileActionName(prefix, ActionNames.upgradeEvoFile)
);

export const saveEvoFile = createAction(
  ActionsService.compileActionName(prefix, ActionNames.saveEvoFile),
  props<{ saveAs: boolean }>()
);

export const saveEvoFileSuccess = createAction(
  ActionsService.compileActionName(prefix, ActionNames.saveEvoFileSuccess),
  props<{ fileData: FileData<EvoFile>; hash: string }>()
);

export const saveEvoFileFailure = createAction(
  ActionsService.compileActionName(prefix, ActionNames.saveEvoFileFailure)
);

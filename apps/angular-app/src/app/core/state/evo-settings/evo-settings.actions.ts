import { FileData } from '@evo-monorepo/shared';
import { createAction, props } from '@ngrx/store';
import { EvoSettings } from '../../models/evo-settings.model';
import { ActionsService } from './../../services/actions.service';

export const prefix = 'Evo Settings';

export enum ActionNames {
  openEvoSettings = 'Open Evo Settings',
  openEvoSettingsSuccess = 'Open Evo Settings Success',
  openEvoSettingsFailure = 'Open Evo Settings Failure',

  upgradeEvoSettings = 'Upgrade Evo Settings',

  saveEvoSettings = 'Save Evo Settings',
  saveEvoSettingsSuccess = 'Save Evo Settings Success',
  saveEvoSettingsFailure = 'Save Evo Settings Failure',
}

export const openEvoSettings = createAction(
  ActionsService.compileActionName(prefix, ActionNames.openEvoSettings)
);

export const openEvoSettingsSuccess = createAction(
  ActionsService.compileActionName(prefix, ActionNames.openEvoSettingsSuccess),
  props<{ fileData: FileData<EvoSettings> }>()
);

export const openEvoSettingsFailure = createAction(
  ActionsService.compileActionName(prefix, ActionNames.openEvoSettingsFailure)
);

export const upgradeEvoSettings = createAction(
  ActionsService.compileActionName(prefix, ActionNames.upgradeEvoSettings)
);

export const saveEvoSettings = createAction(
  ActionsService.compileActionName(prefix, ActionNames.saveEvoSettings)
);

export const saveEvoSettingsSuccess = createAction(
  ActionsService.compileActionName(prefix, ActionNames.saveEvoSettingsSuccess)
);

export const saveEvoSettingsFailure = createAction(
  ActionsService.compileActionName(prefix, ActionNames.saveEvoSettingsFailure)
);

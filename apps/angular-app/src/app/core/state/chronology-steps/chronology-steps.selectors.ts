import { createSelector } from '@ngrx/store';
import { ChronologyStep } from '../../models/chronology-step.model';
import { SelectorsService } from '../../services/selectors.service';
import * as uiSelectors from './../ui/ui.selectors';
import { adapter, chunkName } from './chronology-steps.reducer';

export const entitySelectors =
  SelectorsService.generateEntitySelectors<ChronologyStep>(adapter, chunkName);

export const getChronologyStepsForActivePart = createSelector(
  uiSelectors.getActivePartId,
  entitySelectors.selectAll,
  (activePartId, chronologySteps) =>
    chronologySteps.filter(
      (chronologyStep) => chronologyStep.partId === activePartId,
    ),
);

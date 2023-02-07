import { createSelector } from '@ngrx/store';
import { Party } from '../../models/party.model';
import { SelectorsService } from '../../services/selectors.service';
import * as uiSelectors from './../ui/ui.selectors';
import { adapter, chunkName } from './parties.reducer';

export const entitySelectors = SelectorsService.generateEntitySelectors<Party>(
  adapter,
  chunkName,
);

export const getPartiesForActivePart = createSelector(
  uiSelectors.getActivePartId,
  entitySelectors.selectAll,
  (activePartId, parties) =>
    parties.filter((party) => party.partId === activePartId),
);

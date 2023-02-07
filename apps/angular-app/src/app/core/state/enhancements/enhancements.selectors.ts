import { createSelector, MemoizedSelector } from '@ngrx/store';
import { Enhancement } from '../../models/enhancement.model';
import { SelectorsService } from '../../services/selectors.service';
import { adapter, chunkName } from './enhancements.reducer';

export const entitySelectors =
  SelectorsService.generateEntitySelectors<Enhancement>(adapter, chunkName);

export const getEnhancementsForSpecificPart = (
  partId: string,
): MemoizedSelector<
  object,
  Enhancement[],
  (s1: Enhancement[]) => Enhancement[]
> =>
  createSelector(entitySelectors.selectAll, (enhancements) =>
    enhancements.filter((enhancement) => enhancement.partId === partId),
  );

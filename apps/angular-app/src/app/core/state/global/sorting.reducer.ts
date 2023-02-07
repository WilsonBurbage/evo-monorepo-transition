import { BaseEntity } from '@evo-monorepo/shared';
import { EntityAdapter, EntityState } from '@ngrx/entity';
import { on } from '@ngrx/store';
import * as sortingActions from './sorting.actions';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const applyEntitySortingReducer = <T extends BaseEntity>(
  targetChunkName: string,
  adapter: EntityAdapter<T>
) =>
  on(
    sortingActions.applyEntitySorting,
    (state: EntityState<T>, { chunkName, sortPositions }) => {
      if (targetChunkName === chunkName) {
        const allEntities: T[] = Object.values(state.entities).map(
          (v) => v as T
        );

        const restOfEntities = allEntities.filter(
          (entity) => !sortPositions.entitiesToBeSorted.includes(entity)
        );

        const entityToBeMoved =
          sortPositions.entitiesToBeSorted[sortPositions.oldPosition];

        const sortedEntities = [...sortPositions.entitiesToBeSorted];

        sortedEntities.splice(sortPositions.oldPosition, 1);
        sortedEntities.splice(sortPositions.newPosition, 0, entityToBeMoved);

        const recompiledEntitiesArray = [...sortedEntities, ...restOfEntities];

        return adapter.setAll(recompiledEntitiesArray, state);
      }

      return state;
    }
  );

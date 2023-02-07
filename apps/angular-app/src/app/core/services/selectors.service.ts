import { Dictionary, EntityAdapter, EntityState } from '@ngrx/entity';
import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';
import { EntitySelectorSet } from '../models/entity-selector-set.model';
import { PropertyPair } from '../models/property-pair.model';
import { GlobalState } from '../state/reducers';
import * as uiSelectors from '../state/ui/ui.selectors';

export class SelectorsService {
  static generateEntitySelectors<T>(
    adapter: EntityAdapter<T>,
    chunkName: string,
  ): EntitySelectorSet<T> {
    const selectState = createFeatureSelector<EntityState<T>>(chunkName);

    const selectAll = createSelector(
      selectState,
      adapter.getSelectors().selectAll,
    );

    const selectEntities = createSelector(
      selectState,
      adapter.getSelectors().selectEntities,
    );

    const selectEntity = (props: {
      id: string;
    }): MemoizedSelector<
      object,
      T | undefined,
      (s1: Dictionary<T>) => T | undefined
    > => createSelector(selectEntities, (entities) => entities[props.id]);

    const selectEntityForPropertyMatch = (
      propertyPairs: PropertyPair<T>[],
      mustMatchAllPropertyPairs?: boolean,
    ): MemoizedSelector<GlobalState, T, (s1: T[]) => T> => {
      return createSelector(
        selectEntitiesForPropertyMatch(
          propertyPairs,
          mustMatchAllPropertyPairs,
        ),
        (entities) => entities[0],
      );
    };

    const selectEntitiesForPropertyMatch = (
      propertyPairs: PropertyPair<T>[],
      mustMatchAllPropertyPairs?: boolean,
    ): MemoizedSelector<
      GlobalState,
      T[],
      (s1: T[], s2: string | undefined) => T[]
    > => {
      return createSelector(
        selectAll,
        uiSelectors.getActivePartId,
        (entities, activePartId) => {
          const entityMatchValues = entities.map((entity) => {
            return propertyPairs.map((propertyPair) => {
              return (
                (!propertyPair.filterByActivePart ||
                  (entity as { partId: string }).partId === activePartId) &&
                Boolean(propertyPair.propertyValue) &&
                entity[propertyPair.propertyName] === propertyPair.propertyValue
              );
            });
          });

          const matchingEntities = entityMatchValues.reduce<T[]>(
            (accumulator, matchValues, index): T[] => {
              const doesMatch = mustMatchAllPropertyPairs
                ? matchValues.every((matchValue) => matchValue)
                : matchValues.some((matchValue) => matchValue);

              return [...accumulator, ...(doesMatch ? [entities[index]] : [])];
            },
            [],
          );

          return matchingEntities;

          // return propertyPairs
          //   .map((propertyPair) => {
          //     return entities.filter((entity) => {
          //       return (
          //         (!propertyPair.filterByActivePart ||
          //           (entity as { partId: string }).partId === activePartId) &&
          //         propertyPair.propertyValue &&
          //         entity[propertyPair.propertyName] ===
          //           propertyPair.propertyValue
          //       );
          //     });
          //   })
          //   .flat();
        },
      );
    };

    return {
      selectState,
      selectAll,
      selectEntities,
      selectEntity,
      selectEntityForPropertyMatch,
      selectEntitiesForPropertyMatch,
    };
  }
}

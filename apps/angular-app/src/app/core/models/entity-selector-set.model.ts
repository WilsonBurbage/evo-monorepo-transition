import { Dictionary, EntityState } from '@ngrx/entity';
import { DefaultProjectorFn, MemoizedSelector } from '@ngrx/store';
import { GlobalState } from '../state/reducers';
import { PropertyPair } from './property-pair.model';

export interface EntitySelectorSet<T> {
  selectState: MemoizedSelector<
    object,
    EntityState<T>,
    DefaultProjectorFn<EntityState<T>>
  >;

  selectAll: MemoizedSelector<object, T[], (s1: EntityState<T>) => T[]>;

  selectEntities: MemoizedSelector<
    object,
    Dictionary<T>,
    (s1: EntityState<T>) => Dictionary<T>
  >;

  selectEntity: (props: {
    id: string;
  }) => MemoizedSelector<
    object,
    T | undefined,
    (s1: Dictionary<T>) => T | undefined
  >;

  selectEntityForPropertyMatch: (
    propertyPairs: PropertyPair<T>[],
    mustMatchAllPropertyPairs?: boolean,
  ) => MemoizedSelector<GlobalState, T, (s1: T[]) => T>;

  selectEntitiesForPropertyMatch: (
    propertyPairs: PropertyPair<T>[],
    mustMatchAllPropertyPairs?: boolean,
  ) => MemoizedSelector<
    GlobalState,
    T[],
    (s1: T[], s2: string | undefined) => T[]
  >;
}

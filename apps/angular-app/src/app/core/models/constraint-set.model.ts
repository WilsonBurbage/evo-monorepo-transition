import { EntityAdapter } from '@ngrx/entity';
import { TypedAction } from '@ngrx/store/src/models';
import { EntityChunkName } from './entity-chunk-name.model';
import { EntitySelectorSet } from './entity-selector-set.model';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ConstraintSet<T = any> {
  adapter: EntityAdapter<T>;
  selectors: EntitySelectorSet<T>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  removeActionMethod: (entityId: string) => TypedAction<string>;
  foreignIdPropertyName?: string;
  constraintEntityChunkNames?: EntityChunkName[];
}

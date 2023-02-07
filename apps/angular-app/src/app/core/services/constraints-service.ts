import { Store } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import { take } from 'rxjs';
import { CONSTRAINTS } from '../constants/constraints.constants';
import { EntityChunkName } from '../models/entity-chunk-name.model';
import { GlobalState } from '../state/reducers';

export class ConstraintsService {
  static entityHasJoins(
    ownerEntityId: string,
    ownerEntityChunkName: EntityChunkName,
    store$: Store<GlobalState>,
  ): boolean {
    let result = false;

    const ownerConstraintSet = CONSTRAINTS[ownerEntityChunkName]!;

    ownerConstraintSet?.constraintEntityChunkNames?.forEach(
      (constraintEntityChunkName) => {
        const foreignConstraintSet = CONSTRAINTS[constraintEntityChunkName]!;

        store$
          .select(foreignConstraintSet.selectors.selectAll)
          .pipe(take(1))
          .subscribe((foreignEntities) => {
            const ownerEntityHasJoinsInForeignEntities = foreignEntities.some(
              (foreignEntity) =>
                foreignEntity[ownerConstraintSet.foreignIdPropertyName!] ===
                ownerEntityId,
            );

            if (ownerEntityHasJoinsInForeignEntities) {
              result = true;
            }
          });
      },
    );

    return result;
  }

  static getAllRemoveActionsForEntity(
    ownerEntityId: string,
    ownerEntityChunkName: EntityChunkName,
    store$: Store<GlobalState>,
  ): TypedAction<string>[] {
    const ownerConstraintSet = CONSTRAINTS[ownerEntityChunkName]!;

    const result: TypedAction<string>[] = [];

    ownerConstraintSet?.constraintEntityChunkNames?.forEach(
      (constraintEntityChunkName) => {
        const foreignConstraintSet = CONSTRAINTS[constraintEntityChunkName]!;

        store$
          .select(foreignConstraintSet.selectors.selectAll)
          .pipe(take(1))
          .subscribe((foreignEntities) => {
            const linkedForeignEntities = foreignEntities.filter(
              (foreignEntity) =>
                foreignEntity[ownerConstraintSet.foreignIdPropertyName!] ===
                ownerEntityId,
            );

            result.push(
              ...linkedForeignEntities.map((foreignEntity) =>
                foreignConstraintSet.removeActionMethod(foreignEntity.id),
              ),
            );

            linkedForeignEntities.forEach((linkedForeignEntity) => {
              result.push(
                ...this.getAllRemoveActionsForEntity(
                  linkedForeignEntity.id,
                  constraintEntityChunkName,
                  store$,
                ),
              );
            });
          });
      },
    );

    return result;
  }
}

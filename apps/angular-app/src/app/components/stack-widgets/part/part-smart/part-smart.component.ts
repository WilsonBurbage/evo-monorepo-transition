import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { StackWidgetSmartComponentClass } from '../../../../core/classes/stack-widget-smart-component.class';
import { Part } from '../../../../core/models/part.model';
import { DefaultsService } from '../../../../core/services/defaults.service';
import * as partsActions from '../../../../core/state/parts/parts.actions';
import * as partsSelectors from '../../../../core/state/parts/parts.selectors';

@Component({
  selector: 'app-part-smart',
  templateUrl: './part-smart.component.html',
  styleUrls: ['./part-smart.component.scss'],
})
export class PartSmartComponent
  extends StackWidgetSmartComponentClass
  implements OnInit
{
  part$!: Observable<Part | undefined>;

  ngOnInit(): void {
    this.part$ = this.config?.id
      ? this.store$.select(
          partsSelectors.entitySelectors.selectEntity({
            id: String(this.config.id),
          }),
        )
      : this.store$.select(partsSelectors.entitySelectors.selectAll).pipe(
          map((parts) =>
            DefaultsService.createDefaultPart({
              description: `Part ${parts.length + 1}`,
            }),
          ),
        );
  }

  onSaveClicked(amendedPart: Part): void {
    this.store$.dispatch(partsActions.upsertPart({ part: amendedPart }));
    this.pop();
  }
}

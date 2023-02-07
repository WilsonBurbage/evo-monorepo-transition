import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StackWidgetSmartComponentClass } from '../../../../core/classes/stack-widget-smart-component.class';
import { Narrative } from '../../../../core/models/narrative.model';
import * as narrativeActions from '../../../../core/state/narrative/narrative.actions';
import * as narrativeSelectors from '../../../../core/state/narrative/narrative.selectors';

@Component({
  selector: 'app-narrative-smart',
  templateUrl: './narrative-smart.component.html',
  styleUrls: ['./narrative-smart.component.scss'],
})
export class NarrativeSmartComponent
  extends StackWidgetSmartComponentClass
  implements OnInit
{
  narrative$!: Observable<Narrative | undefined>;

  ngOnInit(): void {
    this.narrative$ = this.store$.select(narrativeSelectors.getNarrative);
  }

  onSaveClicked(amendedNarrative: Narrative): void {
    this.store$.dispatch(
      narrativeActions.setNarrative({ narrative: amendedNarrative }),
    );
    this.pop();
  }
}

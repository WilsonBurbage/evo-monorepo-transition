import { Component, Injector, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StackWidgetSmartComponentClass } from '../../../../core/classes/stack-widget-smart-component.class';
import { EntityChunkName } from '../../../../core/models/entity-chunk-name.model';
import { StackWidgetReference } from '../../../../core/models/stack-widget-reference.model';
import { TableRowEventPayload } from '../../../../core/models/table-row-event-payload.model';
import { TextReplacement } from '../../../../core/models/text-replacement.model';
import * as removingActions from '../../../../core/state/global/removing.actions';
import * as textReplacementsSelectors from '../../../../core/state/text-replacements/text-replacements.selectors';
import * as uiActions from '../../../../core/state/ui/ui.actions';

@Component({
  selector: 'app-text-replacements-smart',
  templateUrl: './text-replacements-smart.component.html',
  styleUrls: ['./text-replacements-smart.component.scss'],
})
export class TextReplacementsSmartComponent
  extends StackWidgetSmartComponentClass
  implements OnInit
{
  textReplacements$!: Observable<TextReplacement[] | undefined>;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.textReplacements$ = this.store$.select(
      textReplacementsSelectors.entitySelectors.selectAll,
    );
  }

  onNewTextReplacementClicked(): void {
    this.store$.dispatch(
      uiActions.pushStackWidget({
        stackWidgetReference: StackWidgetReference.textReplacement,
        config: this.config,
      }),
    );
  }

  onEditTextReplacementClicked(
    eventPayload: TableRowEventPayload<TextReplacement>,
  ): void {
    this.store$.dispatch(
      uiActions.pushStackWidget({
        stackWidgetReference: StackWidgetReference.textReplacement,
        config: { id: eventPayload.tableItem.id },
      }),
    );
  }

  onDeleteTextReplacementClicked(textReplacement: TextReplacement): void {
    this.store$.dispatch(
      removingActions.askToConfirmEntityRemoval({
        entityId: textReplacement.id,
        entityChunkName: EntityChunkName.textReplacements,
      }),
    );
  }
}

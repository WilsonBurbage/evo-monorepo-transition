import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { StackWidgetSmartComponentClass } from '../../../../core/classes/stack-widget-smart-component.class';
import { TextReplacement } from '../../../../core/models/text-replacement.model';
import { DefaultsService } from '../../../../core/services/defaults.service';
import * as textReplacementsActions from '../../../../core/state/text-replacements/text-replacements.actions';
import * as textReplacementsSelectors from '../../../../core/state/text-replacements/text-replacements.selectors';

@Component({
  selector: 'app-text-replacement-smart',
  templateUrl: './text-replacement-smart.component.html',
  styleUrls: ['./text-replacement-smart.component.scss'],
})
export class TextReplacementSmartComponent
  extends StackWidgetSmartComponentClass
  implements OnInit
{
  textReplacement$!: Observable<TextReplacement | undefined>;

  ngOnInit(): void {
    this.textReplacement$ = this.config?.id
      ? this.store$.select(
          textReplacementsSelectors.entitySelectors.selectEntity({
            id: String(this.config.id),
          }),
        )
      : of(DefaultsService.createDefaultTextReplacement());
  }

  onSaveClicked(amendedTextReplacement: TextReplacement): void {
    this.store$.dispatch(
      textReplacementsActions.upsertTextReplacement({
        textReplacement: amendedTextReplacement,
      }),
    );
    this.pop();
  }
}

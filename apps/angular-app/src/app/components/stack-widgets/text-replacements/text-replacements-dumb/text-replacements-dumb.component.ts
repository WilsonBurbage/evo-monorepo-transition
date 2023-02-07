import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StackWidgetDumbComponentClass } from '../../../../core/classes/stack-widget-dumb-component.class';
import { TableConfig } from '../../../../core/models/table-config.model';
import { TableRowEventPayload } from '../../../../core/models/table-row-event-payload.model';
import { TextReplacement } from '../../../../core/models/text-replacement.model';

@Component({
  selector: 'app-text-replacements-dumb',
  templateUrl: './text-replacements-dumb.component.html',
  styleUrls: ['./text-replacements-dumb.component.scss'],
})
export class TextReplacementsDumbComponent extends StackWidgetDumbComponentClass {
  @Input() textReplacements!: TextReplacement[];

  @Output() newTextReplacementClicked = new EventEmitter();
  @Output() editTextReplacementClicked = new EventEmitter<
    TableRowEventPayload<TextReplacement>
  >();
  @Output() deleteTextReplacementClicked = new EventEmitter<TextReplacement>();

  tableConfig: TableConfig<TextReplacement> = {
    columns: [
      {
        title: 'Input',
        valuePropertyPath: 'input',
      },
      {
        title: 'Output',
        valuePropertyPath: 'output',
      },
    ],
    deleteable: true,
  };

  onNewTextReplacementClicked(): void {
    this.newTextReplacementClicked.emit();
  }

  onEditTextReplacementClicked(
    eventPayload: TableRowEventPayload<TextReplacement>,
  ): void {
    this.editTextReplacementClicked.emit(eventPayload);
  }

  onDeleteTextReplacementClicked(textReplacement: TextReplacement): void {
    this.deleteTextReplacementClicked.emit(textReplacement);
  }
}

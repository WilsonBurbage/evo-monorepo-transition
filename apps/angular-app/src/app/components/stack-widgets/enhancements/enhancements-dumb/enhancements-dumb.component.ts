import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StackWidgetDumbComponentClass } from '../../../../core/classes/stack-widget-dumb-component.class';
import { Enhancement } from '../../../../core/models/enhancement.model';
import { TableConfig } from '../../../../core/models/table-config.model';
import { TableRowEventPayload } from '../../../../core/models/table-row-event-payload.model';

@Component({
  selector: 'app-enhancements-dumb',
  templateUrl: './enhancements-dumb.component.html',
  styleUrls: ['./enhancements-dumb.component.scss'],
})
export class EnhancementsDumbComponent extends StackWidgetDumbComponentClass {
  @Input() enhancements!: Enhancement[];

  @Output() newEnhancementClicked = new EventEmitter();
  @Output() editEnhancementClicked = new EventEmitter<
    TableRowEventPayload<Enhancement>
  >();
  @Output() deleteEnhancementClicked = new EventEmitter<Enhancement>();

  tableConfig: TableConfig<Enhancement> = {
    columns: [
      {
        title: 'Name',
        valuePropertyPath: 'name',
      },
      {
        title: '%',
        valuePropertyPath: 'percentage',
      },
    ],
    deleteable: true,
  };

  onNewEnhancementClicked(): void {
    this.newEnhancementClicked.emit();
  }

  onEditEnhancementClicked(
    eventPayload: TableRowEventPayload<Enhancement>,
  ): void {
    this.editEnhancementClicked.emit(eventPayload);
  }

  onDeleteEnhancementClicked(enhancement: Enhancement): void {
    this.deleteEnhancementClicked.emit(enhancement);
  }
}

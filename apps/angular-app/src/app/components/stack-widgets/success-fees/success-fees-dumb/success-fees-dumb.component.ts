import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StackWidgetDumbComponentClass } from '../../../../core/classes/stack-widget-dumb-component.class';
import { SuccessFee } from '../../../../core/models/success-fee.model';
import { TableConfig } from '../../../../core/models/table-config.model';
import { TableDataFormatter } from '../../../../core/models/table-data-formatter.model';
import { TableRowEventPayload } from '../../../../core/models/table-row-event-payload.model';

@Component({
  selector: 'app-success-fees-dumb',
  templateUrl: './success-fees-dumb.component.html',
  styleUrls: ['./success-fees-dumb.component.scss'],
})
export class SuccessFeesDumbComponent extends StackWidgetDumbComponentClass {
  @Input() successFees!: SuccessFee[];

  @Output() newSuccessFeeClicked = new EventEmitter();
  @Output() editSuccessFeeClicked = new EventEmitter<
    TableRowEventPayload<SuccessFee>
  >();
  @Output() deleteSuccessFeeClicked = new EventEmitter<SuccessFee>();

  tableConfig: TableConfig<SuccessFee> = {
    columns: [
      {
        title: 'Description',
        valuePropertyPath: 'description',
      },
      {
        title: 'Base costs',
        valuePropertyPath: 'baseCosts',
        dataFormatter: TableDataFormatter.currency,
      },
    ],
    deleteable: true,
  };

  onNewSuccessFeeClicked(): void {
    this.newSuccessFeeClicked.emit();
  }

  onEditSuccessFeeClicked(
    eventPayload: TableRowEventPayload<SuccessFee>,
  ): void {
    this.editSuccessFeeClicked.emit(eventPayload);
  }

  onDeleteSuccessFeeClicked(successFee: SuccessFee): void {
    this.deleteSuccessFeeClicked.emit(successFee);
  }
}

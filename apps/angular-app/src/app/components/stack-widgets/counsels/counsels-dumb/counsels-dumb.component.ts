import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StackWidgetDumbComponentClass } from '../../../../core/classes/stack-widget-dumb-component.class';
import { Counsel } from '../../../../core/models/counsel.model';
import { TableConfig } from '../../../../core/models/table-config.model';
import { TableDataFormatter } from '../../../../core/models/table-data-formatter.model';
import { TableRowEventPayload } from '../../../../core/models/table-row-event-payload.model';

@Component({
  selector: 'app-counsels-dumb',
  templateUrl: './counsels-dumb.component.html',
  styleUrls: ['./counsels-dumb.component.scss'],
})
export class CounselsDumbComponent extends StackWidgetDumbComponentClass {
  @Input() counsels!: Counsel[];

  @Output() newCounselClicked = new EventEmitter();
  @Output() editCounselClicked = new EventEmitter<
    TableRowEventPayload<Counsel>
  >();
  @Output() deleteCounselClicked = new EventEmitter<Counsel>();

  tableConfig: TableConfig<Counsel> = {
    columns: [
      {
        title: 'Name',
        valuePropertyPath: 'name',
      },
      {
        title: 'Attracts VAT',
        valuePropertyPath: 'attractsVat',
        dataFormatter: TableDataFormatter.boolean,
      },
      {
        title: 'Success fee',
        valuePropertyPath: 'hasSuccessFee',
        dataFormatter: TableDataFormatter.boolean,
      },
      {
        title: 'Success fee %',
        valuePropertyPath: 'successFeePercentage',
      },
    ],
    deleteable: true,
  };

  onNewCounselClicked(): void {
    this.newCounselClicked.emit();
  }

  onEditCounselClicked(eventPayload: TableRowEventPayload<Counsel>): void {
    this.editCounselClicked.emit(eventPayload);
  }

  onDeleteCounselClicked(counsel: Counsel): void {
    this.deleteCounselClicked.emit(counsel);
  }
}

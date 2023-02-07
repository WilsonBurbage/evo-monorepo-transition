import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ContextMenuItem } from '../../../../core/models/context-menu-item.model';
import { SortPositions } from '../../../../core/models/sort-positions.model';
import { TableCellEventPayload } from '../../../../core/models/table-cell-event-payload.model';
import { TableConfig } from '../../../../core/models/table-config.model';
import { TableRowEventPayload } from '../../../../core/models/table-row-event-payload.model';
import * as sortingActions from '../../../../core/state/global/sorting.actions';
import { BaseComponentClass } from './../../../../core/classes/base-component.class';

@Component({
  selector: 'app-table-smart',
  templateUrl: './table-smart.component.html',
  styleUrls: ['./table-smart.component.scss'],
})
export class TableSmartComponent<T> extends BaseComponentClass {
  @Input() tableConfig!: TableConfig<T>;
  @Input() tableItems!: T[];
  @Input() contextMenuItems!: ContextMenuItem[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() redrawVariables!: any[];
  @Input() sortable!: boolean;
  @Input() sortEntityChunkName!: string;

  @Input() short!: boolean;

  @Output() rowClicked = new EventEmitter<TableRowEventPayload<T>>();
  @Output() rowDoubleClicked = new EventEmitter<TableRowEventPayload<T>>();
  @Output() rowKeyPressed = new EventEmitter<TableRowEventPayload<T>>();
  @Output() rowDeleteClicked = new EventEmitter<T>();
  @Output() cellClicked = new EventEmitter<TableCellEventPayload<T>>();
  @Output() cellDoubleClicked = new EventEmitter<TableCellEventPayload<T>>();
  @Output() contextMenuItemClicked = new EventEmitter<ContextMenuItem>();

  onRowClicked(tableRowEventPayload: TableRowEventPayload<T>): void {
    this.rowClicked.emit(tableRowEventPayload);
  }

  onRowDoubleClicked(tableRowEventPayload: TableRowEventPayload<T>): void {
    this.rowDoubleClicked.emit(tableRowEventPayload);
  }

  onRowKeyPressed(tableRowEventPayload: TableRowEventPayload<T>): void {
    this.rowKeyPressed.emit(tableRowEventPayload);
  }

  onRowDeleteClicked(tableItem: T): void {
    this.rowDeleteClicked.emit(tableItem);
  }

  onCellClicked(tableCellEventPayload: TableCellEventPayload<T>): void {
    this.cellClicked.emit(tableCellEventPayload);
  }

  onCellDoubleClicked(tableCellEventPayload: TableCellEventPayload<T>): void {
    this.cellDoubleClicked.emit(tableCellEventPayload);
  }

  onContextMenuItemClicked(contextMenuItem: ContextMenuItem): void {
    this.contextMenuItemClicked.emit(contextMenuItem);
  }

  onSortPositionsChanged(sortPositions: SortPositions): void {
    this.store$.dispatch(
      sortingActions.applyEntitySorting({
        chunkName: this.sortEntityChunkName,
        sortPositions,
      }),
    );
  }
}

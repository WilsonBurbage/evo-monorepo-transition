import { CdkDragDrop } from '@angular/cdk/drag-drop';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Injector,
  Input,
  OnChanges,
  Output,
  ViewChild,
} from '@angular/core';
import { BaseComponentClass } from '../../../../core/classes/base-component.class';
import {
  ButtonColumnId,
  BUTTON_COLUMN_ID_ICON_MAP,
} from '../../../../core/models/button-column-id.model';
import { ContextMenuItem } from '../../../../core/models/context-menu-item.model';
import { FontAwesomeIcon } from '../../../../core/models/font-awesome-icon.model';
import { SortPositions } from '../../../../core/models/sort-positions.model';
import { TableCellEventPayload } from '../../../../core/models/table-cell-event-payload.model';
import { TableColumn } from '../../../../core/models/table-column.model';
import { TableConfig } from '../../../../core/models/table-config.model';
import { TableRowEventPayload } from '../../../../core/models/table-row-event-payload.model';
import { ContextMenuService } from '../../../../core/services/context-menu.service';

@Component({
  selector: 'app-table-dumb',
  templateUrl: './table-dumb.component.html',
  styleUrls: ['./table-dumb.component.scss'],
})
export class TableDumbComponent<T>
  extends BaseComponentClass
  implements OnChanges
{
  @Input() tableConfig!: TableConfig<T>;
  @Input() tableItems!: T[];
  @Input() contextMenuItems!: ContextMenuItem[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() redrawVariables: any[] = [];

  @Input() sortable!: boolean;

  @HostBinding('class.short') @Input() short!: boolean;

  @Output() rowClicked = new EventEmitter<TableRowEventPayload<T>>();
  @Output() rowDoubleClicked = new EventEmitter<TableRowEventPayload<T>>();
  @Output() rowKeyPressed = new EventEmitter<TableRowEventPayload<T>>();
  @Output() rowDeleteClicked = new EventEmitter<T>();
  @Output() cellClicked = new EventEmitter<TableCellEventPayload<T>>();
  @Output() cellDoubleClicked = new EventEmitter<TableCellEventPayload<T>>();
  @Output() contextMenuItemClicked = new EventEmitter<ContextMenuItem>();
  @Output() sortPositionsChanged = new EventEmitter<SortPositions>();

  @ViewChild('htmlTable') public htmlTable: ElementRef | undefined;

  selectedIndex = -1;
  retainFocus = false;

  constructor(injector: Injector) {
    super(injector);

    this.mousePositionParentSelector = 'app-table-dumb';
  }

  ngOnChanges(): void {
    if (this.retainFocus) {
      this.focusSelectedIndexRow();
    }
  }

  focusSelectedIndexRow(): void {
    setTimeout(() => {
      this.htmlTableRowElements()[this.selectedIndex].focus();
    });
  }

  htmlTableElement(): HTMLTableElement {
    return this.htmlTable?.nativeElement;
  }

  htmlTableRowElements(): HTMLTableRowElement[] {
    return Array.from(this.htmlTableElement().querySelectorAll('tr'));
  }

  getCombinedColumns(): TableColumn<T>[] {
    return [
      ...this.tableConfig.columns,
      ...(this.tableConfig.deleteable
        ? [{ buttonColumnId: ButtonColumnId.delete } as TableColumn<T>]
        : []),
    ];
  }

  getIconForButtonColumnId(buttonColumnId: ButtonColumnId): FontAwesomeIcon {
    return BUTTON_COLUMN_ID_ICON_MAP[buttonColumnId];
  }

  onRowClicked(event: MouseEvent, rowIndex: number, tableItem: T): void {
    this.selectedIndex = rowIndex;

    this.rowClicked.emit({ event, rowIndex, tableItem });
  }

  onRowDoubleClicked(event: MouseEvent, rowIndex: number, tableItem: T): void {
    this.selectedIndex = rowIndex;

    this.rowDoubleClicked.emit({ event, rowIndex, tableItem });
  }

  onRowKeyPressed(event: KeyboardEvent, rowIndex: number, tableItem: T): void {
    const eventKeyAsNumber = Number(event.key);

    if (!isNaN(eventKeyAsNumber)) {
      if (eventKeyAsNumber <= this.tableItems.length) {
        this.selectedIndex = eventKeyAsNumber - 1;

        this.focusSelectedIndexRow();

        return;
      }
    }

    this.retainFocus = true;
    this.rowKeyPressed.emit({ event, rowIndex, tableItem });
  }

  onRowButtonClicked(buttonColumnId: ButtonColumnId, tableItem: T): void {
    switch (buttonColumnId) {
      case ButtonColumnId.delete:
        this.rowDeleteClicked.emit(tableItem);

        break;

      default:
        break;
    }
  }

  onCellClicked(event: MouseEvent, column: TableColumn<T>, tableItem: T): void {
    this.cellClicked.emit({ event, column, tableItem });
  }

  onCellDoubleClicked(
    event: MouseEvent,
    column: TableColumn<T>,
    tableItem: T,
  ): void {
    this.cellDoubleClicked.emit({ event, column, tableItem });
  }

  onContextMenuClicked(index: number): void {
    this.selectedIndex = index;
    ContextMenuService.show(this.componentId);
  }

  onContextMenuItemClicked(contextMenuItem: ContextMenuItem): void {
    this.contextMenuItemClicked.emit(contextMenuItem);
  }

  onRowDropped(event: CdkDragDrop<string[]>): void {
    this.sortPositionsChanged.emit({
      oldPosition: event.previousIndex,
      newPosition: event.currentIndex,
      entitiesToBeSorted: this.tableItems,
    });
  }
}

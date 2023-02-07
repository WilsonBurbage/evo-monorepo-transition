import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StackWidgetDumbComponentClass } from '../../../../core/classes/stack-widget-dumb-component.class';
import { Alignment } from '../../../../core/models/alignment.model';
import { Enhancement } from '../../../../core/models/enhancement.model';
import { Part } from '../../../../core/models/part.model';
import { PartsColumnID } from '../../../../core/models/parts-column-id.model';
import { Solicitor } from '../../../../core/models/solicitor.model';
import { TableCellEventPayload } from '../../../../core/models/table-cell-event-payload.model';
import { TableConfig } from '../../../../core/models/table-config.model';
import { EnhancementReadoutPipe } from '../../../../core/pipes/enhancement-readout.pipe';

@Component({
  selector: 'app-parts-dumb',
  templateUrl: './parts-dumb.component.html',
  styleUrls: ['./parts-dumb.component.scss'],
})
export class PartsDumbComponent extends StackWidgetDumbComponentClass {
  @Input() parts!: Part[];
  @Input() solicitors!: Solicitor[];
  @Input() enhancements!: Enhancement[];

  @Output() newPartClicked = new EventEmitter();
  @Output() editPartClicked = new EventEmitter<TableCellEventPayload<Part>>();
  @Output() deletePartClicked = new EventEmitter<Part>();

  tableConfig: TableConfig<Part> = {
    columns: [
      {
        id: PartsColumnID.part,
        title: '#',
        alignment: Alignment.centre,
        valueMethod: (_item, index): string => String(index + 1),
      },
      {
        id: PartsColumnID.part,
        title: 'Description',
        valuePropertyPath: 'description',
      },
      {
        id: PartsColumnID.solicitor,
        title: 'Solicitor',
        valueMethod: (part): string =>
          this.solicitors.find((solicitor) => solicitor.partId === part.id)
            ?.name || '',
      },
      {
        id: PartsColumnID.enhancements,
        title: 'Enhancements',
        valueMethod: (part): string[] =>
          this.enhancements
            .filter((enhancement) => enhancement.partId === part.id)
            .map((enhancement) =>
              new EnhancementReadoutPipe().transform(enhancement),
            ),
      },
    ],
    deleteable: true,
  };

  onNewPartClicked(): void {
    this.newPartClicked.emit();
  }

  onEditPartClicked(eventPayload: TableCellEventPayload<Part>): void {
    this.editPartClicked.emit(eventPayload);
  }

  onDeletePartClicked(part: Part): void {
    this.deletePartClicked.emit(part);
  }
}

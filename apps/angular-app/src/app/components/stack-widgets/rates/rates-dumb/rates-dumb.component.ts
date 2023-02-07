import { Component, EventEmitter, Input, Output } from '@angular/core';
import { slideVerticalAnimation } from '../../../../core/animations/slide-vertical.animation';
import { StackWidgetDumbComponentClass } from '../../../../core/classes/stack-widget-dumb-component.class';
import { BillSetup } from '../../../../core/models/bill-setup.model';
import { ContextMenuItem } from '../../../../core/models/context-menu-item.model';
import { FeeEarner } from '../../../../core/models/fee-earner.model';
import { Part } from '../../../../core/models/part.model';
import { RateGroup } from '../../../../core/models/rate-group.model';
import { Rate } from '../../../../core/models/rate.model';
import { TableConfig } from '../../../../core/models/table-config.model';
import { TableDataFormatter } from '../../../../core/models/table-data-formatter.model';
import { TableRowEventPayload } from '../../../../core/models/table-row-event-payload.model';
import { ExportPartsService } from '../../../../core/services/export-parts.service';

@Component({
  selector: 'app-rates-dumb',
  templateUrl: './rates-dumb.component.html',
  styleUrls: ['./rates-dumb.component.scss'],

  animations: [slideVerticalAnimation],
})
export class RatesDumbComponent extends StackWidgetDumbComponentClass {
  @Input() rateGroups!: RateGroup[];
  @Input() feeEarners!: FeeEarner[];
  @Input() parts!: Part[];
  @Input() rates!: Rate[];
  @Input() billSetup!: BillSetup;

  @Output() newRateGroupClicked = new EventEmitter();
  @Output() editRateGroupClicked = new EventEmitter<
    TableRowEventPayload<RateGroup>
  >();
  @Output() deleteRateGroupClicked = new EventEmitter<RateGroup>();
  @Output() generateFeeEarnersForEmptyRateGroupsClicked = new EventEmitter();
  @Output() newFeeEarnerClicked = new EventEmitter();
  @Output() editFeeEarnerClicked = new EventEmitter<
    TableRowEventPayload<FeeEarner>
  >();
  @Output() deleteFeeEarnerClicked = new EventEmitter<FeeEarner>();
  @Output() editRateClicked = new EventEmitter<TableRowEventPayload<Rate>>();

  selectedRateGroup!: RateGroup;

  rateGroupsTableConfig: TableConfig<RateGroup> = {
    columns: [
      {
        title: 'Reference',
        valuePropertyPath: 'reference',
      },
      {
        title: 'Name',
        valuePropertyPath: 'name',
      },
      {
        title: 'Fee Earners',
        valueMethod: (rateGroup): string =>
          this.feeEarners
            .filter((feeEarner) => feeEarner.rateGroupId === rateGroup.id)
            .map((feeEarner) => feeEarner.reference)
            .join(', '),
      },
    ],
    deleteable: true,
  };

  rateGroupsContextMenu: ContextMenuItem[] = [
    { id: 'autoFillEmptyRateGroups', title: 'Auto-fill empty rate groups' },
  ];

  feeEarnersTableConfig: TableConfig<FeeEarner> = {
    columns: [
      {
        title: 'Reference',
        valuePropertyPath: 'reference',
      },
      {
        title: 'Rate group',
        valueMethod: (feeEarner): string =>
          this.rateGroups.find(
            (rateGroup) => rateGroup.id === feeEarner.rateGroupId,
          )?.reference || '',
      },
    ],
    deleteable: true,
  };

  ratesTableConfig: TableConfig<Rate> = {
    columns: [
      {
        title: 'Part',
        valueMethod: (rate): string =>
          ExportPartsService.getFullPartName(
            this.parts.find((part) => part.id === rate.partId)!,
            this.parts,
            this.billSetup,
          ),
      },
      {
        title: 'Hourly',
        valuePropertyPath: 'hourly',
        dataFormatter: TableDataFormatter.currency,
      },
      {
        title: 'Calls',
        valuePropertyPath: 'calls',
        dataFormatter: TableDataFormatter.currency,
      },
      {
        title: 'Letters in',
        valuePropertyPath: 'lettersIn',
        dataFormatter: TableDataFormatter.currency,
      },
      {
        title: 'Letters out',
        valuePropertyPath: 'lettersOut',
        dataFormatter: TableDataFormatter.currency,
      },
      {
        title: 'Advocacy',
        valuePropertyPath: 'advocacy',
        dataFormatter: TableDataFormatter.currency,
      },
      {
        title: 'Counsel',
        valuePropertyPath: 'counsel',
        dataFormatter: TableDataFormatter.currency,
      },
      {
        title: 'T & W',
        valuePropertyPath: 'travelAndWaiting',
        dataFormatter: TableDataFormatter.currency,
      },
    ],
  };

  ratesForSelectedRateGroup(): Rate[] {
    return this.rates.filter(
      (rate) => rate.rateGroupId === this.selectedRateGroup.id,
    );
  }

  onRateGroupRowClicked(eventPayload: TableRowEventPayload<RateGroup>): void {
    this.selectedRateGroup = eventPayload.tableItem;
  }

  onNewRateGroupClicked(): void {
    this.newRateGroupClicked.emit();
  }

  onEditRateGroupClicked(eventPayload: TableRowEventPayload<RateGroup>): void {
    this.editRateGroupClicked.emit(eventPayload);
  }

  onDeleteRateGroupClicked(rateGroup: RateGroup): void {
    this.deleteRateGroupClicked.emit(rateGroup);
  }

  onRateGroupsContextMenuItemClicked(contextMenuItem: ContextMenuItem): void {
    switch (contextMenuItem.id) {
      case 'autoFillEmptyRateGroups':
        this.generateFeeEarnersForEmptyRateGroupsClicked.emit();
        break;

      default:
        break;
    }
  }

  onNewFeeEarnerClicked(): void {
    this.newFeeEarnerClicked.emit();
  }

  onEditFeeEarnerClicked(eventPayload: TableRowEventPayload<FeeEarner>): void {
    this.editFeeEarnerClicked.emit(eventPayload);
  }

  onDeleteFeeEarnerClicked(feeEarner: FeeEarner): void {
    this.deleteFeeEarnerClicked.emit(feeEarner);
  }

  onEditRateClicked(eventPayload: TableRowEventPayload<Rate>): void {
    this.editRateClicked.emit(eventPayload);
  }
}

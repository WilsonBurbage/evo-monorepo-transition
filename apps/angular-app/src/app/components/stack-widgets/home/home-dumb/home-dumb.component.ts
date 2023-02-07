import { Component, EventEmitter, Output } from '@angular/core';
import { StackWidgetDumbComponentClass } from '../../../../core/classes/stack-widget-dumb-component.class';

@Component({
  selector: 'app-home-dumb',
  templateUrl: './home-dumb.component.html',
  styleUrls: ['./home-dumb.component.scss'],
})
export class HomeDumbComponent extends StackWidgetDumbComponentClass {
  @Output() billSetupClicked = new EventEmitter();
  @Output() coverSheetsClicked = new EventEmitter();
  @Output() narrativeClicked = new EventEmitter();
  @Output() ratesClicked = new EventEmitter();
  @Output() partsClicked = new EventEmitter();
  @Output() counselsClicked = new EventEmitter();
  @Output() chronologyClicked = new EventEmitter();
  @Output() partiesClicked = new EventEmitter();
  @Output() documentsClicked = new EventEmitter();
  @Output() otherDisbursementsClicked = new EventEmitter();
  @Output() otherWorkClicked = new EventEmitter();

  onBillSetupClicked(): void {
    this.billSetupClicked.emit();
  }

  onCoverSheetsClicked(): void {
    this.coverSheetsClicked.emit();
  }

  onNarrativeClicked(): void {
    this.narrativeClicked.emit();
  }

  onRatesClicked(): void {
    this.ratesClicked.emit();
  }

  onPartsClicked(): void {
    this.partsClicked.emit();
  }

  onCounselsClicked(): void {
    this.counselsClicked.emit();
  }

  onChronologyClicked(): void {
    this.chronologyClicked.emit();
  }

  onPartiesClicked(): void {
    this.partiesClicked.emit();
  }

  onDocumentsClicked(): void {
    this.documentsClicked.emit();
  }

  onOtherDisbursementsClicked(): void {
    this.otherDisbursementsClicked.emit();
  }

  onOtherWorkClicked(): void {
    this.otherWorkClicked.emit();
  }
}

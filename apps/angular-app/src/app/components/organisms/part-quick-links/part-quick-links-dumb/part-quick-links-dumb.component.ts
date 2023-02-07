import { Component, EventEmitter, Input, Output } from '@angular/core';
import { slideHorizontalAnimation } from '../../../../core/animations/slide-horizontal.animation';
import { StackWidgetReference } from '../../../../core/models/stack-widget-reference.model';
import { StackWidget } from '../../../../core/models/stack.widget.model';
import { BaseComponentClass } from './../../../../core/classes/base-component.class';

@Component({
  selector: 'app-part-quick-links-dumb',
  templateUrl: './part-quick-links-dumb.component.html',
  styleUrls: ['./part-quick-links-dumb.component.scss'],
  animations: [slideHorizontalAnimation],
})
export class PartQuickLinksDumbComponent extends BaseComponentClass {
  @Input() stackWidgets!: StackWidget[];

  @Output() quickLinkClicked = new EventEmitter<StackWidgetReference>();

  allPartQuickLinkStackWidgetReferences: StackWidgetReference[] = [
    StackWidgetReference.chronology,
    StackWidgetReference.parties,
    StackWidgetReference.documents,
  ];

  requiredPartQuickLinkStackWidgetReferences(): StackWidgetReference[] {
    return this.allPartQuickLinkStackWidgetReferences.filter(
      (stackWidgetReference) =>
        stackWidgetReference !== this.stackWidgets[0].stackWidgetReference,
    );
  }

  onQuickLinkClicked(stackWidgetReference: StackWidgetReference): void {
    this.quickLinkClicked.emit(stackWidgetReference);
  }
}

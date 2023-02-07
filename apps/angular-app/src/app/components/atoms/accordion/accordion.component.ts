import { AfterContentInit, Component, ContentChildren } from '@angular/core';
import { takeUntil } from 'rxjs';
import { AccordionItemComponent } from '../accordion-item/accordion-item.component';
import { BaseComponentClass } from './../../../core/classes/base-component.class';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent
  extends BaseComponentClass
  implements AfterContentInit
{
  @ContentChildren(AccordionItemComponent)
  accordionItems: AccordionItemComponent[] = [];

  ngAfterContentInit(): void {
    this.accordionItems.forEach((thisAccordionItem) =>
      thisAccordionItem.opened
        .pipe(takeUntil(this.destroyed$))
        .subscribe(() => {
          this.accordionItems
            .filter(
              (otherAccordionItem) => otherAccordionItem !== thisAccordionItem,
            )
            .forEach((otherAccordionItem) => (otherAccordionItem.open = false));
        }),
    );
  }
}

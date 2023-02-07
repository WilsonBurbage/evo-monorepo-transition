import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { reduceAnimation } from '../../../../core/animations/reduce.animation';
import { slideVerticalAnimation } from '../../../../core/animations/slide-vertical.animation';
import { BillSetup } from '../../../../core/models/bill-setup.model';
import { StackWidget } from '../../../../core/models/stack.widget.model';
import { BaseComponentClass } from './../../../../core/classes/base-component.class';

@Component({
  selector: 'app-bill-editor-dumb',
  templateUrl: './bill-editor-dumb.component.html',
  styleUrls: ['./bill-editor-dumb.component.scss'],

  animations: [slideVerticalAnimation, reduceAnimation],
})
export class BillEditorDumbComponent
  extends BaseComponentClass
  implements OnInit
{
  @Input() filePath!: string;
  @Input() evoFileHasChangedSinceSave!: boolean;
  @Input() billSetup!: BillSetup;
  @Input() stackWidgets!: StackWidget[];

  @Output() settingsClicked = new EventEmitter();

  @HostListener('window:resize', ['$event'])
  onWindowResize(): void {
    this.applyDynamicLayout();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.applyDynamicLayout();
    }, 250);
  }

  applyDynamicLayout(): void {
    const header: HTMLElement = document.querySelector('.header')!;
    const home: HTMLElement = document.querySelector('app-home-smart')!;
    const stack: HTMLElement = document.querySelector('.stack')!;
    const previewWrapper: HTMLElement =
      document.querySelector('.preview-wrapper')!;

    const jumpToLinks: HTMLElement = document.querySelector('.jump-to-links')!;

    const preview: HTMLElement = document.querySelector('.preview')!;

    const headerHeight = header.clientHeight;
    const homeHeight = home.clientHeight;
    const stackPaddingTop = parseInt(
      window.getComputedStyle(stack, null).getPropertyValue('padding-top'),
    );
    const stackPaddingBottom = parseInt(
      window.getComputedStyle(stack, null).getPropertyValue('padding-bottom'),
    );

    const combinedHeaderHeight =
      headerHeight + homeHeight + stackPaddingTop + stackPaddingBottom;

    previewWrapper.style.top = `${combinedHeaderHeight}px`;

    const heightCalc = `calc(100vh - ${combinedHeaderHeight}px)`;

    stack.style.maxHeight = heightCalc;
    jumpToLinks.style.maxHeight = heightCalc;
    preview.style.maxHeight = heightCalc;
  }

  partSelectorRequired(): boolean {
    return this.constants.PART_SELECTOR_REQUIRED_STACK_WIDGET_REFERENCES.includes(
      this.stackWidgets[0]?.stackWidgetReference,
    );
  }

  feeEarnerSelectorRequired(): boolean {
    return this.constants.FEE_EARNER_SELECTOR_REQUIRED_STACK_WIDGET_REFERENCES.includes(
      this.stackWidgets[0]?.stackWidgetReference,
    );
  }

  partQuickLinksRequired(): boolean {
    return this.constants.PART_QUICK_LINKS_REQUIRED_STACK_WIDGET_REFERENCES.includes(
      this.stackWidgets[0]?.stackWidgetReference,
    );
  }

  anySelectorsRequired(): boolean {
    return (
      this.partSelectorRequired() ||
      this.feeEarnerSelectorRequired() ||
      this.partQuickLinksRequired()
    );
  }

  onSettingsClicked(): void {
    this.settingsClicked.emit();
  }
}

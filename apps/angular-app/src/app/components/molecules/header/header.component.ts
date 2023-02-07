import { Component, EventEmitter, Input, Output } from '@angular/core';
import { slideVerticalAnimation } from '../../../core/animations/slide-vertical.animation';
import { StackWidgetReference } from '../../../core/models/stack-widget-reference.model';
import { StackWidget } from '../../../core/models/stack.widget.model';
import { BaseComponentClass } from './../../../core/classes/base-component.class';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [slideVerticalAnimation],
})
export class HeaderComponent extends BaseComponentClass {
  @Input() title = '';
  @Input() filePath = '';
  @Input() evoFileHasChangedSinceSave!: boolean;
  @Input() stackWidgets!: StackWidget[];

  @Output() settingsClicked = new EventEmitter();

  settingsAreOpen(): boolean {
    return this.stackWidgets.some(
      (stackWidget) =>
        stackWidget.stackWidgetReference === StackWidgetReference.settings,
    );
  }

  onSettingsClicked(): void {
    this.settingsClicked.emit();
  }
}

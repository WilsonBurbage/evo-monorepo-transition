import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Account, Organisation } from '@evo-monorepo/shared';
import { StackWidgetDumbComponentClass } from '../../../../core/classes/stack-widget-dumb-component.class';

@Component({
  selector: 'app-settings-dumb',
  templateUrl: './settings-dumb.component.html',
  styleUrls: ['./settings-dumb.component.scss'],
})
export class SettingsDumbComponent extends StackWidgetDumbComponentClass {
  @Input() accountDetailsWaitingForResponse!: boolean;
  @Input() accountDetailsError!: boolean;
  @Input() account!: Account;
  @Input() organisation!: Organisation;

  @Output() textReplacementsClicked = new EventEmitter();

  onTextReplacementsClicked(): void {
    this.textReplacementsClicked.emit();
  }
}

import { Component, HostListener, Injector } from '@angular/core';
import { Bridge } from '@evo-monorepo/shared';
import { BaseComponentClass } from './core/classes/base-component.class';
import { MenuItemId } from './core/models/menu-item-id.model';
import { ContextMenuService } from './core/services/context-menu.service';

declare global {
  interface Window {
    bridge: Bridge;
    electronQuitAppAttempted: () => void;
    menuItemClicked: (menuItemId: MenuItemId) => void;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends BaseComponentClass {
  @HostListener('click', ['$event']) onClick(): void {
    ContextMenuService.hide();
  }

  constructor(injector: Injector) {
    super(injector);
  }
}

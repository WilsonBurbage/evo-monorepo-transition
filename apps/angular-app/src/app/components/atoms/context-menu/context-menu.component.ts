import {
  Component,
  EventEmitter,
  HostBinding,
  Injector,
  Input,
  Output,
} from '@angular/core';
import { takeUntil } from 'rxjs';
import { ContextMenuItem } from '../../../core/models/context-menu-item.model';
import { MousePosition } from '../../../core/models/mouse-position.model';
import { ContextMenuService } from '../../../core/services/context-menu.service';
import { BaseComponentClass } from './../../../core/classes/base-component.class';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss'],
})
export class ContextMenuComponent extends BaseComponentClass {
  @Input() id!: string;
  @Input() contextMenuItems!: ContextMenuItem[];
  @Input() parentMousePosition!: MousePosition;

  @Output() itemClicked = new EventEmitter<ContextMenuItem>();

  @HostBinding('style.display') display = 'none';
  @HostBinding('style.left') x = '0px';
  @HostBinding('style.top') y = '0px';

  constructor(injector: Injector) {
    super(injector);

    ContextMenuService.contextMenuStates$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((contextMenuStates) => {
        if (contextMenuStates[this.id]) {
          this.x = this.parentMousePosition.xPixels;
          this.y = this.parentMousePosition.yPixels;
          this.display = 'block';
        } else {
          this.display = 'none';
        }
      });
  }

  onItemClicked(contextMenuItem: ContextMenuItem): void {
    this.itemClicked.emit(contextMenuItem);
    ContextMenuService.hide();
  }
}

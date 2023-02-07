import { Component, HostListener, Injector, OnDestroy } from '@angular/core';
import { BaseEntity, GuidService } from '@evo-monorepo/shared';
import { Store } from '@ngrx/store';
import { Observable, Subject, take } from 'rxjs';
import { DEFAULT_VALIDATION_MESSAGES } from '../constants/messaging.constants';
import { TOAST_REMOVE_AFTER_MILLISECONDS } from '../constants/toast.constants';
import { Alignment } from '../models/alignment.model';
import { Attitude } from '../models/attitude.model';
import { BUTTON_COLUMN_ID_ICON_MAP } from '../models/button-column-id.model';
import { EntityChunkName } from '../models/entity-chunk-name.model';
import { FontAwesomeSize } from '../models/font-awesome-size.model';
import { FormSchemaColumnSetup } from '../models/form-schema-column-setup.model';
import { MousePosition } from '../models/mouse-position.model';
import { PreviewPadding } from '../models/preview-padding.model';
import {
  FEE_EARNER_SELECTOR_REQUIRED_STACK_WIDGET_REFERENCES,
  PART_QUICK_LINKS_REQUIRED_STACK_WIDGET_REFERENCES,
  PART_SELECTOR_REQUIRED_STACK_WIDGET_REFERENCES,
  StackWidgetReference,
  STACK_WIDGET_REFERENCE_NAME_MAP,
} from '../models/stack-widget-reference.model';
import { TextInputType } from '../models/text-input-type.model';
import { GlobalState } from '../state/reducers';
import * as uiSelectors from '../state/ui/ui.selectors';
import { FontAwesomeIcon } from './../models/font-awesome-icon.model';
import { FormSchemaItemType } from './../models/form-schema-item-type.model';

@Component({ template: '' })
export abstract class BaseComponentClass implements OnDestroy {
  protected store$: Store<GlobalState>;

  activePartId$: Observable<string | undefined>;
  activeFeeEarnerId$: Observable<string | undefined>;

  destroyed$ = new Subject<boolean>();

  componentId = GuidService.getGuid('component');
  inceptionDate = new Date();

  constants = {
    BUTTON_COLUMN_ID_ICON_MAP,
    DEFAULT_VALIDATION_MESSAGES,
    FEE_EARNER_SELECTOR_REQUIRED_STACK_WIDGET_REFERENCES,
    PART_QUICK_LINKS_REQUIRED_STACK_WIDGET_REFERENCES,
    PART_SELECTOR_REQUIRED_STACK_WIDGET_REFERENCES,
    STACK_WIDGET_REFERENCE_NAME_MAP,
    TOAST_REMOVE_AFTER_MILLISECONDS,
  };

  methods = {
    isArray: Array.isArray,
  };

  enums = {
    Alignment,
    Attitude,
    EntityChunkName,
    FontAwesomeIcon,
    FontAwesomeSize,
    FormSchemaColumnSetup,
    FormSchemaItemType,
    PreviewPadding,
    StackWidgetReference,
    TextInputType,
  };

  mousePosition!: MousePosition;
  mousePositionParentSelector = '';

  @HostListener('mousemove', ['$event']) onMouseMove(event: MouseEvent): void {
    const targetHtmlElement = event.target as HTMLElement;
    const target = this.mousePositionParentSelector
      ? (targetHtmlElement.closest(
          this.mousePositionParentSelector
        ) as HTMLElement)
      : targetHtmlElement;

    if (!target) {
      return;
    }

    const rect = target.getBoundingClientRect();
    const x = Math.round(event.clientX - rect.left);
    const y = Math.round(event.clientY - rect.top);
    const xPixels = `${x}px`;
    const yPixels = `${y}px`;

    this.mousePosition = { x, y, xPixels, yPixels };
  }

  constructor(injector: Injector) {
    this.store$ = injector.get(Store<GlobalState>);

    this.activePartId$ = this.store$.select(uiSelectors.getActivePartId);
    this.activeFeeEarnerId$ = this.store$.select(
      uiSelectors.getActiveFeeEarnerId
    );
  }

  activePartId(): string {
    let result = '';
    this.activePartId$
      .pipe(take(1))
      .subscribe((activePartId) => (result = activePartId || ''));
    return result;
  }

  activeFeeEarnerId(): string {
    let result = '';
    this.activeFeeEarnerId$
      .pipe(take(1))
      .subscribe((activeFeeEarnerId) => (result = activeFeeEarnerId || ''));
    return result;
  }

  trackRelational(_index: number, item: BaseEntity): string {
    return item.id;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  propertyValueFromEntity(entity: any, propertyName: string): any {
    return entity ? entity[propertyName] : '';
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}

import { Component, Injector } from '@angular/core';
import { FontAwesomeIcon } from '../../../core/models/font-awesome-icon.model';
import { BaseComponentClass } from './../../../core/classes/base-component.class';
import { FONT_AWESOME_MAP } from './../../../core/constants/font-awesome.constants';

@Component({
  selector: 'app-icon-showcase',
  templateUrl: './icon-showcase.component.html',
  styleUrls: ['./icon-showcase.component.scss'],
})
export class IconShowcaseComponent extends BaseComponentClass {
  FONT_AWESOME_MAP = FONT_AWESOME_MAP;

  allIconKeys = Object.keys(FONT_AWESOME_MAP) as FontAwesomeIcon[];

  constructor(injector: Injector) {
    super(injector);
  }
}

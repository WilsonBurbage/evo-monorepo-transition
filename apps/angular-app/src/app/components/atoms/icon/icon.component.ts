import { Component, Input } from '@angular/core';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { BaseComponentClass } from './../../../core/classes/base-component.class';
import { FONT_AWESOME_MAP } from './../../../core/constants/font-awesome.constants';
import { FontAwesomeIcon } from './../../../core/models/font-awesome-icon.model';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent extends BaseComponentClass {
  FONT_AWESOME_MAP = FONT_AWESOME_MAP;

  @Input() icon: FontAwesomeIcon | undefined = FontAwesomeIcon.home;
  @Input() size!: SizeProp;
}

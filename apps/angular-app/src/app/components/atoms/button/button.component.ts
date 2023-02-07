import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { Attitude } from '../../../core/models/attitude.model';
import { FontAwesomeIcon } from '../../../core/models/font-awesome-icon.model';
import { BaseComponentClass } from './../../../core/classes/base-component.class';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent extends BaseComponentClass {
  @Input() size: SizeProp = '2x';
  @Input() set attitude(attitude: Attitude) {
    this.positive = attitude === Attitude.positive;
    this.neutral = attitude === Attitude.neutral;
    this.negative = attitude === Attitude.negative;
  }

  @HostBinding('class.has-icon') @Input() icon: FontAwesomeIcon | undefined;
  @HostBinding('class.compact') @Input() compact!: boolean;
  @HostBinding('class.half-height') @Input() halfHeight!: boolean;
  @HostBinding('class.double-height') @Input() doubleHeight!: boolean;
  @HostBinding('class.secondary') @Input() secondary!: boolean;
  @HostBinding('class.tertiary') @Input() tertiary!: boolean;
  @HostBinding('class.disabled') @Input() disabled!: boolean;
  @HostBinding('class.loading') @Input() loading!: boolean;
  @HostBinding('class.stretch') @Input() stretch!: boolean;

  @HostBinding('class.positive') positive = this.attitude === Attitude.positive;
  @HostBinding('class.neutral') neutral = this.attitude === Attitude.neutral;
  @HostBinding('class.negative') negative = this.attitude === Attitude.negative;

  @Output() clicked = new EventEmitter();

  onClicked(): void {
    this.clicked.emit();
  }
}

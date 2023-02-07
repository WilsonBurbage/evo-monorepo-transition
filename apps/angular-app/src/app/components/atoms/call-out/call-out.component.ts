import { Component, HostBinding, Input } from '@angular/core';
import { Attitude } from '../../../core/models/attitude.model';
import { BaseComponentClass } from './../../../core/classes/base-component.class';

@Component({
  selector: 'app-call-out',
  templateUrl: './call-out.component.html',
  styleUrls: ['./call-out.component.scss'],
})
export class CallOutComponent extends BaseComponentClass {
  @HostBinding('class.visible') @Input() callOutText = 'A Call Out';

  @Input() set attitide(attitude: Attitude) {
    switch (attitude) {
      case Attitude.positive:
        this.isPositive = true;
        this.isNeutral = false;
        this.isNegative = false;
        break;

      case Attitude.neutral:
        this.isPositive = false;
        this.isNeutral = true;
        this.isNegative = false;
        break;

      case Attitude.negative:
        this.isPositive = false;
        this.isNeutral = false;
        this.isNegative = true;
        break;

      default:
        break;
    }
  }

  @HostBinding('class.positive') isPositive = false;
  @HostBinding('class.neutral') isNeutral = false;
  @HostBinding('class.negative') isNegative = false;
}

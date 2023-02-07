import { Component, Input } from '@angular/core';
import { BaseComponentClass } from './../../../core/classes/base-component.class';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
})
export class ProgressComponent extends BaseComponentClass {
  @Input() value = 0;
  @Input() max = 100;

  calculatePercentage(): string {
    return `${(this.value / this.max) * 100}%`;
  }
}

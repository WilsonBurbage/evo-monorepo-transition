import { animate, style, transition, trigger } from '@angular/animations';
import { DEFAULT_ANIMATION_SPEED_STRING } from '../constants/animation.constants';

export const slideHorizontalAnimation = trigger('slideHorizontalAnimation', [
  transition(':enter', [
    style({ width: 0, marginLeft: 0, marginRight: 0, opacity: 0 }),
    animate(
      `${DEFAULT_ANIMATION_SPEED_STRING} ease`,
      style({ width: '*', marginLeft: '*', marginRight: '*', opacity: 1 }),
    ),
  ]),
  transition(':leave', [
    animate(
      `${DEFAULT_ANIMATION_SPEED_STRING} ease`,
      style({ width: 0, marginLeft: 0, marginRight: 0, opacity: 0 }),
    ),
  ]),
]);

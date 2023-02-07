import { animate, style, transition, trigger } from '@angular/animations';
import { DEFAULT_ANIMATION_SPEED_STRING } from '../constants/animation.constants';

export const slideVerticalAnimation = trigger('slideVerticalAnimation', [
  transition(':enter', [
    style({
      height: 0,
      marginTop: 0,
      paddingTop: 0,
      marginBottom: 0,
      paddingBottom: 0,
      opacity: 0,
    }),
    animate(
      `${DEFAULT_ANIMATION_SPEED_STRING} ease`,
      style({
        height: '*',
        marginTop: '*',
        paddingTop: '*',
        marginBottom: '*',
        paddingBottom: '*',
        opacity: 1,
      }),
    ),
  ]),
  transition(':leave', [
    animate(
      `${DEFAULT_ANIMATION_SPEED_STRING} ease`,
      style({
        height: 0,
        marginTop: 0,
        paddingTop: 0,
        marginBottom: 0,
        paddingBottom: 0,
        opacity: 0,
      }),
    ),
  ]),
]);

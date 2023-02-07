import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { DEFAULT_ANIMATION_SPEED_STRING } from '../constants/animation.constants';

export const reduceAnimation = trigger('reduceAnimation', [
  state(
    'false',
    style({ opacity: 1, transform: 'scale(1)', pointerEvents: 'all' }),
  ),
  state(
    'true',
    style({ opacity: 0.2, transform: 'scale(0.95)', pointerEvents: 'none' }),
  ),
  transition('* => *', animate(`${DEFAULT_ANIMATION_SPEED_STRING} ease`)),
]);

import { on } from '@ngrx/store';
import * as developerActions from './developer.actions';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const setEntireStateReducer = <T>(chunkName: string) =>
  on(developerActions.setEntireState, (_state: T, { entireState }) => {
    const result = ({ ...entireState }[chunkName] || {}) as T;
    return result;
  });

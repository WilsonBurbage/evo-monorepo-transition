import { GlobalState } from '../state/reducers';

export interface Diagnostics {
  timestamp: string;
  state: GlobalState;
}

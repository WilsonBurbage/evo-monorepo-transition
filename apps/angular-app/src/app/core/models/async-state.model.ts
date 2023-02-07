import { AsyncStatus } from './async-status.model';

export interface AsyncState {
  status: AsyncStatus;
  errorCode?: number;
}

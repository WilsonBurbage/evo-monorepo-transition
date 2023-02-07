import { MemoizedSelector } from '@ngrx/store';
import { AsyncStatus } from './async-status.model';

export interface AsyncStatusSelectors<
  State,
  S1 extends { status: AsyncStatus },
> {
  readySelector: MemoizedSelector<State, boolean, (s1: S1) => boolean>;
  inProgressSelector: MemoizedSelector<State, boolean, (s1: S1) => boolean>;
  waitingForResponseSelector: MemoizedSelector<
    State,
    boolean,
    (s1: S1) => boolean
  >;
  successSelector: MemoizedSelector<State, boolean, (s1: S1) => boolean>;
  errorSelector: MemoizedSelector<State, boolean, (s1: S1) => boolean>;
  errorCodeSelector: MemoizedSelector<
    State,
    number | undefined,
    (s1: S1) => number | undefined
  >;
}

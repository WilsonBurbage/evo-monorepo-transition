import { createSelector, MemoizedSelector, Selector } from '@ngrx/store';
import { AsyncStatusSelectors } from './../../models/async-status-selectors.model';
import { AsyncStatus } from './../../models/async-status.model';

export function generateAsyncStatusSelectors<
  State,
  S1 extends { status: AsyncStatus; errorCode?: number },
>(state: Selector<State, S1>): AsyncStatusSelectors<State, S1> {
  return {
    readySelector: createIsReadySelector(state),
    inProgressSelector: createIsInProgressSelector(state),
    waitingForResponseSelector: createWaitingForResponseSelector(state),
    successSelector: createHasSuccessSelector(state),
    errorSelector: createHasErrorSelector(state),
    errorCodeSelector: createErrorCodeSelector(state),
  };
}

export function createIsReadySelector<
  State,
  S1 extends { status: AsyncStatus },
>(
  state: Selector<State, S1>,
): MemoizedSelector<State, boolean, (s1: S1) => boolean> {
  return createSelector(state, (state) => state.status === AsyncStatus.ready);
}

export function createIsInProgressSelector<
  State,
  S1 extends { status: AsyncStatus },
>(
  state: Selector<State, S1>,
): MemoizedSelector<State, boolean, (s1: S1) => boolean> {
  return createSelector(
    state,
    (state) => state.status === AsyncStatus.inProgress,
  );
}

export function createWaitingForResponseSelector<
  State,
  S1 extends { status: AsyncStatus },
>(
  state: Selector<State, S1>,
): MemoizedSelector<State, boolean, (s1: S1) => boolean> {
  return createSelector(state, (state) =>
    [AsyncStatus.ready, AsyncStatus.inProgress].includes(state.status),
  );
}

export function createHasSuccessSelector<
  State,
  S1 extends { status: AsyncStatus },
>(
  state: Selector<State, S1>,
): MemoizedSelector<State, boolean, (s1: S1) => boolean> {
  return createSelector(state, (state) => state.status === AsyncStatus.success);
}

export function createHasErrorSelector<
  State,
  S1 extends { status: AsyncStatus },
>(
  state: Selector<State, S1>,
): MemoizedSelector<State, boolean, (s1: S1) => boolean> {
  return createSelector(state, (state) => state.status === AsyncStatus.error);
}

export function createErrorCodeSelector<
  State,
  S1 extends { errorCode?: number },
>(
  state: Selector<State, S1>,
): MemoizedSelector<State, number | undefined, (s1: S1) => number | undefined> {
  return createSelector(state, (state) => state.errorCode);
}

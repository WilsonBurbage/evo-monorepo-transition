import { GuidService } from '@evo-monorepo/shared';
import { Action, createReducer, on } from '@ngrx/store';
import { EntityChunkName } from '../../models/entity-chunk-name.model';
import { ExportDocumentType } from '../../models/export-document-type.model';
import { StackWidget } from '../../models/stack.widget.model';
import { setEntireStateReducer } from '../developer/developer.reducer';
import * as uiActions from './ui.actions';
import { ACTIONS_THAT_REQUIRE_TEMPORARY_SELECTOR_DISABLING } from './ui.constants';

export const chunkName = EntityChunkName.ui;

export interface State {
  billIsFullyLoaded: boolean;
  billSelectorsEnabled: boolean;
  activePartId?: string;
  activeFeeEarnerId?: string;
  activePreviewExportDocumentType?: ExportDocumentType;
  stackWidgets: StackWidget[];
}

export const initialState: State = {
  billIsFullyLoaded: false,
  billSelectorsEnabled: false,
  stackWidgets: [],
};

const reducerSetup = createReducer(
  initialState,

  setEntireStateReducer(chunkName),

  on(
    uiActions.setBillIsFullyLoaded,
    (state, props): State => ({
      ...state,
      billIsFullyLoaded: props.billIsFullyLoaded,
    })
  ),

  on(
    ...ACTIONS_THAT_REQUIRE_TEMPORARY_SELECTOR_DISABLING,
    (state: State): State => ({
      ...state,
      billSelectorsEnabled: false,
    })
  ),

  on(
    uiActions.setBillSelectorsEnabled,
    (state, props): State => ({
      ...state,
      billSelectorsEnabled: props.billSelectorsEnabled,
    })
  ),

  on(
    uiActions.setActivePartId,
    (state, props): State => ({
      ...state,
      activePartId: props.partId,
    })
  ),

  on(
    uiActions.setActivePartId,
    (state, props): State => ({
      ...state,
      activePartId: props.partId,
    })
  ),

  on(
    uiActions.setActiveFeeEarnerId,
    (state, props): State => ({
      ...state,
      activeFeeEarnerId: props.feeEarnerId,
    })
  ),

  on(
    uiActions.pushStackWidget,
    (state, props): State => ({
      ...state,
      stackWidgets: [
        {
          id: GuidService.getGuid('stack-widget'),
          stackWidgetReference: props.stackWidgetReference,
          config: props.config,
        },
        ...state.stackWidgets,
      ],
    })
  ),

  on(uiActions.popStackWidget, (state): State => {
    const [, ...rest] = state.stackWidgets;
    return {
      ...state,
      stackWidgets: rest,
    };
  }),

  on(uiActions.setActivePreviewExportDocumentType, (state, props): State => {
    return {
      ...state,
      activePreviewExportDocumentType: props.previewExportDocumentType,
    };
  }),

  on(uiActions.clearStackWidgets, (state): State => {
    return {
      ...state,
      stackWidgets: [],
    };
  })
);

export function reducer(state: State | undefined, action: Action): State {
  return reducerSetup(state, action);
}

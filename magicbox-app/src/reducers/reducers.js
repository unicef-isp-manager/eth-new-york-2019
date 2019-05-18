import { lazy } from 'react';
import ActionTypes from '../constants/action-types';

const DEFAULT_DATASET_NAME = 'shape';
const DEFAULT_PATH = '/';
const DEFAULT_TITLE = 'POVERTY MAP';

export const INITIAL_APP_STATE = {
  title: DEFAULT_TITLE,
  dataInfo: [],
  sidePanel: [],
  ui: {
    sidePanelOpen: true,
    dataInfoOpen: false,
    isLoading: false,
    loading: 1,
    error: null,
  },
  data: {
    country: null,
    path: DEFAULT_PATH,
    datasetName: DEFAULT_DATASET_NAME,
    dataset: null,
  },
};

// Update country name
export const countrySelectUpdater = (state, action) => ({
  ...state,
  data: {
    ...state.data,
    country: action.payload ? action.payload.name : null,
    path: action.payload ? `/c/${action.payload.url}/` : null,
  },
});

// Update ui and data to new selected dataset/path
export const fetchDataUpdater = (state, action) => ({
  ...state,
  ui: {
    ...state.ui,
    isLoading: true,
    error: null,
    loading: 0,
  },
  data: {
    ...state.data,
    path: action.payload.path || DEFAULT_PATH,
    datasetName: action.payload.dataset || DEFAULT_DATASET_NAME,
    dataset: null,
  },
});

// Update ui loading status
export const fetchingDataUpdater = (state, action) => ({
  ...state,
  ui: {
    ...state.ui,
    isLoading: true,
    error: null,
    loading: action.payload,
  },
});

// Update dataset
export const fetchedDataUpdater = (state, action) => ({
  ...state,
  title: action.payload.appConfig.title,
  dataInfo: action.payload.appConfig.dataInfo.sort((a, b) => a.order - b.order),
  sidePanel: action.payload.appConfig.sidePanel
    .sort((a, b) => a.order - b.order)
    .map(c => ({
      ...c,
      component: lazy(() => import(`../components/SidePanel/${c.component}`)),
    })),
  ui: {
    ...state.ui,
    isLoading: false,
    error: null,
    loading: 100,
    dataInfoOpen: typeof action.payload.appConfig.dataInfoOpen === 'undefined'
      ? state.ui.dataInfoOpen
      : action.payload.appConfig.dataInfoOpen,
  },
  data: {
    ...state.data,
    dataset: action.payload.mapConfig,
  },
});

// handle error
export const errorFetchingDataUpdater = (state, action) => ({
  ...state,
  ui: {
    ...state.ui,
    isLoading: false,
    loading: 0,
    error: action.payload,
  },
});

// toggle side panel
export const toggleSidePanelUpdater = state => ({
  ...state,
  ui: {
    ...state.ui,
    sidePanelOpen: !state.ui.sidePanelOpen,
  },
});
// toggle data info modal
export const toggleDataInfoUpdater = state => ({
  ...state,
  ui: {
    ...state.ui,
    dataInfoOpen: !state.ui.dataInfoOpen,
  },
});

export default {
  [ActionTypes.COUNTRY_SELECT]: countrySelectUpdater,
  [ActionTypes.FETCH_DATA]: fetchDataUpdater,
  [ActionTypes.FETCHING_DATA]: fetchingDataUpdater,
  [ActionTypes.FETCHED_DATA]: fetchedDataUpdater,
  [ActionTypes.ERROR_FETCHING_DATA]: errorFetchingDataUpdater,
  [ActionTypes.TOGGLE_SIDE_PANEL]: toggleSidePanelUpdater,
  [ActionTypes.TOGGLE_DATA_INFO]: toggleDataInfoUpdater,
};

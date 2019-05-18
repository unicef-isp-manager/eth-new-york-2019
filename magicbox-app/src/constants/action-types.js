// All action types
const ActionTypes = Object.keys({
  NOOP: null,
  COUNTRY_SELECT: null,
  FETCH_DATA: null,
  FETCHING_DATA: null,
  FETCHED_DATA: null,
  ERROR_FETCHING_DATA: null,
  ENABLE_BUILDER_MODE: null,
  TOGGLE_SIDE_PANEL: null,
  TOGGLE_DATA_INFO: null,
}).reduce((acc, el) => ({ ...acc, [el]: el }), {});

export default ActionTypes;

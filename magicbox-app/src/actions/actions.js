import { createAction } from 'redux-actions';
import Fortmatic from 'fortmatic';
import Web3 from 'web3';
import { toWei, toBN, asciiToHex } from 'web3-utils';
import {
  addDataToMap,
  onLayerClick,
  updateVisData,
  layerConfigChange,
} from 'kepler.gl/actions';
import Processors from 'kepler.gl/processors';
import { push } from 'connected-react-router';
import ActionTypes from '../constants/action-types';
import abi from '../contracts/donationsManagerABI';
import address from '../contracts/donationsManagerAddress';


const [
  noop,
  onCountrySelect,
  fetchData,
  fetchingData,
  fetchedData,
  errorFetchingData,
  toggleSidePanel,
  toggleDataInfo,
  setWeb3Provider,
] = [
  ActionTypes.NOOP,
  ActionTypes.COUNTRY_SELECT,
  ActionTypes.FETCH_DATA,
  ActionTypes.FETCHING_DATA,
  ActionTypes.FETCHED_DATA,
  ActionTypes.ERROR_FETCHING_DATA,
  ActionTypes.TOGGLE_SIDE_PANEL,
  ActionTypes.TOGGLE_DATA_INFO,
  ActionTypes.SET_WEB3_PROVIDER,
].map(action => createAction(action));

// On country click action
const onCountryClick = info => (dispatch, getState) => {
  // dispatch usual kepler.gl action
  dispatch(onLayerClick(info));

  // if the user clicked in a object with properties
  if (info && info.object && info.object.properties && info.object.properties.url) {
    // dispatch country select action
    dispatch(onCountrySelect(info.object.properties));
    // get current state
    const { app: { data } } = getState();
    // dispatch push to change the url
    dispatch(push(data.path));
  }

  // return noop because kepler is expecting a action
  return noop();
};

// Load data action
const loadData = (dataset = null, path = null) => ((dispatch, getState) => {
  // Initialize fetching state
  dispatch(fetchData({ dataset, path }));

  // fetch dataset from url
  const { app: { data } } = getState();
  const url = `${data.path}${data.datasetName}.json`;

  // eslint-disable-next-line
  console.log('Getting data from:', url);

  // Fetch data from url
  return fetch(url)
    .then((response) => {
      const totalSizeString = response.headers.get('X-Original-Content-Length') || response.headers.get('Content-Length');
      // get stream reader
      const reader = response.body.getReader();
      const totalSize = parseFloat(totalSizeString, 10) || 0;
      let totalRead = 0;

      return new ReadableStream({
        start(controller) {
          // define function to pump data from stream
          const pump = () => reader.read().then(({ done, value }) => {
            if (done) {
              controller.close();
              return;
            }
            // add size of byte length to total of bytes read
            totalRead += value.byteLength;
            // dispatch fetching data with percentage read
            if (totalSize !== 0) {
              dispatch(fetchingData(100 * totalRead / totalSize));
            }
            // Enqueue value
            controller.enqueue(value);
            // keep pumping
            pump();
          });

          return pump();
        },
      });
    })
    // transform stream into a response
    .then(stream => new Response(stream))
    // parse to json
    .then(response => response.json())
    // set fetching data with 1 -> 100%
    .then(responseJson => dispatch(fetchedData(responseJson)))
    // set error
    .catch(err => dispatch(errorFetchingData(err)));
});

// Load data to map
const loadDataToMap = (dataset = null, path = null) => ((dispatch, getState) => (
  dispatch(loadData(dataset, path))
    .then(() => getState().app.data.dataset)
    .then(Processors.processKeplerglJSON)
    .then(data => dispatch(addDataToMap(data)))
));

// On Zoom level change
const onZoomLevelChange = () => (dispatch, getState) => {
  // Minimum zoom level allowed before triggering request for
  // global explorer dataset
  const MIN_ZOOM_LEVEL = 1.5;
  const {
    keplerGl: {
      map: {
        mapState: {
          zoom,
        },
      },
    },
    app: {
      data: {
        country,
      },
    },
  } = getState();

  // check if it is necessary to trigger the load event
  if (zoom && country && zoom <= MIN_ZOOM_LEVEL) {
    // Remove selected country
    dispatch(onCountrySelect(null));
    // Go to the main screen
    dispatch(push('/'));
  }
};

// Set visible layers by id
const setVisibleLayers = visibleLayersIds => (dispatch, getState) => {
  const state = getState();

  // Check if map is already defined
  if (!(state.keplerGl
      && state.keplerGl.map
      && state.keplerGl.map.visState
      && state.keplerGl.map.visState.layers)) {
    return dispatch(noop());
  }

  const {
    keplerGl: {
      map: {
        visState: {
          layers,
        },
      },
    },
  } = state;

  const allUniqueVisibleLayers = new Set(visibleLayersIds);

  layers.forEach((layer) => {
    const isVisible = allUniqueVisibleLayers.has(layer.id);
    dispatch(layerConfigChange(layer, { isVisible }));
  });

  return dispatch(noop());
};

// Enable builder mode
const enableBuilderMode = () => dispatch => dispatch(updateVisData({}, { readOnly: false }, {}));

const fortmaticTestApiKey = 'pk_test_FA4473198B4649E4';

// const getWeb3 = () => dispatch => {
// 
// };

const handleDonationClick = (country, amount, currency) => (dispatch, getState) => {
  console.log('COUNTRY, AMOUNT, CURRENCY', country, amount, currency);
  
  const { app: { web3: { provider }}} = getState();
  console.log('PROVIDER', provider);

  if (!provider) {
    // getWeb3();
    console.log('GET WEB3!');
    // Modern dapp browsers...
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
            // Request account access if needed
            window.ethereum.enable();
            // Acccounts now exposed
            console.log("MetaMask");
            // set provider "metamask";
            dispatch(setWeb3Provider('metamask'));
        } catch (error) {
            // User denied account access...
            console.log('USER DENIED ACCOUNT ACCESS');
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
        // Acccounts always exposed
        console.log("browser");
        // return "browser";
        dispatch(setWeb3Provider('browser'));
    }
    // Non-dapp browsers...
    else {
      const fm = new Fortmatic(fortmaticTestApiKey);
      window.web3 = new Web3(fm.getProvider());
      // window.web3.currentProvider.enable();
      console.log("fortmatic");
      // return "fortmatic";
      dispatch(setWeb3Provider('fortmatic'));
    }
  } else {
    console.log('PROVIDER', provider);
    // sort out currency
    // convert amount
    // const utils = window.web3.utils;
    const value = toWei(toBN(amount), 'finney');
    // sendDonation
    const contract = new window.web3.eth.Contract(abi, address);
    window.web3.eth.getAccounts().then((accounts) => {
      contract.methods.addDonation(asciiToHex(country))
        .send({
          from: accounts[0],
          value,
          gas: 300000,
        })
        .once('transactionHash', (hash) => { console.log(hash); })
        .once('receipt', (receipt) => { console.log(receipt); });
    });
  }
};


export {
  onCountrySelect,
  onCountryClick,
  fetchData,
  fetchingData,
  fetchedData,
  errorFetchingData,
  toggleSidePanel,
  toggleDataInfo,
  loadData,
  loadDataToMap,
  enableBuilderMode,
  onZoomLevelChange,
  setVisibleLayers,
  handleDonationClick,
};

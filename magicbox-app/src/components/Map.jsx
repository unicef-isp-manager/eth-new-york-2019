import React, { Component } from 'react';
import KeplerGl from 'kepler.gl';
import keplerGlReducer from 'kepler.gl/reducers';
import { onLayerClick } from 'kepler.gl/actions';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import PropTypes from 'prop-types';
import withReducer from '../helpers/with-reducer';

/**
 * This reducer is placed here to be able to load it dinamically
 * alongside with kepler.gl
 */
// It is time to create and load kepler reducers
// Create custom reducer
const customKeplerGlReducer = keplerGlReducer.initialState({
  uiState: {
    currentModal: null,
    activeSidePanel: null,
    readOnly: true,
    mapControls: {
      splitMap: { show: false },
      toggle3d: { show: false },
      mapLegend: { show: false },
    },
  },
  mapState: {
    zoom: 1,
    latitude: 0,
    longitude: 0,
  },
});

class Map extends Component {
  componentDidMount() {
    const { onLoad } = this.props;
    // Execute onLoad action
    onLoad();
  }

  render() {
    const {
      store,
      mapboxToken,
      onCountryClick,
    } = this.props;

    return (
      <AutoSizer>
        {({ height, width }) => (
          <KeplerGl
            id="map"
            mapboxApiAccessToken={mapboxToken}
            height={height}
            width={width}
            actions={{ onLayerClick: onCountryClick || onLayerClick }}
            store={store}
          />
        )}
      </AutoSizer>
    );
  }
}

Map.defaultProps = {
  onCountryClick: null,
};

Map.propTypes = {
  store: PropTypes.shape({}).isRequired,
  mapboxToken: PropTypes.string.isRequired,
  onCountryClick: PropTypes.func,
  onLoad: PropTypes.func.isRequired,
};

export default withReducer('keplerGl', customKeplerGlReducer)(Map);

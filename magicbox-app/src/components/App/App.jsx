import React, { Component, lazy, Suspense } from 'react';
import { connect, ReactReduxContext } from 'react-redux';
import PropTypes from 'prop-types';
import * as Actions from '../../actions';
import LoadingIndicator from '../LoadingIndicator';
import SidePanel from '../SidePanel';
import DataInfo from '../DataInfo';
import DonationCard from '../DonationCard';


// Load Map component dinamically -> code splitting
const LazyMap = lazy(() => import(/* webpackChunkName: "map" */ '../Map'));

// eslint-disable-next-line
const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;

export class App extends Component {
  componentDidMount() {
    const {
      onLoadMap,
      onZoomLevelChange,
      history,
      match: { params: { dataset } },
    } = this.props;

    // Enable new data to be loaded when URL changes
    history.listen(loc => onLoadMap(dataset, loc.pathname));

    // Add mouse wheel event to control dataset accordingly
    // with zoom level
    window.addEventListener('mousewheel', onZoomLevelChange);
  }

  setupMapAfterLoad = () => {
    const {
      onLoadMap,
      enableBuilderMode,
      match: { params: { country, dataset } },
      location: { search },
    } = this.props;
    // Load data to map
    onLoadMap(dataset, country ? `/c/${country}/` : '/');

    // Enable builder mode if needed
    // Once it is activated, it will not be deactivated
    const urlParams = new URLSearchParams(search);
    if (urlParams.has('builder')) {
      enableBuilderMode();
    }
  };

  render() {
    const {
      match: { params: { country } },
      onCountryClick,
      app: {
        dataInfo,
        sidePanel,
        ui: {
          loading,
          isLoading,
          sidePanelOpen,
          dataInfoOpen,
        },
      },
      toggleSidePanel,
      toggleDataInfo,
      // handleDonationClick,
      // app,
    } = this.props;
    console.log('dataInfo', dataInfo);

    // Country click should only be available when no country is selected
    const clickCallback = !country ? onCountryClick : null;
    return (
      <div className="App">
        <SidePanel
          open={sidePanelOpen}
          toggleAction={toggleSidePanel}
        >
          <Suspense fallback={<LoadingIndicator />}>
            {sidePanel.map(C => <C.component {...C.props} key={C.order} />)}
          </Suspense>
        </SidePanel>
        <DataInfo
          open={dataInfoOpen}
          toggleAction={toggleDataInfo}
          content={dataInfo}
        />
        {isLoading && <LoadingIndicator value={loading} />}
        <ReactReduxContext.Consumer>
          {({ store }) => (

            <Suspense fallback={<LoadingIndicator />}>
              <LazyMap
                store={store}
                mapboxToken={MAPBOX_TOKEN}
                onCountryClick={clickCallback}
                onLoad={this.setupMapAfterLoad}
              />
            </Suspense>

          )}
        </ReactReduxContext.Consumer>
        <DonationCard
          countryFromMap={dataInfo}
        />


      </div>
    );
  }
}

App.propTypes = {
  onCountryClick: PropTypes.func.isRequired,
  onLoadMap: PropTypes.func.isRequired,
  match: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
  app: PropTypes.shape({}).isRequired,
  toggleSidePanel: PropTypes.func.isRequired,
  toggleDataInfo: PropTypes.func.isRequired,
  enableBuilderMode: PropTypes.func.isRequired,
  onZoomLevelChange: PropTypes.func.isRequired,
  // handleDonationClick: PropTypes.func.isRequired,
};

// const mapStateToProps = state => ({ app: state.app });
const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  dispatch,
  onCountryClick: info => dispatch(Actions.onCountryClick(info)),
  onLoadMap: (dataset, path) => dispatch(Actions.loadDataToMap(dataset, path)),
  enableBuilderMode: () => dispatch(Actions.enableBuilderMode()),
  toggleSidePanel: () => dispatch(Actions.toggleSidePanel()),
  toggleDataInfo: () => dispatch(Actions.toggleDataInfo()),
  onZoomLevelChange: () => dispatch(Actions.onZoomLevelChange()),
  // handleDonationClick: (country, amount, currency) => {
  //   dispatch(Actions.handleDonationClick(country, amount, currency));
  // },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

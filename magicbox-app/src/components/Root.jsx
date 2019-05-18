import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { MuiThemeProvider } from '@material-ui/core/styles';
import ConnectedApp from './App';

// Root component
const Root = ({ store, history, theme }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MuiThemeProvider theme={theme}>
        <Switch>
          <Route path="/c/:country/:dataset?" component={ConnectedApp} />
          <Route path="/:dataset" component={ConnectedApp} />
          <Route path="/" component={ConnectedApp} />
        </Switch>
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired,
  theme: PropTypes.shape({}).isRequired,
};

export default Root;

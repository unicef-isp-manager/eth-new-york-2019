import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import * as serviceWorker from './serviceWorker';
import Root from './components/Root';
import initializeStore from './store';
import theme from './theme';

// Create browser history
const history = createBrowserHistory();

// Create the store
const store = initializeStore(history);

// Render the root component
ReactDOM.render(<Root store={store} history={history} theme={theme} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

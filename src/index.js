import React from 'react';
import ReactDOM from 'react-dom';
import { createStore ,applyMiddleware ,compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

//import reducer from './reducers/Reducers';
import reducer from './reducers/rootReducer';
import * as serviceWorker from './serviceWorker';
import App from './App';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer,composeEnhancers(applyMiddleware(thunk)));
ReactDOM.render(<Provider store={store}><App /> </Provider>, document.getElementById('root'));
serviceWorker.unregister();
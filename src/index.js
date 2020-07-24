import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './store/reducer';

/*
Commenting below one and Removing React Strict Mode
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
*/

// Now Routing is Enabled we can Routing in our Project
// Creates a Global Store to store the state in Redux and use across the Application 
// store takes Input as Root Reducer : Root Reducer combines multiple reducers to a single Reducer
// Provider is a Helper Function which passes the store which contains the Global State to Redux from React
// Redux is an Independent One Which Works in Conjunction with React

const store = createStore(reducer);

const app = (
  <Provider store={store} >
    <BrowserRouter>
        <App/>
    </BrowserRouter>
  </Provider>

)

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import decode from "jwt-decode";
import App from './App';
import rootReducer from "./rootReducer";
import registerServiceWorker from './registerServiceWorker';
import { userLoggedIn } from './actions/auth';
import addAuthorizationHeader from "./utils/addAuthorizationHeader";


const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

if (localStorage.tweetSearchToken) {
    const payload = decode(localStorage.tweetSearchToken);

    const user = { token: localStorage.tweetSearchToken, email: payload.email, isConfirmed: payload.isConfirmedEmail, id: localStorage.tweetSearchId};
    addAuthorizationHeader(localStorage.tweetSearchToken);
    store.dispatch(userLoggedIn(user));
}

ReactDOM.render( 
    <BrowserRouter >
        <Provider store={store} >
            <Route component={App} />
        </Provider> 
    </BrowserRouter>,
    document.getElementById('root')
);

registerServiceWorker();
  
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

if (localStorage.bookwormJWT) {
    const payload = decode(localStorage.bookwormJWT);
    const user = { token: localStorage.bookwormJWT, email: payload.email, confirmed: payload.confirmed };
    addAuthorizationHeader(localStorage.bookwormJWT);
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
  
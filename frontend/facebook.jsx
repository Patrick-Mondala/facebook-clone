import React from "react";
import ReactDOM from "react-dom";
import configureStore from './store/store';
import Root from './components/root';
import * as sessionActions from './actions/session_actions';

document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("root");
    let store;
    if (window.currentUser) {
        const preloadedState = {
            session: { id: window.currentUser.id },
            entities: {
                users: { [window.currentUser.id]: window.currentUser }
            }
        };
        store = configureStore(preloadedState);
        delete window.currentUser;
    } else {
        store = configureStore();
    }
    //TESTING START
    window.getState = store.getState;
    window.dispatch = store.dispatch;

    window.signup = sessionActions.signup;
    window.login = sessionActions.login;
    window.logout = sessionActions.logout;
    //TESTING END

    ReactDOM.render(<Root store={store} />, root);
});
import React from "react";
import GreetingContainer from './greeting/greeting_container';
import { Route } from 'react-router-dom';
import LoginFormContainer from './session_form/login_form_container';
import SignupFormContainer from './session_form/signup_form_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

//App
export default () => (
    <div>
        <header id="login-menu-bar">
            <div id="login">
                <h1>bookface</h1>
                <AuthRoute path="/" component={LoginFormContainer} />
            </div>
        </header>

        <AuthRoute path="/" component={SignupFormContainer} />
    </div>
);
//removed greetingcontainer, use to reference displaying depending on loggedin
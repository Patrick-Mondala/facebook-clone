import React from "react";
import GreetingContainer from './greeting/greeting_container';
import { Route } from 'react-router-dom';
import LoginFormContainer from './session_form/login_form_container';
import SignupFormContainer from './session_form/signup_form_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

//App
export default () => (
    <div>
        <AuthRoute path="/" component={LoginFormContainer} />
        <AuthRoute path="/" component={SignupFormContainer} />
    </div>
);
//removed greetingcontainer, use to reference displaying depending on loggedin
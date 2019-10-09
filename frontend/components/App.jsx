import React from "react";
import GreetingContainer from './greeting/greeting_container';
import { Route } from 'react-router-dom';
import Main from './main';
import NavBar from './nav/navbar';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

//App
export default () => (
    <div>
        <NavBar />
        <Main />
    </div>
);
//removed greetingcontainer, use to reference displaying depending on loggedin
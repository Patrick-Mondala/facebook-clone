import React from 'react';
import SignupFormContainer from './session_form/signup_form_container';
import SignupAside from './session_form/signup_aside';
import ProfileContainer from './profile/profile_container';
import NewsFeed from './NewsFeed';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

export default () => (
    <div className="main">
        <AuthRoute path="/" component={SignupAside} />
        <AuthRoute path="/" component={SignupFormContainer} />
        <ProtectedRoute exact path="/" component={NewsFeed} />
        <ProtectedRoute exact path="/users/:userId" component={ProfileContainer} />
    </div>
)
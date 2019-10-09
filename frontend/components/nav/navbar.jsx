import React from 'react';
import { connect } from 'react-redux';
import Login from './login';
import ProfileNav from './profile';
import { AuthRoute, ProtectedRoute } from '../../util/route_util';

const mapStateToProps = ({ session, entities: { users } }) => {
    return {
        currentUser: users[session.id]
    };
};

const NavBar = props => (
    <nav className="navbar">
        {props.currentUser ? <ProfileNav /> : <AuthRoute path="/" component={Login} />}
    </nav>
)

export default connect(
    mapStateToProps
)(NavBar);
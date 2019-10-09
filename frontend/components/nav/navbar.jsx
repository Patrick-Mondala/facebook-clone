import React from 'react';
import { connect } from 'react-redux';
import Login from './login';
import { AuthRoute, ProtectedRoute } from '../../util/route_util';

const mapStateToProps = ({ session, entities: { users } }) => {
    return {
        currentUser: users[session.id]
    };
};

const NavBar = props => (
    <div className="navbar">
        {props.currentUser ? <div>profilenavbar</div> : <AuthRoute path="/" component={Login} />}
    </div>
)

export default connect(
    mapStateToProps
)(NavBar);
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Profile from './profile';
import { fetchSingleUser } from '../../actions/user_actions';

const mapStateToProps = (state, ownProps) => ({
    user: state.entities.users[ownProps.match.params.userId] || {},
    currentUser: state.entities.users[state.session.id] || {}
});

const mapDispatchToProps = dispatch => ({
    fetchSingleUser: userId => dispatch(fetchSingleUser(userId))
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile));
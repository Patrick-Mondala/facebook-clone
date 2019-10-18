import React from 'react';
import ProfileCover from './cover/profile_cover';
import ProfileSidebar from './sidebar/profile_sidebar';
import ProfileTimeline from './timeline/profile_timeline';
import Modal from '../modal/modal';
import { connect } from 'react-redux';
import { fetchSingleUser } from '../../actions/user_actions';
import FriendButton from './cover/friend_button';

class Profile extends React.Component {
    componentDidMount() {
        this.props.fetchSingleUser(this.props.match.params.userId).fail(() => this.props.history.push("/"));
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.userId !== this.props.match.params.userId) {
            this.props.fetchSingleUser(this.props.match.params.userId).fail(() => this.props.history.push("/"));
        }
    }

    render() {
        console.log(this.props)
        return (
            <div className="profile-container">
                <Modal user={this.props.user} currentUser={this.props.currentUser} />
                <ProfileCover user={this.props.user} currentUser={this.props.currentUser} />
                {this.props.user.id !== this.props.currentUser.id ? <FriendButton user={this.props.user} /> : null}
                <div className="profile-content-under-cover">
                    <ProfileSidebar user={this.props.user} currentUser={this.props.currentUser} />
                    <ProfileTimeline user={this.props.user} currentUser={this.props.currentUser} friendships={this.props.entities.friendships} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    let defaultUser = {};
    let user = state.entities.users[ownProps.match.params.userId] || defaultUser;
    return { 
        user,
        entities: state.entities
    }
}

const mapDispatchToProps = dispatch => ({
    fetchSingleUser: userId => dispatch(fetchSingleUser(userId))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);
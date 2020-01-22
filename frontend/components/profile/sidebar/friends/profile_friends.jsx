import React from 'react';
import { fetchSingleUser } from "../../../../actions/user_actions";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

class ProfileFriends extends React.Component {
    componentDidMount() {
      this.props.friendIds.forEach(userId => this.props.fetchUser(userId));
    }

    componentDidUpdate(prevProps) {
      if (prevProps.friendIds.length !== this.props.friendIds.length) {
        this.props.friendIds.forEach(userId => this.props.fetchUser(userId));
      }
    }

    render() {
        return (
            <div className="profile-sidebar-profile-friends-container">
                <p className="profile-sidebar-profile-friends-header">
                    <span className="profile-sidebar-profile-friends-icon-container"><i className="fas fa-user-friends profile-sidebar-profile-friends-icon"></i></span>Friends
                </p>
                <ul className="profile-sidebar-friends">
                  {this.props.friends.slice(0,9).map(friend =>
                    <Link to={`/users/${friend.id}`} key={friend.id}>
                      <li>
                        <img src={friend.profile_picture} alt=""></img>
                        <span>{friend.first_name + ' ' + friend.last_name}</span>
                      </li>
                    </Link>)}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
  friendIds: Object.values(state.entities.friendships)
    .filter(friendship => friendship.accepted)
      .filter(friendship => friendship.requester_id === ownProps.user.id || friendship.requested_id === ownProps.user.id)
        .map(friendship => friendship.requester_id === ownProps.user.id ?
          friendship.requested_id : friendship.requester_id),
  friends: Object.values(state.entities.users)
    .filter(user => Object.values(state.entities.friendships)
      .filter(friendship => friendship.accepted)
        .filter(friendship => friendship.requester_id === ownProps.user.id || friendship.requested_id === ownProps.user.id)
          .map(friendship => friendship.requester_id === ownProps.user.id ?
            friendship.requested_id : friendship.requester_id)
              .includes(user.id))
});

const mapDispatchToProps = dispatch => ({
  fetchUser: userId => dispatch(fetchSingleUser(userId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileFriends);
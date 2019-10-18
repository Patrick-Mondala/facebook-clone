import React from 'react';
import { connect } from 'react-redux';
import { fetchFriendships, acceptFriendship, deleteFriendship } from '../../../actions/friendship_actions';
import FriendRequestItem from './friend_request_item';

const mapStateToProps = state => ({
    currentUser: state.entities.users[state.session.id],
    friendRequests: Object.values(state.entities.friendships).filter(friendship => (friendship.accepted === false && friendship.requested_id === state.session.id))
})

const mapDispatchToProps = dispatch => ({
    fetchFriendRequests: userId => dispatch(fetchFriendships(userId)),
    acceptFriendship: friendshipId => dispatch(acceptFriendship(friendshipId)),
    declineFriendship: friendshipId => dispatch(deleteFriendship(friendshipId))
})

class NavFriendRequests extends React.Component {
    constructor(props) {
        super(props);
        this.state = {dropDown: false};
        this.handleClick = this.handleClick.bind(this);
        this.toggleDropDown = this.toggleDropDown.bind(this);
        this.dropDownRef = React.createRef();
    }

    componentDidMount() {
        this.props.fetchFriendRequests(this.props.currentUser.id);
        document.addEventListener('mousedown', this.handleClick);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick)
    }

    handleClick(e) {
        if (!this.dropDownRef.current.contains(e.target)) {
            this.setState({ dropDown: false });
        }
    }

    toggleDropDown() {
        this.setState({ dropDown: !this.state.dropDown });
    }

    render() {
        return (
            <li ref={this.dropDownRef} className="profile-nav-friend-requests-container">
                <div className="profile-nav-friend-requests-icon-container">
                    <i 
                        onClick={this.toggleDropDown}
                        className={`fas fa-user-friends profile-nav-friend-requests-icon${this.state.dropDown ? " profile-nav-friend-requests-icon-active" : ""}`}>
                    </i>
                </div>
                <div className={`profile-nav-friend-requests-list-container${this.state.dropDown ? "" : " hidden"}`}>
                    <div className="profile-nav-friend-requests-list-header">
                        <span>Friend Requests</span>
                    </div>
                    {this.props.friendRequests.length > 0 ? 
                        <ul className="profile-nav-friend-requests-list">
                                {this.props.friendRequests.map(friendRequest => 
                                    <FriendRequestItem 
                                        key={`friend-request-${friendRequest.id}`} 
                                        friendRequest={friendRequest}
                                        acceptFriendship={() => this.props.acceptFriendship(friendRequest.id)}
                                        declineFriendship={() => this.props.declineFriendship(friendRequest.id)}
                                    />)}
                        </ul> : 
                        <p className="profile-nav-friend-requests-list-empty">
                            You have no friend requests at this time :(
                        </p>
                    }
                </div>
            </li>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavFriendRequests)
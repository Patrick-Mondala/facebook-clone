import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchFriendships, createFriendship, acceptFriendship, deleteFriendship} from '../../../actions/friendship_actions';

class FriendButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {buttonAction: this.evaluateButtonAction()}
        this.currentFriendship = this.currentFriendship.bind(this);
        this.buttonAction = this.buttonAction.bind(this);
    }

    componentDidMount() {
        if (this.props.user.id) this.props.fetchFriendships(this.props.user.id);
    }

    componentDidUpdate(prevProps) {
        if (this.props.friendships && Object.keys(prevProps.friendships).sort().join(",") != Object.keys(this.props.friendships).sort().join(",")) {
            this.props.fetchFriendships(this.props.user.id);
        }
    }

    evaluateButtonAction() {
        let buttonAction;
        if (this.currentFriendship()) {
            if (this.currentFriendship().accepted) {
                buttonAction = "Remove Friend";
            } else {
                if (this.currentFriendship().requested_id === this.props.currentUser.id) {
                    buttonAction = "Accept Friend Request";
                } else {
                    buttonAction = "Cancel Friend Request";
                }
            }
        } else {
            buttonAction = "Add Friend"
        }
        return buttonAction;
    }

    currentFriendship() {
        return Object.values(this.props.friendships)
        .filter(friendship => 
            ((friendship.requester_id === this.props.user.id && friendship.requested_id === this.props.currentUser.id) || 
            (friendship.requested_id === this.props.user.id && friendship.requester_id === this.props.currentUser.id))
        )[0];
    }

    buttonAction() {
        switch (this.state.buttonAction) {
            case "Add Friend":
                return () => {
                    this.setState({buttonAction: "Cancel Friend Request"}, () => this.props.createFriendship(this.props.user.id, this.props.currentUser.id))
                }
            case "Remove Friend":
                return () => {
                    this.setState({buttonAction: "Add Friend"}, () => this.props.declineFriendship(this.currentFriendship().id));
                }
            case "Accept Friend Request":
                return () => {
                    this.setState({buttonAction: "Remove Friend"}, () => this.props.acceptFriendship(this.currentFriendship().id));
                }
            case "Cancel Friend Request":
                return () => {
                    this.setState({buttonAction: "Add Friend"}, () => this.props.declineFriendship(this.currentFriendship().id));
                }
            default:
                break;
        }
    }

    render() { 
        return (
            <div className="profile-page-friend-button-container">
                <button
                    onClick={this.buttonAction()}
                    className="profile-page-friend-button"
                >{this.state.buttonAction}
                </button>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    friendships: state.entities.friendships
})

const mapDispatchToProps = dispatch => ({
    fetchFriendships: userId => dispatch(fetchFriendships(userId)),
    createFriendship: (requested_id, requester_id) => dispatch(createFriendship(requested_id, requester_id)),
    acceptFriendship: friendshipId => dispatch(acceptFriendship(friendshipId)),
    declineFriendship: friendshipId => dispatch(deleteFriendship(friendshipId))
})

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(FriendButton));
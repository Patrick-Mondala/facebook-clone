import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchFriendships, createFriendship, acceptFriendship, deleteFriendship} from '../../../actions/friendship_actions';

class FriendButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonAction: "default",
            currentFriendship: Object.values(this.props.entities.friendships)
                .filter(friendship =>
                    ((friendship.requester_id === this.props.user.id && friendship.requested_id === this.props.currentUser.id) ||
                        (friendship.requested_id === this.props.user.id && friendship.requester_id === this.props.currentUser.id))
                )[0]
        }
        this.currentFriendship = this.currentFriendship.bind(this);
        this.buttonAction = this.buttonAction.bind(this);
        this.evaluateButtonAction = this.evaluateButtonAction.bind(this);
    }

    componentDidMount() {
        this.setState({buttonAction: this.evaluateButtonAction()});
    }

    componentDidUpdate(prevProps) {
        if ((prevProps.user.id !== this.props.user.id) || ((prevProps.entities.friendships && this.props.entities.friendships) && 
        !_.isEqual(prevProps.entities.friendships, this.props.entities.friendships))) {
            this.props.fetchFriendships(this.props.user.id)
                .always(() => this.currentFriendship());
        }
    }

    evaluateButtonAction() {
        let buttonAction;
        if (this.state.currentFriendship) {
            if (this.state.currentFriendship.accepted) {
                buttonAction = "Remove Friend";
            } else {
                if (this.state.currentFriendship.requested_id === this.props.currentUser.id) {
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
        this.setState({currentFriendship: Object.values(this.props.entities.friendships)
        .filter(friendship => 
            ((friendship.requester_id === this.props.user.id && friendship.requested_id === this.props.currentUser.id) || 
            (friendship.requested_id === this.props.user.id && friendship.requester_id === this.props.currentUser.id))
        )[0]
        }, () => this.setState({
            buttonAction: this.evaluateButtonAction()
        }))
    }

    buttonAction() {
        switch (this.state.buttonAction) {
            case "Add Friend":
                return () => {
                    this.props.createFriendship(this.props.user.id, this.props.currentUser.id);
                }
            case "Remove Friend":
                return () => {
                    this.props.declineFriendship(this.state.currentFriendship.id);
                }
            case "Accept Friend Request":
                return () => {
                    this.props.acceptFriendship(this.state.currentFriendship.id);
                }
            case "Cancel Friend Request":
                return () => {
                    this.props.declineFriendship(this.state.currentFriendship.id);
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

const mapStateToProps = (state, ownProps) => ({
    currentUser: state.entities.users[state.session.id],
    user: state.entities.users[ownProps.match.params.userId] || {},
    entities: state.entities
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
import React from 'react';
import ProfilePostForm from './profile_post_form';
import ProfilePostIndex from './profile_post_index';

export default class ProfileTimeline extends React.Component {
    constructor(props) {
        super(props);
        this.isFriends = this.isFriends.bind(this);
    }

    isFriends() {
        let friendshipRelation;
        if (this.props.friendships) {
            friendshipRelation = Object.values(this.props.friendships).filter(friendship =>
                ((friendship.requester_id === this.props.user.id && friendship.requested_id === this.props.currentUser.id) ||
                    (friendship.requested_id === this.props.user.id && friendship.requester_id === this.props.currentUser.id))
            )[0];
        }

        return (friendshipRelation && friendshipRelation.accepted)
    }

    render() {
        return (
            <div className={`profile-timeline${this.isFriends() || this.props.user.id === this.props.currentUser.id ? "" : " hidden"}`}>
                <ProfilePostForm user={this.props.user} currentUser={this.props.currentUser} />
                <ProfilePostIndex user={this.props.user} currentUser={this.props.currentUser} />
            </div>
        )
    }
}
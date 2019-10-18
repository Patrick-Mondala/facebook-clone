import React from 'react';
import ProfilePostForm from './profile_post_form';
import ProfilePostIndex from './profile_post_index';

export default class ProfileTimeline extends React.Component {
    render() {
        return (
            <div className="profile-timeline">
                <ProfilePostForm user={this.props.user} currentUser={this.props.currentUser} />
                <ProfilePostIndex user={this.props.user} currentUser={this.props.currentUser} />
            </div>
        )
    }
}
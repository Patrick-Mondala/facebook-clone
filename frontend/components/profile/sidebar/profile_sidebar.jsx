import React from 'react';
import ProfileIntro from './intro/profile_intro';
import ProfilePhotos from './photos/profile_photos';
import ProfileFriends from './friends/profile_friends';

export default class ProfileSidebar extends React.Component {
    render() {
        return (
            <div className="profile-sidebar">
                <ProfileIntro user={this.props.user} currentUser={this.props.currentUser}/>
                <ProfilePhotos user={this.props.user} currentUser={this.props.currentUser} />
                <ProfileFriends user={this.props.user} currentUser={this.props.currentUser} />
            </div>
        )
    }
}
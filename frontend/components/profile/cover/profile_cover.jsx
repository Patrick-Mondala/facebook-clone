import React from 'react';
import CoverPicture from './cover_picture/cover_picture';
import ProfilePicture from './profile_picture/profile_picture';
import ProfileNav from './profile_nav/profile_nav';

export default class ProfileCover extends React.Component {
    render() {
        return (
            <div className="profile-cover">
                <CoverPicture user={this.props.user} currentUser={this.props.currentUser} />
                <ProfilePicture user={this.props.user} currentUser={this.props.currentUser} />
                <div className="profile-cover-profile-name-container">
                    <span className="profile-cover-profile-name">{this.props.user.first_name} {this.props.user.last_name}</span>
                </div>
                <ProfileNav />
            </div>
        )
    }
}
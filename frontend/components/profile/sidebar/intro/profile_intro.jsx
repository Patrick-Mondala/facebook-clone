import React from 'react';
import ProfileBio from './profile_bio';
import ProfileDetails from './profile_details';

export default class ProfileIntro extends React.Component {
    render() {
        let user = this.props.user;
        if (user.id === this.props.currentUser.id || user.bio || user.location || user.current_city || user.hometown || user.workplace || user.education) {
            return (
            <div className="profile-intro">
                <div className="profile-intro-header"><span className="profile-intro-icon-container"><i className="fas fa-globe-americas profile-intro-icon"></i></span>Intro</div>
                <ProfileBio user={this.props.user} currentUser={this.props.currentUser} />
                <ProfileDetails user={this.props.user} currentUser={this.props.currentUser} />
            </div>
            )
        } else {
            return (
                <div className="hidden">
                    no intro
                </div>
            )
        }
    }
}
import React from 'react';
import ProfileBio from './profile_bio';

export default class ProfileIntro extends React.Component {
    render() {
        return (
        <div className="profile-intro">
            <div className="profile-intro-header"><span className="profile-intro-icon-container"><i className="fas fa-globe-americas profile-intro-icon"></i></span>Intro</div>
            <ProfileBio user={this.props.user} currentUser={this.props.currentUser} />
        </div>
        )
    }
}
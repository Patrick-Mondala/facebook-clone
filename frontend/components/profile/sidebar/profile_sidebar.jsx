import React from 'react';
import ProfileIntro from './intro/profile_intro';

export default class ProfileSidebar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="profile-sidebar">
                <ProfileIntro user={this.props.user} currentUser={this.props.currentUser}/>
            </div>
        )
    }
}
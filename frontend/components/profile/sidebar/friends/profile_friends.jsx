import React from 'react';

export default class ProfileFriends extends React.Component {
    render() {
        return (
            <div className="profile-sidebar-profile-friends-container">
                <p className="profile-sidebar-profile-friends-header">
                    <span className="profile-sidebar-profile-friends-icon-container"><i className="fas fa-user-friends profile-sidebar-profile-friends-icon"></i></span>Friends
                </p>
            </div>
        )
    }
}
import React from 'react';

export default class ProfilePhotos extends React.Component {
    render() {
        return (
            <div className="profile-sidebar-profile-photos-container">
                <p className="profile-sidebar-profile-photos-header">
                    <span className="profile-sidebar-profile-photos-icon-container"><i className="fas fa-image profile-sidebar-profile-photos-icon"></i></span>Photos
                </p>
            </div>
        )
    }
}
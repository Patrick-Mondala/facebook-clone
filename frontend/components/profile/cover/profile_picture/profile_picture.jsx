import React from 'react';

export default ({ user, currentUser }) => (
    <div className="profile-cover-profile-picture-container">
        <div className="profile-cover-profile-picture-cropper"><img 
            src={user.profile_picture ? user.profile_picture : "https://hoursofidleness.files.wordpress.com/2012/06/gray-card.jpg"} 
            className="profile-cover-profile-picture" 
        />
            {user.id === currentUser.id ?
                <div className="profile-cover-profile-picture-edit-button-container">
                    <button className="profile-cover-profile-picture-edit-button"><i id="profile-cover-profile-picture-edit-camera-icon" className="fas fa-camera"></i>Update</button>
                </div> : null}
        </div>
    </div>
)
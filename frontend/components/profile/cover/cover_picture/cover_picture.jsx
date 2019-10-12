import React from 'react';

export default ({ user, currentUser }) => (
    <div className="profile-cover-picture-container">
        {user.cover_picture ?
            (<img 
                src={user.cover_picture}
                className="profile-cover-picture"
            />) : null}
        {user.id === currentUser.id ?
        <div className="profile-cover-picture-edit-button-container"> 
            <button>{user.cover_picture ? "Edit Cover Photo" : "Add Cover Photo"}</button>
        </div> : null}
    </div>
)
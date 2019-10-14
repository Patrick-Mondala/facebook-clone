import React from 'react';
import { connect } from 'react-redux';
import { openModal } from '../../../../actions/modal_actions';

const ProfilePicture = ({ user, currentUser, openModal }) => (
    <div className="profile-cover-profile-picture-container">
        <div className="profile-cover-profile-picture-cropper"><img 
            src={user.profile_picture ? user.profile_picture : "https://hoursofidleness.files.wordpress.com/2012/06/gray-card.jpg"} 
            className="profile-cover-profile-picture" 
        />
            {user.id === currentUser.id ?
                <div className="profile-cover-profile-picture-edit-button-container">
                    <button onClick={openModal} className="profile-cover-profile-picture-edit-button"><i id="profile-cover-profile-picture-edit-camera-icon" className="fas fa-camera"></i>Update</button>
                </div> : null}
        </div>
    </div>
)

const mapDispatchToProps = dispatch => ({
    openModal: () => dispatch(openModal('addProfilePicture'))
})

export default connect(null, mapDispatchToProps)(ProfilePicture);
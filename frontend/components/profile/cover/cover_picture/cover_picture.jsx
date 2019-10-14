import React from 'react';
import { connect } from 'react-redux';
import { openModal } from '../../../../actions/modal_actions';

const ProfileCoverPicture = ({ user, currentUser, openModal }) => (
    <div className="profile-cover-picture-container">
        {user.cover_picture ?
            (<img 
                src={user.cover_picture}
                className="profile-cover-picture"
            />) : null}
        {user.id === currentUser.id ?
        <div className="profile-cover-picture-edit-button-container"> 
                <button 
                    onClick={openModal}
                    className="profile-cover-picture-edit-button"
                >
                    <i id="profile-cover-profile-picture-edit-camera-icon" className="fas fa-camera"></i>
                    {user.cover_picture ? "Edit Cover Photo" : "Add Cover Photo"}
                </button>
        </div> : null}
    </div>
)

const mapDispatchToProps = dispatch => ({
    openModal: () => dispatch(openModal('addCoverPicture'))
});

export default connect(
    null,
    mapDispatchToProps
)(ProfileCoverPicture);
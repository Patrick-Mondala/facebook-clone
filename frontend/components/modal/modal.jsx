import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import ProfilePictureForm from '../profile/cover/profile_picture/profile_picture_form';
import ProfileCoverPictureForm from '../profile/cover/cover_picture/cover_picture_form';
import ProfileSidebarDetailsForm from '../profile/sidebar/intro/profile_details_form';

function Modal({ modal, closeModal, user, currentUser }) {
    if (!modal) {
        return null;
    }
    let component;
    switch (modal) {
        case 'editProfilePicture':
            component = <ProfilePictureForm user={user} currentUser={currentUser} />;
            break;
        case 'editCoverPicture':
            component = <ProfileCoverPictureForm user={user} currentUser={currentUser} />
            break;
        case 'editProfileSidebarDetails':
            component = <ProfileSidebarDetailsForm user={user} currentUser={currentUser} />
            break;
        default:
            return null;
    }
    return (
        <div className="modal-background" onClick={closeModal}>
            <div className="modal-child" onClick={e => e.stopPropagation()}>
                {component}
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        modal: state.ui.modal
    };
};

const mapDispatchToProps = dispatch => {
    return {
        closeModal: () => dispatch(closeModal())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);

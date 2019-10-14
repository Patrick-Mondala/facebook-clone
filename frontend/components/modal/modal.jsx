import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import ProfilePictureForm from '../profile/cover/profile_picture/profile_picture_form';
import ProfileCoverPictureForm from '../profile/cover/cover_picture/cover_picture_form';

function Modal({ modal, closeModal, user, currentUser }) {
    if (!modal) {
        return null;
    }
    let component;
    switch (modal) {
        case 'addProfilePicture':
            component = <ProfilePictureForm user={user} currentUser={currentUser} />;
            break;
        case 'addCoverPicture':
            component = <ProfileCoverPictureForm user={user} currentUser={currentUser} />
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

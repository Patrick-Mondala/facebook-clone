import React from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../../../../actions/user_actions';
import { closeModal } from '../../../../actions/modal_actions';

class ProfilePictureForm extends React.Component {
    render() {
        return (
            <div className="profile-cover-profile-picture-form-container">
                <span className="profile-cover-profile-picture-form-header">
                    Update Profile Picture
                    <button 
                        className="exit-modal-button exit-profile-picture-form-button" 
                        onClick={this.props.closeModal}>X
                    </button>
                </span>
                <input type="file" id="profile-picture-form-input" className="inputfile"/>
                <label 
                    className="profile-picture-form-input-label" 
                    onClick={(e) => $("#profile-picture-form-input").trigger('click')}>
                    <span className="profile-picture-form-input-label-icon">+</span>Upload Photo
                </label>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    formType: 'addProfilePicture'
});

const mapDispatchToProps = dispatch => ({
    updateUser: (userId, user) => dispatch(updateUser(userId, user)),
    closeModal: () => dispatch(closeModal())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfilePictureForm);
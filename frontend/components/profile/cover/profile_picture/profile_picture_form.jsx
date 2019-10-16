import React from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../../../../actions/user_actions';
import { closeModal } from '../../../../actions/modal_actions';

class ProfilePictureForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profile_picture: null,
            profilePictureUrl: null
        }
        this.handleFile = this.handleFile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleFile(e) {
        let file = e.currentTarget.files[0];
        let fileReader = new FileReader();

        fileReader.onloadend = () => {
            if (file.size < 2500000) {
                this.setState({
                    profile_picture: file,
                    profilePictureUrl: fileReader.result
                });
            } else {
                alert("File too large (must be less than 2.5mb)");
            }
        }        
        file ? fileReader.readAsDataURL(file) : this.setState();
    }

    handleSubmit(e) {
        e.preventDefault();
        let formData = new FormData();
        this.state.profile_picture ?
            formData.append('user[profile_picture]', this.state.profile_picture) : null;
        this.props.updateUser(this.props.user.id, formData).then(this.props.closeModal);
    }

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
                <input onChange={this.handleFile} type="file" id="profile-picture-form-input" className="inputfile" accept="image/*"/>
                {this.state.profilePictureUrl ? 
                    <div className="profile-picture-form-input-label-upload-container-preview-container">
                        <div className="profile-picture-form-input-label-upload-container-preview">
                            <img src={this.state.profilePictureUrl} />
                        </div>
                        <div className="profile-picture-form-input-label-upload-buttons-container">
                            <button 
                                onClick={this.props.closeModal} 
                                className="profile-picture-form-input-label-upload-cancel-button"
                            >Cancel
                            </button>
                            <button 
                                onClick={this.handleSubmit}
                                className="profile-picture-form-input-label-upload-save-button"
                            >Save
                            </button>
                        </div>
                    </div>
                    : <div 
                        onClick={(e) => $("#profile-picture-form-input").trigger('click')} 
                        className="profile-picture-form-input-label-upload-container-message">
                        <div className="profile-picture-form-input-label-icon">+</div>Upload Photo
                    </div>}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    formType: 'editProfilePicture'
});

const mapDispatchToProps = dispatch => ({
    updateUser: (userId, user) => dispatch(updateUser(userId, user)),
    closeModal: () => dispatch(closeModal())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfilePictureForm);
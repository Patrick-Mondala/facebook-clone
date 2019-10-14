import React from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../../../../actions/user_actions';
import { closeModal } from '../../../../actions/modal_actions';

class ProfileCoverPictureForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cover_picture: null,
            coverPictureUrl: null
        }
        this.handleFile = this.handleFile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleFile(e) {
        let file = e.currentTarget.files[0];
        let fileReader = new FileReader();

        fileReader.onloadend = () => this.setState({
            cover_picture: file,
            coverPictureUrl: fileReader.result
        })

        let fileTypes = [
            'jpg',
            'jpeg',
            'png'
        ];
        file && fileTypes.includes(file.name.split('.').pop().toLowerCase()) ?
            fileReader.readAsDataURL(file) : this.setState();
    }

    handleSubmit(e) {
        e.preventDefault();
        let formData = new FormData();
        this.state.cover_picture ?
            formData.append('user[cover_picture]', this.state.cover_picture) : null;
        this.props.updateUser(this.props.user.id, formData).then(this.props.closeModal);
    }

    render() {
        return (
            <div className="profile-cover-picture-form-container">
                <span className="profile-cover-picture-form-header">
                    Update Cover Picture
                    <button
                        className="exit-modal-button exit-profile-cover-picture-form-button"
                        onClick={this.props.closeModal}>X
                    </button>
                </span>
                <input onChange={this.handleFile} type="file" id="profile-cover-picture-form-input" className="inputfile" />
                {this.state.coverPictureUrl ?
                    <div className="profile-cover-picture-form-input-label-upload-container-preview-container">
                        <div className="profile-cover-picture-form-input-label-upload-container-preview">
                            <img src={this.state.coverPictureUrl} />
                        </div>
                        <div className="profile-cover-picture-form-input-label-upload-buttons-container">
                            <button
                                onClick={this.props.closeModal}
                                className="profile-cover-picture-form-input-label-upload-cancel-button"
                            >Cancel
                            </button>
                            <button
                                onClick={this.handleSubmit}
                                className="profile-cover-picture-form-input-label-upload-save-button"
                            >Save
                            </button>
                        </div>
                    </div>
                    : <div
                        onClick={(e) => $("#profile-cover-picture-form-input").trigger('click')}
                        className="profile-cover-picture-form-input-label-upload-container-message">
                        <div className="profile-cover-picture-form-input-label-icon">+</div>Upload Photo
                    </div>}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    formType: 'addCoverPicture'
});

const mapDispatchToProps = dispatch => ({
    updateUser: (userId, user) => dispatch(updateUser(userId, user)),
    closeModal: () => dispatch(closeModal())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileCoverPictureForm);
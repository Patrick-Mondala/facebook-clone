import React from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../../../../actions/user_actions';
import { closeModal } from '../../../../actions/modal_actions';

class ProfileSidebarDetailsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            workplace: this.props.user.workplace || '',
            education: this.props.user.education || '',
            current_city: this.props.user.current_city || '',
            hometown: this.props.user.hometown || ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(field) {
        return e => this.setState({[field]: e.target.value})
    }

    handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('user[workplace]', this.state.workplace);
        formData.append('user[education]', this.state.education);
        formData.append('user[current_city]', this.state.current_city);
        formData.append('user[hometown]', this.state.hometown);
        this.props.updateUser(this.props.user.id, formData).then(this.props.closeModal);
    }

    render() {
        return (
            <div className="profile-sidebar-details-form-container">
                <span className="profile-sidebar-details-form-header">
                    Update Profile Details
                    <button
                        className="exit-modal-button exit-profile-sidebar-details-form-button"
                        onClick={this.props.closeModal}>X
                    </button>
                </span>
                <ul className="profile-sidebar-details-form-list">
                    <li className="profile-sidebar-details-form-list-workplace">
                        <div><i className="fas fa-briefcase"></i><span>Workplace</span></div>
                        <input onChange={this.handleChange('workplace')} type="text" value={this.state.workplace} />
                    </li>
                    <li className="profile-sidebar-details-form-list-education">
                        <div><i className="fas fa-graduation-cap"></i><span>Education</span></div>
                        <input onChange={this.handleChange('education')} type="text" value={this.state.education} />
                    </li>
                    <li className="profile-sidebar-details-form-list-current_city">
                        <div><i className="fas fa-home"></i><span>Current City</span></div>
                        <input onChange={this.handleChange('current_city')} type="text" value={this.state.current_city} />
                    </li>
                    <li className="profile-sidebar-details-form-list-hometown">
                        <div><i className="fas fa-map-marker-alt"></i><span>Hometown</span></div>
                        <input onChange={this.handleChange('hometown')} type="text" value={this.state.hometown} />
                    </li>
                </ul>
                <div className="profile-sidebar-details-buttons-container">
                    <button onClick={this.props.closeModal} className="profile-sidebar-details-cancel-button">
                        Cancel
                    </button>
                    <button onClick={this.handleSubmit} className="profile-sidebar-details-save-button">
                        Save
                    </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    formType: 'editProfileSidebarDetails'
});

const mapDispatchToProps = dispatch => ({
    updateUser: (userId, user) => dispatch(updateUser(userId, user)),
    closeModal: () => dispatch(closeModal())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileSidebarDetailsForm);
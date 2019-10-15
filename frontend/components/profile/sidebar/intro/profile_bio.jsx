import React from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../../../../actions/user_actions';

class ProfileBio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {addingBio: false, bio: this.props.user.bio || ''};
        this.ownsProfile = this.ownsProfile.bind(this);
        this.hasBio = this.hasBio.bind(this);
        this.toggleAddingBio = this.toggleAddingBio.bind(this);
        this.emptyBioContent = this.emptyBioContent.bind(this);
        this.withBioContent = this.withBioContent.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    ownsProfile() {
        return this.props.user.id === this.props.currentUser.id;
    }

    hasBio() {
        return !!this.props.user.bio;
    }

    toggleAddingBio(e) {
        if (e) e.preventDefault();
        this.setState({addingBio: !this.state.addingBio});
    }

    handleChange(e) {
        this.setState({bio: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('user[bio]', this.state.bio);
        this.props.updateUser(this.props.user.id, formData).then(() => this.toggleAddingBio());
    }

    emptyBioContent() {
        return (
            <div className="profile-sidebar-profile-bio-empty-container">
                {this.ownsProfile() && !this.state.addingBio ? 
                (<div className="profile-sidebar-profile-bio-empty"><i className="far fa-comment-alt profile-sidebar-bio-empty-icon"></i>
                <span className="profile-sidebar-profile-bio-empty-sample">Add a short bio to tell people more about yourself.</span>
                <div className="profile-sidebar-profile-empty-add-bio-button-container"><button onClick={this.toggleAddingBio} className="profile-sidebar-profile-empty-add-bio-button">Add Bio</button></div>
                </div>) : this.ownsProfile() && this.state.addingBio ? (
                <div className="profile-sidebar-profile-bio-adding-bio-container">
                    <textarea onChange={this.handleChange} value={this.state.bio} className="profile-sidebar-profile-bio-adding-bio-input" cols="39" rows="4" placeholder="Describe who you are"></textarea>
                    <div className="profile-sidebar-profile-bio-adding-bio-buttons-container">
                        <div className="profile-sidebar-profile-bio-adding-bio-buttons">
                            <span className="profile-sidebar-profile-bio-adding-bio-buttons-visibility-warning-container"><i className="fas fa-globe-americas profile-sidebar-profile-bio-adding-bio-buttons-visibility-warning-icon"></i>Public</span>
                            <button onClick={this.toggleAddingBio} className="profile-sidebar-profile-bio-adding-bio-cancel-button">Cancel</button>
                            <button onClick={this.handleSubmit} className="profile-sidebar-profile-bio-adding-bio-save-button">Save</button>
                        </div>
                    </div>
                </div>) : null }
            </div>
        )
    }

    withBioContent() {
        return (
            <div className="profile-sidebar-profile-bio-container">
                { this.ownsProfile() && this.state.addingBio ? (
                <div className="profile-sidebar-profile-bio-adding-bio-container">
                    <textarea onChange={this.handleChange} value={this.state.bio} className="profile-sidebar-profile-bio-adding-bio-input" cols="39" rows="4" placeholder="Describe who you are"></textarea>
                    <div className="profile-sidebar-profile-bio-adding-bio-buttons-container">
                        <div className="profile-sidebar-profile-bio-adding-bio-buttons">
                            <span className="profile-sidebar-profile-bio-adding-bio-buttons-visibility-warning-container"><i className="fas fa-globe-americas profile-sidebar-profile-bio-adding-bio-buttons-visibility-warning-icon"></i>Public</span>
                            <button onClick={this.toggleAddingBio} className="profile-sidebar-profile-bio-adding-bio-cancel-button">Cancel</button>
                            <button onClick={this.handleSubmit} className="profile-sidebar-profile-bio-adding-bio-save-button">Save</button>
                        </div>
                    </div>
                    </div>) : (
                    <div className="profile-sidebar-profile-bio-content-container">
                        <p className="profile-sidebar-profile-bio-content">{ this.props.user.bio }</p>
                            { this.ownsProfile() ? <button className="profile-sidebar-profile-bio-content-edit-button" onClick={this.toggleAddingBio}>Edit Bio</button> : null}
                    </div>) }
            </div>
        )
    }

    render() {
        return (
            <div id={!this.hasBio() && this.props.user.id !== this.props.currentUser.id ? "hidden" : ""} className="profile-sidebar-profile-bio-container">
                {this.hasBio() ? this.withBioContent() : this.emptyBioContent() }
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    updateUser: (userId, user) => dispatch(updateUser(userId, user))
})

export default connect(
    null,
    mapDispatchToProps
)(ProfileBio);
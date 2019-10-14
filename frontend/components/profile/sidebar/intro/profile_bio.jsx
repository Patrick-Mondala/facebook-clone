import React from 'react';

export default class ProfileBio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {addingBio: false};
        this.ownsProfile = this.ownsProfile.bind(this);
        this.hasBio = this.hasBio.bind(this);
        this.toggleAddingBio = this.toggleAddingBio.bind(this);
        this.emptyBioContent = this.emptyBioContent.bind(this);
        this.withBioContent = this.withBioContent.bind(this);
    }

    ownsProfile() {
        return this.props.user.id === this.props.currentUser.id;
    }

    hasBio() {
        return !!this.props.user.bio;
    }

    toggleAddingBio(e) {
        e.preventDefault();
        this.setState({addingBio: !this.state.addingBio});
    }

    emptyBioContent() {
        return (
            <div className="profile-cover-profile-bio-empty-container">
                {this.ownsProfile() && !this.state.addingBio ? 
                (<div className="profile-cover-profile-bio-empty"><i className="far fa-comment-alt profile-cover-bio-empty-icon"></i>
                <span className="profile-cover-profile-bio-empty-sample">Add a short bio to tell people more about yourself.</span>
                <div className="profile-cover-profile-empty-add-bio-button-container"><button onClick={this.toggleAddingBio} className="profile-cover-profile-empty-add-bio-button">Add Bio</button></div>
                </div>) : this.ownsProfile() ? (
                <div className="profile-cover-profile-bio-adding-bio-container">
                    <textarea className="profile-cover-profile-bio-adding-bio-input" cols="39" rows="4" placeholder="Describe who you are"></textarea>
                    <div className="profile-cover-profile-bio-adding-bio-buttons-container">
                        <div className="profile-cover-profile-bio-adding-bio-buttons">
                            <span className="profile-cover-profile-bio-adding-bio-buttons-visibility-warning-container"><i class="fas fa-globe-americas profile-cover-profile-bio-adding-bio-buttons-visibility-warning-icon"></i>Public</span>
                            <button onClick={this.toggleAddingBio} className="profile-cover-profile-bio-adding-bio-cancel-button">Cancel</button>
                            <button className="profile-cover-profile-bio-adding-bio-save-button">Save</button>
                        </div>
                    </div>
                </div>) : null }
            </div>
        )
    }

    withBioContent() {
        return (
            <div className="profile-cover-profile-bio">
                This is a sample bio! {this.props.user.bio}
            </div>
        )
    }

    render() {
        return (
            <div className="profile-cover-profile-bio-container">
                {this.hasBio() ? this.withBioContent() : this.emptyBioContent() }
            </div>
        )
    }
}
import React from 'react';
import { connect } from 'react-redux';
import { openModal } from '../../../../actions/modal_actions';

class ProfilePicture extends React.Component {
    constructor(props) {
        super(props);
        this.state = {hover: false}
        this.enableHover = this.enableHover.bind(this);
        this.disableHover = this.disableHover.bind(this);
    }

    enableHover() {
        this.setState({hover: true})
    }

    disableHover() {
        this.setState({hover: false})
    }

    render() { 
        return (
            <div 
                onMouseOver={this.enableHover}
                onMouseLeave={this.disableHover}
                className="profile-cover-profile-picture-container"
            >
                <div className="profile-cover-profile-picture-cropper">
                    <img
                        src={this.props.user.profile_picture ? this.props.user.profile_picture : "https://hoursofidleness.files.wordpress.com/2012/06/gray-card.jpg"} 
                        className="profile-cover-profile-picture" 
                    />
                    {this.props.user.id === this.props.currentUser.id && this.state.hover ?
                        <div className="profile-cover-profile-picture-edit-button-container">
                            <button onClick={this.props.openModal} className="profile-cover-profile-picture-edit-button"><i id="profile-cover-profile-picture-edit-camera-icon" className="fas fa-camera"></i>Update</button>
                        </div> : null}
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    openModal: () => dispatch(openModal('editProfilePicture'))
})

export default connect(
    null, 
    mapDispatchToProps
)(ProfilePicture);
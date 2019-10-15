import React from 'react';
import { connect } from 'react-redux';
import { openModal } from '../../../../actions/modal_actions';

class ProfileCoverPicture extends React.Component {    
    constructor(props) {
        super(props);
        this.state = { hover: false }
        this.enableHover = this.enableHover.bind(this);
        this.disableHover = this.disableHover.bind(this);
    }
    
    enableHover() {
        this.setState({ hover: true })
    }

    disableHover() {
        this.setState({ hover: false })
    }
    
    render() {
        return (
            <div
                onMouseOver={this.enableHover}
                onMouseLeave={this.disableHover}
                className="profile-cover-picture-container"
            >
                {this.props.user.id === this.props.currentUser.id ?
                    (<div className="profile-cover-picture-edit-button-container">
                        {this.state.hover || !this.props.user.cover_picture ? (<button
                            onClick={this.props.openModal}
                            className="profile-cover-picture-edit-button"
                        >
                            <i id="profile-cover-profile-picture-edit-camera-icon" className="fas fa-camera"></i>
                            {this.props.user.cover_picture ? "Edit Cover Photo" : "Add Cover Photo"}
                        </button>) :
                    (<i id="profile-cover-profile-picture-edit-camera-icon-non-hover" className="fas fa-camera"></i>)}
                    </div>) : null}
                {this.props.user.cover_picture ?
                    (<img 
                        src={this.props.user.cover_picture}
                        className="profile-cover-picture"
                    />) : null}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    openModal: () => dispatch(openModal('editCoverPicture'))
});

export default connect(
    null,
    mapDispatchToProps
)(ProfileCoverPicture);
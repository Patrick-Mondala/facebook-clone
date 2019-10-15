import React from 'react';
import { connect } from 'react-redux';
import { openModal } from '../../../../actions/modal_actions';

class ProfileSidebarDetails extends React.Component {
    render() {
        let user = this.props.user;
        return (
            <div className="profile-sidebar-intro-details-container">
                <ul className={(user.location || user.current_city || user.hometown || user.workplace || user.education) ? "profile-sidebar-intro-details-list" : "hidden"}>
                    {user.workplace ? <li className="profile-sidebar-details-workplace-container"><i className="fas fa-briefcase"></i> Works at {user.workplace}</li> : null}
                    {user.education ? <li><i className="fas fa-graduation-cap"></i> Went to {user.education}</li> : null}
                    {user.current_city ? <li className="profile-sidebar-details-current_city-container"><i className="fas fa-home"></i> Currently in {user.current_city}</li> : null}
                    {user.hometown ? <li><i className="fas fa-map-marker-alt"></i> From {user.hometown}</li> : null}
                </ul>
                {user.id === this.props.currentUser.id ? 
                <button onClick={this.props.openModal} className="profile-sidebar-intro-details-edit-button">
                    {(user.location || user.current_city || user.hometown || user.workplace || user.education) ?
                        'Edit Details' : 'Add Details' }
                </button>
                    : null}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    openModal: () => dispatch(openModal('editProfileSidebarDetails'))
});

export default connect(
    null,
    mapDispatchToProps
)(ProfileSidebarDetails);
import React from 'react';
import { connect } from 'react-redux';

class ProfilePhotos extends React.Component {
    render() {
        return (
            <div className="profile-sidebar-profile-photos-container">
                <p className="profile-sidebar-profile-photos-header">
                    <span className="profile-sidebar-profile-photos-icon-container"><i className="fas fa-image profile-sidebar-profile-photos-icon"></i></span>Photos
                </p>
                <ul className="profile-sidebar-profile-photos">
                    {this.props.photos.map(photo => (
                      <li key={photo}>
                        <div className="photo-container">
                          <img src={photo} alt=""/>
                        </div>
                      </li>
                    ))}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
  photos: Object.values(state.entities.posts)
    .filter(post => post.author_id === ownProps.user.id && post.photo)
      .map(post => post.photo)
        .slice(0,9)
});

export default connect(
  mapStateToProps,
  null
)(ProfilePhotos);
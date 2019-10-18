import React from 'react';
import { withRouter } from 'react-router-dom';

class ProfileCommentItem extends React.Component {
    render() {
        return (
            <li className="profile-index-comment-list-item">
                <div className="profile-comment-form-profile-picture-container">
                    <img 
                        className="profile-comment-author-profile-picture"
                        onClick={() => this.props.history.push(`/users/${this.props.comment.author_id}`)}
                        src={this.props.comment.author_profile_picture}/>
                </div>
                <div>
                    <p className="profile-comment-content-container">
                        <span 
                            className="profile-comment-author-name"
                            onClick={() => this.props.history.push(`/users/${this.props.comment.author_id}`)}
                        >{this.props.comment.author_name}
                        </span>
                        {this.props.comment.body}
                    </p>
                </div>
            </li>
        )
    }
}

export default withRouter(ProfileCommentItem);
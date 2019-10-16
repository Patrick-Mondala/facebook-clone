import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleUser } from '../../../actions/user_actions';
import { Link, withRouter } from 'react-router-dom';

//eventually map fetchPostComments to props
class ProfilePostIndexItem extends React.Component {
    componentDidMount() {
        if (this.props.author && this.props.author.id !== this.props.post.author_id) {
            this.props.fetchUser(this.props.post.author_id);
        }
    }

    render() {
        return (
            <li className="profile-timeline-post-index-item">
                <div className="post-index-item-header">
                    <div className="profile-post-form-input-profile-picture-container">
                        <img 
                            onClick={() => this.props.history.push(`/users/${this.props.author.id}`)}
                            src={
                            this.props.author.profile_picture || 
                            "https://hoursofidleness.files.wordpress.com/2012/06/gray-card.jpg"}
                            className="profile-post-form-input-profile-picture post-index-item-profile-picture"
                        />
                    </div>
                    <div className="profile-post-index-authored-details-container">
                        <div className="profile-post-index-author-item-author-name-container">
                            <button 
                                onClick={() => this.props.history.push(`/users/${this.props.author.id}`)}
                                className="profile-post-index-item-author-name"
                            >{this.props.author.first_name} {this.props.author.last_name}
                            </button>
                        </div>
                        <p className="profile-post-index-item-time-created">{this.props.post.createdAt.date} at {this.props.post.createdAt.time}</p>
                    </div>
                </div>
                <div className={`profile-post-index-item-body-container profile-post-index-item-body-size-${this.props.post.body.length > 75 ? "14" : "24"}`}>
                    {this.props.post.body}
                    <div className="hidden">
                        placeholder for comments.length Comments
                    </div>
                </div>
                <div className="hidden">
                    placeholder for Like Comment Share
                </div>
                <div className="hidden">
                    placeholder for CommentForm and CommentIndex
                </div>
            </li>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    author: state.entities.users[ownProps.author_id] || {}
})

const mapDispatchToProps = dispatch => ({
    fetchUser: userId => dispatch(fetchSingleUser(userId))
})

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfilePostIndexItem));
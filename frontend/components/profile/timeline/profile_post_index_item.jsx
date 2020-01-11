import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleUser } from '../../../actions/user_actions';
import { Link, withRouter } from 'react-router-dom';
import { fetchPost } from '../../../actions/post_actions';
import { fetchComments } from '../../../actions/comment_actions';
import { createLike, deleteLike } from "../../../actions/like_actions";
import PostComments from './comments/post_comments';
import PostCommentForm from './comments/post_comment_form';

//eventually map fetchPostComments to props
class ProfilePostIndexItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {post: this.props.post}
    }

    componentDidMount() {
        if (this.props.author && this.props.author.id !== this.props.post.author_id) {
            this.props.fetchUser(this.props.post.author_id);
        }
        this.props.fetchComments(this.props.post.id)
    }

    componentDidUpdate(prevProps) {
        if (this.state.post && !_.isEqual(prevProps.post, this.props.post)) {
            this.props.fetchPost(this.state.postId);
        }
        if (this.state.comments && !_.isEqual(prevProps.comments, this.props.comments)) {
            this.props.fetchComments(this.props.post.id);
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
                            <div className="profile-post-index-name-containers">
                              <button 
                                onClick={() => this.props.history.push(`/users/${this.props.author_id}`)}
                                className="profile-post-index-item-author-name"
                            >{this.props.author.first_name} {this.props.author.last_name}
                            </button>
                            {this.props.author_id !== this.props.timeline_owner_id ?
                            <button
                                onClick={() => this.props.history.push(`/users/${this.props.timeline_owner_id}`)}
                                className="profile-post-index-item-timeline-owner-name-button"
                                    ><p className="profile-post-index-item-right-arrow">></p><p className="profile-post-index-item-timeline-owner-name">{this.props.timeline_owner.first_name} {this.props.timeline_owner.last_name}</p>
                            </button> : null }  
                            </div>
                        </div>
                        <p className="profile-post-index-item-time-created">{this.props.post.createdAt.date} at {this.props.post.createdAt.time}</p>
                    </div>
                </div>
                <div className={`profile-post-index-item-body-container profile-post-index-item-body-size-${this.props.post.body.length > 75 ? "14" : "24"}`}>
                    {this.props.post.body}
                    {this.props.post.photo ? 
                      <div className="profile-post-index-item-photo-container">
                        <img src={this.props.post.photo}></img>
                      </div>
                    : null}
                    <div className="profile-post-index-item-count-container">
                    {this.props.likes.length > 0 ?
                      <div className="profile-post-index-item-like-count">
                    <span><span className="like-thumb"><i className="fas fa-thumbs-up"></i></span>{this.props.likes.length}</span>
                      </div> : null}
                    {this.props.comments.length > 0 ?
                      <div className="profile-post-index-item-comment-count">
                          <span>{this.props.comments.length} Comments</span>
                      </div> : null}
                    </div>
                </div>
                <div className="profile-post-index-option-bar">
                    {this.props.likes.filter(like => like.user_id === this.props.currentUser.id).length > 0 ?
                    <button 
                      className="liked"
                      onClick={() => this.props.deleteLike(this.props.likes.filter(like => like.user_id === this.props.currentUser.id)[0].id)}
                    ><i className="fas fa-thumbs-up"></i>Like</button> 
                : <button onClick={() => this.props.createLike({ user_id: this.props.currentUser.id, likeable_id: this.props.post.id, likeable_type: "Post" })}><i className="far fa-thumbs-up"></i>Like</button>}
                    <button onClick={() => document.getElementById(`post-comment-form-for-${this.props.post.id}`).focus()}><i className="far fa-comment-alt"></i>Comment</button>
                </div>
                <div className="profile-post-index-comment-section">
                    <PostComments comments={this.props.comments} postId={this.props.post.id} />
                    <PostCommentForm postId={this.props.post.id} />
                </div>
            </li>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    currentUser: state.entities.users[state.session.id] || {},
    post: state.entities.posts[ownProps.post.id] || {},
    author: state.entities.users[ownProps.author_id] || {},
    timeline_owner: state.entities.users[ownProps.timeline_owner_id] || {},
    comments: Object.values(state.entities.comments).filter(comment => comment.post_id === ownProps.post.id) || {},
    likes: Object.values(state.entities.likes).filter(like => like.likeable_id === ownProps.post.id) || {}
});

const mapDispatchToProps = dispatch => ({
    fetchPost: postId => dispatch(fetchPost(postId)),
    fetchUser: userId => dispatch(fetchSingleUser(userId)),
    fetchComments: postId => dispatch(fetchComments(postId)),
    createLike: like => dispatch(createLike(like)),
    deleteLike: likeId => dispatch(deleteLike(likeId))
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfilePostIndexItem));
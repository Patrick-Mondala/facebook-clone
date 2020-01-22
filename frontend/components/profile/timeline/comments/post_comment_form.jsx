import React from 'react';
import { connect } from 'react-redux';
import { createComment } from '../../../../actions/comment_actions';

class PostCommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            body: '',
            post_id: this.props.postId,
            author_id: this.props.currentUser.id
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({body: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('comment[body]', this.state.body);
        formData.append('comment[author_id]', this.state.author_id);
        formData.append('comment[post_id]', this.state.post_id);
        this.props.createComment(this.props.postId, formData);
        this.setState({ body: "" });
    }

    render() {
        return (
            <div className="post-comment-form-container">
                <div className="profile-comment-form-profile-picture-container">
              <img src={this.props.currentUser.profile_picture || "https://www.sackettwaconia.com/wp-content/uploads/default-profile.png"} />
                </div>
                <form onSubmit={this.handleSubmit}>
                    <textarea 
                        id={`post-comment-form-for-${this.state.post_id}`}
                        className="post-comment-form-input"
                        onChange={this.handleChange}
                        onKeyDown={e => {
                                if (e.which == 13 && !e.shiftKey) {
                                    this.handleSubmit(e);
                                    return false;
                                }
                            }
                        }
                                    type="text"
                        value={this.state.body}
                        placeholder="Write a comment..."
                    ></textarea>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    currentUser: state.entities.users[state.session.id] || {}
})

const mapDispatchToProps = dispatch => ({
    createComment: (postId, comment) => dispatch(createComment(postId, comment))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostCommentForm);
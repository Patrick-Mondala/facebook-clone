import React from 'react';
import PostCommentItem from './post_comment_item';

export default class PostComments extends React.Component {
    render() {
        return (
            <ul className="post-index-item-comment-list">
                {this.props.comments.map(comment => <PostCommentItem key={`post-${this.props.postId}-comment-${comment.id}`} comment={comment} />)}
            </ul>
        )
    }
} 
import * as ApiUtil from '../util/api_util';

export const RECEIVE_SINGLE_COMMENT = 'RECEIVE_SINGLE_COMMENT';
export const RECEIVE_POST_COMMENTS = 'RECEIVE_POST_COMMENTS';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';

export const receiveSingleComment = comment => ({
    type: RECEIVE_SINGLE_COMMENT,
    comment
})

export const createComment = (postId, formData) => dispatch => {
    return ApiUtil.createComment(postId, formData).then(comment => dispatch(receiveSingleComment(comment)));
}

export const receivePostComments = comments => ({
    type: RECEIVE_POST_COMMENTS,
    comments
})

export const fetchComments = postId => dispatch => {
    return ApiUtil.fetchComments(postId).then(comments => dispatch(receivePostComments(comments)));
}

export const removeComment = commentId => ({
    type: REMOVE_COMMENT,
    commentId
})

export const deleteComment = commentId => dispatch => {
    return ApiUtil.deleteComment(commentId).then(comment => dispatch(comment.id));
}
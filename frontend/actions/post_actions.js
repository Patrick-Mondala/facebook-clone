import * as APIUtil from '../util/api_util';

export const RECEIVE_SINGLE_POST = 'RECEIVE_SINGLE_POST';
export const RECEIVE_TIMELINE_POSTS = 'RECEIVE_TIMELINE_POSTS';

export const receiveTimelinePosts = posts => ({
    type: RECEIVE_TIMELINE_POSTS,
    posts
});

export const fetchTimelinePosts = userId => dispatch => {
    return APIUtil.fetchTimelinePosts(userId).then(posts => dispatch(receiveTimelinePosts(posts)))
}

export const receiveSinglePost = post => ({
    type: RECEIVE_SINGLE_POST,
    post
});

export const createPost = (userId, formData) => dispatch => {
    return APIUtil.createPost(userId, formData).then(post => dispatch(receiveSinglePost(post)))
}
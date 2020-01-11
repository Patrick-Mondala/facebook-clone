import * as APIUtil from '../util/api_util';

export const RECEIVE_SINGLE_POST = 'RECEIVE_SINGLE_POST';
export const RECEIVE_TIMELINE_POSTS = 'RECEIVE_TIMELINE_POSTS';
export const RECEIVE_NEWSFEED = 'RECEIVE_NEWSFEED';

export const receiveNewsfeed = posts => ({
  type: RECEIVE_NEWSFEED,
  posts
});

export const fetchNewsfeed = () => dispatch => (
  APIUtil.fetchNewsfeed().then(posts => dispatch(receiveNewsfeed(posts)))
);

export const receiveTimelinePosts = posts => ({
  type: RECEIVE_TIMELINE_POSTS,
  posts
});

export const fetchTimelinePosts = userId => dispatch => (
  APIUtil.fetchTimelinePosts(userId).then(posts => dispatch(receiveTimelinePosts(posts)))
);

export const receiveSinglePost = post => ({
  type: RECEIVE_SINGLE_POST,
  post
});

export const createPost = (userId, formData) => dispatch => (
  APIUtil.createPost(userId, formData).then(post => dispatch(receiveSinglePost(post)))
);

export const fetchPost = postId => dispatch => (
  APIUtil.fetchPost(postId).then(post => dispatch(receiveSinglePost(post)))
);
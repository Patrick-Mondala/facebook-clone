import * as APIUtil from '../util/api_util';

export const RECEIVE_LIKE = 'RECEIVE_LIKE'
export const REMOVE_LIKE = 'REMOVE_LIKE'

export const receiveLike = like => ({
  type: RECEIVE_LIKE,
  like
});

export const createLike = like => dispatch => (
  APIUtil.createLike(like).then(like => dispatch(receiveLike(like)))
);

export const removeLike = like => ({
  type: REMOVE_LIKE,
  like
});

export const deleteLike = likeId => dispatch => (
  APIUtil.deleteLike(likeId).then(res => dispatch(removeLike(res.like)))
);
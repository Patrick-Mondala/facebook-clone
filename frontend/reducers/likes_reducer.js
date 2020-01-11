import { RECEIVE_LIKE, REMOVE_LIKE } from '../actions/like_actions'
import { LOGOUT_CURRENT_USER } from '../actions/session_actions'
import { 
  RECEIVE_TIMELINE_POSTS, 
  RECEIVE_NEWSFEED, 
  RECEIVE_SINGLE_POST 
} from '../actions/post_actions'
import { merge } from 'lodash'

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_LIKE:
      console.log(action)
      return merge({}, state, action.like.like);
    case REMOVE_LIKE:
      let newState = Object.assign({}, state);
      delete newState[Object.values(action.like)[0].id];
      return newState;
    case RECEIVE_TIMELINE_POSTS:
      return merge({}, action.posts.likes)
    case RECEIVE_NEWSFEED:
      return merge({}, action.posts.likes)
    case RECEIVE_SINGLE_POST:
      return merge({}, state, action.post.likes)
    case LOGOUT_CURRENT_USER:
      return {};
    default:
      return state;
  }
}

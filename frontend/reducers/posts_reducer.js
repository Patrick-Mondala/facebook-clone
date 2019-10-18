import {
    RECEIVE_TIMELINE_POSTS, 
    RECEIVE_SINGLE_POST, 
    RECEIVE_NEWSFEED 
} from '../actions/post_actions';
import { LOGOUT_CURRENT_USER } from '../actions/session_actions';

//postsReducer
export default (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_TIMELINE_POSTS:
            return action.posts;
        case RECEIVE_NEWSFEED:
            return action.posts;
        case RECEIVE_SINGLE_POST:
            return Object.assign({}, state, { [action.post.id]: action.post })
        case LOGOUT_CURRENT_USER:
            return {};
        default:
            return state;
    }
}
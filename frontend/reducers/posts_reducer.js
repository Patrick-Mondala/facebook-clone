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
            let only_timeline = Object.assign({}, action.posts);
            delete only_timeline["likes"];
            return only_timeline;
        case RECEIVE_NEWSFEED:
            let only_newsfeed = Object.assign({}, action.posts);
            delete only_newsfeed["likes"];
            return only_newsfeed;
        case RECEIVE_SINGLE_POST:
            return Object.assign({}, state, { [action.post.post.id]: action.post.post })
        case LOGOUT_CURRENT_USER:
            return {};
        default:
            return state;
    }
}
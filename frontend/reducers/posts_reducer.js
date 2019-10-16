import { RECEIVE_TIMELINE_POSTS, RECEIVE_SINGLE_POST } from '../actions/post_actions';

//postsReducer
export default (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_TIMELINE_POSTS:
            return action.posts;
        case RECEIVE_SINGLE_POST:
            return Object.assign({}, state, { [action.post.id]: action.post })
        default:
            return state;
    }
}
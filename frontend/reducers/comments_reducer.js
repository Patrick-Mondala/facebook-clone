import {
    RECEIVE_SINGLE_COMMENT,
    RECEIVE_POST_COMMENTS,
    REMOVE_COMMENT
} from '../actions/comment_actions';
import { merge } from 'lodash';

//commentReducer
export default (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_SINGLE_COMMENT:
            return merge({}, state, { [action.comment.id]: action.comment });
        case RECEIVE_POST_COMMENTS:
            return merge({}, state, action.comments);
        case REMOVE_COMMENT:
            let newState = Object.assign({}, state);
            delete newState[action.commentId];
            return newState;
        default:
            return state;
    }
}
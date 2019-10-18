import { 
    RECEIVE_SINGLE_FRIENDSHIP, 
    RECEIVE_USER_FRIENDSHIPS, 
    REMOVE_FRIENDSHIP 
} from '../actions/friendship_actions';
import { LOGOUT_CURRENT_USER } from '../actions/session_actions';
import { merge } from 'lodash';

//friendshipReducer
export default (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_SINGLE_FRIENDSHIP:
            return merge({}, state, {[action.friendship.id]: action.friendship});
        case RECEIVE_USER_FRIENDSHIPS:
            return merge({}, state, action.friendships);
        case REMOVE_FRIENDSHIP:
            let newState = Object.assign({}, state);
            delete newState[action.friendshipId];
            return newState;
        case LOGOUT_CURRENT_USER:
            return {};
        default:
            return state;
    }
}
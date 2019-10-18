import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_SINGLE_USER, RECEIVE_ALL_USERS } from '../actions/user_actions';
import { LOGOUT_CURRENT_USER } from '../actions/session_actions';

//usersReducer
export default (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return Object.assign({}, state, { [action.currentUser.id]: action.currentUser });
        case RECEIVE_SINGLE_USER:
            return Object.assign({}, state, { [action.user.id]: action.user });
        case RECEIVE_ALL_USERS:
            return action.users;
        case LOGOUT_CURRENT_USER:
            return {};
        default:
            return state;
    }
};
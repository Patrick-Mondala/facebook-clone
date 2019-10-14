import { combineReducers } from 'redux';
import usersReducer from './users_reducer';

//entitiesReducer
export default combineReducers({
    users: usersReducer
});
import { combineReducers } from 'redux';
import usersReducer from './users_reducer';
import postsReducer from './posts_reducer';
import friendshipsReducer from './friendships_reducer';

//entitiesReducer
export default combineReducers({
    users: usersReducer,
    posts: postsReducer,
    friendships: friendshipsReducer
});
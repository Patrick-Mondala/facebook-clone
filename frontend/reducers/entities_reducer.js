import { combineReducers } from 'redux';
import usersReducer from './users_reducer';
import postsReducer from './posts_reducer';
import friendshipsReducer from './friendships_reducer';
import commentsReducer from './comments_reducer';

//entitiesReducer
export default combineReducers({
    users: usersReducer,
    posts: postsReducer,
    friendships: friendshipsReducer,
    comments: commentsReducer
});
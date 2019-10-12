import * as ApiUtil from '../util/api_util';

export const RECEIVE_SINGLE_USER = 'RECEIVE_SINGLE_USER';
export const RECEIVE_ALL_USERS = 'RECEIVE_ALL_USERS';

export const receiveAllUsers = users => ({
    type: RECEIVE_ALL_USERS,
    users
})

export const receiveSingleUser = user => ({
    type: RECEIVE_SINGLE_USER,
    user
})

export const fetchSingleUser = userId => dispatch => {
    return ApiUtil.fetchUser(userId).then(user => dispatch(receiveSingleUser(user)));
};

export const fetchAllUsers = () => dispatch => {
    return ApiUtil.fetchAllUsers().then(users => dispatch(receiveAllUsers(users)));
};

export const updateUser = (userId, user) => dispatch => {
    return ApiUtil.updateUser(userId, user).then(user => dispatch(receiveSingleUser(user)));
};
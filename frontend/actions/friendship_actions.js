import * as ApiUtil from '../util/api_util';

export const RECEIVE_SINGLE_FRIENDSHIP = 'RECEIVE_SINGLE_FRIENDSHIP';
export const RECEIVE_USER_FRIENDSHIPS = 'RECEIVE_USER_FRIENDSHIPS';
export const REMOVE_FRIENDSHIP = 'REMOVE_FRIENDSHIP';

export const receiveSingleFriendship = friendship => ({
    type: RECEIVE_SINGLE_FRIENDSHIP,
    friendship
});

export const receiveUserFriendships = friendships => ({
    type: RECEIVE_USER_FRIENDSHIPS,
    friendships
});

export const createFriendship = (requested_id, requester_id) => dispatch => {
    return ApiUtil.createFriendship(requested_id, requester_id).then(friendship => dispatch(receiveSingleFriendship(friendship)));
}

export const acceptFriendship = friendshipId => dispatch => {
    return ApiUtil.acceptFriendship(friendshipId).then(friendship => dispatch(receiveSingleFriendship(friendship)));
}

export const fetchFriendships = userId => dispatch => {
    return ApiUtil.fetchFriendships(userId).then(friendships => dispatch(receiveUserFriendships(friendships)));
}

export const removeFriendship = friendshipId => ({
    type: REMOVE_FRIENDSHIP,
    friendshipId
})

export const deleteFriendship = friendshipId => dispatch => {
    return ApiUtil.deleteFriendship(friendshipId).then(friendship => dispatch(removeFriendship(friendship.id)));
}
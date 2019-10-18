export const fetchUser = userId => $.ajax({
    method: 'GET',
    url: `api/users/${userId}`
});

export const fetchAllUsers = () => $.ajax({
    method: 'GET',
    url: 'api/users'
})

export const updateUser = (userId, user) => $.ajax({
    method: 'PATCH',
    url: `api/users/${userId}`,
    data: user,
    contentType: false,
    processData: false
});

export const createPost = (userId, formData) => $.ajax({
    method: 'POST',
    url: `api/users/${userId}/posts`,
    data: formData,
    contentType: false,
    processData: false
});

export const fetchPost = postId => $.ajax({
    method: 'GET',
    url: `api/posts/${postId}`
})

export const fetchTimelinePosts = userId => $.ajax({
    method: 'GET',
    url: `api/users/${userId}/posts`
});

export const fetchComments = postId => $.ajax({
    method: 'GET',
    url: `api/posts/${postId}/comments`
})

export const createComment = (postId, formData) => $.ajax({
    method: 'POST',
    url: `api/posts/${postId}/comments`,
    data: formData,
    contentType: false,
    processData: false
})

export const deleteComment = commentId => $.ajax({
    method: 'DELETE',
    url: `api/comments/${commentId}`
})

export const fetchFriendships = userId => $.ajax({
    method: 'GET',
    url: `api/users/${userId}/friendships`
});

export const createFriendship = (requested_id, requester_id) => $.ajax({
    method: 'POST',
    url: `api/users/${requested_id}/friendships`,
    data: {friendship: {requester_id, requested_id, accepted: false}}
});

export const acceptFriendship = friendshipId => $.ajax({
    method: 'PATCH',
    url: `api/friendships/${friendshipId}`,
    data: {friendship: {accepted: true}}
});

//remove friend or decline friendrequest
export const deleteFriendship = friendshipId => $.ajax({
    method: 'DELETE',
    url: `api/friendships/${friendshipId}`
})
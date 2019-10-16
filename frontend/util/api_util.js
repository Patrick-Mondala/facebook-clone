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
    method: "POST",
    url: `api/users/${userId}/posts`,
    data: formData,
    contentType: false,
    processData: false
});

export const fetchTimelinePosts = userId => $.ajax({
    method: 'GET',
    url: `api/users/${userId}/posts`
});
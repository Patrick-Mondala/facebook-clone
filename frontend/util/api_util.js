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

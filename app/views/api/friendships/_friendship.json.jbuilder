json.extract! friendship, :id, :requester_id, :requested_id, :accepted
json.requester_name friendship.requester.first_name + " " + friendship.requester.last_name
json.requested_name friendship.requested.first_name + " " + friendship.requested.last_name

if friendship.requester.profile_picture.attached?
    json.requester_picture url_for(friendship.requester.profile_picture)
else
    json.requester_picture "https://www.sackettwaconia.com/wp-content/uploads/default-profile.png"
end

if friendship.requested.profile_picture.attached?
    json.requested_picture url_for(friendship.requested.profile_picture)
else
    json.requested_picture "https://www.sackettwaconia.com/wp-content/uploads/default-profile.png"
end
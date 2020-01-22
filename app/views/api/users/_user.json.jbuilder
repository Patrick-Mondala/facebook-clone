json.extract! user, :id, :first_name, :last_name, :email, :birth_date, :gender, :bio, :location, :current_city, :hometown, :workplace, :education
if user.profile_picture.attached?
    json.profile_picture url_for(user.profile_picture)
else
    json.profile_picture "https://www.sackettwaconia.com/wp-content/uploads/default-profile.png"
end
if user.cover_picture.attached?
    json.cover_picture url_for(user.cover_picture)
end
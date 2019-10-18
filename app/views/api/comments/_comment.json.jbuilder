json.extract! comment, :id, :post_id, :author_id, :body, :parent_comment_id
json.author_name comment.author.first_name + " " + comment.author.last_name
if comment.author.profile_picture.attached?
    json.author_profile_picture url_for(comment.author.profile_picture)
else        
    json.author_profile_picture "https://hoursofidleness.files.wordpress.com/2012/06/gray-card.jpg"
end
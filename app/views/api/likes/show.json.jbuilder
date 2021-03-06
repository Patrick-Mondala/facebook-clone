json.like do
  json.set! @like.id do
    json.partial! 'api/likes/like', like: @like
  end
end

json.user do 
  json.set! @like.user_id do
    json.partial! 'api/users/user', user: User.find(@like.user_id)
  end
end

if @like.likeable_type == "Post"
  json.post do 
    json.set! @like.likeable_id do
      json.partial! 'api/posts/post', post: Post.find(@like.likeable_id)
    end
  end
elsif @like.likeable_type == "Comment"
  json.comment do 
    json.set! @like.likeable_id do
      json.partial! 'api/comments/comment', comment: Comment.find(@like.likeable_id)
    end
  end
end
class Api::PostsController < ApplicationController
  def newsfeed
    friend_ids = current_user.friends.map { |friendship| 
      if friendship.requested_id == current_user.id
        friendship.requester.id
      else
        friendship.requested.id
      end
    }
    @posts = Post.where("author_id = #{current_user.id} OR timeline_owner_id = #{current_user.id} #{friend_ids.length == 1 ? "OR author_id = #{friend_ids[0]}" : (friend_ids.length > 0 ? "OR author_id IN (?)" : '')}", friend_ids).includes(:likes, :likers)
    render :index
  end

  def show
    @post = Post.find(params[:id])
  end

  def create
    @post = Post.new(post_params)

    if @post.save
      render :show
    else
      render json: @post.errors.full_messages, status: 422
    end
  end

  def index
    @posts = User.find(params[:user_id]).timeline_posts.includes(:likes, :likers)
  end

  private

  def post_params
    params.require(:post).permit(:body, :author_id, :timeline_owner_id, :photo)
  end
end
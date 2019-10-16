class Api::PostsController < ApplicationController
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
        @posts = User.find(params[:user_id]).timeline_posts
    end

    private

    def post_params
        params.require(:post).permit(:body, :author_id, :timeline_owner_id)
    end
end
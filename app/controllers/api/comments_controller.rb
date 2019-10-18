class Api::CommentsController < ApplicationController
    def index
        @comments = Comment.where('post_id = ?', params[:post_id])
    end

    def create
        @comment = Comment.new(comment_params)
        if @comment.save
            render :show
        else
            render json: @comment.errors.full_messages, status: 422
        end
    end

    def destroy
        @comment = current_user.authored_comments.find(params[:id])
        if @comment.destroy
            render :show
        else
            render json: @comment.errors.full_messages, status: 422
        end
    end


    private

    def comment_params
        params.require(:comment).permit(:body, :author_id, :post_id, :parent_comment_id)
    end
end
class Api::FriendshipsController < ApplicationController
    def show
        @friendship = Friendship.find(params[:id])
    end

    def index
        #all friendship relations of user
        @friendships = Friendship.where(["requester_id = ? OR requested_id = ?", params[:user_id], params[:user_id]])
    end

    def create
        @friendship = Friendship.new(friendship_params)
        
        if @friendship.save
            render :show
        else
            render json: @friendship.errors.full_messages, status: 422
        end
    end

    def update
        @friendship = Friendship.find(params[:id])

        if @friendship.update(friendship_params)
            render :show
        else
            render json: @friendship.errors.full_messages, status: 422
        end
    end

    def destroy
        @friendship = Friendship.find(params[:id])

        if @friendship
            @friendship.destroy
            render :show
        else
            render json: ["friendship does not exist"], status: 422
        end
    end

    private

    def friendship_params
        params.require(:friendship).permit(:requester_id, :requested_id, :accepted)
    end
end
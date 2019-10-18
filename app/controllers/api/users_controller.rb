class Api::UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    render :show
  end

  def create
    @user = User.new(user_params)

    if @user.save
      login(@user)
      render "api/users/show"
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def update
    @user = User.find(params[:id])

    if @user.update(user_params)
      render "api/users/show"
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :first_name, :last_name, :birth_date, :gender, :profile_picture, :bio, :cover_picture, :workplace, :education, :current_city, :hometown)
  end
end
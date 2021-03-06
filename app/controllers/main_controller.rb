class MainController < ApplicationController
  before_action :force_json, only: :search

  def index; end

  def search
    @users = User.ransack(first_name_cont: params[:q]).result(distinct: true).limit(8)
  end

  private

  def force_json
    request.format = :json
  end
end
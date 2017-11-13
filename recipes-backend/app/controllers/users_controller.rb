class UsersController < ApplicationController
  def index
    email = params[:email]
    @user = User.where(email: email)

    json_response({user: @user})
  end

  def create
    @user = User.create!(email: params["email"], password: params["password"])
    json_response(@user, :created)
  end

  private
  def user_params
    params.permit(:email, :password)
  end

end

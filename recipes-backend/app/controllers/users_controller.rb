class UsersController < ApplicationController
  def index
    user_id = params[:user_id]
    @recipes = Recipe.where(user_id: user_id)

    json_response({recipes: @recipes})
  end

  def create
    p "*" * 100
    p params["email"]
    p params["password"]
    p "*" * 100
    # if @user.save
    #   json_response({ anson: 'nice' })
    # else
    #   json_response({ anson: 'not nice' })
    # end


    @user = User.create!(email: params["email"], password: params["password"])
    json_response(@user, :created)
  end

  private
  def user_params
    params.permit(:email, :password)
  end

end

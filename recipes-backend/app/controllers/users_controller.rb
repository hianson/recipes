class UsersController < ApplicationController
  def index
    user_id = params[:user_id]
    @recipes = Recipe.where(user_id: user_id)

    json_response({recipes: @recipes})
  end

  def create
    @user = User.new(user_params)

    if @user.save
      json_response({ anson: 'nice' })
    else
      json_response({ anson: 'not nice' })
    end
  end

end

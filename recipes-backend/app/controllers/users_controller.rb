class UsersController < ApplicationController
  def index
    user_id = params[:user_id]
    @recipes = Recipe.where(user_id: user_id)

    json_response({recipes: @recipes})
  end
end

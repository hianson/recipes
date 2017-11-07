class RecipesController < ApplicationController
  def index
    user_id = params[:user_id]
    @recipes = Recipe.where(user_id: user_id)

    json_response({recipes: @recipes})
  end

  def create
    @recipe = Recipe.create(recipe_params)
  end

  private
  def recipe_params
    params.permit(:name, :ingredients, :recipe_url, :image_url, :ingredient_count, :user_id)
  end
end

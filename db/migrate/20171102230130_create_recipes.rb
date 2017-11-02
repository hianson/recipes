class CreateRecipes < ActiveRecord::Migration[5.1]
  def change
    create_table :recipes do |t|
      t.references :user, foreign_key: true
      t.string :name
      t.string :ingredients
      t.string :recipe_url
      t.string :image_url
      t.integer :ingredient_count

      t.timestamps
    end
  end
end

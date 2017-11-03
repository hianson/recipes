import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';

class Search extends Component {
  constructor(props) {
  super(props);
  this.state = {
    searchParams: '',
    recipes: [
      ]
  };

  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
}

  getRecipes(searchParams) {
    var self = this;

    console.log(`searching for: ${searchParams}`)
    axios.get(`https://api.edamam.com/search?q=${searchParams}`)
    .then(function (response) {
      console.log(response.data.hits);
      // loop thru response.data.hits add each recipe obj to this.state.recipes
      // get name, ingredients, recipe_url, image_url, ingredient_count

      self.setState({ recipes: response.data.hits })
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  orderedRecipes(recipes) {
    const list = []
    recipes.map((recipeData, index) => { 
      list.push({name: recipeData.recipe.label, count: recipeData.recipe.ingredients.length})
    })

    list.sort(function(a,b) {
      return a.count - b.count
    })
    return list
  }

  handleChange(event) {
    this.setState({searchParams: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.getRecipes(this.state.searchParams)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Enter ingredients:
            <input type="text" value={this.state.searchParams} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <div>
        {this.state.recipes.map((recipeData, index) => {
          return (
            <div
            key={recipeData.recipe.url}>
              <p>{recipeData.recipe.label} : {recipeData.recipe.ingredients.length}</p>
            </div>
          )
        })}
        </div>
          <div>
          <hr />
          Ordered recipes:
          {this.orderedRecipes(this.state.recipes).map((recipeData, index) => {
            return (
              <div>
                <p>{recipeData.name} : {recipeData.count}</p>
              </div>
            )
          })}
          </div>
      </div>
    );
  }
}

export default Search;

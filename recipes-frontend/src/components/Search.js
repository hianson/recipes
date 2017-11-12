import React, { Component } from 'react';
import '../App.css';
import '../Search.css';
import axios from 'axios';
import UserProfile from './UserProfile.js'


class Search extends Component {
  constructor(props) {
  super(props);
  this.state = {
    searchParams: '',
    recipes: []
  };

  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
}

  getRecipes(searchParams) {
    var self = this;

    axios.get(`https://api.edamam.com/search?q=${searchParams}`)
    .then(function (response) {
      self.setState({ recipes: response.data.hits })
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  orderedRecipes(recipes) {
    const list = []
    recipes.map((recipeData, index) => {
      list.push({
        name: recipeData.recipe.label,
        count: recipeData.recipe.ingredients.length,
        url: recipeData.recipe.url,
        image: recipeData.recipe.image
      })
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
      <div className='App'>
        <form onSubmit={this.handleSubmit}>
          <h1>Enter Ingredients:</h1>
            <input type="text" value={this.state.searchParams} onChange={this.handleChange} />
          <input type="submit" value="Submit" />
        </form>
          <div>
            {this.orderedRecipes(this.state.recipes).map((recipeData, index) => {
              return (
                <div className='recipe-divider' key={index}>
                  <a href={recipeData.url} target="_blank" onClick={() => this.props.viewedRecipes(recipeData)}>
                    <div className='recipe-item' style={{backgroundImage: `url(${recipeData.image})`}} >
                      <p>{recipeData.name} : {recipeData.count}</p>
                    </div>
                  </a>
                </div>
                )
              })}
          </div>
      </div>
    );
  }
}

export default Search;

import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';

class Search extends Component {
  constructor(props) {
  super(props);
  this.state = {
    searchParams: ''
  };

  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
}

  getRecipes() {
    axios.get('https://api.edamam.com/search?q=chicken')
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    // console.log('calling getRecipes()')
  }


  handleChange(event) {
    this.setState({searchParams: event.target.value}, () => console.log(this.state.searchParams));
  }

  handleSubmit(event) {
    event.preventDefault();
    this.getRecipes()
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
      </div>
    );
  }
}

export default Search;

import React, { Component } from 'react';
import '../App.css';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: props.match.params.email,
      recipes: []
    };
  }

  componentWillMount() {
    this.setState({recipes: this.props.userRecipes})
  }

  render() {
    return (
      <div>  
        <div>
          User profile page / user email: {this.state.email}
        </div>
        <div>
          Viewed Recipes: 
          {this.state.recipes.map((recipeData, index) => {
            return (
              <div className='recipe-divider' key={index}>
                <a href={recipeData.url} target="_blank">
                  <div className='recipe-item' style={{backgroundImage: `url(${recipeData.image})`}} >
                    <p>{recipeData.name} : {recipeData.count}</p>
                  </div>
                </a>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default UserProfile;

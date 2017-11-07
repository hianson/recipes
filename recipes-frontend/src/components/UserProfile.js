import React, { Component } from 'react';
import '../App.css';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id
    };
  }

  render() {
    return (
      <div>User profile page / user id: {this.state.id}</div>
    )
  }
}

export default UserProfile;

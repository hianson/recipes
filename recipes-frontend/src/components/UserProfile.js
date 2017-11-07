import React, { Component } from 'react';
import '../App.css';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: props.match.params.email
    };
  }

  render() {
    return (
      <div>User profile page / user email: {this.state.email}</div>
    )
  }
}

export default UserProfile;

import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import './App.css';
import Search from './components/Search.js'
import UserProfile from './components/UserProfile.js'
import Modal from './components/Modal.js'
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isModalOpen: false,
      registrationEmail: '',
      registrationPassword: '',
      loginEmail: '',
      loginPassword: '',
      userRecipes: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.viewedRecipes = this.viewedRecipes.bind(this)
  }

  openModal() {
    this.setState({ isModalOpen: true })
  }

  closeModal() {
    this.setState({ isModalOpen: false })
  }

  handleChange(option, event) {
    var updateState = {}

    updateState[option] = event.target.value
    this.setState(updateState);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.register()
  }

  register() {
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    axios.post('http://localhost:3001/users', {
      email: this.state.registrationEmail,
      password: this.state.registrationPassword
    })
    .then(response => {
      console.log(response)
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  renderProfileLink() {
    if (this.state.registrationEmail != '') {
      return <Link to={"/users/" + this.state.registrationEmail}>Profile</Link>
    }
  }

  viewedRecipes(recipe) {
    this.state.userRecipes.push(recipe)
  }

  render() {
    return (
      <div>
        <button onClick={() => this.openModal()}>Register</button>

        <Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
          <h1>Register</h1>
          <form onSubmit={this.handleSubmit}>
            <label>
              Email:
              <input type="email" value={this.state.searchParams} onChange={(event)=>this.handleChange('registrationEmail', event)} />
            </label>
            <label>
              Password:
              <input type="password" value={this.state.searchParams} onChange={(event)=>this.handleChange('registrationPassword', event)} />
            </label>
            <input type="submit" value="Submit" />
          </form>
          <p><button onClick={() => this.closeModal()}>Close</button></p>
        </Modal>

        <view> {this.renderProfileLink()} </view>
        
        <Switch>
          <Route exact path='/' render={(props) => <Search {...props} viewedRecipes={this.viewedRecipes} />} />
          <Route path='/users/:email' render={(props) => <UserProfile {...props} userRecipes={this.state.userRecipes}/>} />
        </Switch>

      </div>
    );
  }
}

export default App;

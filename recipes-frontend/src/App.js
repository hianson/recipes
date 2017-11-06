import React, { Component } from 'react';
import './App.css';
import Search from './components/Search.js'
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
      loginPassword: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

        <Search />

      </div>
    );
  }
}

export default App;

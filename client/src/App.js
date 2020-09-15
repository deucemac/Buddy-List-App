import React, {Component} from 'react';
import './App.css';
import Login from './Login'
import { withRouter } from 'react-router-dom'
import { loginUser, verifyUser, removeToken} from './services/auth'
import Header from './Header'

class App extends Component {
  state = {
    userData: {
      username: '',
      password: ''
    },
    currentUser: null
  }

  componentDidMount = async () => {
    const currentUser = await verifyUser()
    this.setState({
      currentUser
    })
  }

  handleLogin = async (e) => {
    e.preventDefault()
    const currentUser = await loginUser(this.state.userData)
    this.setState({
      currentUser
    })
  }

  handleSignOut = async (e) => {
    this.setState({
      currentUser: null
    })
    localStorage.removeItem('authToken')

    removeToken();
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState =>({
      userData: {
        ...prevState.userData,
        [name]: value
      }
    }))
    console.log(value)
  }
  render() {
    return (
      <div>
        {this.state.currentUser ?
          <Header
            currentUser={this.state.currentUser}
            signOut={this.handleSignOut}
        /> : <Login
          userData={this.state.userData}
          handleChange={this.handleChange}
          handleLogin={this.handleLogin}
        />}

      </div>
    )
  }
}


export default withRouter(App);

import React, {Component} from 'react';
import './App.css';
import Login from './Login'
import { withRouter } from 'react-router-dom'
import { loginUser, verifyUser, removeToken, appearance, makeAppearance} from './services/auth'
import Header from './Header'
import Users from './Users'
import {ActionCableConsumer} from 'react-actioncable-provider'

class App extends Component {
  state = {
    userData: {
      username: '',
      password: ''
    },
    rooms:[],
    currentUser: null
  }

  componentDidMount = async () => {
    const currentUser = await verifyUser()
    this.setState({
      currentUser
    })
    if (currentUser) this.createAppearance(currentUser.id, true)
    
  }

  // fetchAppearance = async (user_id) => {
  //   const rooms = await appearance(user_id);
  //   this.setState({
  //     rooms
  //   })
  // }

  createAppearance = async (user, status) => {
    const rooms = await makeAppearance(user, status);
    this.setState({
      rooms
    })
  }

  handleReceivedRoom = response => {
    console.log(response)
    this.setState({
      rooms: [...this.state.rooms, response.room]
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
          />
          : <Login
          userData={this.state.userData}
          handleChange={this.handleChange}
          handleLogin={this.handleLogin}
          />}
        
        <ActionCableConsumer
          channel={{ channel: 'AppearancesChannel' }}
          onReceived={this.handleReceivedRoom}
        />

        <Users />
        

      </div>
    )
  }
}


export default withRouter(App);

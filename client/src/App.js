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
    const rooms = currentUser.id ? await makeAppearance(currentUser.id, true) : this.state.rooms
    this.setState({
      currentUser,
      rooms
    })
  }

  // setUser = async () => {
  //   const currentUser = await verifyUser()
  //   const rooms = currentUser.id ? await makeAppearance(currentUser.id, true) : this.state.rooms
  //   if (rooms) {
  //     this.setState({
  //       currentUser,
  //       rooms
  //     })
  //   }
  // }

  handleReceivedRoom = response => {
    console.log(response)
    this.setState({
      rooms: [this.state.rooms, response]
    })
  } 
 


  // handleLogin = async (e) => {
  //   console.log('hey')
  //   e.preventDefault()
  //   const currentUser = await loginUser(this.state.userData)
  //   this.setState({
  //     currentUser
  //   })
  // }

  handleLogin = async (e) => {
    console.log('hey')
    e.preventDefault()
    const currentUser = await loginUser(this.state.userData)
    // if (currentUser) await verifyUser()
    const rooms = currentUser.id ? await makeAppearance(currentUser.id, true) : this.state.rooms
    if (rooms.length) {
      this.setState({
        currentUser, 
        rooms
      })
    } else {
      this.setState({
        currentUser
      })
    }
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
    // let appearance = this.state.rooms
    

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
            setUser={this.setUser}
          />}
        
        {this.state.currentUser ? <ActionCableConsumer
          channel={{ channel: 'AppearancesChannel' }}
          onReceived={this.handleReceivedRoom}
        /> : null}

        <Users
          appearances={this.state.rooms.user_id}
        />
          
        

      </div>
    )
  }
}


export default withRouter(App);

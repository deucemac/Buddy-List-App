import React, {Component, Fragment} from 'react';
import './App.css';
import Login from './Login'
import { withRouter } from 'react-router-dom'
import { loginUser, verifyUser, removeToken, getAppearance, makeAppearance} from './services/auth'
import Header from './Header'
import Users from './Users'
import { ActionCableConsumer } from 'react-actioncable-provider'
import Appearances from './Appearances'

class App extends Component {
  state = {
    userData: {
      username: '',
      password: ''
    },
    appearances: [],
    currentUser: null
  }

  componentDidMount = async () => {
    const currentUser = await verifyUser()

    const appearance = await makeAppearance(currentUser.id, true)
    this.setState({
      currentUser,
      appearances: appearance
    })
  }

  

  handleReceivedRoom = async response => {
    console.log(response)
    const appearance = response
    this.setState({
      appearances:[this.state.appearances, appearance]
    })
  } 
 

  handleLogin = async (e) => {
    console.log('hey')
    e.preventDefault()
    const currentUser = await loginUser(this.state.userData)
    const appearance = await makeAppearance(currentUser.id, true)
      this.setState({
        currentUser, 
        appearance
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
            setUser={this.setUser}
          />}
        
        
        <ActionCableConsumer
          channel={{ channel: 'AppearancesChannel' }}
          onReceived={this.handleReceivedRoom}
        />
          
        <Users
          appearances={this.state.appearances}
        />

        <Appearances/>
          
        

      </div>
      
    )
  }
}


export default withRouter(App);

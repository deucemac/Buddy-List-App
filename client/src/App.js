import React, {Component} from 'react';
import './App.css';
import Login from './Login'
import { withRouter } from 'react-router-dom'
import { loginUser, verifyUser, removeToken, getAppearance,updateUserStatus, makeAppearance} from './services/auth'
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

    
    this.setState({
      currentUser
    })
  }

  

  

  handleLogin = async (e) => {
    console.log('hey')
    e.preventDefault()
    const currentUser = await loginUser(this.state.userData)
    await updateUserStatus(currentUser.id, true)
      this.setState({
        currentUser
      })
    }
  

  handleSignOut = async (e) => {
    await updateUserStatus(this.state.currentUser.id, false)
    
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
          
        <Users />

        <Appearances />
       
        

      </div>
      
    )
  }
}


export default withRouter(App);

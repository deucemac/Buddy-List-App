import React, { Component } from 'react'
import { getUsers, sendFriendRequest } from './services/api-app'
import { withRouter } from 'react-router-dom'
import './css/User.css'

class Users extends Component {
  state = {
    users: null
  }

  componentDidMount = async () => {
    const users = await getUsers()
    this.setState({
      users
    })
  }

  handleFriendRequest = async (e, userId) => {
    e.preventDefault();

    await sendFriendRequest(this.props.currentUser.id, userId, 0)
  }

  render() {

    return (
      <div className="user-container">
        {this.state.users && this.state.users.map(user => (
          <div className='user' key={user.id}>
            <p className="username">{user.username}</p>
            <div className="img"><img src={user.image} className='users-profile' alt='profile' /></div>
            <div className="friendRequest">
              <button className="request" onClick={(e) => this.handleFriendRequest(e, user.id)}>Send Friend Request</button>
              </div>
          </div>
        ))}
      </div>
    )
  }
}

export default withRouter(Users)
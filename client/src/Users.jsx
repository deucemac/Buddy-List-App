import React, { Component } from 'react'
import { getUsers } from './services/api-app'
import { withRouter } from 'react-router-dom'

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

  render() {
    return (
      <div>
        {this.state.users && this.state.users.map(user => (
          <div className='user'>
            <p key={user.id}>{user.username}</p>
            <img src={user.image} alt='profile'/>
          </div>
        ))}
      </div>
    )
  }
}

export default withRouter(Users)
import React, { Component } from 'react'
import { getUsers, sendFriendRequest } from './services/api-app'
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
    // if (users.length) this.showAppearances()
  }

  handleFriendRequest = async (e, userId) => {
    e.preventDefault();

    await sendFriendRequest(this.props.currentUser.id, this.props.currentUser.id, userId, 0)
  }

  render() {

    return (
      <div>
        {this.state.users && this.state.users.map(user => (
          <div className='user' key={user.id}>
            <p style={{marginLeft: "30px"}}>{user.username}</p>
            <img src={user.image} style={{ width: "50px", marginLeft: "30px" }} alt='profile' />
            <button onClick={(e)=> this.handleFriendRequest(e, user.id)}>Send Friend Request</button>
          </div>
        ))}
      </div>
    )
  }
}

export default withRouter(Users)
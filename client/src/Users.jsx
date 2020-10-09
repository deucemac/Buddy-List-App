import React, { Component } from 'react'
import { getUsers } from './services/api-app'
import { withRouter } from 'react-router-dom'

class Users extends Component {
  state = {
    users: null, 
    appearances: []
  }

  componentDidMount = async () => {
    const users = await getUsers()
    this.setState({
      users
    })
    if (users.length) this.showAppearances()
  }

  showAppearances = () => {
    const { appearances } = this.props
    const users = this.state.users
    console.log(appearances, users)
    const showOnlineUsers = users && appearances ? users.filter(user => {
      if (appearances.includes(user.id)) {return user.image}
    }) : ''
    this.setState(prevState=>({
      appearances: [...prevState.appearances, showOnlineUsers]
    }))
  }

  render() {
    
    
    
    // console.log(Appearances, users)
    return (
      <div>
        {this.state.users && this.state.users.map(user => (
          <div className='user'>
            <p key={user.id} style={{marginLeft: "30px"}}>{user.username}</p>
            <img src={user.image} style={{ width: "50px", marginLeft: "30px" }} alt='profile'/>
          </div>
        ))}
        {/* {this.props.appearances ? showOnlineUsers : <></>} */}
      </div>
    )
  }
}

export default withRouter(Users)
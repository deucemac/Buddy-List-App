import React, { Component } from 'react'
import { getFriendFromFriendship, getUserFriends } from './services/api-app'
import { ActionCableConsumer } from 'react-actioncable-provider'

export default class Friendships extends Component {
  constructor(...props) {
    super(...props);

    this.handleColorChange = this.handleColorChange.bind(this);
  
    this.state = {
      friends: []
    }
  }
  async componentDidMount() {
    
    const friendsList = await getUserFriends(this.props.currentUser.id)
    // await friendsList.forEach(friendship => {
    //   let list = []
    //   if (this.props.currentUser.id === friendship.requester_id) {
    //     let newFriend = getFriendFromFriendship(friendship.addressee_id)
    //     list.push(newFriend)
    //   } else {
    //     let newFriend = getFriendFromFriendship(friendship.requester_id)
    //     list.push(newFriend)
    //   }
    // })
    let i = 0
    let list = []
    while (i < friendsList.length) {
      if (this.props.currentUser.id === friendsList[i].requester_id) {
            let newFriend = await getFriendFromFriendship(friendsList[i].addressee_id)
            list.push(newFriend)
          } else {
            let newFriend = await getFriendFromFriendship(friendsList[i].requester_id)
            list.push(newFriend)
      }
      i++
    }
    return (this.setState({
      friends: list
    }))
  }

  handleColorChange = (friendUpdate) => {
    console.log('foo')

    if (friendUpdate.status) {
      let friends = this.state.friends
      console.log(friends)
      let userToRemove = friends.find(friend => friend.id === friendUpdate.id)
      let index = friends.indexOf(userToRemove)
      friends.splice(index, 1, friendUpdate)
      this.setState({
        friends
      })
    } else if (!friendUpdate.status) {
      let friends = this.state.friends
      let userToRemove = friends.find(friend => friend.id === friendUpdate.id)
      let index = friends.indexOf(userToRemove)
      friends.splice(index, 1, friendUpdate)
      this.setState({
        friends
      })
    }

    
  }


  render() {

    const friendList = this.state.friends && this.state.friends.map((friend, index) =>
    <div key={index}>
      <img key={index}  src={friend.image} style={{ width: "200px", marginLeft: "30px" }} />
      <button style={{
        backgroundColor: friend.status ? 'green' : 'red',
        marginLeft: "30px",
      }}>Status</button>
    </div>
  )

    return (
      <>
        <ActionCableConsumer
          channel="AppearancesChannel"
          onReceived={this.handleColorChange}
        >{this.state.friends && friendList}</ActionCableConsumer>

      </>
    )
  }
}

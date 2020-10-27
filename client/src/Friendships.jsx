import React, { Component } from 'react'
import { getFriendFromFriendship, getUserFriends, getUserFriendRequests, acceptOrDeny } from './services/api-app'
import { ActionCableConsumer } from 'react-actioncable-provider'
import {buttonStyle, buttonStyle2} from './services/button-style'

export default class Friendships extends Component {
  constructor(props) {
    super(props);

    this.handleColorChange = this.handleColorChange.bind(this);
  
    this.state = {
      friends: [],
      friendRequests: [],
      colorChange: true
    }
  }
  async componentDidMount() {
    
    const friendsList = await getUserFriends(this.props.currentUser.id)
  
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
    
    const friendRequests = await getUserFriendRequests(this.props.currentUser.id)
    let j = 0
    let list2 = []
    while (j < friendRequests.length) {
      if (this.props.currentUser.id === friendRequests[j].addressee_id) {
        let newFriend = await getFriendFromFriendship(friendRequests[j].requester_id)
        list2.push(newFriend)
      }
      j++
    }
    setInterval(
      () => this.change(),
      500
    );
    console.log(list2)
    return (this.setState({
      friends: list,
      friendRequests:list2
    }))
  }

  change() {
    let colorChange = !this.state.colorChange
    this.setState({
      colorChange
    })
  }

  handleColorChange = async(friendUpdate) => {
    console.log('foo')
    const friendsList = await getUserFriends(this.props.currentUser.id)

    if (friendsList.find(friend => friend.requester_id === friendUpdate.id) || friendsList.find(friend => friend.addressee_id === friendUpdate.id)) {

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
}

  handleFriendshipAccept = async (e, requesterId) => {
      e.preventDefault()
      const currentUserId = this.props.currentUser.id
      let list = await getUserFriendRequests(currentUserId)
      let friendship = list.find(friendship => friendship.requester_id === requesterId)
      console.log(friendship)
      await acceptOrDeny(currentUserId, friendship.id, 1)
    }

  componentWillUnmount() {
    
  }


  render() {
    
    let friendList = this.state.friends.length && this.state.friends.map((friend, index) =>
      <div key={index}>
        <p>{friend.username}</p>
        <img key={index} src={friend.image} style={{ width: "200px", marginLeft: "30px" }} alt="profile" />
        {friend.status ?
          (
            this.state.colorChange ? <button style={buttonStyle}>Online</button>
            :
            <button style={buttonStyle2}>Online</button>
          )
          : 
          <button style={{backgroundColor:"red"}} >Offline</button>
          }
    </div>
    )

    let friendRequests = this.state.friendRequests && this.state.friendRequests.map((friend, index) =>
      <div key={index}>
        <p>{friend.username} </p> <button onClick={(e)=> this.handleFriendshipAccept(e, friend.id)}>Accept</button>
      <img key={index}  src={friend.image} style={{ width: "150px", marginLeft: "30px" }} alt="profile" />
      <button style={{
        backgroundColor: friend.status ? 'green' : 'red',
        marginLeft: "30px",
        }}>Status</button>
      </div>)
    
    return (
      <>
        <ActionCableConsumer
          channel="AppearancesChannel"
          onReceived={this.handleColorChange}
        >
          <h2>Buddy List</h2>
          {this.state.friends && friendList}</ActionCableConsumer>
        
        <ActionCableConsumer
        channel="AppearancesChannel"
        onReceived={this.handleColorChange}
        >
          <h2>Pending Friends</h2>
          {this.state.friendRequests && friendRequests}</ActionCableConsumer>
      </>
    )
  }
}

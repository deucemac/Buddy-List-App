import React, { Component } from 'react'
import { getFriendFromFriendship, getUserFriends, getUserFriendRequests, acceptOrDeny, denyFriendship} from './services/api-app'
import { ActionCableConsumer } from 'react-actioncable-provider'
import { buttonStyle, buttonStyle2, buttonStyle3 } from './services/button-style'
import './css/Friendlist.css'

export default class Friendships extends Component {
  constructor(props) {
    super(props);

    this.handleColorChange = this.handleColorChange.bind(this);
  
    this.state = {
      friends: [],
      friendRequests: []
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

    return (this.setState({
      friends: list,
      friendRequests:list2
    }))
  }

  



  handleColorChange = async (friendUpdate) => {
    // doesn't change color for pending friends
    const friendsList = await getUserFriends(this.props.currentUser.id)

    if (friendsList.find(friend => friend.requester_id === friendUpdate.id) || friendsList.find(friend => friend.addressee_id === friendUpdate.id)) {

    if (friendUpdate.status) {
      let friends = this.state.friends
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

  handleFriendshipAccept = async (e, requesterId, friend) => {
    e.preventDefault()
      let friendRequests = this.state.friendRequests
      let friends = this.state.friends
      const currentUserId = this.props.currentUser.id
      let list = await getUserFriendRequests(currentUserId) //list of pending friends
      let friendship = list.find(friendship => friendship.requester_id === requesterId) //find the 1 specific friend
      
    let indexToRemoveRequest = friendRequests.findIndex(friendRequest => friendRequest.id === friendship.id) //find index of friend to remove
    friendRequests.splice(indexToRemoveRequest, 1) //remove friend from pending list
    await acceptOrDeny(currentUserId, friendship.id, 1)
    friends.push(friend)
    this.setState({
      friends,
      friendRequests
    })
  }
  
  handleFriendshipDeny = async (e, requesterId) => {
    e.preventDefault()
    let friendRequests = this.state.friendRequests
    const currentUserId = this.props.currentUser.id
    let list = await getUserFriendRequests(currentUserId) // get Pending Friends list
    let friendship = list.find(friendship => friendship.requester_id === requesterId) //find specific friend request
    let indexToRemoveRequest = friendRequests.findIndex(friendRequest => friendRequest.id === friendship.id) //find index of friend to remove
    friendRequests.splice(indexToRemoveRequest, 1) //remove friend from pending list
    this.setState({
      friendRequests
    })
    await denyFriendship(currentUserId, friendship.id)
  }

  componentWillUnmount() {
    
  }


  render() {
    
    let friendList = this.state.friends.length && this.state.friends.map((friend, index) =>
      <div key={index}>
        <p className="friend-list-username">{friend.username}</p>
        <img key={index} src={friend.image} style={{ width: "200px", marginLeft: "30px" }} alt="profile" />
        {/* {friend.status ?
          (
            this.state.colorChange ? <button style={buttonStyle}>Online</button>
            :
            <button style={buttonStyle2}>Online</button>
          )
          : 
          <button style={buttonStyle3} >Offline</button>
          } */}
        {
          friend.status ?
          <div style={buttonStyle}></div>
          :
            <div style={buttonStyle3}></div>
          }
    </div>
    )

    let friendRequests = this.state.friendRequests && this.state.friendRequests.map((friend, index) =>
      <div key={index}>
        <p className="friend-list-username">{friend.username}</p>
  
        <img key={index} className="friend-request-img" src={friend.image} alt="profile" />
        {
          friend.status ?
          <div style={buttonStyle}></div>
          :
          <div style={buttonStyle3}></div>
        }
        <button className="accept-request" onClick={(e) => this.handleFriendshipAccept(e, friend.id, friend)}>Accept</button>
        <button className="accept-request" onClick={(e) => this.handleFriendshipDeny(e, friend.id)}>Deny</button>
      </div>)
    
    return (
      <>
        <ActionCableConsumer
          channel="AppearancesChannel"
          onReceived={this.handleColorChange}
        >
          <h2>Buddy List</h2>
          {this.state.friends && friendList}
          <h2>Pending Friends</h2>
          {this.state.friendRequests && friendRequests}
        
        </ActionCableConsumer>
        
      </>
    )
  }
}

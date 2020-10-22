import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ActionCableConsumer } from 'react-actioncable-provider'
import {getOnlineUsers} from './services/auth'

export default class Appearances extends Component {
  static propTypes = {
    appearances: PropTypes.array
  };
  constructor(...props) {
    super(...props);
 
    this.handleReceived = this.handleReceived.bind(this);
 
    this.state = {
      appearances: []
    };
  }

  componentDidMount= async () =>{
    const appearances = await getOnlineUsers()
    this.setState({
      appearances
    })
  }


  handleReceived = (appearance) => {  //
    if (appearance.status === true) {
    const listOfAppearances = this.state.appearances
    listOfAppearances.push(appearance)
      let appearances = listOfAppearances
      this.setState({
        appearances
      })
      console.log(appearance)
      } else {
        const appearances = this.state.appearances
        let userToRemove = appearances.find(user => user.id === appearance.id)
        let index = appearances.indexOf(userToRemove)
        appearances.splice(index, 1)
        console.log(appearances)
      this.setState({
            appearances
          })
    }
  }

  
  render() {

    const dynamicList = this.state.appearances.map((appearance) => <img src={appearance.image} key={appearance.id} style={{ width: "100px", marginLeft: "30px" }}/>)
    return (
      <ActionCableConsumer
        channel="AppearancesChannel"
        onReceived={this.handleReceived}
      >{this.state.appearances && dynamicList}
        
      </ActionCableConsumer>
    )
  }
}

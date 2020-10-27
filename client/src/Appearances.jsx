import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { ActionCableConsumer } from 'react-actioncable-provider'
import { getOnlineUsers } from './services/auth'
import {buttonStyle, buttonStyle2} from './services/button-style'

export default class Appearances extends Component {
  static propTypes = {
    appearances: PropTypes.array
  };
  constructor(props) {
    super(props);
 
    this.handleReceived = this.handleReceived.bind(this);
 
    this.state = {
      appearances: [],
      colorChange: true
    };
  }

  componentDidMount= async () =>{
    const appearances = await getOnlineUsers()
    this.setState({
      appearances
    })
    setInterval(
      () => this.change(),
      500
    );
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

  change() {
    let colorChange = !this.state.colorChange
    this.setState({
      colorChange
    })
  }

  componentWillUnmount() {
    clearInterval(this.change)
  }

  

  
  render() {


    const dynamicList = this.state.appearances.map((appearance, index) =>
      <div key={index}>
        <img src={appearance.image} key={appearance.id} style={{ width: "100px", marginLeft: "30px"}} alt="profile"/>
        {
          this.state.colorChange ?
          <button style={buttonStyle}>Online</button>
          :
            <button style={buttonStyle2}>Online</button>
        }
      </div>
    )
    return (
      <ActionCableConsumer
        channel="AppearancesChannel"
        onReceived={this.handleReceived}
      >{this.state.appearances && dynamicList}
        
      </ActionCableConsumer>
    )
  }
}

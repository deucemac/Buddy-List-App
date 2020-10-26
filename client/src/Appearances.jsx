import React, { Component, Fragment } from 'react'
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

  

  
  render() {

    const buttonStyle = {
      width: "10px",
      height: "10px",
      backgroundColor:"#6ab325",
      border: "none",
      color: "#6ab325",
      // padding: "15px 32px",
      textAlign: "center",
      textDecoration: "none",
      display: "inline-block",
      fontSize: "1px",
      margin: "4px 2px",
      cursor: "pointer",
      borderRadius: "50%",
    }

    const buttonStyle2 = {
      width: "10px",
      height: "10px",
      backgroundColor:"#78db1a",
      border: "none",
      color: "#78db1a",
      // padding: "15px 32px",
      textAlign: "center",
      textDecoration: "none",
      display: "inline-block",
      fontSize: "1px",
      margin: "4px 2px",
      cursor: "pointer",
      borderRadius: "50%"
    }

    const dynamicList = this.state.appearances.map((appearance) =>
      <div key={appearance.id}>
        <img src={appearance.image} key={appearance.id} style={{ width: "100px", marginLeft: "30px"}} />
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

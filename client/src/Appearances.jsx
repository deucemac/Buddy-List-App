import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { ActionCableConsumer } from 'react-actioncable-provider'
import { getOnlineUsers } from './services/auth'
import { buttonStyle, buttonStyle2 } from './services/button-style'
import "./css/Appearances.css"

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
    // setInterval(
    //   () => this.change(),
    //   500
    // );
  }


  handleReceived = (appearance) => {  //
    console.log(appearance)
    if (appearance.status === true) {
    const listOfAppearances = this.state.appearances
    listOfAppearances.push(appearance)
      let appearances = listOfAppearances
      this.setState({
        appearances
      })
      // console.log(appearance)
      } else {
        const appearances = this.state.appearances
        let userToRemove = appearances.find(user => user.id === appearance.id)
        let index = appearances.indexOf(userToRemove)
        appearances.splice(index, 1)
        // console.log(appearances)
      this.setState({
            appearances
          })
    }
  }

  // change() {
  //   let colorChange = !this.state.colorChange
  //   this.setState({
  //     colorChange
  //   })
  // }

  // componentWillUnmount() {
  //   clearInterval(this.change)
  // }

  

  
  render() {


    const dynamicList = this.state.appearances.map((appearance, index) =>
      <div className="appearance-container" key={index}>
        <p className="appearance-name">{appearance.username}</p>
        <div className="image-and-status">
        <img src={appearance.image} className="user-appearance" key={appearance.id} style={{ width: "100px", marginLeft: "30px"}} alt="profile"/>
        {/* {
          this.state.colorChange ?
          <button style={buttonStyle}>Online</button>
          :
            <button style={buttonStyle2}>Online</button>
        } */}
        {/* {
          appearance.status ?
          <button style={buttonStyle}>Online</button>
          :
            <button style={buttonStyle2}>Online</button>
          } */}
          {
          appearance.status ?
          <div style={buttonStyle}></div>
          :
            <div style={buttonStyle2}></div>
          }
        </div>
      </div>
    )
    return (
      <ActionCableConsumer
        channel="AppearancesChannel"
        onReceived={this.handleReceived}
      >
        <h2>See Whose Online</h2>
        <div className="appearance-list-container">
          {this.state.appearances && dynamicList}
        </div>
        
      </ActionCableConsumer>
    )
  }
}

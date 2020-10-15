import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {ActionCableConsumer} from 'react-actioncable-provider'

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

  // handleReceived = (appearance) => {
  //   console.log(appearance)
    
  //     this.setState(prevState =>({
  //       appearances: [prevState.appearances, appearance ]
  //     }));
  // }

  handleReceived = (appearance) => {
    const listOfAppearances = this.state.appearances
    listOfAppearances.push(appearance)
    let appearances = listOfAppearances
    this.setState({
      appearances
    })
    console.log(appearance)
  }

  
  render() {

    const dynamicList = this.state.appearances.map((appearance) => <img src={appearance.image} style={{ width: "100px", marginLeft: "30px" }}/>)
    return (
      <ActionCableConsumer
        channel="AppearancesChannel"
        onReceived={this.handleReceived}
      >{this.state.appearances && dynamicList}
        
      </ActionCableConsumer>
    )
  }
}

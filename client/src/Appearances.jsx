import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {ActionCableConsumer} from 'react-actioncable-provider'

export default class Appearances extends Component {
  static propTypes = {
    appearance: PropTypes.object
  };
  constructor(...props) {
    super(...props);
 
    this.handleReceived = this.handleReceived.bind(this);
 
    this.state = {
      appearance: null
    };
  }

    handleReceived=(appearance)=>{
      this.setState({
        appearance
      });
    }
  
  render() {
    return (
      <ActionCableConsumer
        channel="AppearancesChannel"
        onReceived={this.handleReceived}
      >
        
      </ActionCableConsumer>
    )
  }
}

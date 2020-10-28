import React, { Component } from 'react'
import "./css/Header.css"

export default class Header extends Component {
  render() {
    return (
      <>
        <header>
          <h2>Hello {this.props.currentUser.username}</h2>
          <img src={this.props.currentUser.image} className="greet-user" />
          <button className="signOut" onClick={this.props.signOut}>sign out</button>
        </header>
      </>
    )
  }
}

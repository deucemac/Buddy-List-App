import React, { Component } from 'react'

export default class Header extends Component {
  render() {
    return (
      <>
        <header>
          <h2>Hello {this.props.currentUser.username}</h2>
          <button onClick={this.props.signOut}>sign out</button>
        </header>
      </>
    )
  }
}

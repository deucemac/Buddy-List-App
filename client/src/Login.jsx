import React, { Component } from 'react'
import "./css/Login.css"


export default class Login extends Component {
  
  render() {
    const { userData, handleChange, handleLogin} = this.props;
    return (
      <div>
        <h1 className="header">Make friends and see whose online</h1>
        <p className="form">All Usernames are as displayed below. All passwords are username123. Ex. keke123</p>
        <form onSubmit={handleLogin}>
          <label><p className='form'>username:</p>
           <input
              type='text'
              name='username'
              value={userData.username}
              onChange={handleChange}
            />
          </label>
          <br />
          <label><p className='form'>password:</p>
           <input
              type='password'
              name='password'
              value={userData.password}
              onChange={handleChange}
            />
          </label>
          <br />
          <input
            className="submit"
            type='submit'
            value='submit'
          />
        </form>
      </div>
    )
  }
}

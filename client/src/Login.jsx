import React, { Component } from 'react'


export default class Login extends Component {
  
  render() {
    const { userData, handleChange, handleLogin} = this.props;
    return (
      <div>
        <form onSubmit={handleLogin}>
          <label>username:
           <input
              type='text'
              name='username'
              value={userData.username}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>password:
           <input
              type='password'
              name='password'
              value={userData.password}
              onChange={handleChange}
            />
          </label>
          <br />
          <input
            type='submit'
            value='submit'
          />
        </form>
      </div>
    )
  }
}

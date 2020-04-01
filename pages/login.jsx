
import React from "react";
import axios from "axios";
import { Component } from 'react'

class Login extends Component {


  static getInitialProps ({ req }) {
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'

    const apiUrl = process.browser
      ? `${protocol}://${window.location.host}/api/login.js`
      : `${protocol}://${req.headers.host}/api/login.js`

    return { apiUrl }
  }

  constructor (props) {
    super(props)

    this.state = { username: '', error: '' }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // constructor(props) {
  //   super(props);
  
  //   this.state = {
  //     showContent: false,
  //     selected: props.defaultSelected
  //   };
  
  //   this.toggleDropdown = this.toggleDropdown.bind(this);
  
  //   Router.events.on("routeChangeComplete", url => {
  //     const route = routes.find(rt => rt.link === url);
  //     if (route) {
  //       this.setState({ selected: route.name });
  //     }
  //     this.setState({ showContent: false });
  //   });
  // }
  
  handleChange (event) {
    this.setState({ username: event.target.value })
  }

  async handleSubmit (event) {
    event.preventDefault()
    const username = this.state.username
    const url = this.props.apiUrl
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
      })
      if (response.ok) {
        const { token } = await response.json()
        login({ token })
      } else {
        console.log('Login failed.')
        let error = new Error(response.statusText)
        error.response = response
        return Promise.reject(error)
      }
    } catch (error) {
      console.error(
        'You have an error in your code or there are Network issues.',
        error
      )
      throw new Error(error)
    }
  }

  render () {
    return (
      <div className='login'>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='username'>GitHub username</label>

          <input
            type='text'
            id='username'
            name='username'
            value={this.state.username}
            onChange={this.handleChange}
          />

          <button type='submit'>Login</button>

          <p className={`error ${this.state.error && 'show'}`}>
            {this.state.error && `Error: ${this.state.error}`}
          </p>
        </form>
      </div>
    )
  }
}
export default Login;

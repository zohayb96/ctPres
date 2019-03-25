import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <center>
      <div className="loginForm">
        <form onSubmit={handleSubmit} name={name}>
          <div className="ui form segment">
            <div className="field">
              <label>Username</label>
              <div className="ui left labeled icon input">
                <input name="username" type="text" />
                <i className="user icon" />
              </div>
            </div>
            <div className="field">
              <label>Password</label>
              <div className="ui left labeled icon input">
                <input name="password" type="password" />
                <i className="lock icon" />
              </div>
            </div>
            <div />
            <button type="submit">{displayName}</button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
      </div>
    </center>
  )
}

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const username = evt.target.username.value
      const password = evt.target.password.value
      dispatch(auth(username, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}

import queryString from 'query-string';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export const LoginLink = ({ loginURL, isUserLoggedIn, handleLoginClick, handleLogoutClick }) => (
  isUserLoggedIn ? (
    <Link to="/logout" onClick={ handleLogoutClick } className="float-right">logout</Link>
  ) : (
    <a href={ loginURL } onClick={ handleLoginClick } className="float-right">log in</a>
  )
);



export class Login extends Component {

  componentWillMount() {
    const query = this.props.location.query;
    if (typeof query !== 'undefined') {
      this.props.handleRedirectURL(query.redirect);
    }
  }

  render() {
    const { isUserLoggedIn, redirected, loginURL } = this.props;
    if (isUserLoggedIn) {
      return (
        <div className="form-group">
          <h1 className="heading-xlarge">You are already logged in</h1>
        </div>
      );
    } else if (redirected){
      return (
        <div className="form-group">
          <h1 className="heading-xlarge">Login Required</h1>
          <label className="form-label" htmlFor="login">
            You need to login to perform this action
          </label>
          <a href={ loginURL } id="login" className="button">
            Login
          </a>
        </div>
      );
    } else {
      return (
        <div className="form-group">
          <h1 className="heading-xlarge">Login</h1>
          <label className="form-label" htmlFor="login">
            Click the button to login
          </label>
          <a href={ loginURL } id="login" className="button">
            Login
          </a>
        </div>
      );
    }
  }
}


export class Logout extends Component {

  render() {
    return (
      <p>Your have logged out</p>
    );
  }
}


export class OAuth extends Component {

  componentWillMount() {
    const { location, handleCode } = this.props;
    const parsed = queryString.parse(location.search);
    handleCode(parsed.code);
  }

  render() {
    return null;
  }
}

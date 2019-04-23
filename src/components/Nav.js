import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { handleLogin } from '../actions/authedUser';

class Nav extends Component {
  constructor() {
    super();

    this.state = {
      logoutVisible: false,
    };

    this.toggleLogout = this.toggleLogout.bind(this);
  }

  toggleLogout(e) {
    e.preventDefault();
    this.state.logoutVisible ? this.props.dispatch(handleLogin(null)) : this.setState({ logoutVisible: true });
  }

  render() {
    const user = this.props.user;
    return (
      <nav className="flex-row">
        <ul className="nav-ul">
          <li>
            <NavLink to="/" exact activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/add" exact activeClassName="active">
              New Questions
            </NavLink>
          </li>
          <li>
            <NavLink to="/leaderboard" exact activeClassName="active">
              Leader Board
            </NavLink>
          </li>
        </ul>
        {this.state.logoutVisible ? (
          <div className="nav-authuser flex-row" onClick={this.toggleLogout}>
            <div className="margin-top-bottom-auto">Logout</div>
          </div>
        ) : (
          <div className="nav-authuser flex-row" onClick={this.toggleLogout}>
            <img src={user ? user.avatarURL : ''} alt={`Avatar of ${user ? user.name : ''}`} className="avatar-small" />
            <div className="margin-top-bottom-auto">{user ? user.name : ''}</div>
          </div>
        )}
      </nav>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser: authedUser,
    user: users[authedUser],
  };
}

export default connect(mapStateToProps)(Nav);

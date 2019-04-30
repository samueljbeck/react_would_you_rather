import React, { Component } from 'react';
import logo from '../logo.svg';
import { connect } from 'react-redux';
import { handleLogin } from '../actions/authedUser';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      showLogins: false,
    };

    this.toggleLogins = this.toggleLogins.bind(this);
  }

  toggleLogins(event) {
    event.preventDefault();
    this.setState((state) => ({
      showLogins: !state.showLogins
    }))
  }

  selectLogin(id, event) {
    event.preventDefault();
    this.setState({ showLogins: !this.state.showLogins });
    this.props.dispatch(handleLogin(id));
  }

  render() {
    const { users } = this.props;
    return (
      <div className="center">
        <header>
          <img src={logo} className="logo" alt="logo" />
        </header>

        <button className="login-button" onClick={this.toggleLogins}>
          Login
        </button>
        {this.state.showLogins ? (
          <div>
            {users.map(user => (
              <div key={user.id}>
                <button className="login-user" onClick={e => this.selectLogin(user.id, e)}>
                  {user.name}
                </button>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
}

function mapStateToProps({ users }, props) {
  return {
    users: Object.keys(users).map(id => users[id]),
  };
}

export default connect(mapStateToProps)(Login);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { handleInitialData } from '../actions/shared';
import Home from './Home';
import Login from './Login';
import Nav from './Nav';
import ResultDetail from './ResultDetail';
import NewQuestion from './NewQuestion';
import LeaderBoard from './LeaderBoard';
import NoMatch from './NoMatch'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    const authedUser = this.props.authedUser;
    return (
      <div className="container">
        {authedUser === null ? (
          <Login />
        ) : (
          <Router>
            <Nav />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/add" exact component={NewQuestion} />
              <Route path="/leaderboard" exact component={LeaderBoard} />
              <Route path="/questions/:question_id" component={ResultDetail} />
              <Route component={NoMatch} />
            </Switch>
          </Router>
        )}
      </div>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null,
    authedUser: authedUser,
  };
}

export default connect(mapStateToProps)(App);

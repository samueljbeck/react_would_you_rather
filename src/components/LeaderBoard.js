import React, { Component } from 'react';
import { connect } from 'react-redux';
import LeaderBoardItem from './LeaderBoardItem';

class LeaderBoard extends Component {
  render() {
    const users = this.props.users 
      ? this.props.users.sort((a, b) => b.score - a.score)
      : null;
    return (
      <div>
          
          {users && users.length > 0 ? 
                    <ul>
                        {this.props.users.map(user => (
                            <li key={user.id}>
                              <LeaderBoardItem id={user.id} />
                            </li>
                        ))}
                    </ul>
                : ''
            }
        
      </div>
    );
  }
}

function mapStateToProps({ users }) {
    
  return {
    users: Object.keys(users).map(id => Object.assign(users[id], 
      {score: users[id].questions.length + Object.keys(users[id].answers).length})),
  };
}

export default connect(mapStateToProps)(LeaderBoard);

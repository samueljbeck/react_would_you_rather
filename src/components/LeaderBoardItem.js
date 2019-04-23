import React, { Component } from 'react';
import { connect } from 'react-redux';

class LeaderBoardItem extends Component {
  render() {
    const user = this.props.user;
    return (
      <div className="flex-row question-item-holder">
        <img src={user.avatarURL} alt={`Avatar of ${user.name}`} className="avatar" />
        <div className="leader-info-holder">
          <div className="new-question-holder">{user.name}</div>
          <div>Answered questions: {Object.keys(user.answers).length}</div>
          <div>Created questions: {user.questions.length}</div>
        </div>
        <div className="leader-score-holder">
          <div className="leader-score">Score</div>
          <div className="leader-score">{user.score}</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users }, { id }) {
  const user = users[id];
  return {
    user: user,
  };
}

export default connect(mapStateToProps)(LeaderBoardItem);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import ResultDetailQuestionAnswer from './ResultDetailQuestionAnswer';

class ResultDetailQuestion extends Component {
  render() {
    const question = this.props.question;
    const user = this.props.users[question.author];
    const optionOneVotes = question ? question.optionOne.votes.length : 0;
    const optionTwoVotes = question ? question.optionTwo.votes.length : 0;
    const totalVotes = optionOneVotes + optionTwoVotes;

    return (
      <div className="question-item-holder">
        {question ? (
          <div>
            <div className="question-item-author">Asked by: {user ? user.name : ''}</div>
            <div className="flex-row">
              <img src={user ? user.avatarURL : ''} alt={`Avatar of ${user ? user.name : ''}`} className="avatar" />

              <div className="question-option-all-holder">
                <div>Results:</div>
                <ResultDetailQuestionAnswer option={{ ...question.optionOne, totalVotes: totalVotes }} />
                <ResultDetailQuestionAnswer option={{ ...question.optionTwo, totalVotes: totalVotes }} />
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }, id) {
  return {
    question: questions[id.id],
    users: users,
  };
}

export default connect(mapStateToProps)(ResultDetailQuestion);

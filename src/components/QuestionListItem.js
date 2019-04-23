import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link} from 'react-router-dom';

class QuestionListItem extends Component {
  openQuestionDetail(question, event) {
    event.preventDefault();
    if (
      question.optionOne.votes.includes(this.props.authedUser) ||
      question.optionTwo.votes.includes(this.props.authedUser)
    ) {
      this.props.history.push(`/results/${question.id}`);
    } else {
    }
  }

  render() {
    const user = this.props.user;
    const question = this.props.question;

    return (
      <Link to={`/questions/${question.id}`}>
        <div className="question-item-holder ripple" >
          <div className="question-item-author">{user.name}</div>
          <div className="flex-row">
            <img src={user.avatarURL} alt={`Avatar of ${user.name}`} className="avatar" />

            <div className="question-item-text-holder">
              <div className="question-item-rather">Would you rather</div>
              <div className="question-item-question">...{question.optionOne.text}...</div>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
  const question = questions[id];
  const user = users[question.author];
  return {
    authedUser,
    question: question,
    user: user,
  };
}

export default connect(mapStateToProps)(QuestionListItem);

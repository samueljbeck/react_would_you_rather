import React, { Component } from 'react';
import { connect } from 'react-redux';
import QuestionListItem from './QuestionListItem';

class Home extends Component {
  constructor() {
    super();

    this.state = {
      answeredSelected: false,
    };

    this.toggleSelected = this.toggleSelected.bind(this);
  }

  toggleSelected(answered, e) {
    e.preventDefault();
    this.setState({ answeredSelected: answered });
  }

  render() {
    const answered = this.props.questions
      .filter(
        question =>
          question.optionOne.votes.includes(this.props.authedUser) ||
          question.optionTwo.votes.includes(this.props.authedUser)
      )
      .sort((a, b) => b.timestamp - a.timestamp);
    const unanswered = this.props.questions
      .filter(
        question =>
          !question.optionOne.votes.includes(this.props.authedUser) &&
          !question.optionTwo.votes.includes(this.props.authedUser)
      )
      .sort((a, b) => b.timestamp - a.timestamp);

    return (
      <div className="home-page">
        <div className="flex-row">
          <div
            className={
              this.state.answeredSelected
                ? 'home-page-qa home-page-question-answered home-page-qa-selected'
                : 'home-page-qa home-page-question-answered home-page-qa-unselected'
            }
            onClick={e => this.toggleSelected(true, e)}
          >
            ANSWERED
          </div>
          <div
            className={
              this.state.answeredSelected
                ? 'home-page-qa home-page-question-unanswered home-page-qa-unselected'
                : 'home-page-qa home-page-question-unanswered home-page-qa-selected'
            }
            onClick={e => this.toggleSelected(false, e)}
          >
            UNANSWERED
          </div>
        </div>
        <ul>
          {this.state.answeredSelected
            ? answered.map(question => (
                <li key={question.id}>
                  <QuestionListItem id={question.id} />
                </li>
              ))
            : unanswered.map(question => (
                <li key={question.id}>
                  <QuestionListItem id={question.id} />
                </li>
              ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, questions }, props) {
  return {
    authedUser,

    questions: Object.keys(questions).map(id => questions[id]),
  };
}

export default connect(mapStateToProps)(Home);

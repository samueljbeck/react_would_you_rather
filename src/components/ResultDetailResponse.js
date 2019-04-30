import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleSaveAnswer } from '../actions/questions';

class ResultDetailResponse extends Component {
  constructor() {
    super();

    this.state = {
      option: null,
    };

    this.handleOptionSelection = this.handleOptionSelection.bind(this);
  }

  handleSubmit = event => {
    event.preventDefault();
    const { authedUser, question } = this.props;
    const qid = question.id;
    const { option } = this.state;
    this.props.handleSaveAnswer({authedUser, qid, option});
  };

  handleOptionSelection(option, event) {
    event.preventDefault();
    this.setState({ option: option });
  }

  render() {
    const question = this.props.question;
    const user = this.props.users[question.author];

    return (
      <div className="question-item-holder">
        {question ? (
          <div>
            <div className="question-item-author">Asked by: {user ? user.name : ''}</div>
            <div className="flex-row">
              <img src={user ? user.avatarURL : ''} alt={`Avatar of ${user ? user.name : ''}`} className="avatar" />

              <div className="question-option-all-holder">
                <div>Would You Rather...</div>
                <form onSubmit={this.handleSubmit}>
                  <div
                    onClick={e => this.handleOptionSelection('optionOne', e)}
                    className="question-item-question-radio flex-row"
                  >
                    <input type="radio" name="option_one" readOnly={true} checked={this.state.option === 'optionOne'} />
                    <div className="margin-top-bottom-auto">{question.optionOne.text}</div>
                  </div>
                  <div
                    onClick={e => this.handleOptionSelection('optionTwo', e)}
                    className="question-item-question-radio flex-row"
                  >
                    <input type="radio" name="option_two" readOnly={true} checked={this.state.option === 'optionTwo'} />
                    <div className="margin-top-bottom-auto">{question.optionTwo.text}</div>
                  </div>
                  {this.state.option ? (
                    <button name="submit">
                      Submit
                    </button>
                  ) : (
                    ''
                  )}
                </form>
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
    authedUser: authedUser,
    question: questions[id.id],
    users: users,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleSaveAnswer: (answer) => {
      return dispatch(handleSaveAnswer(answer));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultDetailResponse);

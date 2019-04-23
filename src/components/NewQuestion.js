import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleSaveQuestion } from '../actions/questions';
import { Redirect } from 'react-router-dom';

class NewQuestion extends Component {
  constructor() {
    super();

    this.state = {
      optionOne: '',
      optionTwo: '',
      toHome: false,
    };
  }

  optionOneChange = e => {
    const optionOne = e.target.value;
    this.setState(() => ({
      optionOne,
    }));
  };

  optionTwoChange = e => {
    const optionTwo = e.target.value;
    this.setState(() => ({
      optionTwo,
    }));
  };

  handleSubmit = event => {
    event.preventDefault();
    const optionOneText = this.state.optionOne;
    const optionTwoText = this.state.optionTwo;
    const author = this.props.authedUser;

    this.props.dispatch(handleSaveQuestion({ optionOneText, optionTwoText, author }));

    this.setState(() => ({
      optionOne: '',
      optionTwo: '',
      toHome: true,
    }));
  };

  render() {
    const { optionOne, optionTwo, toHome } = this.state;
    
    if (toHome === true) {
      return <Redirect to="/" />;
    }

    return (
      <div className="question-item-holder center new-question-holder">
        <div className="new-question-title">Create New Question</div>
        <div className="new-question-complete">Complete the question:</div>
        <div>Would you rather...</div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <textarea
              placeholder="Enter Option One Text Here"
              value={optionOne}
              onChange={this.optionOneChange}
              maxLength={120}
            />
          </div>
          <div>or</div>
          <div>
            <textarea
              placeholder="Enter Option Two Text Here"
              value={optionTwo}
              onChange={this.optionTwoChange}
              maxLength={120}
            />
          </div>
          <button type="submit" disabled={optionOne === '' || optionTwo === ''}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser: authedUser,
  };
}

export default connect(mapStateToProps)(NewQuestion);

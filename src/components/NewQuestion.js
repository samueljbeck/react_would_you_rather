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

  handleOptionChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

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
              name="optionOne"
              onChange={this.handleOptionChange}
              maxLength={120}
            />
          </div>
          <div>or</div>
          <div>
            <textarea
              placeholder="Enter Option Two Text Here"
              value={optionTwo}
              name="optionTwo"
              onChange={this.handleOptionChange}
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

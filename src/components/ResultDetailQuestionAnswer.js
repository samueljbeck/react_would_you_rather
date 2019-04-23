import React, { Component } from 'react';
import { connect } from 'react-redux';
import selected from '../selected.svg';

class ResultDetailQuestionAnswer extends Component {
  render() {
    const option = this.props.option;
    const optionIndicator = { width: (option.votes.length / option.totalVotes) * 100 + '%' };

    return (
        <div className=" question-option-holder">
            {option.votes.includes(this.props.authedUser) ? (
                <img src={selected} className="selected" alt="selected" />
            ) : (
                ''
            )}
            <div className="question-item-question-detail">{option.text}</div>
            <div className="option-indicator-holder">
                <div style={optionIndicator} className="option-indicator">
                {(option.votes.length / option.totalVotes) * 100}%
                </div>
            </div>
            <div className="question-item-question-count">
                {option.votes.length} of {option.totalVotes}
            </div>
        </div>
    );
  }
}

function mapStateToProps({ authedUser }, option) {
  return {
    authedUser,
    option: option.option,
  };
}

export default connect(mapStateToProps)(ResultDetailQuestionAnswer);

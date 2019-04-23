import React, { Component } from 'react';
import { connect } from 'react-redux';
import ResultDetailQuestion from './ResultDetailQuestion'
import ResultDetailResponse from './ResultDetailResponse'
import NoMatch from './NoMatch'

class ResultDetail extends Component {
  render() {
    const question = this.props.question;
    const answered = question ? (question.optionOne.votes.includes(this.props.authedUser) || question.optionTwo.votes.includes(this.props.authedUser)) : null
    return (
      <div>
          {
              question ?
                answered ?
                    <ResultDetailQuestion id={question.id}/>
                :
                    <ResultDetailResponse id={question.id}/>
              :
                <NoMatch />
          }
       
        
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }, props) {
  const id = props.match.params.question_id;
  const user = users[authedUser];
  return {
    authedUser,
    question: questions[id],
    user: user,
  };
}

export default connect(mapStateToProps)(ResultDetail);

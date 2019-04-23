import { GET_QUESTIONS, SAVE_RESPONSE, SAVE_QUESTION} from '../actions/questions';

export default function questions(state = {}, action) {
  switch (action.type) {
    case GET_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };

    case SAVE_RESPONSE:
      return {
        ...state,
        [action.answer.qid]: {
          ...state[action.answer.qid],
          optionOne: {
            ...state[action.answer.qid].optionOne,
            votes:
              action.answer.option === 'optionOne'
                ? state[action.answer.qid].optionOne.votes.concat([action.answer.authedUser])
                : state[action.answer.qid].optionOne.votes,
          },
          optionTwo: {
            ...state[action.answer.qid].optionTwo,
            votes:
              action.answer.option === 'optionTwo'
                ? state[action.answer.qid].optionTwo.votes.concat([action.answer.authedUser])
                : state[action.answer.qid].optionTwo.votes,
          },
        },
      };

    case SAVE_QUESTION:
      return {
        ...state,
        [action.formattedQuestion.id]: action.formattedQuestion,
      };

    default:
      return state;
  }
}

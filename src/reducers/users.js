import { GET_USERS } from '../actions/users';
import { SAVE_QUESTION_TO_USER, SAVE_ANSWER_TO_USER } from '../actions/questions';

export default function users(state = {}, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        ...action.users,
      };

    case SAVE_QUESTION_TO_USER:
      const question = action.question.formattedQuestion;
      return {
        ...state,
        [question.author]: {
          ...state[question.author],
          questions: state[question.author].questions.concat(question.id),
        },
      };

    case SAVE_ANSWER_TO_USER:
      console.log(action);
      const authedUser = action.answer.authedUser;
      const option = action.answer.option;
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: Object.assign(state[authedUser].answers, { authedUser, option }),
        },
      };

    default:
      return state;
  }
}

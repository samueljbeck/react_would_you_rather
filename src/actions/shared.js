import { getInitialData } from '../utils/api';
import { getUsers } from './users';
import { getQuestions } from './questions';

export function handleInitialData() {
  return dispatch => {
    //TODO: add loading

    return getInitialData().then(({ users, questions }) => {
      dispatch(getUsers(users));
      dispatch(getQuestions(questions));
      //TODO: remove loading
    });
  };
}

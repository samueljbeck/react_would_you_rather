import { saveAnswer, saveQuestion } from '../utils/api';

export const GET_QUESTIONS = 'GET_QUESTIONS';
export const SAVE_RESPONSE = 'SAVE_RESPONSE';
export const SAVE_QUESTION = 'SAVE_QUESTION';
export const SAVE_QUESTION_TO_USER = 'SAVE_QUESTION_TO_USER';
export const SAVE_ANSWER_TO_USER = 'SAVE_ANSWER_TO_USER';

export function getQuestions(questions) {
  return {
    type: GET_QUESTIONS,
    questions,
  };
}

function saveNewAnswer(answer) {
  return {
    type: SAVE_RESPONSE,
    answer,
  };
}

function saveNewAnswerToUser(answer) {
   return {
     type: SAVE_ANSWER_TO_USER,
     answer,
   }
}

export function handleSaveAnswer(answer) {
  return dispatch => {
    return saveAnswer(answer)
    .then(() => dispatch(saveNewAnswer(answer)))
    .then(() => dispatch(saveNewAnswerToUser(answer)));
  };
}

function saveNewQuestion(formattedQuestion) {
  return {
    type: SAVE_QUESTION,
    formattedQuestion,
  };
}

function saveNewQuestioToUser(question) {
  return {
    type: SAVE_QUESTION_TO_USER,
    question,
  };
}

export function handleSaveQuestion(question) {
  return dispatch => {
    return saveQuestion(question)
      .then(formattedQuestion => dispatch(saveNewQuestion(formattedQuestion)))
      .then(formattedQuestion => dispatch(saveNewQuestioToUser(formattedQuestion)));
  };
}

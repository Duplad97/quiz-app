import { combineReducers } from 'redux';
import { SAVE, DELETE_QUESTION, ANSWER, NEXT_QUESTION, RESET, ADD_SCORE, RESET_SCORES } from './actions';
import { getInitialState, save, deleteQuestion, answer, nextQuestion, addNewScore, resetHighscores } from './functions';

const questionsReducer = (state = [], action) => {
    switch (action.type) {
        case SAVE:
            return save(state, action.payload);
        case DELETE_QUESTION:
            return deleteQuestion(state, action.payload);
        default:
            return state;
    }
}

const activeQuestionsReducer = (state = [], action) => {
    if (action.type === NEXT_QUESTION) {
        return nextQuestion(state, action.payload);
    }
    return state;
}

const pointsReducer = (state = 0, action) => {
    if (action.type === ANSWER) {
        return answer(state, action.payload);
    }
    return state;
}

const highscoresReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_SCORE:
            return addNewScore(state, action.payload);
        case RESET_SCORES:
            return resetHighscores(state);
        default:
            return state;
    }
}

const combineReducer = combineReducers({
    questions: questionsReducer,
    activeQuestions: activeQuestionsReducer,
    points: pointsReducer,
    highscores: highscoresReducer,
});

const resetReducer = (state, action) => {
    if (action.type === RESET) {
        return getInitialState();
    }
    return state;
}

const rootReducer = (state, action) => {
    const gameState = combineReducer(state, action);
    const actualState = resetReducer(gameState, action);
    return actualState;
}

export default rootReducer;

//Selectors
export const getQuestions = ({ questions }) => ({
    questions: questions
});

export const getActiveQuestions = ({ activeQuestions }) => ({
    activeQuestions: activeQuestions
});

export const getPoints = ({ points }) => ({
    points: points
});

export const getHighscores = ({ highscores }) => ({
    highscores: highscores
})

export const getState = ({ questions, activeQuestions, points, highscores }) => ({
    questions: questions,
    activeQuestions: activeQuestions,
    points: points,
    highscores: highscores,
})
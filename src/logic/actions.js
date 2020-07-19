//Quiz Handler actions
export const SAVE = 'SAVE';
export const DELETE_QUESTION = 'DELETE_QUESTION';

//Game actions
export const ANSWER = 'ANSWER';
export const NEXT_QUESTION = 'NEXT_QUESTION';

export const RESET = 'RESET';

export const ADD_SCORE = 'ADD_SCORE';
export const RESET_SCORES = 'RESET_SCORES';

//Action creators
export const save = payload => ({
    type: SAVE,
    payload: payload,
});

export const delete_question = payload => ({
    type: DELETE_QUESTION,
    payload: payload,
});

export const answer = payload => ({
    type: ANSWER,
    payload: payload,
})

export const next_question = payload => ({
    type: NEXT_QUESTION,
    payload: payload,
})

export const reset = () => ({
    type: RESET,
})

export const addScore = payload => ({
    type: ADD_SCORE,
    payload: payload,
})

export const resetScores = () => ({
    type: RESET_SCORES,
})
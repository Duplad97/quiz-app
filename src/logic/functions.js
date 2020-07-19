//Starting state
const getQuestions = () => {
    let questions = [];
    if (localStorage.getItem('questions')) {
        questions = JSON.parse(localStorage.getItem('questions'));
    }

    return questions;
}

const getHighscores = () => {
    let highscores = [];
    if (localStorage.getItem('quiz_scores')) {
        highscores = JSON.parse(localStorage.getItem('quiz_scores'));
    }

    highscores.sort(function(a,b) {
        return b.score - a.score;
    });

    return highscores;
}

export const getInitialState = () => ({
    questions: getQuestions(),
    activeQuestions: getQuestions(),
    points: 0,
    highscores: getHighscores(),
})

//Functions
export function save(questions, payload) {
    let array = [];

    if (!localStorage.getItem('questions')) {
        array.push(payload);
        const toSave = JSON.stringify(array);
        localStorage.setItem('questions', toSave);
    }
    else {
        array = JSON.parse(localStorage.getItem('questions'));
        array.push(payload);
        const toSave = JSON.stringify(array);
        localStorage.setItem('questions', toSave);
    }

    const data = localStorage.getItem('questions');
    questions = JSON.parse(data);

    return questions;
}

export function deleteQuestion(questions, payload) {
    let array = JSON.parse(localStorage.getItem('questions'));
    let index = 0;

    for (let i = 0; i < array.length; i++) {
        if (array[i].id === payload) {index = i}
    }

    array.splice(index, 1);
    const toSave = JSON.stringify(array);
    localStorage.setItem('questions', toSave);

    const data = localStorage.getItem('questions');
    questions = JSON.parse(data);


    return questions;
}

export function answer(points, payload) {
    if (payload.selected === payload.correct) points++;

    return points;
}

export function nextQuestion(activeQuestions, payload) {
    let index = 0;

    for (let i = 0; i < activeQuestions.length; i++) {
        if (activeQuestions[i].id === payload) {index = i}
    }

    activeQuestions.splice(index, 1);

    return activeQuestions;
}

export function addNewScore(highscores, payload) {
    let array = [];

    if (!localStorage.getItem('quiz_scores')) {
        array.push(payload);
        const toSave = JSON.stringify(array);
        localStorage.setItem('quiz_scores', toSave);
    }
    else {
        array = JSON.parse(localStorage.getItem('quiz_scores'));
        array.push(payload);
        const toSave = JSON.stringify(array);
        localStorage.setItem('quiz_scores', toSave);
    }

    const data = localStorage.getItem('quiz_scores');
    highscores = JSON.parse(data);

    return highscores;
}

export function resetHighscores(highscores) {

    localStorage.removeItem('quiz_scores');
    highscores = [];
    
    return highscores;
}
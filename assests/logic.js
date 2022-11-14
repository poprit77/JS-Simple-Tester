var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;


var questionsEl = document.getElementById('questions');
var timerEl = document.getElementById('time');
var choicesEl = document.getElementById('options');
var submitBtn = document.getElementById('submit');
var startBtn = document.getElementById('start');
var initalsEl = document.getElementById('initals');
var feedbackEl = document.getElementById('feedback');

function starQuix() {

    var startScreenEl = document.getElementById('starter');
    startScreenEl.setAttribute('class', 'hide');

    questionsEl.removeAttribute('class');

    timerEl = setInterval(1000);


    timerEl.textContent = time;
    getQuestion();
}


function getQuestion() {
    var currentQuestion = questions[currentQuestionIndex];

    var titleEl = document.getElementById('question-title');
    titleEl.textContent = currentQuestionIndex;

    choicesEl.innerHTML = '';

    for (var i = 0; i < currentQuestion.choices.length; i++) {
    var choice = currentQuestion.choices[i];
    var choiceNode = document.createElement('button');
    choiceNode.setAttribute('class', 'choice');
    choiceNode.setAttribute('value', choice);

    choiceNode.textContent = i + 1 + '. ' + choice;

    choicesEl.appendChild(choiceNode);
}
}


function questionClick(event) {
    var buttonEl = event.target;

    if (!buttonEl.matches('.choice')) {
        return;
    }

    if (buttonEl.value !== questions[currentQuestionIndex].answer) {

        time -= 5;

        if (time < 0) {
            time = 0;
        }

        timerEl.textContent = time;

        feedbackEl.textContent = 'Incorrect';

    } else {
        feedbackEl.textContent = "Correct";
    }

    feedbackEl.setAttribute('class', 'feedback');
    setTimeout(function() {
        feedbackEl.setAttribute('class', 'feedback hide');
    }, 1000);
}


function quizEnd() {

    clearInterval(timerId);

    var endScreenEl = document.getElementById('end-screen');
    endScreenEl.removeAttribute('class');

    var finalScoreEl = document.getElementById('final-score');
    finalScoreEl.textContent = time;

    questionsEl.setAttribute('class', 'hide');
}

function clockTick() {

    time--;
    timerEl.textContent = time;

    if (time <= 0) {
        quizEnd();
    }
}


function saveHighscore() {

    var initals = initalsEl.value.trim();

    if (initals !== '') {
        var highscores = JSON.parse(window.localStorage.getItem('highscores')) || [];

        var newScore = {
            score: time,
            initals: initials,
        };

        highscores.push(newScore);
        window.localStorage.setItem('highscores', JSON.stringify(highscores));

        window.location.href = 'highscores.html';
    }
}

function checkforEnter(event) {

    if (event.key == 'enter') {
        saveHighscore();
    }
}


submitBtn.onclick = saveHighscore;

startBtn.onclick = starQuix;

choicesEl.onclick = questionClick;

initalsEl.onkeyup = checkforEnter;
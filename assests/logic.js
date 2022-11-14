

var questions = [
    {
        Question:"javascript is a _________ language",
        choices: ['object-orientated', 'object-based', 'procedural', 'None of the above'],
    answer: 'object-orientated',
    },
{
    Question: 'Which of the following keywords is used to define a variable in Javascript?',
        choices: ['var', 'let', 'Both A and B', 'div'],
            answer: 'Both A and B',
    },
{
    Question: 'Which of the following methods is used to access HTML elements using Javascript?',
        choices: ['getElementbyID()', 'getElemnetbyClassName()', 'Both A and B', 'script'],
            answer: 'Both A and B',
    },
{
    Question: 'Upon encountering empty statements, what does the Javascript Interpreter do?',
        choices: ['Throws and error', 'Ignores the statements', 'gives a warning', 'nothing'],
            answer: 'Ignores the statements',
    },
{
    Question: 'Which of the following methods can be used to display data in some form using Javascript?',
        choices: ['document.write()', 'console.log()', 'window.alert()', 'All of the above'],
            answer: 'All of the above',
    },
{
    Question: 'How can a datatype be declared to be a constant type?',
        choices: ['const', 'var', 'let', 'constant'],
            answer: 'const',
    },
{
    Question: 'Which of the following are closures in Javascript?',
        choices: ["variables", 'Functions', 'Objects', 'All of the above'],
            answer: 'All of the above',
    },
{
    Question: 'How to stop an interval timer in Javascript?',
        choices: ['clearInterval', 'clearTimer', 'intervalOver', 'None of the above'],
            answer: 'clearInterval'
}

];

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


setInterval(clockTick, 1000)
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
        var end = document.getElementById('end-screen')
        end.setAttribute('hidden', 'true');
        choiceNode.textContent = i + 1 + '. ' + choice;
        var end2 = document.getElementById('starter')
        end2.setAttribute('hidden', 'true');
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

    currentQuestionIndex++;

    if (time <= 0 || currentQuestionIndex === questions.length) {
        quizEnd();
    }else{
        getQuestion();
    }
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
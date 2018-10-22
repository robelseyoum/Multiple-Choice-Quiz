/* 
start
quiz
qImg
question
choiceA 
counter
timeGauge
progress
score
 */

//SELECTING ELEMENT BY ID
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");

const qImage = document.getElementById("qImage"); 
const question = document.getElementById("question");
const counter = document.getElementById("counter");
const btimeGauge = document.getElementById("btimeGauge");
const timeGauge = document.getElementById("timeGauge");

const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const progress = document.getElementById("progress");
const scoreCont = document.getElementById("scoreContainer");



//CREATING THE QUESTIONS

let questions = [
    {
        question: "What does HTML stand for?",
        imgSrc: "img/html.png",
        choiceA: "Correct",
        choiceB: "Wrong",
        choiceC: "Wrong",
        correct: "A"
    },
    {
        question: "What does CSS stand for?",
        imgSrc: "img/css.png",
        choiceA: "Wrong",
        choiceB: "Correct",
        choiceC: "Wrong",
        correct: "B"
    },
    {
        question: "What does JS stand for?",
        imgSrc: "img/js.png",
        choiceA: "Wrong",
        choiceB: "Wrong",
        choiceC: "Corrent",
        correct: "C"
    },
];


//CREATE SOME VARIABLES
let lastQuestionIndex = questions.length - 1;
let runningQuestionIndex = 0;
const questionTime = 10;
const gaugeWidth = 150;
let count = 0;
const gaugeProgressUnit = gaugeWidth/questionTime;
let TIMER;
let score = 0;



start.addEventListener("click", startQuiz);

//START QUIZ
function startQuiz() {
    start.style.display = "none";
    renderQuestions();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setTimeout(renderCounter, 1000);
    /* 
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter, 1000); 
    */
}

//RENDER QUESTIONS
function renderQuestions() {
    let q = questions[runningQuestionIndex];
    qImg.innerHTML = "<img src="+q.imgSrc+">";
    question.innerHTML = "<p>"+q.question+"</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}


//RENDER PROGRESS
function progressRender() {
    for(let qIndex = 0; qIndex <= lastQuestionIndex; qIndex++){
        progress.innerHTML += "<div class='prog' id="+qIndex+"></div>";
    }
}


//SCORERENDER
function scoreRender() {
    scoreCont.style.display = "block";
    let scorePerCent = Math.round(100 * score/questions.length);
    let img = (scorePerCent >= 80) ? "img/5.png":
              (scorePerCent >= 60) ? "img/4.png":
              (scorePerCent >= 40) ? "img/3.png":
              (scorePerCent >= 20) ? "img/2.png": "img/1.png";

    scoreCont.innerHTML = "<img src="+img+"><p>"+scorePerCent+"%</p>";
}


//COUNTER RENDER
function counterRender() {
    if(count <= questions){
        counter.innerHTML = count;
        timeGauge.style.width = gaugeProgressUnit*count +"px";
        count++
    } else {
        count = 0;
        answerIsWrong();
        if(runningQuestionIndex < lastQuestionIndex){
            runningQuestionIndex++;
            renderQuestions();
        }else{
            clearInterval(TIMER);
            scoreRender();
        }
    }
}



//CHECK THE ANSWER
function checkAnswer(answer) {
    if(questions[runningQuestionIndex].correct == answer){
        score++;
        answerIsCorrect();
    } else {
        answerIsWrong();
    }
    if(runningQuestionIndex < lastQuestionIndex){
        count = 0;
        runningQuestionIndex++;
        renderQuestions();
    } else { 
        clearInterval(TIMER);
        scoreRender();
    }
}



//answer is wrong
function answerIsCorrect() {
    document.getElementById(runningQuestionIndex).style.backgroundColor = "green";
}

//answer is correct
function answerIsWrong() {
    document.getElementById(runningQuestionIndex).style.backgroundColor = "red";
}

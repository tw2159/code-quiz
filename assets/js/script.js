// References to ID elements
var timerDiv = document.getElementById("timer");
var highScores = document.getElementById("highScores");
var startButton = document.getElementById("startButton");
var startPage = document.getElementById("startPage");
var quizPage = document.getElementById("quizPage");
var quizPageQuestion = document.getElementById("quizPageQuestion");
var quizPageList = document.getElementById("quizPageList");
var quizScoreDisplay = document.getElementById("quizScoreDisplay");
var quizFinal = document.getElementById("quizFinal");
var quizAnswerStatus = document.getElementById("quizAnswerStatus");
var highScoresPage = document.getElementById("highScoresPage");
var highScoresInitals = document.getElementById("highScoresInitials");
var highScoresBackButton = document.getElementById("highScoresBackButton");
var highScoresClearButton = document.getElementById("highScoresClearButton");
var highScoresSubmitButton = document.getElementById("highScoresSubmitButton");
var highScoresList = document.getElementById("highScoresList");

// Variables
var interval;
var time = 75;
var score = 0;
var quizInProgress = false;
var currentQuestionNumber = 0;
var questions = [
   {
      title: "Commonly used data types do NOT include:",
      choices: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
      answer: "3. alerts"
   },
   {
      title: "The condition in an if / else statement is enclosed with __________.",
      choices: ["1. quotes", "2. curly brackets", "3. parenthesis", "4. square brackets"],
      answer: "3. parenthesis"
   },
   {
      title: "Arrays in JavaScript can be used to store ________.",
      choices: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
      answer: "4. all of the above"
   },
   {
      title: "String values must be enclosed within ________ when being assigned to variables.",
      choices: ["1. commas", "2. curly brackets", "3. quotes", "4. parenthesis"],
      answer: "3. quotes"
   },
   {
      title: "A very useful tool used during development and debugging for printing content to the debugger is:",
      choices: ["1. JavaScript", "2. terminal/bash", "3. for loops", "4. console log"],
      answer: "4. console log"
   },
];

function startTimer() {
   time -= 1;
   timerDiv.innerHTML = "Timer: " + time;

   if(time == 0) {
      stopTimer();
      quizEnd();
   }
}

function stopTimer() {
   clearInterval(interval);
}
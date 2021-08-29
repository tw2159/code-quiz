// References to ID elements
var timer = document.getElementById("timer");
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
var highScoresInitials = document.getElementById("highScoresInitials");
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
   timer.innerHTML = "Timer: " + time;

   if(time == 0) {
      stopTimer();
      quizEnd();
   }
}

function stopTimer() {
   clearInterval(interval);
}

function quizStart() {
   // Hide the Start Page; Display the Quiz Page
   startPage.classList.add("hide");
   quizPage.classList.remove("hide");

   quizInProgress = true;

   quizQuestionDisplay();
}

function quizQuestionDisplay() {
   var answerChoice1 = document.getElementById("answerChoice-1");
   var answerChoice2 = document.getElementById("answerChoice-2");
   var answerChoice3 = document.getElementById("answerChoice-3");
   var answerChoice4 = document.getElementById("answerChoice-4");

   // Display the Question and all the Answer Choices
   quizPageQuestion.innerHTML = questions[currentQuestionNumber].title;
   answerChoice1.value = questions[currentQuestionNumber].choices[0];
   answerChoice1.textContent = questions[currentQuestionNumber].choices[0];
   answerChoice1.addEventListener("click", quizAnswerCheck);
   answerChoice2.value = questions[currentQuestionNumber].choices[1];
   answerChoice2.textContent = questions[currentQuestionNumber].choices[1];
   answerChoice2.addEventListener("click", quizAnswerCheck);
   answerChoice3.value = questions[currentQuestionNumber].choices[2];
   answerChoice3.textContent = questions[currentQuestionNumber].choices[2];
   answerChoice3.addEventListener("click", quizAnswerCheck);
   answerChoice4.value = questions[currentQuestionNumber].choices[3];
   answerChoice4.textContent = questions[currentQuestionNumber].choices[3];
   answerChoice4.addEventListener("click", quizAnswerCheck);
}

function quizAnswerCheck() {
   var answer = event.target.value;
   var status = "";

   if(answer == questions[currentQuestionNumber].answer) {
      status = "Correct!"
   }
   else {
      status = "Wrong!"
      time -= 10;
   }

   quizAnswerStatus.innerHTML = status;
   quizAnswerStatus.classList.remove("hide");

   setTimeout(function() {
      quizAnswerStatus.classList.add("hide");
   }, 2000);

   if(currentQuestionNumber < questions.length - 1) {
      currentQuestionNumber++;
      quizQuestionDisplay();
   }
   else {
      quizEnd();
   }
}

function quizEnd() {
   quizPageQuestion.innerHTML = "All Done!";
   quizPageList.classList.add("hide");
   timer.classList.add("hide");
   quizFinal.classList.remove("hide");
   score = time;
   quizScoreDisplay.innerHTML = "Your final score is " + score;
}

function reset() {
   currentQuestionNumber = 0;
   stopTimer();
   time = 75;
   timer.innerHTML = "Timer: " + time;
   quizPageList.classList.remove("hide");
   timer.classList.remove("hide");
   quizFinal.classList.add("hide");
}

function highScoresSubmit() {
   quizInProgress = false;

   // Check to see if any input was entered
   if(highScoresInitials.value == "") {
      alert("Please enter your initials!");
   }
   else {
      // The final score details from the current quiz session
      var finalScoreDetails = {
         initials: highScoresInitials.value,
         score: score
      }

      // Retrieve the values from localStorage first (if they exist)
      var allScores = localStorage.getItem("allScores");

      if(allScores == null) {
         allScores = [];
      }
      else {
         allScores = JSON.parse(allScores);
      }

      // Add the final score details to the allScores variable, then record it in localStorage
      allScores.push(finalScoreDetails);
      allScores = JSON.stringify(allScores);
      localStorage.setItem("allScores", allScores);
      highScoresDisplay();
   }
}

function highScoresDisplay() {
   // Hide the Start Page and Quiz Page; display the High Scores Page
   startPage.classList.add("hide");
   quizPage.classList.add("hide");
   highScoresPage.classList.remove("hide");

   // Get the scores from localStorage
   var allScores = localStorage.getItem("allScores");
   allScores = JSON.parse(allScores);

   // Sort scores from highest to lowest
   allScores = allScores.sort(function(a, b) { return b.score - a.score; });

   // Clear the contents of the High Score List
   highScoresList.innerHTML = "";

   // Populate the High Score List
   if(allScores !== null) {
      for(var i = 0; i < allScores.length; i++) {
         var listItem = document.createElement("li");
         listItem.textContent = (i+1) + ". " + allScores[i].initials + " - " + allScores[i].score;
         highScoresList.append(listItem);
      }
   }
}

function highScoresBack() {
   highScoresPage.classList.add("hide");

   if(quizInProgress == true) {
      startPage.classList.add("hide");
      quizPage.classList.remove("hide");
   }
   else {
      reset();
      quizPage.classList.add("hide");
      startPage.classList.remove("hide");
   }
}

function highScoresClear() {
   // Clear localStorage
   localStorage.clear();

   // Clear the contents of the High Score List
   highScoresList.innerHTML = "";
}
import { displayQuestion, handleNextButtonClick, updateProgress } from "../utils.js";
import { questions } from "./questions.js";

const deps = {
  quizBox: document.getElementById("all-questions"),
  nextButton: document.getElementById("next-button"),
  finishButton: document.getElementById("finish-button"),
  restartButton: document.getElementById("restart-button"),
  score: document.getElementById("score"),
  endOfQuiz: document.querySelector(".end-of-questions"),
  questionNumber: document.querySelector(".question-number"),
  questionDifficulty: document.querySelector(".question-difficulty"),
  progressWrapper: document.querySelector(".progress-wrapper"),
  progressFill: document.getElementById("progress-fill"),
  progressStart: document.querySelector(".progress-start"),
  progressEnd: document.getElementById("progress-end"),
  answerReview: document.querySelector(".answer-review")
};

const quizState = {
  currentQuestionIndex: 0,
  scoreCount: 0,
  isQuizOver: false,
  correctAnswers: [],
  wrongAnswers: [],
};

deps.nextButton.addEventListener("click", () => {
  handleNextButtonClick(quizState, questions, deps);
});

deps.finishButton.addEventListener("click", () => {
  handleNextButtonClick(quizState, questions, deps);
});

displayQuestion(quizState, questions, deps);
updateProgress(quizState, questions, deps);


export function renderEndScreen(quizState, questions, deps) {
  const { quizBox, finishButton, score, endOfQuiz, questionNumber, questionDifficulty, answerReview} = deps;
  quizState.isQuizOver = true;

  questionNumber.innerHTML = ""
  questionDifficulty.innerHTML = ""
  questionDifficulty.classList.remove("difficulty-easy", "difficulty-medium", "difficulty-hard");
  endOfQuiz.innerHTML = "";
  quizBox.innerHTML = "";


  const endQuizSubTitle = document.createElement("p");
  endQuizSubTitle.textContent = "QUIZ COMPLETE";
  endQuizSubTitle.className="endQuizSubTitle"

  const endOfQuizDescription = document.createElement("p");
  endOfQuizDescription.textContent = "You made it to the end.";
  endOfQuizDescription.className="endOfQuizDescription"


  const scoreTitle = document.createElement("p")
  scoreTitle.textContent = "Here's how you did on this round";
  scoreTitle.className="scoreTitle"

  const scoreDisplay = document.createElement("div");
  scoreDisplay.className = "scoreDisplay"
  const scoreGraph = document.createElement("p")
  scoreGraph.textContent = "score graph"
  score.textContent = `Your score is ${quizState.scoreCount}`;
  const scoreDiv = document.createElement("div");
  scoreDiv.className = "scoreDiv"
  scoreDisplay.append(score, scoreGraph)
  scoreDiv.append(scoreTitle, scoreDisplay)



  // Answer section

  const answerReviewTitle = document.createElement('p')
  answerReviewTitle.textContent = "See what you know"
answerReviewTitle.className = "answerReviewTitle"
  answerReview.appendChild(answerReviewTitle)

  const correctAnswersBtn = document.createElement("button");
  correctAnswersBtn.textContent = "View Correct Answers";
  correctAnswersBtn.addEventListener("click", () => {
    handleDisplayCorrectAnswers(quizState, quizBox, deps);
  }, {once:true});

  const wrongAnswersBtn = document.createElement("button");
  wrongAnswersBtn.textContent = "View Wrong Answers";
  wrongAnswersBtn.addEventListener("click", () => {
    handleDisplayWrongAnswers(quizState, quizBox, deps);
  }, { once: true });



  deps.restartButton.addEventListener("click", () => {
    handleRestartButtonClick(quizState, questions, deps);
  });
  deps.restartButton.style.display="block"
deps.progressWrapper.style.display = "none"
  endOfQuiz.append( endQuizSubTitle, endOfQuizDescription, scoreDiv, correctAnswersBtn, wrongAnswersBtn, );
  finishButton.style.display = "none"



}


export function handleDisplayCorrectAnswers(quizState, quizBox, deps) {
  const { endOfQuiz } = deps
  quizBox.innerHTML = "";

  const correctAnsTtitle = document.createElement("p");
  correctAnsTtitle.textContent = "Answers you got right";
  endOfQuiz.appendChild(correctAnsTtitle);

  quizState.correctAnswers.forEach((correctAnswer) => {
    const correctAnsDiv = document.createElement("div");
    correctAnsDiv.setAttribute("id", correctAnswer.id);
    const correctAnsQuiz = document.createElement("p");
    correctAnsQuiz.textContent = correctAnswer.question;
    correctAnsDiv.appendChild(correctAnsQuiz);
    endOfQuiz.appendChild(correctAnsDiv);
  });
}

export function handleDisplayWrongAnswers(quizState, quizBox, deps) {
  quizBox.innerHTML = "";
  const { endOfQuiz } = deps

  const wrongAnsTtitle = document.createElement("p");
  wrongAnsTtitle.textContent = "Answers you got wrong";
  endOfQuiz.appendChild(wrongAnsTtitle);

  quizState.wrongAnswers.forEach((wrongAnswer) => {
    const wrongAnsDiv = document.createElement("div");
    wrongAnsDiv.setAttribute("id", wrongAnswer.id);
    const wrongAnsQuiz = document.createElement("p");
    wrongAnsQuiz.textContent = wrongAnswer.question;
    wrongAnsDiv.appendChild(wrongAnsQuiz);
    endOfQuiz.appendChild(wrongAnsDiv);
  });
}


function handleRestartButtonClick(quizState, questions, deps) {
  const { quizBox, finishButton, score, endOfQuiz } = deps;
  quizState.currentQuestionIndex = 0;
  quizState.scoreCount = 0;
  quizState.isQuizOver = false;
  quizState.correctAnswers.length = 0;
  quizState.wrongAnswers.length = 0;
  score.textContent = "";
  finishButton.style.display = "none";
  quizBox.innerHTML = "";
  endOfQuiz.innerHTML = "";

  questions.forEach((questionItem) => {
    questionItem.isAnswered = false;
    questionItem.selectedAns = "";
  });
  deps.restartButton.style.display="none"
  deps.progressWrapper.style.display = "flex"
  displayQuestion(quizState, questions, deps);
  updateProgress(quizState, questions, deps);

}

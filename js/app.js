import { displayQuestion, handleNextButtonClick, updateProgress } from "../utils.js";
import { questions } from "./questions.js";

const deps = {
  quizBox: document.getElementById("all-questions"),
  nextButton: document.getElementById("next-button"),
  finishButton: document.getElementById("finish-button"),
  scoreDisplay: document.getElementById("score"),
  endOfQuiz: document.querySelector(".end-of-questions"),
  questionNumber: document.querySelector(".question-number"),
  questionDifficulty: document.querySelector(".question-difficulty"),
  progressFill: document.getElementById("progress-fill"),
  progressStart: document.querySelector(".progress-start"),
  progressEnd: document.getElementById("progress-end"),
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
  const { quizBox, finishButton, scoreDisplay, endOfQuiz, questionNumber, questionDifficulty} = deps;
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

  scoreDisplay.textContent = `Your score is ${quizState.scoreCount}`;
  scoreDisplay.className = "scoreDisplay"

  const scoreDiv = document.createElement("div");
  scoreDiv.className = "scoreDiv"
  scoreDiv.appendChild(scoreTitle)
  scoreDiv.appendChild(scoreDisplay)

  const correctAnswersBtn = document.createElement("button");
  correctAnswersBtn.textContent = "Correct Answers";
  correctAnswersBtn.addEventListener("click", () => {
    handleDisplayCorrectAnswers(quizState, quizBox);
  });

  const wrongAnswersBtn = document.createElement("button");
  wrongAnswersBtn.textContent = "Wrong Answers";
  wrongAnswersBtn.addEventListener("click", () => {
    handleDisplayWrongAnswers(quizState, quizBox);
  });

  const restartButton = document.createElement("button");
  restartButton.textContent = "Restart Quiz";
  restartButton.addEventListener("click", () => {
    handleRestartButtonClick(quizState, questions, deps);
  });

  endOfQuiz.append(endQuizSubTitle, endOfQuizDescription, scoreDiv, restartButton, correctAnswersBtn, wrongAnswersBtn, );
  finishButton.style.display = "none"
}


export function handleDisplayCorrectAnswers(quizState, quizBox) {
  quizBox.innerHTML = "";

  const correctAnsTtitle = document.createElement("h5");
  correctAnsTtitle.textContent = "Answers you got right";
  quizBox.appendChild(correctAnsTtitle);

  quizState.correctAnswers.forEach((correctAnswer) => {
    const correctAnsDiv = document.createElement("div");
    correctAnsDiv.setAttribute("id", correctAnswer.id);
    const correctAnsQuiz = document.createElement("p");
    correctAnsQuiz.textContent = correctAnswer.question;
    correctAnsDiv.appendChild(correctAnsQuiz);
    quizBox.appendChild(correctAnsDiv);
  });
}

function handleRestartButtonClick(quizState, questions, deps) {
  const { quizBox, finishButton, scoreDisplay, endOfQuiz } = deps;
  quizState.currentQuestionIndex = 0;
  quizState.scoreCount = 0;
  quizState.isQuizOver = false;
  quizState.correctAnswers.length = 0;
  quizState.wrongAnswers.length = 0;
  scoreDisplay.textContent = "";
  finishButton.style.display = "none";
  quizBox.innerHTML = "";
  endOfQuiz.innerHTML = "";

  questions.forEach((questionItem) => {
    questionItem.isAnswered = false;
    questionItem.selectedAns = "";
  });

  displayQuestion(quizState, questions, deps);
  updateProgress(quizState, questions, deps);
}

export function handleDisplayWrongAnswers(quizState, quizBox) {
  quizBox.innerHTML = "";

  const wrongAnsTtitle = document.createElement("h5");
  wrongAnsTtitle.textContent = "Answers you got wrong";
  quizBox.appendChild(wrongAnsTtitle);

  quizState.wrongAnswers.forEach((wrongAnswer) => {
    const wrongAnsDiv = document.createElement("div");
    wrongAnsDiv.setAttribute("id", wrongAnswer.id);
    const wrongAnsQuiz = document.createElement("p");
    wrongAnsQuiz.textContent = wrongAnswer.question;
    wrongAnsDiv.appendChild(wrongAnsQuiz);
    quizBox.appendChild(wrongAnsDiv);
  });
}

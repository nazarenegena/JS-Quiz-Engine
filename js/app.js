import { displayQuestion, handleNextButtonClick, updateProgress } from "../utils.js";
import { questions } from "./questions.js";

const deps = {
  quizBox: document.getElementById("all-questions"),
  nextButton: document.getElementById("next-button"),
  finishButton: document.getElementById("finish-button"),
  scoreDisplay: document.getElementById("score"),
  endOfQuiz: document.getElementById("end-of-questions"),
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

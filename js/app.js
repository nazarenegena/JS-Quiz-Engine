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
  answerReview: document.querySelector(".answer-review"),
  answersList: null,
};

const quizState = {
  currentQuestionIndex: 0,
  scoreCount: 0,
  isQuizOver: false,
  correctAnswers: [],
  wrongAnswers: [],
  answerType: "all",
};

deps.nextButton.addEventListener("click", () => {
  handleNextButtonClick(quizState, questions, deps);
});

deps.finishButton.addEventListener("click", () => {
  handleNextButtonClick(quizState, questions, deps);
});

deps.restartButton.addEventListener("click", () => {
  handleRestartButtonClick(quizState, questions, deps);
});

displayQuestion(quizState, questions, deps);
updateProgress(quizState, questions, deps);


export function renderEndScreen(quizState, questions, deps) {
  const {
    quizBox,
    finishButton,
    score,
    endOfQuiz,
    questionNumber,
    questionDifficulty,
    answerReview,
    restartButton,
    progressWrapper,
  } = deps;

  quizState.isQuizOver = true;
  quizState.answerType = "all";

  questionNumber.innerHTML = "";
  questionDifficulty.innerHTML = "";
  questionDifficulty.classList.remove("difficulty-easy", "difficulty-medium", "difficulty-hard");
  endOfQuiz.innerHTML = "";
  quizBox.innerHTML = "";
  answerReview.innerHTML = "";

  const endQuizSubTitle = document.createElement("p");
  endQuizSubTitle.textContent = "QUIZ COMPLETE";
  endQuizSubTitle.className = "endQuizSubTitle";

  const endOfQuizDescription = document.createElement("p");
  endOfQuizDescription.textContent = "You made it to the end.";
  endOfQuizDescription.className = "endOfQuizDescription";

  const scoreTitle = document.createElement("p");
  scoreTitle.textContent = "Here's how you did on this round";
  scoreTitle.className = "scoreTitle";

  const scoreDisplay = document.createElement("div");
  scoreDisplay.className = "scoreDisplay";
  const scoreGraph = document.createElement("p");
  scoreGraph.textContent = "score graph";
  score.textContent = `Your score is ${quizState.scoreCount}`;

  const scoreDiv = document.createElement("div");
  scoreDiv.className = "scoreDiv";
  scoreDisplay.append(score, scoreGraph);
  scoreDiv.append(scoreTitle, scoreDisplay);

  // Answer section
  const answerReviewBtns = document.createElement("div");
  answerReviewBtns.className = "answerReviewBtns";

  const allAnswersBtn = document.createElement("button");
  allAnswersBtn.textContent = "All Answers";
  allAnswersBtn.className = "answersBtn active";
  allAnswersBtn.dataset.answerType = "all";
  allAnswersBtn.addEventListener("click", () => {
    handleAnsToggle(quizState, "all", deps);
  });

  const correctAnswersBtn = document.createElement("button");
  correctAnswersBtn.textContent = "Correct Answers";
  correctAnswersBtn.className = "answersBtn";
  correctAnswersBtn.dataset.answerType = "correct";
  correctAnswersBtn.addEventListener("click", () => {
    handleAnsToggle(quizState, "correct", deps);
  });

  const wrongAnswersBtn = document.createElement("button");
  wrongAnswersBtn.textContent = "Wrong Answers";
  wrongAnswersBtn.className = "answersBtn";
  wrongAnswersBtn.dataset.answerType = "wrong";
  wrongAnswersBtn.addEventListener("click", () => {
    handleAnsToggle(quizState, "wrong", deps);
  });

  answerReviewBtns.append(allAnswersBtn, correctAnswersBtn, wrongAnswersBtn);
  answerReview.append(answerReviewBtns);

  const answersList = document.createElement("div");
  answersList.className = "answers-list";
  deps.answersList = answersList;

  endOfQuiz.append(endQuizSubTitle, endOfQuizDescription, scoreDiv, answerReview, answersList);
  finishButton.style.display = "none";
  restartButton.style.display = "block";
  progressWrapper.style.display = "none";

  displayAnswers(quizState, deps);
}


export function displayAnswers(quizState, deps) {
  const { answersList } = deps;
  if (!answersList) return;
  answersList.innerHTML = "";

  const renderList = (titleText, answers, type) => {
    const title = document.createElement("p");
    title.textContent = titleText;
    title.className = "answersTitle";
    answersList.appendChild(title);

    if (answers.length === 0) {
      const empty = document.createElement("p");
      empty.className = "answer-item-empty";
      empty.textContent = "No answers in this list.";
      answersList.appendChild(empty);
      return;
    }

    answers.forEach((answeredQuestion) => {
      const item = document.createElement("div");
      item.className = `answer-item answer-item--${type}`;
      item.id = `answer-${answeredQuestion.id}`;

      const questionText = document.createElement("p");
      questionText.className = "answer-item-question";
      questionText.textContent = answeredQuestion.question;

      const yourAnswer = document.createElement("p");
      yourAnswer.className = "answer-item-your-answer";
      yourAnswer.textContent = `Your answer: ${answeredQuestion.selectedAns}`;

      const correctAnswer = document.createElement("p");
      correctAnswer.className = "answer-item-correct-answer";
      correctAnswer.textContent = `Correct answer: ${answeredQuestion.answer}`;

      item.append(questionText, yourAnswer, correctAnswer);
      answersList.appendChild(item);
    });
  };

  if (quizState.answerType === "correct") {
    renderList("Answers you got right", quizState.correctAnswers, "correct");
  } else if (quizState.answerType === "wrong") {
    renderList("Answers you got wrong", quizState.wrongAnswers, "wrong");
  } else {
    renderList("Answers you got right", quizState.correctAnswers, "correct");
    renderList("Answers you got wrong", quizState.wrongAnswers, "wrong");
  }
}


function handleAnsToggle(quizState, answerType, deps) {
  quizState.answerType = answerType;

  deps.answerReview.querySelectorAll(".answersBtn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.answerType === answerType);
  });

  displayAnswers(quizState, deps);
}


function handleRestartButtonClick(quizState, questions, deps) {
  const { quizBox, finishButton, score, endOfQuiz } = deps;
  quizState.currentQuestionIndex = 0;
  quizState.scoreCount = 0;
  quizState.isQuizOver = false;
  quizState.answerType = "all";
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

  deps.restartButton.style.display = "none";
  deps.progressWrapper.style.display = "flex";
  displayQuestion(quizState, questions, deps);
  updateProgress(quizState, questions, deps);
}

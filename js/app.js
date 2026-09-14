import { displayQuestion, handleNextButtonClick } from "../utils.js";
import { questions } from "./questions.js";

// The DOM Elements
const quizBox = document.getElementById("all-questions");
const answerContainer = document.querySelector(".answer-container")
const scoreDisplay = document.getElementById("score");
const endOfQuiz = document.getElementById("end-of-questions")


const quizState = {
   currentQuestionIndex: 0,
   scoreCount: 0,
   isQuizOver: false,
}

// Next Button setup
const nextButton = document.createElement('button');
nextButton.textContent = "Next Question"
nextButton.addEventListener('click', ()=> {handleNextButtonClick(quizState, questions, quizBox, nextButton, scoreDisplay, endOfQuiz)});
nextButton.style.display = "none"
answerContainer.appendChild(nextButton)
displayQuestion(questions, quizBox, quizState, nextButton)

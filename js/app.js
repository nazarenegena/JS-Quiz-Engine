import { questions } from "./questions.js";

const quizBox = document.getElementById("all-questions");
let currentQuestionIndex = 0;
let scoreCount = 0;
let isQuizOver = false;
const answerContainer = document.querySelector(".answer-container")
const scoreDisplay = document.getElementById("score");
const wrongAns = document.createElement('div')
const wrongAnsText = document.createElement('p')
const nextButton = document.createElement('button');
nextButton.textContent = "Next Question"
nextButton.addEventListener('click', handleNextButtonClick);
nextButton.style.display = "none"
 answerContainer.appendChild(nextButton)

const endOfQuiz = document.getElementById("end-of-questions")

function handleNextButtonClick() {
  try {
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++
      displayQuestion()
  nextButton.style.display = "none"
    }
    else {
      isQuizOver = true;
      endOfQuiz.innerHTML = "";
      quizBox.innerHTML = "";
      const endQuizParagraph = document.createElement("p");
      endQuizParagraph.textContent = "Yeey you have reached the end of Quizie Engine"
      const restartButton = document.createElement('button');
      restartButton.textContent = "Restart Quiz"
      restartButton.addEventListener('click', handleRestartButtonClick);
      endOfQuiz.appendChild(endQuizParagraph)
      endOfQuiz.appendChild(restartButton)
      nextButton.style.display = "none"
    }
  } catch (err)
  {
    console.log(err)
  }
}

function handleRestartButtonClick() {
questions.forEach(questionItem => {
    currentQuestionIndex=0
    questionItem.isAnswered = false
    scoreCount = 0;
    scoreDisplay.textContent = "";
    wrongAns.innerHTML=""
    quizBox.innerHTML=""
  endOfQuiz.innerHTML = "";
  nextButton.style.display = "none"
  isQuizOver = false;

  })
displayQuestion();
}

function displayQuestion() {
  quizBox.innerHTML=""
  const question = questions[currentQuestionIndex];
    const questionDiv = document.createElement('div')
    const questionCategory = document.createElement('p')
    const questionDifficulty = document.createElement('p')
    const questionText = document.createElement('p')
    const choicesDiv = document.createElement('div')
    choicesDiv.className = "choices"

    question.options.forEach(option => {
      const btn = document.createElement('button')
      btn.className = "choice"
      btn.textContent = option
      btn.addEventListener("click", handleChoiceClick)
      choicesDiv.appendChild(btn)
    })

  function handleChoiceClick(e) {
    if (isQuizOver) return;
    if (question.answer === e.target.textContent) {

          if (!question.isAnswered) {
            scoreCount += 1;
            question.isAnswered = true
          }
      wrongAnsText.textContent = ""
      scoreDisplay.textContent = `Your score is ${scoreCount}`;
      nextButton.style.display = "block"
          // answerContainer.appendChild(scoreDisplay)

      }
    else {

      wrongAnsText.textContent = "Wrong Answer, Try again"
      nextButton.style.display = "none"
      scoreDisplay.textContent = "";
      wrongAns.appendChild(wrongAnsText)
      questionDiv.appendChild(wrongAns)

      }
  }
    questionCategory.textContent = question.category;
    questionDifficulty.textContent = question.difficulty;
    questionText.textContent = question.question;
    quizBox.appendChild(questionDiv);
     questionDiv.setAttribute("id", question.id)
    questionDiv.appendChild(questionCategory);
    questionDiv.appendChild(questionDifficulty);
    questionDiv.appendChild(questionText);
  questionDiv.appendChild(choicesDiv);

}
  displayQuestion()

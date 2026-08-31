import { questions } from "./questions.js";

const quizBox = document.getElementsByClassName("all-questions");
const firstQuestion = quizBox[0];
let currentQuestionIndex = 0;
const answerContainer = document.querySelector(".answer-container")
const scoreDisplay = document.getElementById("score");
const wrongAns = document.createElement('div')
 const wrongAnsText = document.createElement('p')
const nextButton = document.createElement('button');
const restartButton = document.createElement('button');
nextButton.addEventListener('click', handleNextButtonClick);
restartButton.addEventListener('click', handleRestartButtonClick);
let scoreCount = 0;


function handleNextButtonClick() {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex ++
    displayQuestion()
  }
  else {
    alert("You've reached the end of the quiz!")
  }
}
function handleRestartButtonClick() {
  currentQuestionIndex = 0;
  scoreCount = 0;
  scoreDisplay.textContent = "";
  wrongAns.innerHTML=""
  firstQuestion.innerHTML = "";
  displayQuestion();
}


function displayQuestion() {
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
    if (question.answer === e.target.textContent) {
      if (question.answer === e.target.textContent) {
          if (!question.isAnswered) {
            scoreCount += 1;
        question.isAnswered=true
          }
         wrongAnsText.textContent = ""
          scoreDisplay.textContent = `Great job! Your score is ${scoreCount}`;

        }

        nextButton.textContent = "Next Question"
        restartButton.addEventListener(("click"), handleRestartButtonClick)
        restartButton.textContent = "Restart Quiz"
 scoreDisplay.textContent = `Great job! Your score is ${scoreCount}`;
        answerContainer.appendChild(scoreDisplay)
        answerContainer.appendChild(nextButton)
        answerContainer.appendChild(restartButton)

      }

      else {

        wrongAnsText.textContent = "Wrong Answer, Try again"
        scoreDisplay.textContent = "";
        wrongAns.appendChild(wrongAnsText)
      }
      console.log(scoreCount)
    }

    questionCategory.textContent = question.category;
    questionDifficulty.textContent = question.difficulty;
    questionText.textContent = question.question;
    firstQuestion.appendChild(questionDiv);
     questionDiv.setAttribute("id", question.id)
    questionDiv.appendChild(questionCategory);
    questionDiv.appendChild(questionDifficulty);
    questionDiv.appendChild(questionText);
  questionDiv.appendChild(choicesDiv);
  questionDiv.appendChild(wrongAns)
}

  displayQuestion()

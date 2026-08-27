import { questions } from "./questions.js";


const quizBox = document.getElementsByClassName("all-questions");
const firstQuestion = quizBox[0];
let currentQuestionIndex = 0;
const scoreDisplay = document.getElementById("score");
let scoreCount = 0;


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
        scoreCount += 1;
        const nextButton = document.createElement('button');
        function handleNextButtonClick() {
          if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex ++
            displayQuestion()
          }
          else {
            alert("You've reached the end of the quiz!")
          }
        }
        nextButton.addEventListener('click', handleNextButtonClick)

        scoreDisplay.textContent = `Your score is ${scoreCount}`;
         nextButton.textContent = "Next Question"
        questionDiv.appendChild(nextButton)
      } else {
        alert("Wrong!")
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
}

  displayQuestion()

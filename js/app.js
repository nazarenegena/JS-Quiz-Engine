import { questions } from "./questions.js";

const quizBox = document.getElementById("quiz-box");
const scoreDisplay = document.getElementById("score");
let scoreCount = 0;

questions.forEach(question => {
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
      scoreDisplay.textContent = `Your score is ${scoreCount}`;

    } else {
      alert("Wrong!")
    }
    console.log(scoreCount)
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

 })

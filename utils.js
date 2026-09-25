const correctAnswers = [];
const wrongAnswers = [];

export function displayQuestion(questions, quizBox, quizState, nextButton) {


  quizBox.innerHTML = "";
  const question = questions[quizState.currentQuestionIndex];
  const questionDiv = document.createElement("div");
  const questionCategory = document.createElement("p");
  const questionDifficulty = document.querySelector(".question-difficulty");
  questionDifficulty.classList.remove("difficulty-easy", "difficulty-medium", "difficulty-hard");
  questionDifficulty.classList.add("difficulty-" + question.difficulty);
  questionDifficulty.textContent = question.difficulty;
  const questionText = document.createElement("p");
  const choicesDiv = document.createElement("div");
  choicesDiv.className = "choices";

  question?.options.forEach((option) => {
    const questionNumber = document.querySelector(".question-number")
    questionNumber.textContent = `QUESTION ${question.id}`
    const btn = document.createElement("button");
    btn.className = "choice";
    btn.textContent = option;
    btn.addEventListener("click", handleChoiceClick);
    choicesDiv.appendChild(btn);
  });

  function handleChoiceClick(e) {
    if (quizState.isQuizOver) return;
    if (question.isAnswered) return;
    question.selectedAns = e.target.textContent;
    if (question.answer === e.target.textContent) {
      quizState.scoreCount += 1;
      correctAnswers.push(question);
    } else {
      wrongAnswers.push(question);
    }
    question.isAnswered = true;
    nextButton.style.display = "block";
  }


  questionCategory.textContent = question.category;
  questionText.textContent = question.question;
  quizBox.appendChild(questionDiv);
  questionDiv.setAttribute("id", question.id);
  questionDiv.appendChild(questionCategory);
  questionDiv.appendChild(questionText);
  questionDiv.appendChild(choicesDiv);
}

export function handleNextButtonClick(
  quizState,
  questions,
  quizBox,
  nextButton,
  scoreDisplay,
  endOfQuiz,
) {
  try {
    if (quizState.currentQuestionIndex < questions.length - 1) {
      quizState.currentQuestionIndex++;
      displayQuestion(questions, quizBox, quizState, nextButton);
      updateProgress(quizState, questions);
      nextButton.style.display = "none";
    } else {
      quizState.isQuizOver = true;
      scoreDisplay.textContent = `Your score is ${quizState.scoreCount}`;
      endOfQuiz.innerHTML = "";
      quizBox.innerHTML = "";
      const endQuizParagraph = document.createElement("p");
      endQuizParagraph.textContent =
        "Yeey you have reached the end of Quizie Engine";

      // display right questions
      const correctAnswersBtn = document.createElement("button");
      correctAnswersBtn.textContent = "Correct Answers";
      correctAnswersBtn.addEventListener("click", () => {
        handleDisplayCorrectAnswers(quizBox);
      }, {once:true});

      // display right questions
      const wrongAnswersBtn = document.createElement("button");
      wrongAnswersBtn.textContent = "Wrong Answers";
      wrongAnswersBtn.addEventListener("click", () => {
        handleDisplayWrongAnswers(quizBox);
      }, {once:true});

      // restart Button
      const restartButton = document.createElement("button");
      restartButton.textContent = "Restart Quiz";
      restartButton.addEventListener("click", () => {
        handleRestartButtonClick(
          questions,
          quizBox,
          quizState,
          nextButton,
          scoreDisplay,
          endOfQuiz,
        );
      });
      endOfQuiz.appendChild(endQuizParagraph);
      endOfQuiz.appendChild(restartButton);
      endOfQuiz.appendChild(correctAnswersBtn);
      endOfQuiz.appendChild(wrongAnswersBtn);
      nextButton.style.display = "none";
    }
  } catch (err) {
    console.log(err);
  }
}

function handleRestartButtonClick(
  questions,
  quizBox,
  quizState,
  nextButton,
  scoreDisplay,
  endOfQuiz,
) {
  correctAnswers.length = 0;
  wrongAnswers.length = 0;
  questions.forEach((questionItem) => {
    quizBox.innerHTML = "";
    endOfQuiz.innerHTML = "";
    quizState.currentQuestionIndex = 0;
    quizState.scoreCount = 0;
    quizState.isQuizOver = false;
    questionItem.isAnswered = false;
    questionItem.selectedAns = null;
    scoreDisplay.textContent = "";
    nextButton.style.display = "none";
  });
  displayQuestion(questions, quizBox, quizState, nextButton);
  updateProgress(quizState, questions);
}

function handleDisplayCorrectAnswers(quizBox) {
  const correctAnsTittle = document.createElement("h5");
  correctAnsTittle.textContent = "Answers you got right"
  quizBox.appendChild(correctAnsTittle)
  correctAnswers.forEach((correctAnswer) => {
    const correctAnsDiv = document.createElement("div");
    const correctAnsQuiz = document.createElement("p");
    correctAnsDiv.setAttribute("id", correctAnswer.id);
    correctAnsQuiz.textContent = correctAnswer.question;
    correctAnsDiv.appendChild(correctAnsQuiz);
    quizBox.appendChild(correctAnsDiv);
  });
}

function handleDisplayWrongAnswers(quizBox) {
  const wrongAnsTittle = document.createElement("h5");
  wrongAnsTittle.textContent = "Answers you got wrong"
  quizBox.appendChild(wrongAnsTittle)
  wrongAnswers.forEach((wrongAnswer) => {
    console.log(wrongAnswer, "checking the wrong ans")
    const wrongAnsDiv = document.createElement("div");
    const wrongAnsQuiz = document.createElement("p");
    wrongAnsDiv.setAttribute("id", wrongAnswer.id);
    wrongAnsQuiz.textContent = wrongAnswer.question;
    wrongAnsDiv.appendChild(wrongAnsQuiz);
    quizBox.appendChild(wrongAnsDiv);
  });
}


export function updateProgress(quizState, questions) {
  const current = quizState.currentQuestionIndex + 1;
  const total = questions.length;
  const percent = (current / total) * 100;
  const fill = document.getElementById("progress-fill");
  const text = document.getElementById("quizProgressText");
  if (fill) fill.style.width = percent + "%";
  if (text) text.textContent = String(current).padStart(2, "0") + " / " + total;  // "01 / 21"
}

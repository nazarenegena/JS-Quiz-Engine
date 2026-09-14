
const correctAnswers = []
const wrongAnswers = []

export function displayQuestion(questions, quizBox, quizState, nextButton) {
  quizBox.innerHTML = "";
  const question = questions[quizState.currentQuestionIndex];
  const questionDiv = document.createElement("div");
  const questionCategory = document.createElement("p");
  const questionDifficulty = document.createElement("p");
  const questionText = document.createElement("p");
  const choicesDiv = document.createElement("div");
  choicesDiv.className = "choices";


  question?.options.forEach((option) => {
    const btn = document.createElement("button");
    btn.className = "choice";
    btn.textContent = option;
    btn.addEventListener("click", handleChoiceClick);
    choicesDiv.appendChild(btn);
  });

  function handleChoiceClick(e) {
    if (quizState.isQuizOver) return;
    if (question.answer === e.target.textContent) {
      if (!question.isAnswered) {
        quizState.scoreCount += 1;
        question.isAnswered = true;
      }
      correctAnswers.push(question)
    } else {
      wrongAnswers.push(question)
    }
    nextButton.style.display = "block";
  }
  questionCategory.textContent = question.category;
  questionDifficulty.textContent = question.difficulty;
  questionText.textContent = question.question;
  quizBox.appendChild(questionDiv);
  questionDiv.setAttribute("id", question.id);
  questionDiv.appendChild(questionCategory);
  questionDiv.appendChild(questionDifficulty);
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
const correctAnswersBtn = document.createElement('button');
      correctAnswersBtn.textContent = "Correct Answers";
      correctAnswersBtn.addEventListener("click", () => {
  handleDisplayCorrectAnswers(quizBox)
})


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
      endOfQuiz.appendChild(correctAnswersBtn)
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
  questions.forEach((questionItem) => {
    quizBox.innerHTML = "";
    endOfQuiz.innerHTML = "";
    quizState.currentQuestionIndex = 0;
    quizState.scoreCount = 0;
    quizState.isQuizOver = false;
    questionItem.isAnswered = false;
    scoreDisplay.textContent = "";

    nextButton.style.display = "none";
  });
  displayQuestion(questions, quizBox, quizState, nextButton);
}


function handleDisplayCorrectAnswers(quizBox) {
  correctAnswers.forEach((correctAnswer) => {
    const correctAnsDiv = document.createElement("div")
    const correctAnswQuiz = document.createElement("p");
    correctAnsDiv.setAttribute("id", correctAnswer.id)
    correctAnswQuiz.textContent = correctAnswer.question
    correctAnsDiv.appendChild(correctAnswQuiz)
    quizBox.appendChild(correctAnsDiv)
  })
}

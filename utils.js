const correctAnswers = [];
const wrongAnswers = [];

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
      question.selectedAns = e.target.textContent
      correctAnswers.push(question);
    } else {
      question.selectedAns = e.target.textContent
      wrongAnswers.push(question);
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

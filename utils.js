export function displayQuestion(quizState, questions, deps) {
  const { quizBox, nextButton, questionNumber, questionDifficulty } = deps;
  quizBox.innerHTML = "";

  const question = questions[quizState.currentQuestionIndex];
  if (!question) return;

  questionNumber.textContent = `QUESTION ${question.id}`;

  questionDifficulty.classList.remove("difficulty-easy", "difficulty-medium", "difficulty-hard");
  questionDifficulty.classList.add("difficulty-" + question.difficulty);
  questionDifficulty.textContent = question.difficulty;

  const questionDiv = document.createElement("div");
  questionDiv.className = "question-div";
  questionDiv.setAttribute("id", question.id);

  const questionCategory = document.createElement("p");
  questionCategory.className = "question-category";
  questionCategory.textContent = question.category;

  const questionText = document.createElement("p");
  questionText.className = "question-text";
  questionText.textContent = question.question;

  const choicesDiv = document.createElement("div");
  choicesDiv.className = "choices";

  question.options.forEach((option) => {
    const btn = document.createElement("button");
    btn.className = "choice";
    const key = Object.keys(option)[0];
    const value = option[key];
    btn.textContent = `${key} ${value}`;
    btn.value = value;

    const checkIcon = document.createElement("span");
    checkIcon.className = "check-icon";
    checkIcon.style.display = "none";
    const iconEl = document.createElement("i");
    iconEl.classList.add("fa-solid", "fa-check");
    checkIcon.appendChild(iconEl);

    btn.appendChild(checkIcon);
    btn.addEventListener("click", () => handleChoiceClick(btn, checkIcon));
    choicesDiv.appendChild(btn);
  });

  questionDiv.appendChild(questionCategory);
  questionDiv.appendChild(questionText);
  questionDiv.appendChild(choicesDiv);
  quizBox.appendChild(questionDiv);

  function handleChoiceClick(clickedBtn, checkIcon) {
    if (quizState.isQuizOver) return;

    choicesDiv.querySelectorAll(".choice").forEach((b) => {
      const icon = b.querySelector(".check-icon");
      if (icon) icon.style.display = "none";
      b.classList.remove("selected");
    });

    clickedBtn.classList.add("selected");
    checkIcon.style.display = "inline";
    question.selectedAns = clickedBtn.value;
    nextButton.style.display = "block";
  }
}

function lockAnswer(question, quizState) {
  if (question.isAnswered || !question.selectedAns) return;
  question.isAnswered = true;
  if (question.answer === question.selectedAns) {
    quizState.scoreCount += 1;
    quizState.correctAnswers.push(question);
  } else {
    quizState.wrongAnswers.push(question);
  }
}

export function handleNextButtonClick(quizState, questions, deps) {
  lockAnswer(questions[quizState.currentQuestionIndex], quizState);

  if (quizState.currentQuestionIndex < questions.length - 1) {
    quizState.currentQuestionIndex++;
    displayQuestion(quizState, questions, deps);
    updateProgress(quizState, questions, deps);
    deps.nextButton.style.display = "none";
  } else {
    renderEndScreen(quizState, questions, deps);
  }
}

function renderEndScreen(quizState, questions, deps) {
  const { quizBox, nextButton, scoreDisplay, endOfQuiz } = deps;
  quizState.isQuizOver = true;
  scoreDisplay.textContent = `Your score is ${quizState.scoreCount}`;
  endOfQuiz.innerHTML = "";
  quizBox.innerHTML = "";

  const endQuizParagraph = document.createElement("p");
  endQuizParagraph.textContent = "Yay! You have reached the end of Quizie Engine";

  const correctAnswersBtn = document.createElement("button");
  correctAnswersBtn.textContent = "Correct Answers";
  correctAnswersBtn.addEventListener("click", () => {
    handleDisplayCorrectAnswers(quizState, quizBox);
  });

  const wrongAnswersBtn = document.createElement("button");
  wrongAnswersBtn.textContent = "Wrong Answers";
  wrongAnswersBtn.addEventListener("click", () => {
    handleDisplayWrongAnswers(quizState, quizBox);
  });

  const restartButton = document.createElement("button");
  restartButton.textContent = "Restart Quiz";
  restartButton.addEventListener("click", () => {
    handleRestartButtonClick(quizState, questions, deps);
  });

  endOfQuiz.append(endQuizParagraph, restartButton, correctAnswersBtn, wrongAnswersBtn);
  nextButton.style.display = "none";
}

function handleRestartButtonClick(quizState, questions, deps) {
  const { quizBox, nextButton, scoreDisplay, endOfQuiz } = deps;
  quizState.currentQuestionIndex = 0;
  quizState.scoreCount = 0;
  quizState.isQuizOver = false;
  quizState.correctAnswers.length = 0;
  quizState.wrongAnswers.length = 0;
  scoreDisplay.textContent = "";
  nextButton.style.display = "none";
  quizBox.innerHTML = "";
  endOfQuiz.innerHTML = "";

  questions.forEach((questionItem) => {
    questionItem.isAnswered = false;
    questionItem.selectedAns = "";
  });

  displayQuestion(quizState, questions, deps);
  updateProgress(quizState, questions, deps);
}

function handleDisplayCorrectAnswers(quizState, quizBox) {
  quizBox.innerHTML = "";

  const correctAnsTtitle = document.createElement("h5");
  correctAnsTtitle.textContent = "Answers you got right";
  quizBox.appendChild(correctAnsTtitle);

  quizState.correctAnswers.forEach((correctAnswer) => {
    const correctAnsDiv = document.createElement("div");
    correctAnsDiv.setAttribute("id", correctAnswer.id);
    const correctAnsQuiz = document.createElement("p");
    correctAnsQuiz.textContent = correctAnswer.question;
    correctAnsDiv.appendChild(correctAnsQuiz);
    quizBox.appendChild(correctAnsDiv);
  });
}

function handleDisplayWrongAnswers(quizState, quizBox) {
  quizBox.innerHTML = "";

  const wrongAnsTtitle = document.createElement("h5");
  wrongAnsTtitle.textContent = "Answers you got wrong";
  quizBox.appendChild(wrongAnsTtitle);

  quizState.wrongAnswers.forEach((wrongAnswer) => {
    const wrongAnsDiv = document.createElement("div");
    wrongAnsDiv.setAttribute("id", wrongAnswer.id);
    const wrongAnsQuiz = document.createElement("p");
    wrongAnsQuiz.textContent = wrongAnswer.question;
    wrongAnsDiv.appendChild(wrongAnsQuiz);
    quizBox.appendChild(wrongAnsDiv);
  });
}

export function updateProgress(quizState, questions, deps) {
  const current = quizState.currentQuestionIndex + 1;
  const total = questions.length;
  const percent = (current / total) * 100;

  deps.progressFill.style.width = percent + "%";
  deps.progressStart.textContent = String(current).padStart(2, "0");
  deps.progressEnd.textContent = String(total).padStart(2, "0");
}

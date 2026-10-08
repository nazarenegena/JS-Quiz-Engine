import { renderEndScreen } from "./js/app";


export function displayQuestion(quizState, questions, deps) {
  const { quizBox, nextButton, finishButton, questionNumber, questionDifficulty } = deps;
  quizBox.innerHTML = "";
  nextButton.style.display = "none";
  finishButton.style.display = "none";

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
    const btnInfo = document.createElement("p");
    btnInfo.className = "btnInfo";

    const keyElement = document.createElement("span");
    const key = Object.keys(option)[0];
    keyElement.className = "choiceKeyElement";
    keyElement.textContent = key;

    const valueElement = document.createElement("span");
    valueElement.className = "choiceValueElement";
    const value = option[key];
    valueElement.textContent = value;
    btn.value = value;

    const checkIcon = document.createElement("span");
    checkIcon.className = "check-icon";
    checkIcon.style.display = "none";
    const iconEl = document.createElement("i");
    iconEl.classList.add("fa-solid", "fa-check");

    checkIcon.appendChild(iconEl);
    btnInfo.appendChild(keyElement);
    btnInfo.appendChild(valueElement);
    btn.appendChild(btnInfo);
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
    if (quizState.currentQuestionIndex === questions.length - 1) {
      nextButton.style.display = "none";
      finishButton.style.display = "block";
    } else {
      nextButton.style.display = "block";
    }
    choicesDiv.querySelectorAll(".choice").forEach((b) => {
      const icon = b.querySelector(".check-icon");
      if (icon) icon.style.display = "none";
      b.classList.remove("selected");
    });

    checkIcon.style.display = "flex";
    question.selectedAns = clickedBtn.value;
  }
}

function lockAnswer(question, quizState) {
  if (question.isAnswered || !question.selectedAns) return false;
  question.isAnswered = true;
  if (question.answer === question.selectedAns) {
    quizState.scoreCount += 1;
    quizState.correctAnswers.push(question);
  } else {
    quizState.wrongAnswers.push(question);
  }
  return true;
}

export function handleNextButtonClick(quizState, questions, deps) {
  const wasLocked = lockAnswer(questions[quizState.currentQuestionIndex], quizState);
  if (!wasLocked) return;

  if (quizState.currentQuestionIndex < questions.length - 1) {
    quizState.currentQuestionIndex++;
    displayQuestion(quizState, questions, deps);
    updateProgress(quizState, questions, deps);
  } else {
    renderEndScreen(quizState, questions, deps);
  }
}

export function updateProgress(quizState, questions, deps) {
  const current = quizState.currentQuestionIndex + 1;
  const total = questions.length;
  const percent = (current / total) * 100;
  deps.progressFill.style.width = percent + "%";
  deps.progressStart.textContent = String(current).padStart(2, "0");
  deps.progressEnd.textContent = String(total).padStart(2, "0");
}

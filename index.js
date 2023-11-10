const steps = document.querySelectorAll(".step");
const stepCards = document.querySelectorAll(".card-container > div");
const stepControls = document.querySelector(".step-controlls");

let currentStep = 0;

const nextButton = document.querySelector(".next-step");
const backButton = document.querySelector(".back-button");

function updateStepDisplay() {
  stepCards.forEach((card, index) => {
    if (index === currentStep) {
      card.style.display = "flex";
      if (steps[index]) {
        steps[index].classList.add("active");
      }
    } else {
      card.style.display = "none";
      if (steps[index]) {
        steps[index].classList.remove("active");
      }
    }
  });

  backButton.style.visibility = currentStep > 0 ? "visible" : "hidden";

  if (currentStep === steps.length - 1) {
    nextButton.textContent = "Confirm";
    nextButton.removeEventListener("click", nextStep);
    nextButton.addEventListener("click", showThanksStep);
  } else {
    nextButton.textContent = "Next Step";
    nextButton.removeEventListener("click", showThanksStep);
    nextButton.addEventListener("click", nextStep);
  }
}

function nextStep() {
  if (currentStep < steps.length - 1) {
    currentStep++;
    updateStepDisplay();
  }
}

function prevStep() {
  if (currentStep > 0) {
    currentStep--;
    updateStepDisplay();
  }
}

function showThanksStep() {
  const summaryStep = document.querySelector(".summary-step");
  const thanksStep = document.querySelector(".thanks-step");

  if (summaryStep && thanksStep) {
    summaryStep.style.display = "none";
    thanksStep.style.display = "flex";
    stepControls.style.visibility = "hidden";
    backButton.style.visibility = "hidden";
  }
}

const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");

nameInput.addEventListener("input", handleInputValidation);
emailInput.addEventListener("input", handleInputValidation);
phoneInput.addEventListener("input", handleInputValidation);

function handleInputValidation() {
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function isValidPhoneNumber(phone) {
    const phoneRegex = /^\+?[0-9]{9,}$/;
    return phoneRegex.test(phone);
  }

  let isValid = true;

  if (nameInput.value.trim() === "") {
    nameInput.classList.add("error-input");
    const nameErrorLabel = document.querySelector(".name-input .error-label");
    if (nameErrorLabel) {
      nameErrorLabel.style.visibility = "visible";
    }
    isValid = false;
  } else {
    nameInput.classList.remove("error-input");
    const nameErrorLabel = document.querySelector(".name-input .error-label");
    if (nameErrorLabel) {
      nameErrorLabel.style.visibility = "hidden";
    }
  }

  if (
    emailInput.value.trim() === "" ||
    !isValidEmail(emailInput.value.trim())
  ) {
    emailInput.classList.add("error-input");
    const emailErrorLabel = document.querySelector(".email-input .error-label");
    if (emailErrorLabel) {
      emailErrorLabel.style.visibility = "visible";
    }
    isValid = false;
  } else {
    emailInput.classList.remove("error-input");
    const emailErrorLabel = document.querySelector(".email-input .error-label");
    if (emailErrorLabel) {
      emailErrorLabel.style.visibility = "hidden";
    }
  }

  if (
    phoneInput.value.trim() === "" ||
    !isValidPhoneNumber(phoneInput.value.trim())
  ) {
    phoneInput.classList.add("error-input");
    const phoneErrorLabel = document.querySelector(".phone-input .error-label");
    if (phoneErrorLabel) {
      phoneErrorLabel.style.visibility = "visible";
    }
    isValid = false;
  } else {
    phoneInput.classList.remove("error-input");
    const phoneErrorLabel = document.querySelector(".phone-input .error-label");
    if (phoneErrorLabel) {
      phoneErrorLabel.style.visibility = "hidden";
    }
  }

  nextButton.disabled = !isValid;
}

nextButton.addEventListener("click", nextStep);
backButton.addEventListener("click", prevStep);

updateStepDisplay();

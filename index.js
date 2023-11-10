const steps = document.querySelectorAll(".step");
const stepCards = document.querySelectorAll(".card-container > div");
const stepControls = document.querySelector(".step-controlls");

let currentStep = 0;

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

  const backButton = document.querySelector(".back-button");
  backButton.style.visibility = currentStep > 0 ? "visible" : "hidden";

  const nextButton = document.querySelector(".next-step");
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
    if (thanksStep.style.display === "flex") {
      backButton.style.visibility = "hidden";
    }
  }
}

const nextButton = document.querySelector(".next-step");
const backButton = document.querySelector(".back-button");

nextButton.addEventListener("click", nextStep);
backButton.addEventListener("click", prevStep);

updateStepDisplay();

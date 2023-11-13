const steps = document.querySelectorAll(".step");
const stepCards = document.querySelectorAll(".card-container > div");
const stepControls = document.querySelector(".step-controlls");

let currentStep = 0;

const nextButton = document.querySelector(".next-step");
const backButton = document.querySelector(".back-button");

const plans = document.querySelectorAll(
  ".box-offer > .arcade, .box-offer > .advanced, .box-offer > .pro"
);
const switchInput = document.querySelector(".switch input");
const monthlyLabel = document.querySelector(".monthly");
const yearlyLabel = document.querySelector(".yearly");
const freeMonths = document.querySelectorAll(".free-months");
const priceMapping = {
  arcade: 9,
  advanced: 12,
  pro: 15,
};

plans.forEach((plan) => {
  plan.addEventListener("click", function () {
    plans.forEach((p) => p.classList.remove("selected"));
    plan.classList.add("selected");
  });
});

switchInput.addEventListener("change", function () {
  const textColorMonthly = switchInput.checked
    ? "hsl(231, 11%, 63%)"
    : "hsl(213, 96%, 18%)";
  const textColorYearly = switchInput.checked
    ? "hsl(213, 96%, 18%)"
    : "hsl(231, 11%, 63%)";

  monthlyLabel.style.color = textColorMonthly;
  yearlyLabel.style.color = textColorYearly;

  freeMonths.forEach((freeMonth) => {
    if (switchInput.checked) {
      freeMonth.style.display = "flex";
    } else {
      freeMonth.style.display = "none";
    }
  });

  plans.forEach((plan) => {
    const planType = plan.classList[0]; // arcade, advanced, pro
    const priceElement = plan.querySelector(".pricing");
    const freeMonthsElement = plan.querySelector(".free-months");

    if (switchInput.checked) {
      priceElement.textContent = `$${priceMapping[planType] * 10}/yr`;
      freeMonthsElement.textContent = "2 months free";
    } else {
      priceElement.textContent = `$${priceMapping[planType]}/mo`;
      freeMonthsElement.textContent = "2 months free";
    }
  });
});

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

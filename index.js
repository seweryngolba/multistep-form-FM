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

let selectedPlan = "";
let isYearlyBilling = false;

plans.forEach((plan) => {
  plan.addEventListener("click", function () {
    selectedPlan = plan.classList[0];
    plans.forEach((p) => p.classList.remove("selected"));
    plan.classList.add("selected");
    updateSummaryPlan();
    updateTotalPrice();
  });
});

switchInput.addEventListener("change", function () {
  isYearlyBilling = switchInput.checked;

  const textColorMonthly = isYearlyBilling
    ? "hsl(231, 11%, 63%)"
    : "hsl(213, 96%, 18%)";
  const textColorYearly = isYearlyBilling
    ? "hsl(213, 96%, 18%)"
    : "hsl(231, 11%, 63%)";

  monthlyLabel.style.color = textColorMonthly;
  yearlyLabel.style.color = textColorYearly;

  freeMonths.forEach((freeMonth) => {
    if (isYearlyBilling) {
      freeMonth.style.display = "flex";
    } else {
      freeMonth.style.display = "none";
    }
  });

  plans.forEach((plan) => {
    const planType = plan.classList[0];
    const planTitleElement = plan.querySelector(".plan-title");
    const priceElement = plan.querySelector(".pricing");
    const freeMonthsElement = plan.querySelector(".free-months");

    const billingFrequency = isYearlyBilling ? "yr" : "mo";
    priceElement.textContent = isYearlyBilling
      ? `$${priceMapping[planType] * 10} / ${billingFrequency}`
      : `$${priceMapping[planType]} / ${billingFrequency}`;
    freeMonthsElement.textContent = "2 months free";
  });

  updateAddonPrices();
  updateTotalPrice();
});

function updateAddonPrices() {
  const addons = document.querySelectorAll(".add-on");
  addons.forEach((addOn) => {
    const extrasElement = addOn.querySelector(".extras");
    const currentPrice = parseFloat(extrasElement.dataset.basePrice);

    const billingFrequencyText = isYearlyBilling ? "/yr" : "/mo";
    extrasElement.textContent = `+$${
      isYearlyBilling ? currentPrice * 10 : currentPrice
    }${billingFrequencyText}`;
  });
}

function updateSummaryPlan() {
  const summaryPlanContainer = document.querySelector(".summary-step");
  const summaryPlanTitle = summaryPlanContainer.querySelector(".plan-title");
  const summaryPlanPrice = summaryPlanContainer.querySelector(".plan-price");

  if (summaryPlanTitle && selectedPlan !== null && selectedPlan !== undefined) {
    const selectedPlanFormatted =
      selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1);

    const billingFrequency = isYearlyBilling ? "Yearly" : "Monthly";
    summaryPlanTitle.textContent = `${selectedPlanFormatted} (${billingFrequency})`;

    updateSummaryPlanPrice();
    updateTotalPrice();
  }
}

function updateSummaryPlanPrice() {
  const summaryPlanContainer = document.querySelector(".summary-step");
  const summaryPlanPrice = summaryPlanContainer.querySelector(".plan-price");
  const summaryExtraService = summaryPlanContainer.querySelector(".service");
  const summaryExtraStorage = summaryPlanContainer.querySelector(".storage");
  const summaryExtraProfile = summaryPlanContainer.querySelector(".profile");

  if (summaryPlanPrice) {
    const planType = selectedPlan;
    const billingFrequency = isYearlyBilling ? "yr" : "mo";
    const price = isYearlyBilling
      ? priceMapping[planType] * 10
      : priceMapping[planType];
    summaryPlanPrice.textContent = isNaN(price)
      ? "Select a plan"
      : `$${price.toFixed(2)} / ${billingFrequency}`;
  }

  if (summaryExtraService) {
    summaryExtraService.textContent = isYearlyBilling ? "+$10/yr" : "+$1/mo";
  }

  if (summaryExtraStorage) {
    summaryExtraStorage.textContent = isYearlyBilling ? "+$20/yr" : "+$2/mo";
  }

  if (summaryExtraProfile) {
    summaryExtraProfile.textContent = isYearlyBilling ? "+$20/yr" : "+$2/mo";
  }
}

function updateTotalPrice() {
  let totalAmount = 0;

  plans.forEach((plan) => {
    if (plan.classList.contains("selected")) {
      const planType = plan.classList[0];
      totalAmount += isYearlyBilling
        ? priceMapping[planType] * 10
        : priceMapping[planType];
    }
  });

  const addOns = document.querySelectorAll(".add-on");
  addOns.forEach((addOn) => {
    const checkBox = addOn.querySelector(`input[type="checkbox"]`);
    if (checkBox.checked) {
      const baseAddonPriceElement = addOn.querySelector(".extras");
      const baseAddonPrice = parseFloat(
        baseAddonPriceElement.dataset.basePrice
      );

      if (!isNaN(baseAddonPrice)) {
        const billingFrequencyText = isYearlyBilling ? "/yr" : "/mo";
        const updatedAddonPrice = isYearlyBilling
          ? baseAddonPrice * 10
          : baseAddonPrice;
        baseAddonPriceElement.textContent = `+$${updatedAddonPrice}${billingFrequencyText}`;

        totalAmount += isYearlyBilling ? baseAddonPrice * 10 : baseAddonPrice;
      }
    }
  });

  const totalPriceElement = document.querySelector(".total-amount");
  if (totalPriceElement) {
    totalPriceElement.textContent = isNaN(totalAmount)
      ? "Select a plan"
      : isYearlyBilling
      ? `$${totalAmount.toFixed(2)} / yr`
      : `$${totalAmount.toFixed(2)} / mo`;
  }
}

function updateTotalName() {
  const totalName = document.querySelector(".summary-step .total-name");

  if (totalName) {
    totalName.textContent = isYearlyBilling
      ? "Total (per year)"
      : "Total (per month)";
  }
}

function updateTotalAmount() {
  const totalAmountElement = document.querySelector(
    ".summary-step .total-amount"
  );

  if (totalAmountElement) {
    let totalAmount = 0;

    plans.forEach((plan) => {
      if (plan.classList.contains("selected")) {
        const planType = plan.classList[0];
        totalAmount += isYearlyBilling
          ? priceMapping[planType] * 10
          : priceMapping[planType];
      }
    });

    const selectedAddOns = document.querySelectorAll(".add-on input:checked");
    selectedAddOns.forEach((addOn) => {
      const extrasPriceElement = addOn.parentNode.querySelector(".extras");
      const baseExtrasPrice = parseFloat(extrasPriceElement.dataset.basePrice);
      const formattedExtrasPrice = isYearlyBilling
        ? baseExtrasPrice * 10
        : baseExtrasPrice;

      if (isYearlyBilling) {
        extrasPriceElement.textContent = `+$${formattedExtrasPrice.toFixed(
          2
        )} / yr`;
      }

      totalAmount += isYearlyBilling
        ? formattedExtrasPrice * 10
        : formattedExtrasPrice;
    });

    totalAmountElement.textContent = isNaN(totalAmount)
      ? "Select a plan"
      : `$${totalAmount.toFixed(2)}`;
  }
}

const addOns = document.querySelectorAll(".add-on");

addOns.forEach((addOn, index) => {
  const checkBox = addOn.querySelector(`input[type="checkbox"]`);
  checkBox.addEventListener("change", function () {
    const selectedAddonElement = document.getElementById(
      `selectedAddon${index + 1}`
    );

    if (checkBox.checked) {
      addOn.classList.add("picked");
      if (selectedAddonElement) {
        selectedAddonElement.style.display = "flex";
        const addonLabel = addOn.querySelector(".text-title").textContent;
        const addonPrice = addOn.querySelector(".extras").textContent.trim();
        updateAddOnSummary(addonLabel, addonPrice);
      }
    } else {
      addOn.classList.remove("picked");
      if (selectedAddonElement) {
        selectedAddonElement.style.display = "none";
        const existingAddon = document.querySelector(
          `.extra-picks:contains('${selectedAddonElement.textContent.trim()}')`
        );
        if (existingAddon) {
          existingAddon.remove();
        }
      }
    }

    if (isYearlyBilling) {
      updateTotalPrice();
    }
  });
});

addOns.forEach((addOn) => {
  const checkBox = addOn.querySelector(`input[type="checkbox"]`);
  checkBox.addEventListener("change", updateTotalPrice);
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

function updateSummaryStep() {
  updateSummaryPlan();
  updateTotalName();
  updateTotalAmount();
}

nextButton.addEventListener("click", nextStep);
backButton.addEventListener("click", prevStep);

updateStepDisplay();
updateSummaryStep();

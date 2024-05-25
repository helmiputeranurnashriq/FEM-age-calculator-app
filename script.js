// Get Input Element
const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");

// Get Input Label Element
const dayLabel = document.querySelector("label[for='day'");
const monthLabel = document.querySelector("label[for='month'");
const yearLabel = document.querySelector("label[for='year'");

// Get Error Text
const dayError = document.getElementById("day_error");
const monthError = document.getElementById("month_error");
const yearError = document.getElementById("year_error");

// Get Output Element
const dayOutput = document.getElementById("day-output");
const monthOutput = document.getElementById("month-output");
const yearOutput = document.getElementById("year-output");

// Set Color Constant
const COLOR_LIGHT_RED = "hsl(0, 100%, 67%)";
const COLOR_PURPLE = "hsl(259, 100%, 65%)";
const COLOR_DEFAULT_LABEL = "hsl(0, 1%, 44%)";
const COLOR_DEFAULT_INPUT = "hsl(0, 0%, 86%)";

// Run Calculation
const currentDate = new Date();

function isValidDate(year, month, day) {
  const date = new Date(year, month - 1, day);

  // Compare Value
  return (
    date.getFullYear() == year &&
    date.getMonth() == month - 1 &&
    date.getDate() == day
  );
}

// Error Style for date validation (isValidDate)
function falseDateError() {
  const errorText = document.getElementById("day_error");
  const inputLabelError = document.getElementsByTagName("label");
  const inputBorderError = document.getElementsByTagName("input");

  for (const label of inputLabelError) {
    label.style.color = COLOR_LIGHT_RED;
  }

  for (const input of inputBorderError) {
    input.style.borderColor = COLOR_LIGHT_RED;
  }
  
  errorText.innerHTML = "Must be a valid date";
  errorText.hidden = false;

  // Reset output text after one success execution when next excecution is expected to fail
  // Because of invalid date
  dayOutput.innerHTML = "--";
  monthOutput.innerHTML = "--";
  yearOutput.innerHTML = "--";
}

// For input validation (oninput)
function validateInput(event) {
  const targetInput = event.currentTarget;
  const targetInputID = targetInput.name;
  const errorText = document.getElementById(`${targetInputID}_error`);

  function errorStyle(targetInput) {
    const parentDiv = targetInput.closest(".input__number");
    const targetLabel = parentDiv.querySelector("label");

    targetInput.style.borderColor = COLOR_LIGHT_RED;
    targetLabel.style.color = COLOR_LIGHT_RED;
  }


  // Reset style to default (clear error)
  function resetStyle(targetInput) {
    const parentDiv = targetInput.closest(".input__number");
    const targetLabel = parentDiv.querySelector("label");

    targetInput.style.borderColor = COLOR_DEFAULT_INPUT;
    targetLabel.style.color = COLOR_DEFAULT_LABEL;
  }

  if (targetInput.validity.valueMissing) {
    // Show custom error message and change label color
    errorText.innerHTML = "This field is required";
    errorText.hidden = false;
    errorStyle(targetInput);
  } else if (targetInput.validity.rangeOverflow) {
    errorText.hidden = false;
    errorText.innerHTML = `Must be a valid ${targetInputID}`;
    errorStyle(targetInput);
  } else if (targetInput.validity.rangeUnderflow) {
    errorText.hidden = false;
    errorText.innerHTML = `Must be a valid ${targetInputID}`;
    errorStyle(targetInput);
  } else if (
    targetInputID == "year" &&
    targetInput.value > currentDate.getFullYear()
  ) {
    errorText.hidden = false;
    errorText.innerHTML = `Must be in the past`;
    errorStyle(targetInput);
  } else {
    resetStyle(targetInput);
    errorText.hidden = true;
  }
}


// Main
const calculateBirthDayForm = document.forms["form"];

calculateBirthDayForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const dayValue = dayInput.value;
  const monthValue = monthInput.value;
  const yearValue = yearInput.value;

  if (!dayValue) {
    dayInput.style.borderColor = COLOR_LIGHT_RED;
    dayLabel.style.color = COLOR_LIGHT_RED;
    dayError.innerHTML = "This field is required";
    dayError.hidden = false;
  } else {
    dayInput.style.borderColor = COLOR_DEFAULT_INPUT;
    dayLabel.style.color = COLOR_DEFAULT_LABEL;
  }

  if (!monthValue) {
    monthInput.style.borderColor = COLOR_LIGHT_RED;
    monthLabel.style.color = COLOR_LIGHT_RED;
    monthError.innerHTML = "This field is required";
    monthError.hidden = false;
  } else {
    monthInput.style.borderColor = COLOR_DEFAULT_INPUT;
    monthLabel.style.color = COLOR_DEFAULT_LABEL;
  }

  if (!yearValue) {
    yearInput.style.borderColor = COLOR_LIGHT_RED;
    yearLabel.style.color = COLOR_LIGHT_RED;
    yearError.innerHTML = "This field is required";
    yearError.hidden = false;
  } else {
    yearInput.style.borderColor = COLOR_DEFAULT_INPUT;
    yearLabel.style.color = COLOR_DEFAULT_LABEL;
  }

  function calculateAgeOperation() {
    const fullBdayDate = [monthValue, dayValue, yearValue].join("-");

    const getDateBday = new Date(fullBdayDate);

    let yearBfday = currentDate.getFullYear() - getDateBday.getFullYear();
    let monthBfday = currentDate.getMonth() - getDateBday.getMonth();
    let dayBfday = currentDate.getDate() - getDateBday.getDate();

    if (monthBfday < 0) {
      yearBfday -= 1;
      monthBfday = 12 + monthBfday;
    }

    if (dayBfday < 0) {
      monthBfday -= 1;
      dayBfday = 30 + dayBfday;
    }

    dayOutput.textContent = `${dayBfday}`;
    monthOutput.textContent = `${monthBfday}`;
    yearOutput.textContent = `${yearBfday}`;
  }

  if (dayValue && monthValue && yearValue) {
    if (!isValidDate(yearValue, monthValue, dayValue)) {
        falseDateError();
      } else {
        calculateAgeOperation();
      }
  }
});

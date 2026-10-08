const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = "0";
let previousInput = "";
let operator = null;
let resetNext = false;

const operatorSymbols = {
  "+": "+",
  "-": "−",
  "*": "×",
  "/": "÷"
};

function updateDisplay() {
  if (operator && resetNext) {
    display.textContent = previousInput + " " + operatorSymbols[operator];
  } else if (operator) {
    display.textContent = previousInput + " " + operatorSymbols[operator] + " " + currentInput;
  } else {
    display.textContent = currentInput;
  }
}

function inputDigit(digit) {
  if (currentInput === "0" || resetNext) {
    currentInput = digit;
    resetNext = false;
  } else {
    currentInput += digit;
  }
}

function inputDecimal() {
  if (resetNext) {
    currentInput = "0";
    resetNext = false;
  }
  if (!currentInput.includes(".")) {
    currentInput += ".";
  }
}

function setOperator(nextOperator) {
  if (operator && !resetNext) {
    calculate();
  }
  previousInput = currentInput;
  operator = nextOperator;
  resetNext = true;
}

function calculate() {
  const prev = parseFloat(previousInput);
  const curr = parseFloat(currentInput);

  if (isNaN(prev) || isNaN(curr)) return;

  let result;

  switch (operator) {
    case "+":
      result = prev + curr;
      break;
    case "-":
      result = prev - curr;
      break;
    case "*":
      result = prev * curr;
      break;
    case "/":
      if (curr === 0) {
        currentInput = "Error";
        operator = null;
        previousInput = "";
        resetNext = true;
        updateDisplay();
        return;
      }
      result = prev / curr;
      break;
    default:
      return;
  }

  currentInput = parseFloat(result.toFixed(8)).toString();
  operator = null;
  previousInput = "";
  resetNext = true;
}

function clearAll() {
  currentInput = "0";
  previousInput = "";
  operator = null;
  resetNext = false;
}

function backspace() {
  if (currentInput.length === 1 || currentInput === "Error") {
    currentInput = "0";
  } else {
    currentInput = currentInput.slice(0, -1);
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-value");
    const action = button.getAttribute("data-action");

    if (value !== null) {
      if (value === ".") {
        inputDecimal();
      } else if (!isNaN(value)) {
        inputDigit(value);
      } else {
        setOperator(value);
      }
    } else if (action === "clear") {
      clearAll();
    } else if (action === "backspace") {
      backspace();
    } else if (action === "equals") {
      calculate();
    }

    updateDisplay();
  });
});
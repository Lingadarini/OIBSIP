const display = document.getElementById("display");
const expressionLine = document.getElementById("expressionLine");
const buttons = document.querySelectorAll(".btn");

let currentInput = "0";
let previousInput = "";
let operator = null;
let resetNext = false;
let lastExpression = "";

const operatorSymbols = {
  "+": "+",
  "-": "−",
  "*": "×",
  "/": "÷"
};

function updateDisplay() {
  if (lastExpression) {
    expressionLine.textContent = lastExpression;
    display.textContent = currentInput;
  } else if (operator && resetNext) {
    expressionLine.textContent = previousInput + " " + operatorSymbols[operator];
    display.textContent = "";
  } else if (operator) {
    expressionLine.textContent = previousInput + " " + operatorSymbols[operator] + " " + currentInput;
    display.textContent = "";
  } else {
    expressionLine.textContent = "";
    display.textContent = currentInput;
  }
}

function inputDigit(digit) {
  lastExpression = "";
  if (currentInput === "0" || resetNext) {
    currentInput = digit;
    resetNext = false;
  } else {
    currentInput += digit;
  }
}

function inputDecimal() {
  lastExpression = "";
  if (resetNext) {
    currentInput = "0";
    resetNext = false;
  }
  if (!currentInput.includes(".")) {
    currentInput += ".";
  }
}

function setOperator(nextOperator) {
  lastExpression = "";
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
  const expressionText = previousInput + " " + operatorSymbols[operator] + " " + currentInput + " =";

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
        lastExpression = expressionText;
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
  lastExpression = expressionText;
  operator = null;
  previousInput = "";
  resetNext = true;
}

function clearAll() {
  currentInput = "0";
  previousInput = "";
  operator = null;
  resetNext = false;
  lastExpression = "";
}

function backspace() {
  lastExpression = "";
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
const num1El = document.getElementById("num1");
const num2El = document.getElementById("num2");
const opEl = document.getElementById("op");
const calcBtn = document.getElementById("calcBtn");
const resultEl = document.getElementById("result");
const errorEl = document.getElementById("error");

// operations as separate functions
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
  if (b === 0) return null; // divisor check
  return a / b;
}

function isValidNumber(value) {
  return value !== "" && !Number.isNaN(Number(value));
}

function calculate() {
  errorEl.textContent = "";

  const n1raw = num1El.value.trim();
  const n2raw = num2El.value.trim();

  if (!isValidNumber(n1raw) || !isValidNumber(n2raw)) {
    errorEl.textContent = "Please enter valid numbers.";
    resultEl.textContent = "--";
    return;
  }

  const a = Number(n1raw);
  const b = Number(n2raw);
  const op = opEl.value;

  let ans;

  switch (op) {
    case "+":
      ans = add(a, b);
      break;
    case "-":
      ans = subtract(a, b);
      break;
    case "*":
      ans = multiply(a, b);
      break;
    case "/":
      ans = divide(a, b);
      if (ans === null) {
        errorEl.textContent = "Invalid input: division by zero.";
        resultEl.textContent = "--";
        return;
      }
      break;
    default:
      errorEl.textContent = "Unknown operator.";
      resultEl.textContent = "--";
      return;
  }

  resultEl.textContent = ans.toFixed(2);
}
function updateButtonText() {
  switch (opEl.value) {
    case "+":
      calcBtn.textContent = "add";
      break;
    case "-":
      calcBtn.textContent = "subtract";
      break;
    case "*":
      calcBtn.textContent = "multiply";
      break;
    case "/":
      calcBtn.textContent = "divide";
      break;
  }
}
opEl.addEventListener("change", updateButtonText);
updateButtonText();

calcBtn.addEventListener("click", calculate);
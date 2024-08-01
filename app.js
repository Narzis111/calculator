let display = document.getElementById('display');
let currentInput = '';
let currentOperator = null;
let previousInput = '';

function appendNumber(number) {
  currentInput += number;
  updateDisplay(currentInput);
}

function appendOperator(operator) {
  if (currentInput === '' && operator !== '-') return;
  if (currentInput.includes('.') && operator === '.') return;

  if (currentOperator !== null) {
    calculateResult();
  }

  currentOperator = operator;
  previousInput = currentInput;
  currentInput = '';
}

function appendDecimal() {
  if (!currentInput.includes('.')) {
    currentInput += '.';
    updateDisplay(currentInput);
  }
}

function clearDisplay() {
  currentInput = '';
  currentOperator = null;
  previousInput = '';
  updateDisplay('0');
}

function calculateResult() {
  let result;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);

  if (isNaN(prev) || isNaN(current)) return;

  switch (currentOperator) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '*':
      result = prev * current;
      break;
    case '/':
      result = prev / current;
      break;
    default:
      return;
  }

  currentInput = result.toString();
  currentOperator = null;
  previousInput = '';
  updateDisplay(currentInput);
}

function updateDisplay(value) {
  display.innerText = value;
}

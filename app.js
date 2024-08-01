let displayElement = document.getElementById('display');
let currentInput = '';
let operator = '';
let operand1 = null;
let operand2 = null;

function clearDisplay() {
    currentInput = '';
    operator = '';
    operand1 = null;
    operand2 = null;
    displayElement.textContent = '0';
}

function appendNumber(number) {
    currentInput += number;
    displayElement.textContent = currentInput;
}

function appendOperator(op) {
    if (currentInput === '' && op === '-') {
        currentInput = '-';
        displayElement.textContent = currentInput;
        return;
    }
    if (operand1 === null) {
        operand1 = parseFloat(currentInput);
        operator = op;
        currentInput = '';
    } else {
        if (currentInput !== '') {
            operand2 = parseFloat(currentInput);
            calculateResult();
            operator = op;
        } else {
            operator = op;
        }
    }
}

function calculateResult() {
    if (operand1 !== null && operator !== '' && currentInput !== '') {
        operand2 = parseFloat(currentInput);
        let result;
        switch (operator) {
            case '+':
                result = operand1 + operand2;
                break;
            case '-':
                result = operand1 - operand2;
                break;
            case '*':
                result = operand1 * operand2;
                break;
            case '/':
                result = operand1 / operand2;
                break;
            default:
                return;
        }
        displayElement.textContent = result;
        operand1 = result;
        currentInput = '';
        operator = '';
    }
}

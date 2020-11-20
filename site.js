document.addEventListener("DOMContentLoaded", () => {
    updateDisplay();
    document.addEventListener("keydown", handleKeypress);
    const keys = document.querySelector('.calculator-keys');
    keys.addEventListener('click', handleButtonClick);
});

const calculator = {
    displayValue: '0',
    operator: null,
    waitingForSecondOperand: true
};

function handleKeypress(event) {
    const { key } = event;
    event.preventDefault(); 
    const element = document.querySelector(`button[value="${key}"]`);
    if (element) {
        element.classList.add('button-active');
        setTimeout(() => { element.classList.remove('button-active'); }, 100);
        console.log(`Click:${element}`);
        element.click();
    }
}

function handleButtonClick(event) {
    const { target } = event;
    const { value } = target;
    if (!target.matches('button')) {
        return;
    }
    console.log(`hadnlebuttonClick:${value}`);
    switch (value) {
        case '+':
        case '-':
        case '*':
        case '/':
        case 'Enter':
            const operator = value =='Enter'? '=': value;
            handleOperator(operator);
            break;
        case '.':
            inputDecimal(value);
            break;
        case 'Delete':
            resetCalculator();
            break;
        default:
            inputDigit(value);
    }
    updateDisplay();
}
function resetCalculator() {
    console.log("resetCalculator");
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.operator = null;
}

function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;
    if (waitingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else if (displayValue.length < 13) {
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
}

function inputDecimal(dot) {
    const { displayValue, waitingForSecondOperand } = calculator;
    if (waitingForSecondOperand === true) {
        calculator.displayValue = "0."
        calculator.waitingForSecondOperand = false;
        return
    }
    if (!displayValue.includes(dot) && displayValue.length < 12) {
        calculator.displayValue += dot;
    }
}

function handleOperator(nextOperator) {
    console.log(`handleOperator: ${nextOperator} ${JSON.stringify(calculator)}`);
    const { firstOperand, displayValue, operator } = calculator;
    const inputValue = parseFloat(displayValue);

    if (operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator;
        console.log("waitingForSecondOperand");
        return;
    }

    if (firstOperand == null && !isNaN(inputValue)) {
        console.log("waitingForSecondOperand");
        calculator.firstOperand = inputValue;
    } else if (operator) {
        const result = calculate(firstOperand, inputValue, operator);
        console.log(`result:${result}`);
        calculator.displayValue = `${parseFloat(result.toFixed(11))}`;
        calculator.firstOperand = result;
    }

    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
}

function calculate(firstOperand, secondOperand, operator) {
    console.log(`calculate:${firstOperand} ${secondOperand} ${operator}`);
    if (operator === '+') {
        return firstOperand + secondOperand;
    } else if (operator === '-') {
        return firstOperand - secondOperand;
    } else if (operator === '*') {
        return firstOperand * secondOperand;
    } else if (operator === '/') {
        return firstOperand / secondOperand;
    }

    return secondOperand;
}


function updateDisplay() {
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.displayValue;
}
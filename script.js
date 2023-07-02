function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return (y == 0) ? undefined : x / y;
}

function operate(num1, operator, num2) {
    switch(operator) {
        case "+":
            return add(num1, num2);

        case "-":
            return subtract(num1, num2);

        case "*":
            return  multiply(num1, num2);

        default:
            return divide(num1, num2);
    }
}

let operand1;
let operator;
let operand2;
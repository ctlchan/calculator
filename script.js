// CONSTANTS
const OPERATORS = ['+', '-', '/', '*']


// FUNCTIONS
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

// Return the result of a binary computation
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

// Input button callback function -> when an input is pressed, add it to the display and manage the 2 arrays used to compute the result(s)
function populateDisplay(e) {
    let display = document.querySelector(".display-number");

    let pressed = e.target.textContent;

    if (pressed == "=")
        calculate()

    else {

        // Disable the decimal button if it has been pressed once when "building" an operand - re-enables when pushing the operand to the expression array.
        if (pressed == ".") {
            e.target.removeEventListener('click', populateDisplay);
        }


        if (OPERATORS.includes(pressed)) {

            // expression.length is only equal to 1 when a result has been previously calculated  - allows you to keep operating on the prior result
            if(expression.length != 1) {
                expression.push(Number(tempArray.join("")));
                document.querySelector(".decimal").addEventListener("click", populateDisplay); // re-enable decimal button for new operand
            }

            tempArray = [];
            expression.push(pressed);
        }

        else {

            // if a result was just previously calculated - allows you to discard the previous result and begin a brand new expression.
            if (expression.length == 1) {
                expression = [];
                display.textContent = "";
            }

            tempArray.push(pressed);
        }

        // // Write pressed button to display - if there isn't an error
        if (display.textContent != "ERROR")
            display.textContent += e.target.textContent;

        else 
            display.textContent = e.target.textContent;

    }

}

// equal button callback fn -> loop through expression array and compute intermediary results until a final result is achieved (or ERROR)
function calculate() {

    let display = document.querySelector(".display-number");

    let operand1, operand2, operator, result;
    let noError = true;

    // Push final operand that is stored in tempArray
    expression.push(tempArray.join(""));
    tempArray = [];

    // Reverse array to take advantage of Array.pop()
    expression.reverse();

    // Take the "first" three parts of the expression and evaluate, before placing the result back into the expression
    while (expression.length >= 3 && noError) {

        operand1 = Number(expression.pop());
        operator = expression.pop();
        operand2 = Number(expression.pop());

        // Must be of the form <num1 OP num2> - indicates an error if not true -> end expression evaluation and display an error
        if (!OPERATORS.includes(operator) || isNaN(operand1) || isNaN(operand2)) {
            noError = false;
            continue;
        }

        result = operate(operand1, operator, operand2);

        if (result == undefined) {
            noError = false;
            continue;
        }

        expression.push(result);
    }

    display.textContent = (noError) ? result : "ERROR";
    expression = [result];
    tempArray = [];

}

// backspace button callback function -> remove the character from the display and manage the underlying arrays used to compute the final result.
function displayDelete() {
    let display = document.querySelector(".display-number");


    // Currently "building" an operand using an array - pop the most recent value to remove it.
    if (tempArray.length != 0) {
        tempArray.pop();
    }

    // Most recent input was an operator -> remove it from the expression array
    else if (OPERATORS.includes(expression.at(-1))) {
        expression.pop();
    }

    // Take a "complete" number from the expression, truncate it, and place it back into the expression array.
    else {
        let temp = expression.pop();

        // when the result is stored after a prior calculation, it will be a number
        if (typeof temp === "number")
            temp = temp.toString();

        tempArray = temp.split("");
        tempArray.pop();
        expression.push(tempArray.join(""));
        tempArray = [];
    }

    // Remove the last character from the display string
    display.textContent = display.textContent.slice(0, -1);
}

// MAIN SCRIPT

let tempArray = []; // a temporary array used to "build" numbers to be used in the expression
let expression = []; // represents an expression, where each element is either an operator or an operand (must be alternating)

let inputButtons = document.querySelectorAll(".input");
let clearBtn = document.querySelector(".clear");
let backspace = document.querySelector(".backspace");

inputButtons.forEach( (button) => button.addEventListener("click", populateDisplay));

clearBtn.addEventListener("click", () => { 
    document.querySelector(".display-number").textContent = "";
    expression = [];
    tempArray = [];
});

backspace.addEventListener("click", displayDelete);

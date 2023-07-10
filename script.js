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

function populateDisplay(e) {
    let display = document.querySelector(".display-number");

    let pressed = e.target.textContent;

    if (pressed == "=")
        calculate()

    else {

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

        console.log("expr: " + expression);
        console.log("tempArray: " + tempArray);

    }

}


function calculate() {

    let display = document.querySelector(".display-number");

    let operand1, operand2, operator, result;
    let noError = true;

    // Push final operand that is stored in tempArray
    expression.push(tempArray.join(""));
    tempArray = [];

    console.log(expression);

    // Reverse array to take advantage of Array.pop()
    expression.reverse();

    while (expression.length >= 3 && noError) {

        operand1 = Number(expression.pop());
        operator = expression.pop();
        operand2 = Number(expression.pop());

        console.log("operating: " + operand1 +" " + operator + " " + operand2);

        if (!OPERATORS.includes(operator) || isNaN(operand1) || isNaN(operand2)) {
            console.log("here");
            noError = false;
            continue;
        }

        result = operate(operand1, operator, operand2);

        if (result == undefined) {
            noError = false;
            continue;
        }

        expression.push(result);
        console.log(expression);
    }

    display.textContent = (noError) ? result : "ERROR";
    expression = [result];
    tempArray = [];

}

function displayDelete() {
    let display = document.querySelector(".display-number");


    if (tempArray.length != 0) {
        tempArray.pop();
    }

    else if (OPERATORS.includes(expression.at(-1))) {
        expression.pop();
    }

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







    display.textContent = display.textContent.slice(0, -1);
}

// MAIN SCRIPT

let tempArray = [];
let expression = [];

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

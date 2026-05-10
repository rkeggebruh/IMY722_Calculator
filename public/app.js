// validation
function validateInput(input) {
    if(input === null || input === undefined) return false;
    if(typeof input !== 'string') return false;
   if(input.length === 0 || input.length > 2) return false;
    return /^[0-9A-Fa-f]+$/.test(input);

}

function validateOutput(output) {
  if (output === null || output === undefined) return false;
  if (typeof output !== 'string') return false;
  if (output.length === 0 || output.length > 4) return false;
  if (output.startsWith('-') || output.includes('.')) return false;
  return /^[0-9A-Fa-f]+$/.test(output);
}

// calc funcs

function add(a, b) {
   if(!validateInput(a) || !validateInput(b)) throw new Error('Your input is invalid');
  const results = (parseInt(a, 16) + parseInt(b, 16))
    .toString(16)
    .toUpperCase();
   if(!validateOutput(results)) throw new Error('Your output is invalid');
  return results;
}


function subtract(a, b) {
   if(!validateInput(a) || !validateInput(b)) throw new Error('Your input is invalid');
  const results = (parseInt(a, 16) - parseInt(b, 16))
    .toString(16)
    .toUpperCase();
     if(!validateOutput(results)) throw new Error('Your output is invalid');
  return results;
}


function multiply(a, b) {
   if(!validateInput(a) || !validateInput(b)) throw new Error('Your input is invalid');
 const results = (parseInt(a, 16) * parseInt(b, 16))
    .toString(16)
    .toUpperCase();
     if(!validateOutput(results)) throw new Error('Your output is invalid');
  return results;
}

function divide(a, b) {
  if(!validateInput(a) || !validateInput(b)) throw new Error('Your input is invalid');
  const divisor = parseInt(b, 16);
  if(divisor === 0) throw new Error('Division by zero'); // Zero passes validateInput and we are catching it here.
  const results = Math.floor(parseInt(a, 16) / divisor)
    .toString(16).toUpperCase();
  if(!validateOutput(results)) throw new Error('Your output is invalid');
  return results;
}

// buttons

function handleOperation(operation) {
  const a = document.getElementById("inputA").value;
  const b = document.getElementById("inputB").value;

  const resultDiv = document.getElementById("result");
  const errorDiv = document.getElementById("error");

  errorDiv.textContent = "";

  try {
    let result;

    switch (operation) {
      case 'add':
        result = add(a, b);
        break;
      case 'subtract':
        result = subtract(a, b);
        break;
      case 'multiply':
        result = multiply(a, b);
        break;
      case 'divide':
        result = divide(a, b);
        break;
    }

    resultDiv.textContent = "Result: " + result;

  } catch (err) {
    resultDiv.textContent = "Result:";
    errorDiv.textContent = err.message;
  }
}

if (typeof module === 'undefined') {
  const inputA = document.getElementById("inputA");
  const inputB = document.getElementById("inputB");

  inputA.addEventListener("click", () => { activeInput = inputA; });
  inputB.addEventListener("click", () => { activeInput = inputB; });
}
 else {
  module.exports = { handleOperation, add, subtract, multiply, divide, validateInput, validateOutput };
}
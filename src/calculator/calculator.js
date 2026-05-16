const { validateInput, validateOutput } = require('./validation');

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


module.exports = { add, subtract, multiply, divide };
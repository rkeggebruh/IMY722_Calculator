function add(a, b) {
  return (parseInt(a, 16) + parseInt(b, 16))
    .toString(16)
    .toUpperCase();
}

function subtract(a, b) {
  return (parseInt(a, 16) - parseInt(b, 16))
    .toString(16)
    .toUpperCase();
}

function multiply(a, b) {
  return (parseInt(a, 16) * parseInt(b, 16))
    .toString(16)
    .toUpperCase();
}

function divide(a, b) {

  const numA = parseInt(a, 16);
  const numB = parseInt(b, 16);

  if (numB === 0) {
    throw new Error('Division by zero');
  }

  const result = Math.floor(numA / numB);

  return result.toString(16).toUpperCase();
}

module.exports = { add, subtract, multiply, divide };
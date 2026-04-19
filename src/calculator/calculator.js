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
  return Math.floor(parseInt(a, 16) / parseInt(b, 16))
    .toString(16)
    .toUpperCase();
}

module.exports = { add, subtract, multiply, divide };
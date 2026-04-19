//Function for the input validations


function validateInput(input) {
  if (!input) return false;
  // Max length of characters is two 2
  if (input.length > 2) return false;

  // Hexadecimal check
  const hexRegex = /^[0-9A-Fa-f]+$/;
  return hexRegex.test(input);
}


//Function for the output validations
function validateOutput(output) {
  if (!output) return false;
  //Output values can't be a negative value
  if (output.startsWith('-')) return false;

  // No decimal numbers are allowed
  if (output.includes('.')) return false;

  // Maximum output values is 4
  if (output.length > 4) return false;

  // Output values must be in a hexadecimal format.
  const hexRegex = /^[0-9A-Fa-f]+$/;

  return hexRegex.test(output);
}

module.exports = {
  validateInput,
  validateOutput
};
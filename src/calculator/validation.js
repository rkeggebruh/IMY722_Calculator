//Function for the input validations.

function validateInput(input) {
    if(input === null || input === undefined) return false; //If the user puts in a null or undefined value, the function will immediately return false.
    if(typeof input !== 'string') return false; //Calculator is GUI based therefore will allow the string
   if(input.length === 0 || input.length > 2) return false;
    return /^[0-9A-Fa-f]+$/.test(input); //Checking if the format of the input values are hexadecimal values.

}


//Function for the output validations.

//The output values should not return a negative value or decimal values. The maximum output is 4 values and the values
//must be in a hexadecimal format

function validateOutput(output) {
  if (output === null || output === undefined) return false;
  if (typeof output !== 'string') return false;
  if (output.length === 0 || output.length > 4) return false;
  if (output.startsWith('-') || output.includes('.')) return false;
  return /^[0-9A-Fa-f]+$/.test(output);



module.exports = { validateInput, validateOutput };
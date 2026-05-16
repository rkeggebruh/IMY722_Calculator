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

module.exports = { validateInput, validateOutput };
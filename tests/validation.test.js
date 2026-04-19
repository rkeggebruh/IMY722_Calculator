const { validateInput, validateOutput } = require('../src/calculator/validation');

//Testing the input values.
test('inputs with valid hexadecimal format passes', () => {
  expect(validateInput("1A")).toBe(true);
});


test('input digits with single values pass', () => {
  expect(validateInput("F")).toBe(true);
}); //Up to two hexadecimal input characters should be valid. 


test('input values with non-hexadecimal characters are rejected', () => {
  expect(validateInput("1G")).toBe(false);
  expect(validateInput("ZZ")).toBe(false);
}); //This test checks to ensure that non-hexadecimal character will get rejected

test('input values with more than 2 digits are rejected', () => {
  expect(validateInput("ABC")).toBe(false);
});// FR 1.3  and 1.4 states that the system should reject any hexadecimal digits that are longer than 2 digits.
//This test checks to ensure that the hexadecimal only have up to 2 digits. Anything beyond that comes back as false.

test('empty inputs fail', () => {
  expect(validateInput("")).toBe(false);
}); //Empty inputs will not be accepted.

test('null and undefined values should not break anything', () => {
  expect(validateInput(null)).toBe(false);
  expect(validateInput(undefined)).toBe(false);
});



// Testing the output values.
test('valid 4 digit hexadecimal output passes', () => {
  expect(validateOutput("1A2F")).toBe(true);
}); //A valid output should have a maximum of 4 digits

test('output longer with longer than 4 digits fails', () => {
  expect(validateOutput("ABCDE")).toBe(false);
}); //An output with more than 4 digits will be failed.


test('negative numbers are not allowed as outputs', () => {
  expect(validateOutput("-1A")).toBe(false);
}); //Output values with negative numbers will not pass.



test('no decimal output', () => {
  expect(validateOutput("1A.2")).toBe(false);
}); // The output cannot be in the form of a decimal number.


test('null and undefined should not break anything', () => {
  expect(validateOutput(null)).toBe(false);
  expect(validateOutput(undefined)).toBe(false);
});
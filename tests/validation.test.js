//Validations that need to be tested on input values.
const { validateInput } = require('../src/calculator/validation');
test('valid hex input passes', () => {
  expect(validateInput("1A")).toBe(true);
});
test('rejects non-hexadecimal characters', () => {
  expect(validateInput("1G")).toBe(false);
});
test('rejects more than 2 digits', () => {
  expect(validateInput("ABC")).toBe(false);
});
test('rejects empty input', () => {
  expect(validateInput("")).toBe(false);
});


//Validations that need to be tested on output values.
const { validateOutput } = require('../src/calculator/validation');

test('valid output passes', () => {
  expect(validateOutput("1A2F")).toBe(true);
});
test('rejects output longer than 4 digits', () => {
  expect(validateOutput("ABCDE")).toBe(false);
});
test('rejects negative output', () => {
  expect(validateOutput("-1A")).toBe(false);
});
test('rejects decimal output', () => {
  expect(validateOutput("1A.2")).toBe(false);
});
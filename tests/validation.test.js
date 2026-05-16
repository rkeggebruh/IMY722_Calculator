const { validateInput, validateOutput } = require('../src/calculator/validation');

test('inputs with valid hexadecimal format passes', () => {
  expect(validateInput("1A")).toBe(true);
});

test('input digits with single values pass', () => {
  expect(validateInput("F")).toBe(true);
});

test('input values with non-hexadecimal characters are rejected', () => {
  expect(validateInput("1G")).toBe(false);
  expect(validateInput("ZZ")).toBe(false);
});

test('input values with more than 2 digits are rejected', () => {
  expect(validateInput("ABC")).toBe(false);
});

test('empty inputs fail', () => {
  expect(validateInput("")).toBe(false);
});

test('null and undefined values should not break anything', () => {
  expect(validateInput(null)).toBe(false);
  expect(validateInput(undefined)).toBe(false);
});


test('valid 4 digit hexadecimal output passes', () => {
  expect(validateOutput("1A2F")).toBe(true);
});

test('output longer with longer than 4 digits fails', () => {
  expect(validateOutput("ABCDE")).toBe(false);
});


test('negative numbers are not allowed as outputs', () => {
  expect(validateOutput("-1A")).toBe(false);
});

test('no decimal output', () => {
  expect(validateOutput("1A.2")).toBe(false);
});

test('null and undefined should not break anything', () => {
  expect(validateOutput(null)).toBe(false);
  expect(validateOutput(undefined)).toBe(false);
});
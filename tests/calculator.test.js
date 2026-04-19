const { add, subtract, multiply, divide } = require('../src/calculator/calculator');

test('adds two hexadecimal numbers', () => {
  expect(add('A', '1')).toBe('B');
});

test('subtracts two hexadecimal numbers', () => {
  expect(subtract('A', '1')).toBe('9');
});

test('multiplies two hexadecimal numbers', () => {
  expect(multiply('A', '2')).toBe('14');
});

test('divides two hexadecimal numbers', () => {
  expect(divide('A', '2')).toBe('5');
});


// Tests for the validation integration.
test('invalid input values are rejected by the add function', () => {
  expect(() => add('ZZ', '1')).toThrow('Your input is invalid');
});


test('invalid input values are rejected by the subtract function', () => {
  expect(() => subtract('GG', '1')).toThrow('Your input is invalid');
});


test('invalid input values are rejected by the multiply function', () => {
  expect(() => multiply('1', 'ZZZ')).toThrow('Your input is invalid');
});

test('invalid input values are rejected by the divide function', () => {
  expect(() => divide('1', 'GG')).toThrow('Your input is invalid');
});



// DIVISION EDGE CASES
test('division should not allow decimals', () => {
  expect(divide('5', '2')).toBe('2');
});

test('dividing by zero throws an error', () => {
  expect(() => divide('A', '0')).toThrow();
});
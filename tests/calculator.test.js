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
const { add } = require('../src/calculator/calculator');

test('adds two hexadecimal numbers', () => {
  expect(add('A', '1')).toBe('B');
});
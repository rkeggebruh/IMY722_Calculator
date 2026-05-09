const fs = require('fs');
const path = require('path');

//Reading and wrapping the app.js so that its functions can be extracted.
const app = fs.readFileSync(path.resolve(__dirname, '../public/app.js'), 'utf8');


// Readimh the HTML in the public folder.
const html = fs.readFileSync(path.resolve(__dirname, '../public/index.html'), 'utf8');

function setupDOM() {
  document.documentElement.innerHTML = html;
}

// Wrapping the code in a function that returns all the required functions.
const moduleFactory = new Function(
  'document',
  `${app}; return { handleOperation, validateInput, validateOutput, add, subtract, multiply, divide };`
);



// Getting the functions, passing jsdom's document so they can manipulate the DOM
let handleOperation;
beforeEach(() => {
  setupDOM();
  const fns = moduleFactory(document);
  handleOperation = fns.handleOperation;
});

// Testing if the basic gui elements exists.
describe('GUI elements exist', () => {
  test('Input A field exists', () => {
    expect(document.getElementById('inputA')).not.toBeNull();
  });

  
  test('Input B field exists', () => {
    expect(document.getElementById('inputB')).not.toBeNull();
  });

  test('Result display exists.', () => {
    expect(document.getElementById('result')).not.toBeNull();
  });
  

  test('Error display exists.', () => {
    expect(document.getElementById('error')).not.toBeNull();
  });

  test('Four operation buttons exist.', () => {
    const operationButtons = document.querySelectorAll('.buttons button');
    expect(operationButtons.length).toBe(4);
  });
});



// Testings the correct output displas.
describe('Correct output is displayed.', () => {
  test('Addition result is displayed correctly', () => {
    document.getElementById('inputA').value = 'A';
    document.getElementById('inputB').value = '1';
    handleOperation('add');
    expect(document.getElementById('result').textContent).toBe('Result: B');
  });


  test('Subtraction result is displayed correctly.', () => {
    document.getElementById('inputA').value = 'A';
    document.getElementById('inputB').value = '1';
    handleOperation('subtract');
    expect(document.getElementById('result').textContent).toBe('Result: 9');
  });


  test('Multiplication result is displayed correctly', () => {
    document.getElementById('inputA').value = 'A';
    document.getElementById('inputB').value = '2';
    handleOperation('multiply');
    expect(document.getElementById('result').textContent).toBe('Result: 14');
  });



  test('Division result is displayed correctly.', () => {
    document.getElementById('inputA').value = 'A';
    document.getElementById('inputB').value = '2';
    handleOperation('divide');
    expect(document.getElementById('result').textContent).toBe('Result: 5');
  });
});



// Testing the edge cases and invalid inputs.
describe('Edge cases and invalid input handling.', () => {
  test('Invalid hexadecimal inputs re invalid.', () => {
    document.getElementById('inputA').value = 'ZZ';
    document.getElementById('inputB').value = '1';
    handleOperation('add');
    expect(document.getElementById('error').textContent).toBe('Your input is invalid');
  });



  test('Inputs longer than 2 digits are not accepted.', () => {
    document.getElementById('inputA').value = 'ABC';
    document.getElementById('inputB').value = '1';
    handleOperation('add');
    expect(document.getElementById('error').textContent).toBe('Your input is invalid');
  });



  test('Division by zero is invalid.', () => {
    document.getElementById('inputA').value = 'A';
    document.getElementById('inputB').value = '0';
    handleOperation('divide');
    expect(document.getElementById('error').textContent).toBe('Division by zero');
  });


  test('Result resets to "Result:" when an error occurs.', () => {
    document.getElementById('inputA').value = 'ZZ';
    document.getElementById('inputB').value = '1';
    handleOperation('add');
    expect(document.getElementById('result').textContent).toBe('Result:');
  });



  test('Error message when a valid operation follows an invalid one.', () => {
    document.getElementById('inputA').value = 'ZZ';
    document.getElementById('inputB').value = '1';
    handleOperation('add');
    document.getElementById('inputA').value = 'A';
    document.getElementById('inputB').value = '1';
    handleOperation('add');

    expect(document.getElementById('error').textContent).toBe('');
  });



  test('Max valid input (FF + FF) produces a valid result.', () => {
    document.getElementById('inputA').value = 'FF';
    document.getElementById('inputB').value = 'FF';
    handleOperation('add');
    expect(document.getElementById('result').textContent).toBe('Result: 1FE');
  });
});



// Testing the interaction between the backend logic and the GUI.
describe('GUI correctly connects to backend logic.', () => {
  test('Result updates each time an operation is performed.', () => {
    document.getElementById('inputA').value = '1';
    document.getElementById('inputB').value = '1';
    handleOperation('add');
    expect(document.getElementById('result').textContent).toBe('Result: 2');
    document.getElementById('inputA').value = 'F';
    document.getElementById('inputB').value = 'F';
    handleOperation('multiply');
    expect(document.getElementById('result').textContent).toBe('Result: E1');
  });



  test('Division floors the resuls so no decimal values are shown.', () => {
    document.getElementById('inputA').value = '5';
    document.getElementById('inputB').value = '2';
    handleOperation('divide');
    expect(document.getElementById('result').textContent).toBe('Result: 2');
  });
});
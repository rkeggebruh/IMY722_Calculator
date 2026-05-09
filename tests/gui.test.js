const fs = require('fs');
const path = require('path');


//Reading and wrapping content in app.js so its functions can be extracted.
const app = fs.readFileSync(path.resolve(__dirname, '../public/app.js'), 'utf8');


//Reading the html file from public  folder.
const html = fs.readFileSync(path.resolve(__dirname, '../public/index.html'), 'utf8');
function setupDOM() {
  document.documentElement.innerHTML = html;
}


// Wraping the code in a function that returns all the functions that are required.
const moduleFactory = new Function(
  'document',
  `${app}; return { handleOperation, validateInput, validateOutput, add, subtract, multiply, divide };`
);



// Get the functions, passing jsdom's document so they can manipulate the DOM.
let handleOperation;
beforeEach(() => {
  setupDOM();
  const fns = moduleFactory(document);
  handleOperation = fns.handleOperation;
});



//Testing if basic elements exist.
describe('GUI elements exist.', () => {
  test('Input A field exists.', () => {
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
    const operationsButtons = document.querySelectorAll('.buttons button');
    expect(operationsButtons.length).toBe(4);
  });
});



//Testing if the correct output is displayed for each operation with examples.
describe('Correct output is displayed.', () => {
  test('Addition results are displayed correctly', () => {
    document.getElementById('inputA').value = '5A';
    document.getElementById('inputB').value = '2';
    handleOperation('add');
    expect(document.getElementById('result').textContent).toBe('Result: 5C');
  });


  test('Subtraction result is displayed correctly.', () => {
    document.getElementById('inputA').value = '5A';
    document.getElementById('inputB').value = '2';
    handleOperation('subtract');
    expect(document.getElementById('result').textContent).toBe('Result: 58');
  });

  test('Multiplication result is displayed correctly.', () => {
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

// Testing edge cases and invalid input tests.
describe('Edge cases and invalid input handling', () => {
  test('Invalid hex input shows an error message', () => {
    document.getElementById('inputA').value = 'ZZ';
    document.getElementById('inputB').value = '1';
    handleOperation('add');
    expect(document.getElementById('error').textContent).toBe('Your input is invalid');
  });

  test('Input longer than 2 digits shows an error message.', () => {
    document.getElementById('inputA').value = 'ABC';
    document.getElementById('inputB').value = '1';
    handleOperation('add');
    expect(document.getElementById('error').textContent).toBe('Your input is invalid');
  });

  
  test('Division by zero shows an error message.', () => {
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


  test('Error message clears when a valid operation follows an invalid one', () => {
    document.getElementById('inputA').value = 'ZZ';
    document.getElementById('inputB').value = '1';
    handleOperation('add');

    document.getElementById('inputA').value = 'A';
    document.getElementById('inputB').value = '1';
    handleOperation('add');

    expect(document.getElementById('error').textContent).toBe('');
  });

  test('Max valid input (FF + FF) produces a valid result', () => {
    document.getElementById('inputA').value = 'FF';
    document.getElementById('inputB').value = 'FF';
    handleOperation('add');
    expect(document.getElementById('result').textContent).toBe('Result: 1FE');
  });
});

//Testing the interaction between GUI and backend logic.
describe('GUI connects to backend logic.', () => {
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


  test('Division floors the result to show no decimal', () => {
    document.getElementById('inputA').value = '5';
    document.getElementById('inputB').value = '2';
    handleOperation('divide');
    expect(document.getElementById('result').textContent).toBe('Result: 2');
  });
});
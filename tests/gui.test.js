const fs = require('fs');
const path = require('path');

const {handleOperation } = require('../public/app.js');

const html = fs.readFileSync(path.resolve(__dirname, '../public/index.html'), 'utf8');


function settingUpDOM(){document.documentElement.innerHTML = html;};
beforeEach(() => {settingUpDOM();});


//Testing the existance of the GUI elements of the hex calc.

test('Input field A exist', () =>{expect(document.getElementById('inputA')).not.toBeNull();});

test('Input field A exist', () =>{expect(document.getElementById('inputB')).not.toBeNull();});
test('Input field A exist', () =>{expect(document.getElementById('result')).not.toBeNull();});

test('Input field A exist', () =>{expect(document.getElementById('error')).not.toBeNull();});


//Testing to see if all the operations buttons exist and number buttons exists

test('All 4 operations exist', ()=> {const buttons=document.querySelectorAll('.ops button');
    expect(buttons.length).toBe(4);

});

//Testing to ensure that the operations buttons display the correct symbols.

test('Addition button displays the plus symbol', ()=>{const buttons=document.querySelectorAll('.ops button');
expect(buttons[0].textContent).toBe('+');

});

test('Subract button displays a minus symbol', () =>{const buttons = document.querySelectorAll('.ops button');
  expect(buttons[1].textContent).toBe('−');
});


test('Multiply button display a multiplication symbol', () =>{const buttons = document.querySelectorAll('.ops button');

  expect(buttons[2].textContent).toBe('×');

});


test('Divive button displays a division symbol', () =>{const buttons = document.querySelectorAll('.ops button');
  expect(buttons[3].textContent).toBe('÷');
});

//Testing to ensure that the 16 hexadecimal number buttons exist


test('All 16 hexadecimal numbers exist', ()=> {const buttons=document.querySelectorAll('.numbers button');
    expect(buttons.length).toBe(16);
});


test('Backspace button does exist', () => {const buttons =document.querySelectorAll('.buttons button')
const backspace =Array.from(buttons).find(b => b.textContent === '⌫');
expect(backspace).not.toBeNull();
});


test('Clearing button does exist', () => {const buttons =document.querySelectorAll('.buttons button')
const clearing =Array.from(buttons).find(b => b.textContent === 'C');
expect(clearing).not.toBeNull();

});




//Testing to ensure that the correct results are displayed.
test('Results of an addition operation are displayed correctly', ()=>{
document.getElementById('inputA').value='A';document.getElementById('inputB').value='5';
handleOperation('add'); expect(document.getElementById('result').textContent).toBe('Result: F');
});


test('Subtraction results are displayed correctly', () => {
document.getElementById('inputA').value = 'A';
document.getElementById('inputB').value = '1';
handleOperation('subtract');
expect(document.getElementById('result').textContent).toBe('Result: 9');
  });


test('Multiplication results are displayed correctly', () => {
document.getElementById('inputA').value = 'A';
document.getElementById('inputB').value = '2';
handleOperation('multiply');
expect(document.getElementById('result').textContent).toBe('Result: 14');
});


test('Division results are displayed correctly', () => {
document.getElementById('inputA').value = 'A';
document.getElementById('inputB').value = '2';
handleOperation('divide'); expect(document.getElementById('result').textContent).toBe('Result: 5');
  });




//Testing the edge cases and making sure te error messages display correclty.
test('Input is not a hexadecimal value show error', () =>{
document.getElementById('inputA').value='ZZ';
document.getElementById('inputB').value='1';
handleOperation('add');
expect(document.getElementById('error').textContent).toBe('Your input is invalid');
});


test('Input fields are empty error message displayes', ()=>{
document.getElementById('inputA').value = '';
document.getElementById('inputB').value ='';
handleOperation('add');expect(document.getElementById('error').textContent).toBe('Your input is invalid');
});


test('Input is longer than 2 digits, show an error', () =>{
document.getElementById('inputA').value="ABC";
document.getElementById('inputB').value="1";
handleOperation('add');
expect(document.getElementById('error').textContent).toBe('Your input is invalid')});



test('Dividing by zero shows an error', () => {
document.getElementById('inputA').value = 'A';
document.getElementById('inputB').value = '0';
handleOperation('divide');
expect(document.getElementById('error').textContent).toBe('Division by zero');});


test('Results resets to "Result" when an error occurs', () => {
document.getElementById('inputA').value = 'ZZ';
document.getElementById('inputB').value = '1';
handleOperation('add');
expect(document.getElementById('result').textContent).toBe('Result:');
  });


test('Error message clears when a valid operation comes after an invalid operation', () => {
document.getElementById('inputA').value = 'ZZ';
document.getElementById('inputB').value ='1';
handleOperation('add');

document.getElementById('inputA').value = 'B';
document.getElementById('inputB').value ='5';
handleOperation('add');
expect(document.getElementById('result').textContent).toBe('Result: 10'); });


  test('Max valid input for addition produces a valid result', () => {
document.getElementById('inputA').value = 'FF';
 document.getElementById('inputB').value = 'FF';
handleOperation('add');
expect(document.getElementById('result').textContent).toBe('Result: 1FE');});


test('Subtraction that provide a negative value should show an error', () =>{

document.getElementById('inputA').value='1';
document.getElementById('inputB').value="A";

 handleOperation('subtract');

    expect(document.getElementById('error').textContent).toBe('Your output is invalid');

  });




  //Testing the interaction between our backend logic and GUI

test('Results will update whenever a new operation is performed', () =>{
document.getElementById('inputA').value = 'F';
document.getElementById('inputB').value = '32';
handleOperation('add');
expect(document.getElementById('result').textContent).toBe('Result: 41');

 document.getElementById('inputA').value = 'A4';
 document.getElementById('inputB').value = '2';
 handleOperation('multiply');

expect(document.getElementById('result').textContent).toBe('Result: 148');
});
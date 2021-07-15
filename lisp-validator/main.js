const lispValidator = require('./lisp-validator');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

// Get LISP code from user and print to console whether input contains VALID or INVALID parentheses
readline.question("Please enter LISP code: ", lispCode => {
  const result = lispValidator.validateLisp(lispCode) ? 'VALID' : 'INVALID';
  console.log(`The input LISP code has ${result} parentheses.`);

  readline.close();
});

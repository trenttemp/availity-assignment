const jest = require('jest');

const lispValidator = require('./lisp-validator');

describe('LISP parentheses validator', () => {
  test('returns true when passed LISP code with valid parentheses', () => {
    expect(lispValidator.validateLisp('(write (+ 7 9 11))')).toBe(true);
    expect(lispValidator.validateLisp('(write(+ (* (/ 9 5) 60) 32))')).toBe(true);
    expect(lispValidator.validateLisp('(/ (* a (+ b c) ) d)')).toBe(true);
  });

  test('returns false when passed LISP code with invalid parentheses', () => {
    expect(lispValidator.validateLisp('(write + 7 9 11))')).toBe(false);
    expect(lispValidator.validateLisp('(write(+ (* (/ 9 5) 60) 32')).toBe(false);
    expect(lispValidator.validateLisp('(/ (* a (+ b c ) d)')).toBe(false);
  });
})

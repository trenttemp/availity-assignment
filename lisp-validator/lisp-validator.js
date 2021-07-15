/**
 * Function to validate the parentheses in a LISP string
 * @param {string} lispCode
 * @returns {boolean}
 */
const validateLisp = lispCode => {
  const charStack = [];

  for (let char of lispCode) {
    switch (char) {
      case "(":
        charStack.push(char);
        break;
      case ")":
        // If charStack is empty, closing parentheses has no paired opening parentheses. Return false.
        if (charStack.length === 0) {
          return false;
        }
        charStack.pop();
        break;
      default:
        break;
    }
  }

  // If stack not empty after completion of loop, one or more opening parentheses had no paired closing parentheses. Return
  // false, otherwise return true
  return charStack.length === 0;
};

exports.validateLisp = validateLisp;

/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  const cleaned = str.replace(/[^a-z0-9]/gi, '').toLowerCase();

  if(str.length <= 1) return true;

  const reversedStr = cleaned.split('').reverse().join('');

  return cleaned === reversedStr;
}

module.exports = isPalindrome;

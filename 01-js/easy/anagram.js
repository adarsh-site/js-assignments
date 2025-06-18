/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  let s1 = str1.split('').sort().join('');
  let s2 = str2.split('').sort().join('');

  const format = str => str.replace(/\s+/g, '').toLowerCase().split('').sort().join('');

  return format(str1) === format(str2);
}

module.exports = isAnagram;

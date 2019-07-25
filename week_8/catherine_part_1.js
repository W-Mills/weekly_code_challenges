/*
input:
  - a list of box ids
output:
  - a checksum
rules:
  - get the count of ids containing exactly 2 of any letter
  - get the count of ids containing exactly 3 of any letter
  - multiply the two counts together to get the checksum
  - if an id as a count of two and a count of three, it counts twice
  - if an id as two counts of two or two counts of three it counts only once
steps:
  - parse the input into an array of string ids
  - define helper functions
    - to get letter count
    - to check if any letter appears 2x or 3x
  - main function:
    - define a twoCount and threeCount variables, initialized with a value of zero
    - iterate over ids; for each string:
      - get letter count
      - if any letter has a count of two increment twoCount
      - if any letter has a count of three increment threeCount
  - multiply and return
notes:
  - I'm trying to use a modular style, where each function does one thing
*/

function fileRead(filename) {
  var contents = fs.readFileSync(filename);
  return contents.toString();
}

function countLetters(str) {
  var letterCount = {};

  str.split('').forEach((letter) => {
    letterCount[letter] ? letterCount[letter] += 1 : letterCount[letter] = 1;
  });

  return letterCount;
}

function hasCount(letterCount, count) {
  return Object.keys(letterCount).some((letter) => letterCount[letter] == count);
}

function getChecksum(ids) {
  var twoCount = 0;
  var threeCount = 0;

  ids.forEach((id) => {
    let letterCount = countLetters(id);
    if (hasCount(letterCount, 2)) twoCount += 1;
    if (hasCount(letterCount, 3)) threeCount += 1;
  });

  return twoCount * threeCount;
}

var fs = require('fs');
var ids = fileRead('catherine_input.txt').split('\n');
console.log(getChecksum(ids)); // 5368

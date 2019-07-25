/*
input:
  - same as part one, a list of string ids
output:
  - a string of letters, the letters common between the two correct box ids
rules:
  - seems like only two boxes match the given criterion
  - all letters at a given index must be the same except one
    - ex: 'fghij' and 'fguij'
    - ex2: this is not a match, because there are two different letters => 'abcde' and 'axcye'
notes:
  - all ids seems to have the same length, makes things easier
  - I'm trying to use a modular style, where each function does one thing
*/

function fileRead(filename) {
  var contents = fs.readFileSync(filename);
  return contents.toString();
}

function matchingIds(id1, id2) {
  var differenceCount = 0;

  for (let i = 0; i < id1.length; i += 1) {
    if (id1[i] !== id2[i]) differenceCount += 1;
    if (differenceCount > 1) return false;
  }

  return differenceCount == 1;
}

function findMatchingBoxes(ids) {
  for (let i = 0; i < ids.length - 1; i += 1) {
    for (let j = i + 1; j < ids.length; j += 1) {
      if (matchingIds(ids[i], ids[j])) return [ids[i], ids[j]];
    }
  }
}

function getSharedLetters(id1, id2) {
  return id1.split('').filter((letter, idx) => letter == id2[idx]).join('');
}

var fs = require('fs');
var ids = fileRead('catherine_input.txt').split('\n');
var boxes = findMatchingBoxes(ids);
console.log(getSharedLetters(...boxes)); // cvgywxqubnuaefmsljdrpfzyi

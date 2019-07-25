
// Part 1
function match(charCounter, times ) {
  return Object.keys(charCounter).some(function(char) {
    return charCounter[char] === times;
  })

}

function countChars(idString) {
  let chars = {};
  return idString.split('').reduce(function(chars, char){
    chars[char] = (chars[char] + 1) || 1;
    return chars;
  }, chars)
}

function checksum(idList) {
  let counter2 = 0;
  let counter3 = 0;
  let charCounter;
  idList.forEach(function(id) {
    charCounter = countChars(id);
    counter3 += Number(match(charCounter, 3));
    counter2 += Number(match(charCounter, 2));
  })

  return counter2 * counter3;
}

function parseFile(filename) {
  const fs = require('fs');
  let data = fs.readFileSync(filename, 'utf8');
  return data.split("\n").slice(0,-1);
}

let idList = parseFile('wk8_maxhawk_input.txt');


// Part 2

function findCommonLetters(idList) {
  let i;
  let j;
  let k;
  let boxId1;
  let boxId2;
  let countDifferences;
  let diffPos;
  for(i = 0; i < idList.length; i += 1) {
    boxId1 = idList[i];
    for (j = 0; j < idList.length; j += 1) {
      if (i === j) continue;
      boxId2 = idList[j];
      countDifferences = 0;
      for (k = 0; k < boxId1.length; k += 1) {
        if (boxId1[k] !== boxId2[k]) {
          countDifferences += 1;
          diffPos = k;
        }
        if (countDifferences > 1) break;
      }
      if (countDifferences === 1) {
        return boxId1.substring(0,diffPos) + boxId1.substring(diffPos + 1);
      }
    }
  }
}

console.log(checksum(idList));
console.log(findCommonLetters(idList));

/*

Part 1:

Input: an array of strings
Output: a number

Problem: 
  - Take an array of strings, and check each string:
    - If the string has 2 repeated letters => doubles += 1
    - If the string has 3 repeated letters => triples += 1
  - Multiply the final count of doubles by triples to get the *checksum*


Clarifying Questions: 
  - 

Data Structure: 
  - Array of strings

Algorithm: 
  - INIT doubles = 0
  - INIT triples = 0

  - Write a function that iterates over the chars in a string
    - INIT a counts object
    - for each char:
      - IF counts has that char as a key, count += 1
      - ELSE counts[key] = 1
    - IF findTriples(string) => triples += 1
    - IF findDoubles(string) => doubles += 1

    - return/log doubles * triples
    
  - Helper function findTriples that iterates over counts object
    - iterate over keys of counts
        - if any value is >= 3 => return true 
        
  - Helper function findDoubles
    - iterate over keys of counts
      - if any value is === 2 => return true
*/ 

//Code

const fs = require("fs");

const data = fs
  .readFileSync("wk8_wrm_input.txt", "utf8")
  .split("\n");

function findChecksum(boxIDs) {
  let doubles = 0;
  let triples = 0;

  boxIDs.forEach(ID => {
    const counts = {};
    const chars = ID.split('');
    
    chars.forEach(char => {
      if (counts[char] !== undefined) {
        counts[char] += 1;
      } else {
        counts[char] = 1;
      }
    });

    if (findDoubles(counts)) { doubles += 1; }
    if (findTriples(counts)) { triples += 1; }
  });

  return doubles * triples;
}

function findTriples(counts) {
  for (let key in counts) {
    if (counts[key] >= 3) {
      return true;
    }
  }
}

function findDoubles(counts) {
  for (let key in counts) {
    if (counts[key] === 2) {
      return true;
    }
  }
}

console.log(findChecksum(data)); // 4712

/*
Part 2: 

Input: An array of strings
Output: a string, the common chars of the two strings that only differ by one char

Problem: 
  - Take an array of strings
    - find the two strings that only differ by one char
    - return the common chars (remove the one char that is different)

Clarifying Questions: 
  - 

Data Structure: 
  - Array of strings

Algorithm: 
  - Iterate over the array of strings
    - for each (currentString), iterate over the input data of all strings
      - INIT differences to 0
      - IF at the same index, they have different chars
        - differences += 1
        IF after iterating through all chars of string, differences === 1 
          => return foundMatches)

  Helper function:
  - iterate over foundMatches from index 0 to length - 1
    - if at same index char === char
     - finalString += char
  - return finalString
*/ 

//Code:

function findPrototypeFabric(data) {
  for (let i = 0; i < data.length - 1; i += 1) {
    let currentString = data[i];
    
    for (let j = 0; j < data.length - 1; j += 1) {
      let compareString = data[j];
      let differences = 0;

      for (let k = 0; k < currentString.length; k += 1) {
        let char = currentString[k];
        
        if (compareString[k] !== char) {
          differences += 1;
        }

        if (k === currentString.length - 1 && differences === 1) {
          return similarChars([currentString, compareString]);
        }
      }
    }
  }

  return false;
}

function similarChars(almostMatches) { 
  const [first, second] = [almostMatches[0], almostMatches[1]];
  let finalString = "";

  for (let i = 0; i < first.length; i += 1) {
    let char = first[i];
    
    if (char === second[i]) {
      finalString += char;
    }
  }

  return finalString;
}

//Test Cases: 
console.log(findPrototypeFabric(data)); // "lufjygedpvfbhftxiwnaorzmq"

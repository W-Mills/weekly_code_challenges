/*
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
  
  return false;
}

function findDoubles(counts) {
  for (let key in counts) {
    if (counts[key] === 2) {
      return true;
    }
  }
  
  return false;
}

console.log(findChecksum(data));
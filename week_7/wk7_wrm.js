// pt. 1

const fs = require("fs");

const data = fs
  .readFileSync("wk7_wrm_input.txt", "utf8")
  .split("\n")
  .map(num => Number(num));

const resultingFrequency = data.reduce((sum, change) => sum + change, 0);
console.log(resultingFrequency);

// pt. 2 https://adventofcode.com/2018/day/1#part2

/*
Input: an array of numbers
Output: a number, the first running total number that is seen twice

Problem: 
  - Find the first "frequency" i.e. running total that is repeated in a sequence  

Clarifying Questions: 
  - 

Data Structure: 
  - Array of numbers, with an object holding counts

Algorithm: 
  - INIT an object to hold result frequency
  - INIT a found variable to false
  - INIT a currentTotal variable to 0 to track the current total
  - INIT an i variable to keep track of current iteration index
  - Iterate over the array of frequency changes from the beginning using a while loop
    - For each step:
      - IF: the object seen has that value as a key: stop iteration and return that value 
      - ELSE: add that value to the object as a key with a value of 1
      
      - IF: no duplicate has been found after iterating through all data numbers once
        - reset iteration to index 0 of data (but keeping the seen tracker object)
      - ELSE: increment iterating index += 1
*/ 

//Code:
function findFirstDuplicate(data) {
  const seen = {};
  let currentTotal = 0;
  let found = false;

  let i = 0;

  while (found === false) {
    currentTotal += data[i];

    if (seen[currentTotal]) {
      found = currentTotal;
    } else {
      seen[currentTotal] = 1;
    }

    if (i === data.length - 1) {
      i = 0;
    } else {
      i += 1;
    }
  }

  return found;
}

//Test Cases: 
console.log(findFirstDuplicate(data));
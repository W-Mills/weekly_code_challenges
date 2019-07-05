/*
Input: an array of directions
Output: a "simplified" array of directions

Problem: 
  - Take an array of directions, remove the redundant directions, and return the simplified directions
  - IF 'NORTH' is followed by 'SOUTH' (OR VICE-VERSA) => remove both
  - IF 'EAST' is followed by 'WEST' (OR VICE-VERSA) => remove both
  - IF no directions remain, return an empty array
  - 

Clarifying Questions: 
  - How to decide when the directions are "simplified" ?
    - When there are no more redundant pairs
      - A 'redundant pair' is when one direction is followed by its opposite
  
Approach:
  - Recursion with a "changes" tracker that IF true => recursively calls the function

Data Structure: 
  - Mutating the original array

Algorithm: 
  - Create an object with key-value pairs of opposites
  - Create a boolean to track if changes were made (initialize to false)
  - Use forEach to iterate over the list of directions from beginning to end:
    - IF the next index is an "opposites" pair (by checking reference object)
      - re-assign changes to true
      - splice out both values => (will it break to modify input array while iterating over it? => nope)
  - IF (changes were made (is true)) {
    recursively call dirReduc with the current state of the directions array
  } 
    - ELSE: return the directions array 
*/ 

//Code:
  function dirReduc(directions) {
    const opposites = {
      NORTH: "SOUTH",
      SOUTH: "NORTH",
      EAST: "WEST",
      WEST: "EAST"
    };

    let changes = false;

    directions.forEach((direction, index) => {
      if (direction === opposites[directions[index + 1]]) {
        directions.splice(index, 2);
        changes = true;
      }
    });

    if (changes) {
      dirReduc(directions);
    }

    return directions;
  }

//Test Cases: 

console.log(dirReduc(["NORTH", "SOUTH", "SOUTH", "EAST", "WEST", "NORTH", "WEST"])); // ["WEST"])
dirReduc(["NORTH", "WEST", "SOUTH", "EAST"]); // ["NORTH", "WEST", "SOUTH", "EAST"];
dirReduc(["NORTH", "SOUTH", "EAST", "WEST", "EAST", "WEST"]); // [];
dirReduc(['EAST', 'WEST', 'NORTH', 'SOUTH', 'EAST', 'SOUTH', 'WEST', 'EAST', 'SOUTH', 'NORTH']); // [\'EAST\', \'SOUTH\'];
dirReduc(['NORTH', 'SOUTH', 'WEST', 'EAST', 'SOUTH', 'NORTH', 'NORTH', 'EAST', 'EAST', 'WEST', 'NORTH', 'SOUTH', 'WEST', 'EAST']); // 'NORTH\', \'EAST\'
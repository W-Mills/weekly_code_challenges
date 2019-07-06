/*
input:
  - an array, representing directions
  - it can contain one or more occurences of any of 'NORTH', 'SOUTH', 'EAST', 'WEST'

output:
  - an array of simplified directions
  - all redundant directions are deleted
    - any of theses pairs is deleted
      - north-south
      - south-north
      - east-west
      - west-east

notes:
  - looking at the first ex, this has to be done recursively/repeatedly
  - ["NORTH", "SOUTH", "SOUTH", "EAST", "WEST", "NORTH", "WEST"]
    => becomes ['SOUTH', 'NORTH', 'WEST'] => ['WEST']

ideas:
  - this could probably be solved using regex
    - join the array as a string
    - look for any occurence of the redundant pairs and delete
    - do again until no more
    - use match to split the string into array of direction once again

afterthoughts:
  - this was quite simple using regex
  - maybe try to solve it without and see how it goes!
*/

function dirReduc(plan) {
  let directions = /NORTH|SOUTH|EAST|WEST/g
  let redundantPairs = /NORTHSOUTH|SOUTHNORTH|EASTWEST|WESTEAST/g
  let stringPlan = plan.join('');

  while (redundantPairs.test(stringPlan)) {
    stringPlan = stringPlan.replace(redundantPairs, '');
  }

  return stringPlan.match(directions) || [];
}

//-------------------------------------------------------------------------------
// I'm adding another solution using reduce (inspired by a solution seen on codewars), since I haven't seen something similar in the other solutions submitted by the group:

/*
 - using reduce to gradually build the return array
 - on each iteration we check the last element of that return array
   - if it is redundant relative to the element of the current iteration
   - we delete it from the return array using pop()
   - else we append the current direction to the return array using push()
*/

function dirReduc(directions) {
  let redundant = { 'NORTH': 'SOUTH', 'SOUTH': 'NORTH', 'EAST': 'WEST', 'WEST': 'EAST' };

  return directions.reduce((newPlan, currentDirection) => {
    if (newPlan[newPlan.length - 1] === redundant[currentDirection]) {
      newPlan.pop();
    } else {
      newPlan.push(currentDirection);
    }

    return newPlan;
  }, []);
}

console.log(dirReduc(["NORTH", "SOUTH", "SOUTH", "EAST", "WEST", "NORTH", "WEST"])); // => ["WEST"]
console.log(dirReduc(["NORTH", "SOUTH", "SOUTH", "EAST", "WEST", "NORTH"])); // => []
console.log(dirReduc(["NORTH", "WEST", "SOUTH", "EAST"])); // => ["NORTH", "WEST", "SOUTH", "EAST"]

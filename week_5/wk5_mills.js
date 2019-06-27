// A stream of data is received and needs to be reversed.

// Each segment is 8 bits long, meaning the order of these segments needs to be reversed, for example:

// 11111111  00000000  00001111  10101010
//  (byte1)   (byte2)   (byte3)   (byte4)
// should become:

// 10101010  00001111  00000000  11111111
//  (byte4)   (byte3)   (byte2)   (byte1)
// The total number of bits will always be a multiple of 8.

// The data is given in an array as such:

// [1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,1,0,1,0,1,0]

//------------------------------------------------------------------------

// Input: an array of digits (which are in informally groups of 8 digit --in a flat array)
// Output: an array of digits in which the order of the eight-digit 'blocks' are reversed

// Problem: Reverse the order of every set of 8 digits in an array

// Approach: 
// - initialize a new array
// - iterate over input data from the end
//   - slice of 8 elements into the new array
//     - spread the 8 element group and push them into the new array
// - return the new re-organized array 


// function dataReverse(data) {
//   const reversed = [];
//   let sliceStart = data.length - 8;

//   for (i = data.length; sliceStart >= 0; i -= 8) {
//     reversed.push(...data.slice(sliceStart, i));
//     sliceStart -= 8;
//   }

//   return reversed;
// }

const dataReverse = array =>
  array
    .join("")
    .match(/\d{8}/g)
    .reverse()
    .join("")
    .split("")
    .map(Number);

// test cases:

// console.log(dataReverse([1,2,3,4,5,6,7,8,1,1,1,1,1,1,1,1])); // [1,1,1,1,1,1,1,1,1,2,3,4,5,6,7,8]
console.log(dataReverse([1,2,3,4,5,6,7,8,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2])); // [2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,2,3,4,5,6,7,8]

// More info: input will always be a multiple of 8
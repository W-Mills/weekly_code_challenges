function dataReverse(data) {
  let bytes = data.join('').match(/.{8}/g);
  return bytes.reverse()
              .join('')
              .split('')
              .map((digit) => parseInt(digit, 10));
}

const array1 = [1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,1,0,1,0,1,0];
console.log(dataReverse(array1));
// output = [1,0,1,0,1,0,1,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1]

const array2 = [0,0,1,1,0,1,1,0,0,0,1,0,1,0,0,1];
console.log(dataReverse(array2));
// output = [0,0,1,0,1,0,0,1,0,0,1,1,0,1,1,0]

// break original string into chunks of 8 digits
//   - convert to a string to be able to use regex
//   - use scan for ruby, match for javascript
// reverse the order of those chunks
// flatten into a single array

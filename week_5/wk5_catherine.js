/*
input: an array of integers 0 and 1

output: an array of integers 0 and 1, reordered

rules:
  - the input array represents bytes
  - each segment is 8-bits long
  - the order of the segments needs to be reversed
  - NOT the segments themselves

ideas:
  - for fun I would like to try a regex solution => should be easy
  - after that try another solution without regex

edge cases:
  - is the input always valid?
  - is the length always a multiple of 8?
  - empty array
*/

// with regex

function dataReverse(data) {
  if (data.length === 0) return data;
  return data.join('').match(/.{8}/g).reverse().join('').split('').map(Number);
}

// one-liner

function dataReverse(data) {
  return (data.join('').match(/.{8}/g)||[]).reverse().join('').split('').map(Number);
}

// with splice

function dataReverse(data) {
  let reversedData = [];
  let tempData = data.slice();

  while (tempData.length > 0) {
    let byte = tempData.splice(0, 8);
    reversedData.unshift(...byte);
  }

  return reversedData;
}

// with slice

function dataReverse(data) {
  let reversedData = [];
  let byteLength = 8;
  let index = 0;

  while (reversedData.length < data.length) {
    let byte = data.slice(index, index + byteLength);
    reversedData.unshift(...byte);
    index += 8;
  }

  return reversedData;
}

const data1 = [1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,1,0,1,0,1,0]
const data2 = [1,0,1,0,1,0,1,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1]
console.log(dataReverse(data1)); // should be equal to data2

const data3 = [0,0,1,1,0,1,1,0,0,0,1,0,1,0,0,1]
const data4 = [0,0,1,0,1,0,0,1,0,0,1,1,0,1,1,0]
console.log(dataReverse(data3)); // should be equal to data4

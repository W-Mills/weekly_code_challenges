// input: arr of directions
// output: new resultArr of directions with opposites removed
// initialize resultArr
// reduce the array
  // for i = 0 to arr.length
  // if arr[i + 1] is opposite arr[i], i += 2
  // else resultArr.push(arr[i])
// check whether any reductions were made
// if so, reduce further, if not, return


function dirReduc(arr){
  let oppDirection = {
    'NORTH': 'SOUTH',
    'SOUTH': 'NORTH',
    'EAST': 'WEST',
    'WEST': 'EAST',
  }
  let resultArr = []
  let idx = 0;
  while (idx < arr.length) {
    if (arr[idx] === oppDirection[arr[idx + 1]]) {
      idx += 2;
    } else {
      resultArr.push(arr[idx]);
      idx += 1;
    }
  }

  if (resultArr.length === arr.length) {
    return resultArr;
  } else {
    return dirReduc(resultArr);
  }
}

let testArr =["NORTH", "SOUTH", "EAST", "WEST", "EAST", "WEST"]; // []
let testArr2 =["NORTH", "SOUTH", "SOUTH", "EAST", "WEST", "NORTH", "WEST"]; // ['WEST']
console.log(dirReduc(testArr2));
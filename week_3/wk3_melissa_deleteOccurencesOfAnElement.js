function deleteNth(arr, n) {
  let result = [];

  for (let i = 0; i < arr.length; i += 1) {

    let counter = 0;
    for (let j = 0; j < result.length; j += 1) {
      if (result[j] === arr[i]) counter += 1;
    }

    if (counter < n){
      result.push(arr[i]);
    }
  }

  return result;
}

console.log(deleteNth ([1,1,1,1], 2)); // [1,1]
console.log(deleteNth ([20,37,20,21], 1)); // [20,37,21]
console.log(deleteNth([1,1,3,3,7,2,2,2,2], 3)); // [1, 1, 3, 3, 7, 2, 2, 2]

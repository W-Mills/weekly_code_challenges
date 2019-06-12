function deleteNth(arr,n){
  let result_arr = [];
  let occurences = {};

  arr.forEach((el) => {
    occurences[el] = (occurences[el] + 1) || 1;
    if(occurences[el] <= n) {
      result_arr.push(el);
    }
  });

  return result_arr;
}

console.log(deleteNth ([1,1,1,1],2)) // return [1,1]
console.log(deleteNth ([20,37,20,21],1)) // return [20,37,21]
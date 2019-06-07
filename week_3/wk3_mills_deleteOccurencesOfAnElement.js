// this re-arranges the array so is no good:

// function deleteNth(arr, n) {
//   let sorted = arr.sort();
//   let trimmed = [];
  
//   for (i = 0; i < sorted.length; i += 1) {
//     let num = sorted[i];
    
//     if (num !== sorted[i - n]) {
//       trimmed.push(num);
//     }
//   }
  
//   // console.log(trimmed);
//   return trimmed;
// }

function deleteNth(arr, n) {
  let newList = [];  
  let count = {};

  for (let i = 0; i < arr.length; i += 1) {
    let num = arr[i];
    if (!count[num]) {
      count[num] = 1;
      newList.push(num);
    } else if (count[num] < n) {
      count[num] += 1;
      newList.push(num);
    }
  }

  return newList;
}

deleteNth([1, 1, 1, 1], 2) // return [1,1]

deleteNth([20, 37, 20, 21], 1) // return [20,37,21]



// solution using the same logic but written in Ruby:

def delete_nth(array, n)
  count = {}
  new_arr = []

  array.each do |num|
    if !count[num]
      new_arr.push(num)
      count[num] = 1
    elsif count[num] < n
      new_arr.push(num)
      count[num] += 1
    end
  end

  new_arr
end

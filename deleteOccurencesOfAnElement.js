
// Enough is enough!
// Alice and Bob were on a holiday.Both of them took many pictures of the places they've been, and now they want to show Charlie their entire collection. However, Charlie doesn't like this sessions, since the motive usually repeats.He isn't fond of seeing the Eiffel tower 40 times. He tells them that he will only sit during the session if they show the same motive at most N times. Luckily, Alice and Bob are able to encode the motive as a number. Can you help them to remove numbers such that their list contains each number only up to N times, without changing the order?

// Task
// Given a list lst and a number N, create a new list that contains each number of lst at most N times without reordering.For example if N = 2, and the input is[1, 2, 3, 1, 2, 1, 2, 3], you take[1, 2, 3, 1, 2], drop the next[1, 2] since this would lead to 1 and 2 being in the result 3 times, and then take 3, which leads to[1, 2, 3, 1, 2, 3].

// sort the list of numbers
// iterate over them
// use a counter to track that number copied < n
// 

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

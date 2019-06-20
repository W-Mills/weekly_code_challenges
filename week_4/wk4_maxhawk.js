// Write a function that will return the count of distinct case-insensitive alphabetic characters and numeric digits that occur more than once in the input string. The input string can be assumed to contain only alphabets (both uppercase and lowercase) and numeric digits.
  // Approach:
  // initialize counter
  // initialize obj hash
  // iterate through characters in string
  // for each char, lowercase and increment hash key
  // iterate through keys of hash
  // if value > 1, increment counter
  // return counter

function duplicateCount(text){
  let countDups = 0;
  let charCounts = {};

  text.toLowerCase().split('').forEach((char) => {
    charCounts[char] = (charCounts[char] + 1) || 1;
  });

  Object.keys(charCounts).forEach((char) => {
    if (charCounts[char] > 1) {
      countDups += 1;
    }
  });

  return countDups;
}

console.log(duplicateCount("abcde")); // -> 0 # no characters repeats more than once
console.log(duplicateCount("aabbcde")); // -> 2 # 'a' and 'b'
console.log(duplicateCount("aabBcde")); // -> 2 # 'a' occurs twice and 'b' twice (`b` and `B`)
console.log(duplicateCount("indivisibility")); // -> 1
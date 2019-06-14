// using lastIndexOf()
function duplicateCount(text){
  let counter      = 0;
  let index        = 0;
  const characters = text.toLowerCase().split('').sort();

  while (index < characters.length) {
    let lastInstance = characters.lastIndexOf(characters[index]);
    if (index === lastInstance) {
      index += 1;
    } else {
      counter += 1;
      index = lastInstance + 1;
    }
  }

  return counter;
}

// using RegEx
function duplicateCount(string) {
  let count = 0;
  if (string.length === 0) return count;
  string = string.toLowerCase().split('').sort().join('');
  let dups = string.match(/(.)\1{1,}/g);
  count = dups ? dups.length : 0;
  return count;
}

// consolidated RegEx
function duplicateCount(string) {
  if (string.length === 0) return 0;
  let dups = string.toLowerCase().split('').sort().join('').match(/(.)\1{1,}/g);
  return (dups) ? dups.length : 0;
}


console.log(duplicateCount(""));                 // 0
console.log(duplicateCount("abcde"));            // 0
console.log(duplicateCount("aaabbcde"));         // 2
console.log(duplicateCount("aabBcde"));          // 2
console.log(duplicateCount("Indivisibility"));   // 1
console.log(duplicateCount("Indivisibilities")); // 2
console.log(duplicateCount("abaBacdDeEE"));      // 4

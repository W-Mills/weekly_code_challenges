function duplicateCount(text) {
  var letters = text.toLowerCase().split('');
  var counts = {};
  
  letters.forEach(function (letter) {
    counts[letter] = counts[letter] ? counts[letter] + 1 : 1;
  });

  return Object.keys(counts).reduce(function (accumulator, count) {
    return accumulator += counts[count] > 1 ? 1 : 0;
  }, 0);
}

duplicateCount(""); // 0
duplicateCount("abcde"); // 0)
duplicateCount("aabbcde"); // 2)
duplicateCount("aabBcde"); // 2, "should ignore case")
duplicateCount("Indivisibility"); // 1)
duplicateCount("Indivisibilities"); // 2

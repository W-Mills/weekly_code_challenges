// Starting with a frequency of zero, what is the resulting frequency after all of the changes in frequency have been applied?

// input: text file
// output: number
// approach:
  // break data into array of strings
  // map strings to nums
  // reduce add

  const fs = require('fs');
  let data = fs.readFileSync('wk7_maxhawk_input.txt', 'utf8');
  let result;

  let resultingFreq = (data) => {
    return data.split('\n')
                .map( (el) => Number(el))
                .reduce( (acc, cur) => acc + cur );
  };

  result = resultingFreq(data);
  console.log(result);
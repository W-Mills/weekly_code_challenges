const fs = require("fs");

const data = fs
  .readFileSync("wk7_wrm_input.txt", "utf8")
  .split("\n")
  .map(num => Number(num));

const resultingFrequency = data.reduce((sum, change) => sum + change, 0);
console.log(resultingFrequency);


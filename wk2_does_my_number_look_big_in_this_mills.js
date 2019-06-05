function narcissistic(value) {
  let sum = 0;
  let stringDigits = String(value);
  let length = stringDigits.length;

  for (let i = 0; i < length; i += 1) {
    sum += (Number(stringDigits[i]) ** length);
  }

  return sum === value;
}

console.log(narcissistic(7) === true);
console.log(narcissistic(371) === true);
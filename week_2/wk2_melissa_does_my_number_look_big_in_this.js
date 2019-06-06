function narcissistic(value) {
  const reducerSum = (accumulator, currentValue) => accumulator + currentValue;
  let tempValue = value;
  let numbers = [];
  let result;

  while (tempValue > 0) {
    let digit = tempValue % 10;
    numbers.push(digit);
    tempValue -= digit;
    tempValue /= 10;
  }

  numbers = numbers.map((number) => (number ** numbers.length));

  result = numbers.reduce(reducerSum);

  if (result === value) return true;

  return false;
}

console.log(narcissistic(153));
console.log(narcissistic(1634));
console.log(narcissistic(1635));

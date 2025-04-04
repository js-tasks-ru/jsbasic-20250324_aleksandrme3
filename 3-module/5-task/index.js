function getMinMax(str) {
  let numbers = str
             .split(" ")
             .map(Number)
             .filter(num => !isNaN(num));
  let max = numbers.reduce((acc, num) => (num > acc ? num : acc), numbers[0]);
  let min = numbers.reduce( (acc, num) =>(num < acc ? num : acc), numbers[0]);
  return {min, max};
}

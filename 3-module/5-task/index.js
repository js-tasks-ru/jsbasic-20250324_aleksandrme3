function getMinMax(str) {
  let numbers = str
             .split(" ")
             .map(Number)
             .filter(num => !isNaN(num));
  return { 
   min:numbers.reduce( (acc, num) =>(num < acc ? num : acc), numbers[0]),
   max:numbers.reduce((acc, num) => (num > acc ? num : acc), numbers[0]),
   };
}

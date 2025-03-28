function factorial(n) {
  let i = 1;
  let result = n;

  if (n === 0) {
    return 1;}

  while (i < n) {
    result *= (n - i);
    i += 1;
  }

  return result;
}


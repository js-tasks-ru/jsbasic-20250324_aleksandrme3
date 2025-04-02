function sumSalary(salaries) {
    let sum = 0;
  
  
  for (let salary in salaries) {
    if (typeof(salaries[salary]) === "number" && Number.isFinite(salaries[salary]) ) {
      sum += salaries[salary];
    }
  
  }
    return sum;
}

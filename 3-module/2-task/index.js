function filterRange(arr, a, b) {
     return arr.filter(num => {
      if (num >= a && num <= b) {
        return num;
      }
     
    });
}

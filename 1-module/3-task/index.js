function ucFirst(str) {
  if (str === "") {
    return str;
  }
  return str.replace(str[0], str[0].toUpperCase());
}

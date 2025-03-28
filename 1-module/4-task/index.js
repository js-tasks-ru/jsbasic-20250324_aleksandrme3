function checkSpam(str) {
  cleanStr = str.toLowerCase();
  if (cleanStr.includes("1xbet") || cleanStr.includes("xxx")) {
    return true;
  } else {return false;}
}

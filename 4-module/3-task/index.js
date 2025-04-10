function highlight(table) {
  
  for (let row of table.tBodies[0].rows){
    
    const age = row.cells[1];
    const gender = row.cells[2];
    const status = row.cells[3];
    
    
    
    if (status.hasAttribute("data-available")) {
       if (status.dataset.available === "true") {
        row.classList.add("available");
       } else if (status.dataset.available === "false") {
        row.classList.add("unavailable");
        }
    } else {
      row.hidden = true;
      }
    
    
    
    if (parseInt(age.textContent) < 18) {
      row.style.textDecoration = "line-through";
    }  
    
    
    if (gender.textContent === "m") {
      row.classList.add("male");
    }
    
    if (gender.textContent === "f") {
      row.classList.add("female");
    }
  } 
}
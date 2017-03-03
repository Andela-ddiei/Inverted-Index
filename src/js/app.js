const fileNames = {};
let currentSelection = '';
const newIndex = new InvertedIndex();

/**
 * @param{String} fileName - The name of the uploadaed file
 * @param{Array} obj - The array of indices mapped to the file name
 */
function updateFileNames(fileName, obj) {
  fileNames[fileName] = obj;
  populateDropDown();
}
/**
 * The upload file function takes the file uploaded,
 * reads it as text and returns a json file.
 */
function uploadFile() {
  const files = document.getElementById('upload-input').files[0];
  if (files.type !== 'application/json'){
    const alert = document.getElementById('alert-div');
    alert.removeAttribute('hidden');
  } else {
    const readMyFileAss = new FileReader();
    readMyFileAss.readAsText(files);
    readMyFileAss.onload = (() => (event) => {
        updateFileNames(files.name, JSON.parse(event.target.result));
        console.log(JSON.parse(event.target.result));
      })(files);
  }
  
}

function populateDropDown() {
  const dropDown = document.getElementsByTagName('select')[0];
  const fileKeys = Object.keys(fileNames);
  fileKeys.forEach(el => {
    const option = document.createElement('option');
    option.innerHTML = el;
    dropDown.appendChild(option);
  });
}

let fName  = document.getElementsByTagName("select")[0];
fName.onchange = function(e) {
    currentSelection = e.target.value;
  }
function someFunction(){
    newIndex.createIndex(currentSelection, fileNames[currentSelection]);
    const indexValues = newIndex.getIndex(currentSelection);
  }
    

    // create a table and populate
    const table = document.createElement('table');
    table.classList.add("table", "table-hover");


    for (let token in indexValues) {
      
      let cellArray = [];

      for (let i = 0; i < newIndex.documentCount; i++) {
        cellArray.push(document.createElement('td'));
      }

      let row  = document.createElement('tr');

      let tokenCell = document.createElement('td');
      tokenCell.innerHTML = token;
      row.appendChild(tokenCell);

      cellArray = cellArray.map((cell, i) => {
        if (indexValues[token].includes(i)) {
          cell.innerHTML = 'x';
          return cell;
        } else {
          cell.innerHTML = 'o';
          return cell;
        }
      });

      console.log(cellArray);

      cellArray.forEach(cell => {
        row.appendChild(cell);
      })

      // for (let value of indexValues[token]) {
      //   let cell = document.createElement('td');
      //   cell.innerHTML = value;
      //   row.appendChild(cell);
      // }
      table.appendChild(row);
      const tableDiv = document.getElementById('tableDiv');
      tableDiv.appendChild(table);
    }
    
    document.getElementsByTagName('body')[0].appendChild(table);
    console.log('table should have been created')

  }
  





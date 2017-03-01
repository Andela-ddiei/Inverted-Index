angular.module('invertedIndexApp', []);


function uploadFile() {
  const files = document.getElementById('upload-input').files[0];
  const readMyFileAss = new FileReader();
  readMyFileAss.readAsText(files);
  readMyFileAss.onload = (() => (event) => {
      console.log(JSON.parse(event.target.result));
    })(files);
}



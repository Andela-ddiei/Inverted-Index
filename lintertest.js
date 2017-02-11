var pass = function() {
    var reader = new FileReader();
    reader.onload = function(e) {
        obj = JSON.parse(reader.result);
        console.log(obj);
    }
    reader.readAsText(file);
}
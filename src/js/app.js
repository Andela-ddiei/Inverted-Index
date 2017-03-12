
// angular
const myApp = angular.module('InvertedIndexApp', ['oitozero.ngSweetAlert']);  
myApp.controller('InvertedIndexController', 
  ['$scope','SweetAlert', ($scope, SweetAlert) => {
    const newIndex = new InvertedIndex();
    const uploadedFileNames = [];
    const uploadedFileContent = [];
    $scope.uploadFile = () => {
      $scope.validSearch = false;
      $scope.indexExists = false;
      $scope.theFile = document.getElementById('upload-input').files[0];
      if (!$scope.theFile) {
        SweetAlert.swal('Error', 'Please Select a file to Upload!', 'error');
        return;
      }
      const reader = new FileReader();
      reader.readAsText($scope.theFile);

      reader.onload = (e) => {
        if ($scope.theFile.type !== 'application/json') {
          $scope.uploadSuccess = false;
          SweetAlert.swal('Error', 'This is not a JSON file.', 'error');
          return;
        }
        try {
          const filed = JSON.parse(e.target.result);
          if (uploadedFileNames.indexOf($scope.theFile.name) > -1) {
            SweetAlert
              .swal('Error', 'This file has already been uploaded', 'error');
            $scope.$apply();
            return;
          }
          if (filed.length === 0 || !filed[0].title || !filed[0].text) {
            $scope.uploadSuccess = false;
            // setMessage('This is an Empty JSON File');
            SweetAlert.swal('Error', 'This is an Empty JSON File', 'error');
            $scope.$apply();
          } else {
            $scope.uploadSuccess = true;
            SweetAlert.swal('Good Job', 'Upload success!', 'success');
            $scope.filed = filed;
            uploadedFileNames.push($scope.theFile.name);
            console.log(uploadedFileNames);
            uploadedFileContent.push(filed);
            $scope.uploadedFileNames = uploadedFileNames;
            $scope.$apply();
          }
        } catch (e) {
          $scope.uploadSuccess = false;
        }
      };
    };
    $scope.createIndex = () => {
      const fileName = document.getElementById('createIndexSelect').value;
      const indexToCreate = uploadedFileNames.indexOf(fileName);
      if ($scope.uploadSuccess) {
        newIndex.createIndex(fileName, uploadedFileContent[indexToCreate]);
        $scope.range = [];
        const filedLength = $scope.filed.length;
        for (let docIndex = 0; docIndex < filedLength; docIndex += 1) {
          $scope.range.push(docIndex);
        }
        $scope.indexExists = true;
        $scope.indexObject = newIndex.getIndex(fileName);
      } else {
        $scope.indexExists = false;
        SweetAlert.swal('Error', 'Upload a valid JSON file first.', 'error');
      }
      console.log(newIndex.indices);
    };
    $scope.searchFile = () => {
      $scope.indexToSearch = document.getElementById('search-dropdown').value;
      $scope.searchResult = [];
      if ($scope.indexExists) {
        if ($scope.indexToSearch !== '-- All --') {
          $scope.searchResult = newIndex
          .searchIndex($scope.searchTerms, $scope.indexToSearch);
          $scope.validSearch = true;
        } else {
          $scope.searchResult = newIndex.searchAll($scope.searchTerms);
          $scope.validSearch = true;
        }
        console.log($scope.searchResult);
      } else {
        $scope.validSearch = false;
      }
    };
  }]);
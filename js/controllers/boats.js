myApp.controller('BoatsController', ['$scope', '$firebaseAuth', '$firebaseArray', function($scope, $firebaseAuth, $firebaseArray) {
    
    var boatsRef = firebase.database().ref('/boats');
    var boatsInfo = $firebaseArray(boatsRef);
    $scope.boats = boatsInfo;

}]);//Controller

myApp.controller('BoatDetailsController', ['$scope', '$firebaseObject', '$firebaseArray', '$filter', '$routeParams', function($scope, $firebaseObject, $firebaseArray, $filter, $routeParams) {
    var boatId = $routeParams.bId;
    var boatRef = firebase.database().ref('/boats/' + boatId);
    $scope.boat = $firebaseObject(boatRef);
}]);//Controller
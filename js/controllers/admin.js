myApp.controller('AdminController', ['$scope', '$rootScope', '$routeParams', '$firebaseAuth', '$firebaseArray', '$firebaseObject', function($scope, $rootScope, $routeParams, $firebaseAuth,  $firebaseArray, $firebaseObject) {
    var ref = firebase.database().ref();
    var auth = firebase.auth();
    $rootScope.authObj = $firebaseAuth(auth);
    
    auth.onAuthStateChanged(function(authUser) {
        if (authUser) {
            console.log('User verified as: ' + authUser.uid);
            var userRef = firebase.database().ref('/users/' + authUser.uid + '/role');
            //console.log(userRef);
            var userObj = $firebaseObject(userRef);
            console.log(userObj.$value);
            //console.log(userObj.firstname);
            
            var boatsRef = firebase.database().ref('/boats');
            var boatsInfo = $firebaseArray(boatsRef);
            $scope.boats = boatsInfo;
            
            var colorsRef = firebase.database().ref('/colors');
            var colorsInfo = $firebaseArray(colorsRef);
            //console.log(colorsInfo);
            $scope.colors = colorsInfo;
            $scope.colorselect = {}; //$scope.colors[0];
            
            var imagesRef = firebase.database().ref('/images');
            var imagesInfo = $firebaseArray(imagesRef);
            //console.log(imagesInfo);
            
            $scope.addBoat = function() {
                $scope.boatActive = false;
//                console.log("Here's" + JSON.stringify($scope.colorselect));
                boatsInfo.$add({
                    model: $scope.model,
                    dateCreated: firebase.database.ServerValue.TIMESTAMP,   
                    modelId: $scope.modelId,
//                   colors: $scope.colors,
//                    colors: $scope.colorselect.$value,
                    description: $scope.description,
                    weight: $scope.weight,
                    length: $scope.length,
                    beam: $scope.beam,
                    draft: $scope.draft,
                    rig: $scope.rig,
                    sailarea: $scope.sailarea,
                    price:$scope.price,
                    trailer:$scope.trailer,
                    construction: $scope.construction,
                    thumbimg: $scope.thumbimg,
                    active: $scope.boatActive
                }).then(function() {
                    $scope.model =
                    $scope.modelId =
//                    $scope.colors =
//                    $scope.colorselect =
                    $scope.length =
                    $scope.rig =
                    $scope.sailarea =
                    $scope.price =
                    $scope.beam =
                    $scope.draft =
                    $scope.weight = 
                    $scope.description =
                    $scope.construction =
                    $scope.thumbimg =
                    $scope.boatActive =
                    $scope.trailer = '';
                });//boatsInfo.$add
            };//addBoat
            $scope.addImage = function() {
                imagesInfo.$add({
                    dateCreated: firebase.database.ServerValue.TIMESTAMP,
                    file: $scope.filename,
                    model: $scope.boat_model.model,
                    stage: $scope.stage,
                    imageDate: $scope.imagedate,
                    hullId: $scope.hullId,
                    description: $scope.image_description
                }).then(function() {
                    $scope.filename =
                    $scope.stage =
                    $scope.imagedate =
                    $scope.hullId =
                    $scope.image_description =
                    $scope.boat_model = '';
                });//imagesInfo.$add
            }//addImage
        }// if user authenticated
    });// on Auth state changed
}]);//controller
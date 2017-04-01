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
            
            var videoRef = firebase.database().ref('/video');
            var videosInfo = $firebaseArray(videoRef);
            $scope.videos = videosInfo;
            
//            var colorsRef = firebase.database().ref('/colors');
//            var colorsInfo = $firebaseArray(colorsRef);
//            //console.log(colorsInfo);
//            $scope.colors = colorsInfo;
//            $scope.colorselect = {}; //$scope.colors[0];
            
            var imagesRef = firebase.database().ref('/images');
            var imagesInfo = $firebaseArray(imagesRef);
            $scope.videoActive = false;
            $scope.addVideo = function() {
                
                videosInfo.$add({
                    title: $scope.title,
                    dateCreated: firebase.database.ServerValue.TIMESTAMP,   
                    videoId: $scope.videoId,
                    workPerformed: $scope.workPerformed,
                    metatags: $scope.metatags,
                    description: $scope.description,
                    active: $scope.videoActive
                }).then(function() {
                    $scope.title =
                    $scope.description =
                    $scope.workPerformed =
                    $scope.metatags =
                    $scope.videoId = '';
                    $scope.videoActive = false;
                });//videosInfo.$add
            };//addvideo
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
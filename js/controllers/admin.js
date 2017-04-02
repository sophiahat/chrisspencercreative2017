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
            

            
            var audioRef = firebase.database().ref('/audio');
            var audioInfo = $firebaseArray(audioRef);
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
            $scope.addAudio = function() {
                audioInfo.$add({
                    dateCreated: firebase.database.ServerValue.TIMESTAMP,
                    src: $scope.src,
//                    model: $scope.boat_model.model,
                    description: $scope.audio_description,
                    img: $scope.img,
                    title: $scope.title,
                    meta: $scope.audio_meta
                }).then(function() {
                    $scope.src =
                    $scope.audio_description =
                    $scope.img=
                    $scope.title =
                    $scope.audio_meta ='';
                    
                });//imagesInfo.$add
            }//addAudio
        }// if user authenticated
    });// on Auth state changed
}]);//controller
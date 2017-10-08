myApp.controller('AdminController', ['$scope', '$rootScope', '$routeParams', '$firebaseAuth', '$firebaseArray', '$firebaseObject', function($scope, $rootScope, $routeParams, $firebaseAuth,  $firebaseArray, $firebaseObject) {
    //update google analytics
    var url = window.location.href;
    gtag('config', 'UA-20609405-2', {
        'page_path' : '/#/admin',
        'page_location' : url,
        'page_title' : 'Admin'
    
    });
    
    var ref = firebase.database().ref();
    var auth = firebase.auth();
    $rootScope.authObj = $firebaseAuth(auth);
    
    auth.onAuthStateChanged(function(authUser) {
        if (authUser) {
            console.log('User verified as: ' + authUser.uid);
            var userRef = firebase.database().ref('/users/' + authUser.uid + '/role');
            //console.log(userRef);
            var userObj = $firebaseObject(userRef);
            //console.log(userObj.$value);
            //console.log(userObj.firstname);
            
            var videoRef = firebase.database().ref('/video');
            var videosInfo = $firebaseArray(videoRef);
//            videosInfo.$loaded().then(function(videosInfo) {
//                for (var item in videosInfo) {
//                    console.log(item + " : " + videosInfo[item]);
//                }                      
//                                      });
            $scope.videos = videosInfo;
            

            
            var audioRef = firebase.database().ref('/audio');
            var audioInfo = $firebaseArray(audioRef);
            $scope.videoEditForm = false;
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
            $scope.editVideo = function(video) {
                $scope.video = video;
//                
                for (var item in video) {
                
//                console.log(item + " : " + video[item]);
                }
                $scope.videoEditForm = true;
                $scope.videotitle = video.title;
                $scope.videoactive = video.active;
                
                $scope.videodescription = video.description;
                $scope.videometatags = video.metatags;
                $scope.videorating = video.rating;
                $scope.videoid = video.videoId;
                $scope.videoworkperformed = video.workPerformed;
            };
            $scope.updateVideo = function() {                   
                var videoEdit = $scope.video;
                var id = videoEdit.$id;
                console.log('Current video ID: ' + id);
                event.preventDefault();
//                for (var item in videosInfo) {
//                    console.log(item + " : " + videosInfo[item].$id);              
//                }
                console.log("title: " + $scope.videotitle);
                var postdata = {
                    title : $scope.videotitle,
                    active : $scope.videoactive,
                    description : $scope.videodescription,
                    metatags : $scope.videometatags,
                    rating : $scope.videorating,
                    videoId : $scope.videoid,
                    workPerformed : $scope.videoworkperformed,
                    dateModified : firebase.database.ServerValue.TIMESTAMP
                };
                firebase.database().ref('/video/' + id).update(postdata);
                $scope.videoEditForm = false;
                
            
            };
            $scope.addAudio = function() {
                audioInfo.$add({
                    dateCreated: firebase.database.ServerValue.TIMESTAMP,
                    src: $scope.src,
//                    model: $scope.boat_model.model,
                    description: $scope.audio_description,
                    img: $scope.img,
                    title: $scope.title,
                    type: $scope.audio_type,
                    meta: $scope.audio_meta
                }).then(function() {
                    $scope.src =
                    $scope.audio_description =
                    $scope.img =
                    $scope.title =
                    $scope.audio_type =    
                    $scope.audio_meta ='';
                    
                });//imagesInfo.$add
            }//addAudio
        }// if user authenticated
    });// on Auth state changed
}]);//controller
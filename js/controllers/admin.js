myApp.controller('AdminController', ['$scope', '$rootScope', '$routeParams', '$firebaseAuth', '$firebaseArray', '$firebaseObject', function($scope, $rootScope, $routeParams, $firebaseAuth,  $firebaseArray, $firebaseObject) {
    var audioplayer = $('#audio-player');
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
            ///Functions duplicated from Portfolio.js - to refactor into service???
                function setAutoplayAudio() {
                    console.log('setting autoplay audio');
                    audioplayer.attr('autoplay', 'autoplay');
                }
                function changeDisplayAudio(audio) {
                    console.log('change display audio');
                    
                    setDisplayAudio(audio);
                    
                }

                function setDisplayAudio(audio) {
                    
                    $scope.displayAudio = audio;
                    console.log('In audio stuff');

                    var link = "/audio/" + audio.src;

                    audioplayer.attr('src', link);
                    setAutoplayAudio();

                }
            $scope.getAudioSource = setDisplayAudio;

            
            var audioRef = firebase.database().ref('/audio');
            var audioInfo = $firebaseArray(audioRef);
            
            audioInfo.$loaded().then(function(audioInfo) {
                for (var item in audioInfo) {
                    console.log(item + " : " + audioInfo[item].title);
                }
                //console.log(audioInfo);
                $scope.audios = audioInfo;
            });
            $scope.toggleAudioEditForm = function() {
                console.log('toggling audio edit form');
                if ($scope.audioEditForm) {
                    $scope.audioEditForm = false;
                } else {
                    $scope.audioEditForm = true;
                }
            }
            //$scope.audios = audioInfo;
            $scope.videoEditForm = false;
            $scope.toggleVideoEditForm = function() {
                console.log('toggling video edit form');
                if ($scope.videoEditForm) {
                    $scope.videoEditForm = false;
                } else {
                    $scope.videoEditForm = true;
                }
            }
            $scope.videoActive = false;
            $scope.audioEditForm = false;
            $scope.editAudio = function(track) {
                $scope.track = track;
                $scope.audioEditForm = true;
                $scope.audiotitle = track.title;
                $scope.audioactive = track.active;
                $scope.audiodescription = track.description;
                $scope.audiometatags = track.meta;
                $scope.audiorating = track.rating;
                $scope.audioprojectfile = track.projectfile;
                $scope.audioimage = track.img;
                $scope.audiosource = track.src;
                $scope.audiotype = track.type;
            };
            $scope.updateAudio = function() {
                var audioedit = $scope.track;
                var id = audioedit.$id;
                console.log("Current Audio Track edit ID: " + id);
                event.preventDefault();
                var postdata = {
                    title : $scope.audiotitle,
                    active : $scope.audioactive,
                    description : $scope.audiodescription,
                    dateModified : firebase.database.ServerValue.TIMESTAMP,
                    meta : $scope.audiometatags, 
                    rating : $scope.audiorating,
                    projectfile : $scope.audioprojectfile, 
                    img : $scope.audioimage,
                    type : $scope.audiotype,
                    src : $scope.audiosource
                };
                firebase.database().ref('/audio/' + id).update(postdata);
            };
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
            
            // projects
            $scope.projectEditForm = false;
            var projectRef = firebase.database().ref('/projects');
            var projectsInfo = $firebaseArray(projectRef);
            $scope.projects = projectsInfo;
        }// if user authenticated
    });// on Auth state changed
}]);//controller
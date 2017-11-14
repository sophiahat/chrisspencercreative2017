myApp.controller('AdminController', ['$scope', '$rootScope', '$routeParams', '$firebaseAuth', '$firebaseArray', '$firebaseObject', function($scope, $rootScope, $routeParams, $firebaseAuth,  $firebaseArray, $firebaseObject) {
    var audioplayer = $('#audio-player');
    $scope.audioplayer = false;
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
            
            
            // videos
            function clearVideoForm() {
                $scope.videotitle = 
                $scope.videoactive =
                $scope.videodescription =
                $scope.videometatags =
                $scope.videorating = 
                $scope.videoprojectID =
                $scope.videoworkperformed =
                $scope.videoId = '';
            }
            var videoRef = firebase.database().ref('/video');
            var videosInfo = $firebaseArray(videoRef);
//            videosInfo.$loaded().then(function(videosInfo) {
//                for (var item in videosInfo) {
//                    console.log(item + " : " + videosInfo[item]);
//                }                      
//                                      });
            $scope.videos = videosInfo;
            $scope.addVideo = function() {
                $scope.videoEditForm = true;
//                videosInfo.$add({
//                    title: $scope.title,
//                    dateCreated: firebase.database.ServerValue.TIMESTAMP,   
//                    videoId: $scope.videoId,
//                    workPerformed: $scope.workPerformed,
//                    metatags: $scope.metatags,
//                    description: $scope.description,
//                    active: $scope.videoActive
//                }).then(function() {
//                    $scope.title =
//                    $scope.description =
//                    $scope.workPerformed =
//                    $scope.metatags =
//                    $scope.videoId = '';
//                    $scope.videoActive = false;
//                });//videosInfo.$add
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
                event.preventDefault();
                var postdata = {
                    title : $scope.videotitle,
                    active : $scope.videoactive,
                    description : $scope.videodescription,
                    metatags : $scope.videometatags,
                    rating : $scope.videorating,
                    videoId : $scope.videoid,
                    workPerformed : $scope.videoworkperformed,
                    
                };
                
                if($scope.video) {
                    var videoEdit = $scope.video;
                    var id = videoEdit.$id;
                    console.log('Current video ID: ' + id);
                    postdata.dateModified = firebase.database.ServerValue.TIMESTAMP;
                    console.log("title: " + $scope.videotitle);  
                    firebase.database().ref('/video/' + id).update(postdata);
                } else {
                    postdata.dateCreated = firebase.database.ServerValue.TIMESTAMP;
                    videosInfo.$add(postdata);
                }
                clearVideoForm();
                $scope.videoEditForm = false;
                
            };//update Video
            $scope.deleteVideo = function(video) {
                if (confirm("Delete this video: " + video.title)) {
                    var targetVideoRef = firebase.database().ref('/video/' + video.$id);
                    targetVideoRef.remove()
                    .then(function() {
                        alert('video reference removed');
                    })
                    .catch(function(error) {
                        alert('problem removing video ' + error.message);
                    });
                } else {return}
                    
            };//delete Audio
            
            //end Videos
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
                console.log(audio.src);
                $scope.audioplayer = true;

                var link = "/audio/" + audio.src;

                audioplayer.attr('src', link);
                setAutoplayAudio();
            }
            //end functions duplicated in portfolio.js
            function clearAudioForm() {
                $scope.audiotitle = 
                $scope.audioactive =
                $scope.audiodescription =
                $scope.audiometatags =
                $scope.audiorating = 
                $scope.audioprojectID =
                $scope.audioimage =
                $scope.audiotype =
                $scope.audiosource = '';
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
                track.rating ? $scope.audiorating = track.rating : $scope.audiorating = 0;
//                $scope.audiorating = track.rating;
                track.projectID ? $scope.audioprojectID = track.projectID : $scope.audioprojectID = '';
                $scope.audioimage = track.img;
                $scope.audiosource = track.src;
                track.type ? $scope.audiotype = track.type : $scope.audiotype = 'unknown';
            };//edit Audio
            $scope.updateAudio = function() {
                event.preventDefault();
                var postdata = {
                    title : $scope.audiotitle,
                    active : $scope.audioactive,
                    description : $scope.audiodescription,
                    meta : $scope.audiometatags, 
                    rating : $scope.audiorating,
                    projectID : $scope.audioprojectID, 
                    img : $scope.audioimage,
                    type : $scope.audiotype,
                    src : $scope.audiosource
                };
                if ($scope.track) {
                    var audioedit = $scope.track;
                    var id = audioedit.$id;
                    console.log("Current Audio Track edit ID: " + id);
                    postdata.dateModified = firebase.database.ServerValue.TIMESTAMP;
                    firebase.database().ref('/audio/' + id).update(postdata);
                } else {
                    console.log('creating a new track record');
                    console.log(postdata);
                    postdata.dateCreated = firebase.database.ServerValue.TIMESTAMP;
                    audioInfo.$add(postdata);
                }
                clearAudioForm();
                $scope.audioEditForm = false;
                    
            };//updated Audio
            $scope.deleteAudio = function(track) {
                if (confirm("Delete this track: " + track.title)) {
                    var targetAudioRef = firebase.database().ref('/audio/' + track.$id);
                    targetAudioRef.remove()
                    .then(function() {
                        alert('audio reference removed');
                    })
                    .catch(function(error) {
                        alert('problem removing audio ' + error.message);
                    });
                } else {return}
                    
            };//delete Audio
            $scope.addAudio = function() {
                $scope.audioEditForm = true;
                $scope.track = false;
//                audioInfo.$add({
//                    dateCreated: firebase.database.ServerValue.TIMESTAMP,
//                    src: $scope.src,
////                    model: $scope.boat_model.model,
//                    description: $scope.audio_description,
//                    img: $scope.img,
//                    title: $scope.title,
//                    type: $scope.audio_type,
//                    meta: $scope.audio_meta
//                }).then(function() {
//                    $scope.src =
//                    $scope.audio_description =
//                    $scope.img =
//                    $scope.title =
//                    $scope.audio_type =    
//                    $scope.audio_meta ='';
                    
 //               });//imagesInfo.$add
            }//addAudio
            
            
            // projects
            function clearProjectForm() {
                $scope.projectName = 
                $scope.discid =
                $scope.projectDescription =
                $scope.disctype =
                $scope.encodingsoftware = 
                $scope.linkToCloudBackup =
                $scope.projectBeginDate =
                $scope.projectEndDate = 
                $scope.projectID = '';
            }
            $scope.projectEditForm = false;
            $scope.toggleProjectForm = function() {
                if ($scope.projectEditForm) {
                    $scope.projectEditForm = false;
                } else {
                    $scope.projectEditForm = true;
                }
            };
            var projectRef = firebase.database().ref('/projects');
            var projectsInfo = $firebaseArray(projectRef);
            $scope.projects = projectsInfo;
            $scope.editProject = function(project) {
                $scope.projectEditForm = true;
                $scope.project = project;
                $scope.discid = project.DiscID;
                $scope.disctype = project.Disc_Type;
                $scope.encodingsoftware = project.Encoding_Software;
                $scope.linkToCloudBackup = project.Link_to_Cloud_Backup;
                $scope.projectBeginDate = project.ProjectBeginDate;
                $scope.projectDescription = project.ProjectDescription;
                $scope.projectEndDate = project.ProjectEndDate;
                $scope.projectID = project.ProjectID;
                $scope.projectName = project.ProjectName;
            };
            $scope.updateProject = function() {
                event.preventDefault();
                var postdata = {
                    DiscID : $scope.discid,
                    Disc_Type : $scope.disctype,
                    Encoding_Software : $scope.encodingsoftware,
                    Link_to_Cloud_Backup : $scope.linkToCloudBackup,
                    ProjectBeginDate : $scope.projectBeginDate,
                    ProjectDescription : $scope.projectDescription,
                    ProjectEndDate : $scope.projectEndDate,
                    ProjectID : $scope.projectID,
                    ProjectName : $scope.projectName
                };
                if ($scope.project) {
                    var projectEdit = $scope.project;
                    var id = projectEdit.$id;
                    console.log("Current Project ID: " + id);
                    postdata.dateModified = firebase.database.ServerValue.TIMESTAMP;
                    firebase.database().ref('/projects/' + id).update(postdata);
                } else {
                    postdata.dateCreated = firebase.database.ServerValue.TIMESTAMP;
                    projectsInfo.$add(postdata);
                }
                clearProjectForm();    
                $scope.projectEditForm = false;
            };
            $scope.addProject = function() {
                $scope.projectEditForm = true;
            }
            $scope.deleteProject = function(project) {
                if (confirm("Delete this project: " + project.ProjectName)) {
                    var targetProjectRef = firebase.database().ref('/projects/' + project.$id);
                    targetProjectRef.remove()
                    .then(function() {
                        alert('project reference removed');
                    })
                    .catch(function(error) {
                        alert('problem removing project ' + error.message);
                    });
                } else {return}
                    
            };//delete Audio
        }// if user authenticated
    });// on Auth state changed
}]);//controller
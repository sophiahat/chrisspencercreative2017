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
            
            // tab management
            $scope.tab = 1;
            $scope.setTab = function(newTab) {
                $scope.tab = newTab;
            };
            
            $scope.isSet = function(tabNum) {
//                console.log("Tab is" +tabNum);
                return $scope.tab === tabNum;
            };
            // videos
            function clearVideoForm() {
                console.log('clearing video form');
                $scope.videotitle = 
                $scope.videoactive =
                $scope.videodescription =
                $scope.videometatags =
                $scope.videorating = 
                $scope.videoprojectID =
                $scope.videoworkperformed =
                $scope.videoShowCSCreative =
                $scope.videoShowSophiahat = 
                $scope.videoid = '';
                $scope.video = null;   
                
            }
            var videoRef = firebase.database().ref('/video');
            var videosInfo = $firebaseArray(videoRef);
//            videosInfo.$loaded().then(function(videosInfo) {
//                for (var item in videosInfo) {
//                    console.log(item + " : " + videosInfo[item]);
//                }                      
//                                      });
            $scope.videos = videosInfo;
            $scope.videoEditForm = false;
            $scope.videoActive = false;
            $scope.video = null;
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
                $scope.videoShowCSCreative = video.showCSCreative;
                $scope.videoShowSophiahat = video.showSophiahat;
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
                    showCSCreative : $scope.videoShowCSCreative,
                    showSophiahat : $scope.videoShowSophiahat
                    
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
            $scope.toggleVideoEditForm = function() {
                console.log('toggling video edit form, scope of video:');
                console.log($scope.video);
                console.log('Video edit form: '+ $scope.videoEditForm);
                
                if ($scope.videoEditForm) {
                    clearVideoForm();
                    $scope.videoEditForm = false;
                    
                } else {
                    $scope.videoEditForm = true;
                }
                console.log('Video edit form: ' + $scope.videoEditForm);
                console.log($scope.video);
            }
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
                $scope.showCSCreative =
                $scope.showSophiahat =
                $scope.audiosource = '';
                $scope.track = null;
            }
            
            $scope.getAudioSource = setDisplayAudio;
            var audioRef = firebase.database().ref('/audio');
            var audioInfo = $firebaseArray(audioRef);
            
            audioInfo.$loaded().then(function(audioInfo) {
                for (var item in audioInfo) {
//                    console.log(item + " : " + audioInfo[item].title);
                }
                //console.log(audioInfo);
                $scope.audios = audioInfo;
            });
            $scope.toggleAudioEditForm = function() {
                console.log('toggling audio edit form');
                if ($scope.audioEditForm) {
                    clearAudioForm();
                    $scope.audioEditForm = false;
                } else {
                    $scope.audioEditForm = true;
                }
            }
            //$scope.audios = audioInfo;

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
                $scope.showCSCreative = track.showCSCreative;
                $scope.showSophiahat = track.showSophiahat;
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
                    src : $scope.audiosource,
                    showCSCreative: $scope.showCSCreative,
                    showSophiahat: $scope.showSophiahat
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
                $scope.project = null;
            }
            $scope.projectEditForm = false;
            $scope.toggleProjectForm = function() {
                if ($scope.projectEditForm) {
                    clearProjectForm();
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
                        alert('problem removing project: ' + error.message);
                    });
                } else {return}
                    
            };//delete Project
            
            //end projects
            
            //clients
            function clearClientForm() {
                $scope.clientName = 
                $scope.clientActive = 
                $scope.clientDateCreated = 
                $scope.clientDateModified = 
                $scope.clientDescription =
                $scope.clientType =
                $scope.clientMeta =
                $scope.clientImage = 
                $scope.clientWebsite = 
                $scope.clientShowCSCreative =
                $scope.clientShowSophiahat =
                $scope.clientRating = '';
                $scope.client = null;
            }
            $scope.clientEditForm = false;
            $scope.toggleClientForm = function() {
                if ($scope.clientEditForm) {
                        $scope.clientEditForm = false;
                        clearClientForm();
                    } else {
                        $scope.clientEditForm = true;
                }   
            };
            var clientRef = firebase.database().ref('/clients');
            var clientsInfo = $firebaseArray(clientRef);
            $scope.clients = clientsInfo;
            $scope.editClient = function(client) {
                $scope.clientEditForm = true;
                $scope.client = client;
                $scope.clientName = client.name;
                $scope.clientActive = client.active;
                $scope.clientDateCreated = client.dateCreated;
                $scope.clientDateModified = client.dateModified;
                client.description ? $scope.clientDescription = client.description : $scope.clientDescription = '';
                $scope.clientType = client.type;
                client.meta ? $scope.clientMeta = client.meta : $scope.clientMeta = null;
                $scope.clientImage = client.image;
                client.website ? $scope.clientWebsite = client.website : $scope.clientWebsite = null;
                client.showCSCreative ? $scope.clientShowCSCreative = client.showCSCreative : $scope.clientShowCSCreative = false;
                client.showSophiahat ? $scope.clientShowSophiahat = client.showSophiahat : $scope.clientShowSophiahat = false;
                client.rating ? $scope.clientRating = client.rating : $scope.clientRating = 0;
            };
            $scope.updateClient = function(client) {
                event.preventDefault();
                var postdata = {
                    name : $scope.clientName,
                    active : $scope.clientActive,
                    description : $scope.clientDescription,
                    type : $scope.clientType,
                    meta : $scope.clientMeta,
                    image : $scope.clientImage,
                    url : $scope.clientWebsite,
                    showCSCreative : $scope.clientShowCSCreative,
                    showSophiahat : $scope.clientShowSophiahat,
                    rating : $scope.clientRating      
                };
                if($scope.client) {
                    var clientEdit = $scope.client;
                    var id = clientEdit.$id;
                    console.log("Current Client ID: " + id);
                    postdata.dateModified = firebase.database.ServerValue.TIMESTAMP;
                    firebase.database().ref('/clients/' + id).update(postdata);
                }else{
                    postdata.dateCreated = firebase.database.ServerValue.TIMESTAMP;
                    clientsInfo.$add(postdata);
                }
                clearClientForm();
                $scope.clientEditForm = false;
            };
            $scope.addClient = function(client) {
                $scope.clientEditForm = true;
            };
            $scope.deleteClient = function(client) {
                if (confirm("Delete this client: " + client.name)) {
                    var targetClientRef = firebase.database().ref('/clients/' + client.$id);
                    targetClientRef.remove()
                    .then(function() {
                        alert('client reference removed');
                    })
                    .catch(function(error) {
                        alert('problem removing client: ' + error.message);  
                    });
                } else {return}
            };//delete client
            clearClientForm();
            //end clients
//            albums
            function clearAlbumForm() {
                $scope.album = null;
                $scope.albumClientID = 
                $scope.albumDateRelease = 
                $scope.albumImage = 
                $scope.albumPurchaseURL = 
                $scope.albumShowCSCreative = 
                $scope.albumShowSophiahat = 
                $scope.albumTitle = null;
            }//clear album form
            $scope.albumEditForm = false;
            $scope.toggleAlbumForm = function() {
                if ($scope.albumEditForm) {
                    clearAlbumForm();
                    $scope.albumEditForm = false;
                } else {
                    $scope.albumEditForm = true;
                }
            };//toggle album form
            var albumRef = firebase.database().ref('/albums');
            var albumsInfo = $firebaseArray(albumRef);
            $scope.albums = albumsInfo;
            $scope.album = null;
            $scope.editAlbum = function(album) {
                $scope.albumEditForm = true;
                $scope.album = album;
                $scope.albumClientID = album.clientID;
                $scope.albumDateRelease = album.dateRelease;
                $scope.albumImage = album.image;
                $scope.albumPurchaseURL = album.purchaseURL;
                $scope.albumShowCSCreative = album.showCSCreative;
                $scope.albumShowSophiahat = album.showSophiahat;
                $scope.albumTitle = album.title;
            };//end edit album
            $scope.updateAlbum = function(album) {
                event.preventDefault();
                var postdata = {
                    clientID : $scope.albumClientID,
                    dateRelease : $scope.albumDateRelease,
                    image : $scope.albumImage,
                    purchaseURL : $scope.albumPurchaseURL,
                    showCSCreative : $scope.albumShowCSCreative,
                    showSophiahat : $scope.albumShowSophiahat,
                    title : $scope.albumTitle
                };
                if($scope.album) {
                    var albumEdit = $scope.album;
                    var id = albumEdit.$id;
                    console.log("current album ID: " + id);
                    postdata.dateModified = firebase.database.ServerValue.TIMESTAMP;
                    firebase.database().ref('/albums/' + id).update(postdata);
                }else {
                    postdata.dateCreated = firebase.database.ServerValue.TIMESTAMP;
                    albumsInfo.$add(postdata);
                }
                clearAlbumForm();
                $scope.albumEditForm = false;
            };//end update album
            $scope.addAlbum = function(album) {
                $scope.albumEditForm = true;
            };//end add album
            $scope.deleteAlbum = function(album) {
                if(confirm("Delete this Album: " + album.title)) {
                    var targetAlbumRef = firebase.database().ref('/albums/' + album.$id);
                    targetAlbumRef.remove()
                    .then(function() {
                        alert('Album Reference removed');
                    })
                    .catch(function(error) {
                        alert('problem removing album' + error.message);
                    });//delete album
                }
            };//end delete album
            clearAlbumForm();
            
//            end albums
//            gear
            function clearGearForm() {
                $scope.gearDescription =
                $scope.gearImages =
                $scope.gearManufacturer =
                $scope.gearModel =
                $scope.gearQuantity =
                $scope.gearSubtype =
                $scope.gearType =
                $scope.gearTypeware = null;
                $scope.gearItem = null;
            }
            $scope.gearEditForm = false;
            $scope.toggleGearForm = function() {};
            var gearRef = firebase.database().ref('/gear');
            var gearInfo = $firebaseArray(gearRef);
            $scope.gear = gearInfo;
            $scope.gearItem = null;
            $scope.editGear = function(gearitem) {
                $scope.gearEditForm = true;
                $scope.gearItem = gearitem;
                $scope.gearDescription = gearitem.description;
                $scope.gearImages = gearitem.images;
                $scope.gearManufacturer = gearitem.manufacturer;
                $scope.gearModel = gearitem.model;
                $scope.gearQuantity = gearitem.quantity;
                $scope.gearSubtype = gearitem.subtype;
                $scope.gearType = gearitem.type;
                $scope.gearTypeware = gearitem.typeware;
                
            };
            $scope.updateGear = function(gearitem) {
                event.preventDefault();
                var postdata = {
                    description : $scope.gearDescription,
                    images : $scope.gearImages,
                    manufacturer : $scope.gearManufacturer,
                    model : $scope.gearModel,
                    quantity : $scope.gearQuantity,
                    subtype : $scope.gearSubtype,
                    type : $scope.gearType,
                    typeware : $scope.gearTypeware
                };
                if ($scope.gearItem) {
                    var gearEdit = $scope.gearItem;
                    var id = gearEdit.$id;
                    console.log("current Gear Id: " + id);
                    postdata.dateModified = firebase.database.ServerValue.TIMESTAMP;
                    firebase.database().ref('/gear/' + id).update(postdata);
                }else{
                    postdata.dateCreated = firebase.database.ServerValue.TIMESTAMP;
                    gearInfo.$add(postdata);
                }
                clearGearForm();
                $scope.gearEditForm = false;
            };//update gear
            $scope.addGear = function(gearitem) {
                $scope.gearEditForm = true;
            };//add gear
            $scope.deleteGear = function(gearitem) {
                if(confirm("Delete this Gear: " + gearitem.manufacturer + " - " + gearitem.model)) {
                    var targetGearRef = firebase.database().ref('/gear/' + gearitem.$id);
                    targetGearRef.remove()
                    .then(function() {
                        alert('Gear Reference removed');
                    })
                    .catch(function(error) {
                        alert('problem removing gear ' + error.message);
                    });
                }
            };//delete gear
            clearGearForm();
//            end gear
            
        }// if user authenticated
    });// on Auth state changed
}]);//controller
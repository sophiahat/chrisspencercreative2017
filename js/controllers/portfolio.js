myApp.controller('PortfolioController', ['$scope', '$firebaseAuth', '$firebaseArray', '$firebaseObject', '$sce','$filter', function($scope, $firebaseAuth, $firebaseArray, $firebaseObject, $sce, $filter) {
    
    //update google analytics
    var url = window.location.href;
    gtag('config', 'UA-20609405-2', {
        'page_path' : '/#!/portfolio',
        'page_location' : url,
        'page_title' : 'Portfolio'
    
    });
    //hide carousel
//    $('.header-carousel').hide();
    
    // tab management
    $scope.tab = 2;
    $scope.setTab = function(newTab) {
        $scope.tab = newTab;
    };

    $scope.isSet = function(tabNum) {
//        console.log("Tab is" +tabNum);
        return $scope.tab === tabNum;
    };
    $scope.subTab = 3;
    $scope.setSubTab = function(newSubTab) {
        $scope.subTab = newSubTab;  
    };
    $scope.subIsSet = function(subTabNum) {
        return $scope.subTab === subTabNum;
    };
//    Videos
    var videosRef = firebase.database().ref('/video');
    var videosInfo = $firebaseArray(videosRef);
    $scope.videos = videosInfo;
    $scope.getIframeSource = function(video) {
        var link = 'https://www.youtube.com/embed/' + video.videoId + '?autoplay=1&amp;showinfo=0&amp;rel=0';
        var videoplayer = $('#portfolio-video-player');
        videoplayer.attr('src', link); 
        
        return;
    };
    
//    Audio
    $scope.audioPlaylist = [];
    $scope.searchActive = false;
    $scope.isSearchActive = function() {
        var active = ($scope.audioSearchKeyword) ? true : false;
        $scope.searchActive = active;
        console.log('active Search: ' + active);
        return active;
    };
    
    var audioRef = firebase.database().ref('/audio');
    var audioInfo = $firebaseArray(audioRef);
    $scope.audio = audioInfo;
//    console.log("Audio Object from database: "); 
//    console.log($scope.audio);
    var audioplayer = $('#audio-player');
    $scope.adjustPlaylist = function(track, track_selected) {
        console.log('adjust playlist called');
//        console.log($scope.audioPlaylist);
        if(track_selected) {
            console.log('track ' + track.title + ' is selected');
            $scope.audioPlaylist.push(track);
        } else {
            console.log('track ' + track.title + ' is not selected');
            var index = $scope.audioPlaylist.indexOf(track);
            if(index > -1) {
                $scope.audioPlaylist.splice(index, 1);
            }
            console.log($scope.audioPlaylist);
        }
        $($scope.audioPlaylist).each(function() {
            console.log(this.title);
        });
    };
    $scope.cue = 1;
    $scope.adjustCurrentTrack = function(increment) {
        $scope.cue = $scope.cue + increment;
        if($scope.cue > $scope.audioPlaylist.length) {
            $scope.cue = 1;
        }
        if($scope.cue < 1) {
            $scope.cue = $scope.audioPlaylist.length;
        }
        var currentTrack = $scope.audioPlaylist[$scope.cue -1];
        console.log(currentTrack);
        changeDisplayAudio(currentTrack);
            
    };

    $scope.playPlaylist = function () {
        var currentTrack = $scope.audioPlaylist[$scope.cue - 1];
        console.log(currentTrack);
        changeDisplayAudio(currentTrack);
    };
   
    function setAutoplayAudio() {
        audioplayer.attr('autoplay', 'autoplay');
    }
    function changeDisplayAudio(audio) {
        setDisplayAudio(audio);
        setAutoplayAudio();
    }
    function setDisplayAudio(audio) {
        $scope.displayAudio = audio;
        console.log('In audio stuff, adjusted the audio source');
        
        var link = "https://storage.googleapis.com/chrisspencercreative/audio/" + audio.src;
        
        audioplayer.attr('src', link);
        
    } 
    audioInfo.$loaded().then(function(audioInfo) {
//        console.log('load complete');
//        console.log("length of audio array: " + audioInfo.length);
//        console.log("first Audio object");
//        console.log(audioInfo[0].showCSCreative);
        var composerAudio = [];
        $(audioInfo).each(function() {
            if(this.type == "composition") {
//                console.log(this.title);
                composerAudio.push(this);
            }
        });
//        $scope.audioPlaylist = composerAudio;
        console.log($scope.audioPlaylist);
        var audioArrayLength = composerAudio.length;
        var trackNumber = Math.floor(Math.random() * (audioArrayLength));
        console.log("Random choice is: " + trackNumber);
        
        var rec = composerAudio[trackNumber];
        console.log('random pick is:');
        console.log(rec.title);
        
        //$scope.displayAudioSrc = srcLink;
//        $scope.displayAudio = $scope.audio[trackNumber];
//        console.log("Current Audio is: " + $scope.displayAudio.title);
        setDisplayAudio(rec);
        $scope.buyTrack = function(track){
//            TODO remove 'track' and test 
            console.log(track);
            console.log('running stripe script');
            var stripe = Stripe('pk_test_wh6ktDfmaFhY2gadYPaHABd300uTUBToVG');
            stripe.redirectToCheckout({
              items: [{sku: $scope.displayAudio.stripeSku, quantity: 1}],

              // Do not rely on the redirect to the successUrl for fulfilling
              // purchases, customers may not always reach the success_url after
              // a successful payment.
              // Instead use one of the strategies described in
              // https://stripe.com/docs/payments/checkout/fulfillment
              successUrl: window.location.protocol + '//www.chrisspencercreative.com/#!/success',
              cancelUrl: window.location.protocol + '//www.chrisspencercreative.com/#!/cancelled',
            })
            .then(function (result) {
              if (result.error) {
                // If `redirectToCheckout` fails due to a browser or network
                // error, display the localized error message to your customer.
                var displayError = document.getElementById('error-message');
                displayError.textContent = result.error.message;
              }
            });
        };
    });
    $scope.getAudioSource = changeDisplayAudio;
    
    
    // config Stripe audiotrack purchase widget
    
                    
//    Images
    var imagesRef = firebase.database().ref('/images');
    var imagesInfo = $firebaseArray(imagesRef);
    $scope.images = imagesInfo;
    $scope.imageInfo = 'Mouse over an image to display image attribution information';
    imagesInfo.$loaded().then(function(imagesInfo) {
//        $scope.images.forEach(function(item, index) {
//            console.log('Item author:' + item.author);
//        });    
//        getImageInfo('RayVegaChapterTwo.jpg');

    });
    $scope.getImageInfo = function(filename){
        var image = $filter('filter')(imagesInfo, {'file': filename})
        var info = '<a href="'+ image[0].sourceurl + '">' + image[0].title + '</a>, by ' + image[0].author + ', is licensed under ' + image[0].license; 
        $scope.imageInfo = $sce.trustAsHtml(info);
    };
    $scope.clearImageInfo = function() {
        $scope.imageInfo = 'Mouse over an image to display image attribution information';
    };
    
    
    
   
    
    

}]);//Controller
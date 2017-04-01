myApp.controller('PortfolioController', ['$scope', '$firebaseAuth', '$firebaseArray', '$firebaseObject', '$sce', function($scope, $firebaseAuth, $firebaseArray, $firebaseObject, $sce) {
    var videosRef = firebase.database().ref('/video');
    var videosInfo = $firebaseArray(videosRef);
    $scope.videos = videosInfo;
    
    var audioRef = firebase.database().ref('/audio');
    var audioInfo = $firebaseArray(audioRef);
    $scope.audio = audioInfo;
    console.log("Audio Object from database: "); 
    console.log($scope.audio);
    
    function setDisplayAudio(audio) {
        setTimeout(function(){
            console.log('pressing play');
            var player = $('#comp-audio-player').contents().find('audio');
            console.log(player);
            player.play();
        }, 5000);
        console.log('In audio stuff');
        console.log(audio.audioId);
        var link = "https://app.box.com/s/" + audio.audioId + "?autoplay=1";
        var srcLink = $sce.trustAsResourceUrl(link);
        
        
        console.log(srcLink);
        var audioplayer = $('#comp-audio-player');
        audioplayer.attr('src', $sce.trustAsResourceUrl(link));
        
        
    }
    
    audioInfo.$loaded().then(function(audioInfo) {
        console.log('load complete');
        console.log("length of audio array: " + audioInfo.length);
        var audioArrayLength = audioInfo.length;
        var trackNumber = Math.floor(Math.random() * (audioArrayLength));
        console.log("Random choice is: " + trackNumber);
        
        var rec = audioInfo.$getRecord('audiotest1');
        console.log(rec);
        rec = audioInfo[trackNumber];
        console.log(rec);
        
        //$scope.displayAudioSrc = srcLink;
        $scope.displayAudio = $scope.audio[trackNumber];
        console.log("Current Audio is: " + $scope.displayAudio.audioId);
        //setDisplayAudio(rec);
    });
    
    
    
    $scope.getIframeAudioSource = setDisplayAudio;
                    
    
    $scope.getIframeSource = function(video) {
        var link = 'https://www.youtube.com/embed/' + video.videoId + '?autoplay=1&amp;showinfo=0&amp;rel=0';
        var videoplayer = $('#portfolio-video-player');
        videoplayer.attr('src', link); 
        
        return;
    };
}]);//Controller
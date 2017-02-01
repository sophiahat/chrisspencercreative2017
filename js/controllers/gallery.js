myApp.controller('GalleryController', ['$scope',  '$firebaseArray', function($scope, $firebaseArray) {
    
    //hide carousel
    //$('.header-carousel').css('display', 'none');
    
    //boats
    var boatsRef = firebase.database().ref('/boats');
    var boatsInfo = $firebaseArray(boatsRef);
    $scope.boats = boatsInfo;
    
    //images
    var imagesRef = firebase.database().ref('/images');
    var imagesInfo = $firebaseArray(imagesRef);
    $scope.images = imagesInfo;
    
    
    //functions
    //initialize image index
    $scope._Index = 0;
    
    //if a current image is the same as requested image
    $scope.isActive = function(index) {
        return $scope._Index === index;
    };
    
    
    //show a predetermined image
    $scope.showPhoto = function (index) {
        $scope._Index = index;
    };
    
//    $scope.updateSearch = function(boat){
//        var press = jQuery.Event("keypress");
//        press.ctrlKey = false;
//        press.which = 8;
//        press.keyCode = 8;
//        $('#searchQuery').val(boat).focus();
//        $('#searchQuery').trigger(press);
//    };//update search
    
}]);//Controller
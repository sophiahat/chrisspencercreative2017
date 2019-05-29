myApp.controller('AboutController', ['$scope', '$firebaseArray','$firebaseObject', function($scope, $firebaseArray, $firebaseObject) {
    var url = window.location.href;
    gtag('config', 'UA-20609405-2', {
        'page_path' : '/#!/about',
        'page_location' : url,
        'page_title' : 'About'
    });
    console.log('AboutController is on');
    
    var clientsRef = firebase.database().ref('/clients');
    var clientsInfo = $firebaseArray(clientsRef);
    $scope.clients = clientsInfo;
    
    console.log($scope.clients);
    
}]);//Controller
myApp.controller('AboutController', ['$scope', '$firebaseArray','$firebaseObject', function($scope, $firebaseArray, $firebaseObject) {
    var url = window.location.href;
    gtag('config', 'G-JB3CC59H30');
    gtag('event', 'page_view', {
        page_title: 'About',
        page_path: '/#!/about',
        page_location: url
    });
    console.log('AboutController is on');
    
    var clientsRef = firebase.database().ref('/clients');
    var clientsInfo = $firebaseArray(clientsRef);
    $scope.clients = clientsInfo;
    
    console.log($scope.clients);
    
}]);//Controller
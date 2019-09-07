myApp.controller('iFramesController', ['$scope', '$http', '$sce', function($scope, $http, $sce){
console.log("ENTERING LOADING IFRAME");
var calendlyUrl = 'https://calendly.com/sophiahat/30-min-meeting';
    $scope.iframeUrl = calendlyUrl;
}]);
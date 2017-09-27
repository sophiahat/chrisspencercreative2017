myApp.controller('ServicesController', ['$scope', function($scope) {
    $scope.message = 'Services Controller';
    var url = window.location.href;
    gtag('config', 'UA-20609405-2', {
        'page_path' : '/#/services',
        'page_location' : url,
        'page_title' : 'Services'
    
    });
}]);//Controller
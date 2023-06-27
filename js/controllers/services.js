myApp.controller('ServicesController', ['$scope', function($scope) {
    $scope.message = 'Services Controller';
    var url = window.location.href;
    gtag('config', 'G-JB3CC59H30');
    gtag('event', 'page_view', {
        page_title: 'Services',
        page_path: '/#!/services',
        page_location: url
    });
}]);//Controller
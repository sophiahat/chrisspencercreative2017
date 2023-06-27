myApp.controller('ContactController', ['$scope', function($scope) {
    $scope.message = 'Contact Controller';
    var url = window.location.href;
    gtag('config', 'G-JB3CC59H30');
    gtag('event', 'page_view', {
        page_title: 'Contact',
        page_path: '/#!/contact',
        page_location: url
    });
}]);//Controller
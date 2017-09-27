myApp.controller('ContactController', ['$scope', function($scope) {
    $scope.message = 'Contact Controller';
    var url = window.location.href;
    gtag('config', 'UA-20609405-2', {
        'page_path' : '/#/contact',
        'page_location' : url,
        'page_title' : 'Contact'
    
    });
}]);//Controller
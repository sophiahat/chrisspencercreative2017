myApp.controller('NewsController', ['$scope', function($scope) {
    var url = window.location.href;
    gtag('config', 'UA-20609405-2', {
        'page_path' : '/#/news',
        'page_location' : url,
        'page_title' : 'News'
    
    });
}]);//Controller
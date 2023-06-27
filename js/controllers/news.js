myApp.controller('NewsController', ['$scope', function($scope) {
    var url = window.location.href;
    gtag('config', 'G-JB3CC59H30');
    gtag('event', 'page_view', {
        page_title: 'News',
        page_path: '/#!/news',
        page_location: url
    });
}]);//Controller